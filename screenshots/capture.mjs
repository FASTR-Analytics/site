#!/usr/bin/env node
// Captures the docs screenshots from a running demo instance (see boot.sh).
//
//   node capture.mjs <en|fr> [shot,shot,...|all]
//
// Raw captures go to out/raw/<shot>-<lang>.png; postprocess.py turns them into
// the images in public/images. Each shot starts from a fresh browser context.
// Shots in MANUAL only run when named explicitly: the AI panel needs a real
// ANTHROPIC_API_KEY and its answer differs on every run.
// Failed shots are listed at the end and leave out/raw/_fail_<shot>-<lang>.png.
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync, existsSync, writeFileSync, rmSync } from "node:fs";
import { CONFIG } from "./config.mjs";

const HERE = new URL(".", import.meta.url).pathname;
const BASE = process.env.SHOTS_BASE ?? `http://localhost:${CONFIG.clientPort}`;
const OUT = process.env.SHOTS_OUT ?? `${HERE}out/raw`;
mkdirSync(OUT, { recursive: true });
const META = JSON.parse(readFileSync(`${HERE}fixture/meta.json`, "utf8"));
const MANUAL = ["ai-panel"];

const LANG = process.argv[2] ?? "en";
const WANT = (process.argv[3] ?? "all").split(",");
// English -> French UI labels, built from the platform source by labels.mjs.
const MAP = existsSync(`${HERE}out/labels.json`) ? JSON.parse(readFileSync(`${HERE}out/labels.json`, "utf8")) : {};
// Short labels whose first match in the source is a different string.
const OVERRIDE = { fr: { "New": "Nouveau", "Delete": "Supprimer", "Save": "Sauvegarder", "Next": "Suivant", "Cancel": "Annuler", "Back": "Retour", "Data": "Données" } };
const L = (en) => LANG === "en" ? en : (OVERRIDE[LANG]?.[en] ?? MAP[en] ?? en);
if (LANG !== "en" && !Object.keys(MAP).length) { console.error("out/labels.json missing: run labels.mjs first"); process.exit(1); }

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

async function newPage({ width = 1440, height = 900, persona = CONFIG.persona } = {}) {
  // Fixed timezone and a clock that starts at the fixture's time, so dates and
  // "last active" readings come out the same on every run.
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: "light", timezoneId: "UTC", locale: "en-US" });
  await ctx.addInitScript((lang) => { try { localStorage.setItem("fastrLanguage", lang); } catch {} }, LANG);
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date(META.clockTime) });
  page.on("dialog", (d) => d.accept());
  await page.goto(`${BASE}/?persona=${persona}`, { waitUntil: "load" });
  // The app must actually render (header with the instance name, real page text),
  // otherwise every later step clicks into a blank page.
  await page.waitForFunction(() => (document.body?.innerText ?? "").includes("Demo") && document.body.innerText.length > 60, null, { timeout: 60000 })
    .catch(async () => { await ctx.close(); throw new Error("the app did not render (blank page): check the client log"); });
  await page.waitForTimeout(6000);
  // Hide the AI button's "not opened yet" pulse dot.
  await page.addStyleTag({ content: ".fixed.right-0 .bg-warning{display:none!important}" });
  return { ctx, page };
}

const wait = (page, ms = 1200) => page.waitForTimeout(ms);
// Before saving: wait for loading indicators to clear, and refuse to save an error
// state, so a broken screen fails the shot instead of reaching the docs.
async function settle(page) {
  const loading = page.locator("text=/^(Loading|Chargement|Re-fetching data|Récupération des données)/");
  for (let i = 0; i < 40 && await loading.first().isVisible().catch(() => false); i++) await page.waitForTimeout(500);
  if (await loading.first().isVisible().catch(() => false)) throw new Error("still loading after 20s");
  const err = page.locator("text=/Server error|Erreur du serveur|No such file or directory/");
  if (await err.first().isVisible().catch(() => false)) throw new Error("error on screen: " + (await err.first().innerText()).slice(0, 160));
}
async function full(page, name) { await wait(page, 1500); await settle(page); await page.screenshot({ path: `${OUT}/${name}-${LANG}.png` }); console.log("saved", name); }
async function card(page, name, a, b, pad = 0) {
  await wait(page, 1200); await settle(page);
  const box = await page.evaluate(([a, b]) => {
    let best = null;
    for (const el of document.querySelectorAll("div, section, form, dialog")) {
      const t = el.innerText || ""; if (!t.includes(a) || !t.includes(b)) continue;
      const r = el.getBoundingClientRect(); if (r.width < 200 || r.height < 80) continue;
      if (r.width >= innerWidth - 2 && r.height >= innerHeight - 2) continue;
      if (!best || r.width * r.height < best.w * best.h) best = { x: r.x, y: r.y, w: r.width, h: r.height };
    }
    return best;
  }, [a, b]);
  if (!box) { console.log("NO CARD", name, a, b); return full(page, name); }
  await page.screenshot({ path: `${OUT}/${name}-${LANG}.png`, clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.w + 2 * pad, height: box.h + 2 * pad } });
  console.log("saved card", name);
}
async function clipTexts(page, name, a, b, pad = 24) {
  await wait(page, 1200); await settle(page);
  const box = await page.evaluate(([a, b]) => {
    const find = (t) => { let best = null; for (const el of document.querySelectorAll("*")) { if (el.children.length > 3) continue; const tx = (el.innerText || "").trim(); if (!tx.startsWith(t)) continue; const r = el.getBoundingClientRect(); if (!r.width) continue; if (!best || r.width * r.height < best.width * best.height) best = r; } return best; };
    const A = find(a), B = find(b); if (!A || !B) return null;
    return { x: Math.min(A.x, B.x), y: Math.min(A.y, B.y), r: Math.max(A.right, B.right), b: Math.max(A.bottom, B.bottom) };
  }, [a, b]);
  if (!box) { console.log("NO CLIP", name); return full(page, name); }
  await page.screenshot({ path: `${OUT}/${name}-${LANG}.png`, clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.r - box.x + 2 * pad, height: box.b - box.y + 2 * pad } });
  console.log("saved clip", name);
}
async function rail(page, tab) {
  const exp = page.locator(`button[aria-label="${L("Expand navigation")}"]`);
  if (await exp.count()) { await exp.first().click(); await wait(page, 500); }
  await page.getByText(L(tab), { exact: true }).first().click(); await wait(page, 3000);
}
async function collapseRail(page) {
  const c = page.locator(`button[aria-label="${L("Collapse navigation")}"]`);
  if (await c.count()) { await c.first().click(); await wait(page, 400); }
}
async function expandAll(page) {
  const c = page.locator(`button[aria-label="${L("Collapse all")}"]`);
  if (await c.count()) { await c.first().click(); await wait(page, 700); }
  const e = page.locator(`button[aria-label="${L("Expand all")}"]`);
  if (await e.count()) { await e.first().click(); await wait(page, 1000); }
}
const dlg = (page) => page.locator("[role=dialog], dialog").last();
const back = async (page) => { await page.locator("button:visible").first().click(); await wait(page, 2500); };
async function openProduct(page, name) { await expandAll(page); await page.getByText(name, { exact: true }).first().click(); await wait(page, 8000); }
async function toDataRow(page, rowEn, nth = 0) { await rail(page, "Data"); await page.getByText(L(rowEn), { exact: true }).nth(nth).click(); await wait(page, 3500); }

const SHOTS = {};
const S = (name, opts, fn) => { SHOTS[name] = { opts, fn }; };

// ---------- admin guide ----------
S("admin-index-navigation", {}, async (p) => { await expandAll(p); const exp = p.locator(`button[aria-label="${L("Expand navigation")}"]`); if (await exp.count()) await exp.first().click(); await full(p, "admin-index-navigation"); });
S("users-table", {}, async (p) => { await rail(p, "Users"); await collapseRail(p); await full(p, "users-table"); });
S("users-profile", { height: 900 }, async (p) => { await rail(p, "Users"); await p.getByText("Amina Diallo", { exact: true }).first().click(); await wait(p, 3000); await full(p, "users-profile"); });
S("scopes-editor", {}, async (p) => { await rail(p, "Scopes"); await p.getByText("Northern region", { exact: true }).first().click(); await wait(p, 1500); await card(p, "scopes-editor", L("Edit scope"), L("Limit years")); });
S("results-packages-generate", { height: 640 }, async (p) => { await rail(p, "Results"); await p.getByRole("button", { name: L("Generate new results package") }).click(); await wait(p, 2500); await card(p, "results-packages-generate", L("Generate results package"), L("Choose data")); });
S("results-packages-package-page", {}, async (p) => { await rail(p, "Results"); await p.getByText("April 2025", { exact: true }).first().click(); await wait(p, 9000); await full(p, "results-packages-package-page"); });
S("data-hmis-data-page", {}, async (p) => { await rail(p, "Data"); await collapseRail(p); await full(p, "data-hmis-data-page"); });
S("admin-areas", {}, async (p) => { await toDataRow(p, "Facilities", 0); await clipTexts(p, "admin-areas", L("Imports"), L("Derived from the facility rows — created and removed automatically by imports.").slice(0, 25)); });
S("managing-existing-facilities", {}, async (p) => { await toDataRow(p, "Facilities", 0); await full(p, "managing-existing-facilities"); });
S("health-facilities", {}, async (p) => { await toDataRow(p, "Facilities", 1); await full(p, "health-facilities"); });
S("structure-import", { width: 1100, height: 610 }, async (p) => {
  await toDataRow(p, "Facilities", 0);
  const resume = p.getByRole("button", { name: L("Resume importing") });
  if (await resume.count()) { await resume.click(); await wait(p, 2500); }
  else {
    await p.getByRole("button", { name: L("Import facilities") }).click(); await wait(p, 2000);
    await p.getByText(L("Upload CSV file"), { exact: true }).first().click(); await wait(p, 800);
    await p.getByRole("button", { name: new RegExp(`^(${L("Next")}|${L("Continue")})$`) }).last().click().catch(() => {}); await wait(p, 1500);
  }
  const sel = p.locator("select", { has: p.locator("option", { hasText: "hmis_facilities_2025.csv" }) });
  if (await sel.count()) { await sel.selectOption({ label: "hmis_facilities_2025.csv" }); await wait(p, 800);
    await p.getByRole("button", { name: L("Save and continue") }).click(); await wait(p, 4000); }
  await full(p, "structure-import");
  await p.getByRole("button", { name: L("Discard upload") }).click(); await wait(p, 1500);
  const ok = dlg(p).getByRole("button", { name: new RegExp(`^(${L("Discard upload")}|${L("Discard")}|${L("Confirm")}|${L("Yes")}|OK)$`) });
  if (await ok.count()) await ok.last().click(); await wait(p, 1500);
});
S("geojson", { height: 760 }, async (p) => {
  await toDataRow(p, "GeoJSON maps", 0);
  await p.getByRole("button", { name: L("Upload GeoJSON") }).click(); await wait(p, 1500);
  await p.getByText(L("Upload GeoJSON file"), { exact: true }).first().click(); await wait(p, 800);
  await p.getByRole("button", { name: new RegExp(`^(${L("Next")}|${L("Continue")})$`) }).last().click().catch(() => {}); await wait(p, 1200);
  await p.locator("select", { has: p.locator("option", { hasText: "demo_regions.geojson" }) }).selectOption({ label: "demo_regions.geojson" });
  await p.getByRole("button", { name: L("Analyze") }).click(); await wait(p, 3000);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 3000);
  await full(p, "geojson");
});
// HFA
async function hfaImports(p) { await toDataRow(p, "Data", 2); await p.getByRole("button", { name: L("Imports") }).click(); await wait(p, 2500); await p.getByText(L("New import"), { exact: true }).last().click(); await wait(p, 2000); }
async function hfaUploadStep(p) {
  await p.locator("select", { has: p.locator("option", { hasText: "demo_hfa_round1.csv" }) }).selectOption({ label: "demo_hfa_round2.csv" });
  await p.locator("select", { has: p.locator("option", { hasText: "demo_hfa_questionnaire.xlsx" }) }).selectOption({ label: "demo_hfa_questionnaire.xlsx" });
  await wait(p, 800);
}
S("hfa-upload", { height: 760 }, async (p) => { await hfaImports(p); await hfaUploadStep(p); await card(p, "hfa-upload", L("New HFA import"), L("XLSForm Questionnaire File")); });
S("hfa-upload-round", { height: 760 }, async (p) => {
  await hfaImports(p); await hfaUploadStep(p);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 3500);
  const tp = p.locator("select", { has: p.locator("option", { hasText: "Round 2 (2024-11)" }) });
  if (await tp.count()) await tp.first().selectOption({ label: "Round 2 (2024-11)" });
  await card(p, "hfa-upload-round", L("New HFA import"), L("Facility ID Column"));
});
S("data-hfa-changes", { height: 900 }, async (p) => {
  await hfaImports(p);
  await p.locator("select", { has: p.locator("option", { hasText: "demo_hfa_round1.csv" }) }).selectOption({ label: "demo_hfa_round1.csv" });
  await p.locator("select", { has: p.locator("option", { hasText: "demo_hfa_questionnaire.xlsx" }) }).selectOption({ label: "demo_hfa_questionnaire.xlsx" });
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 3500);
  const tp = p.locator("select", { has: p.locator("option", { hasText: "Round 1 (2023-06)" }) });
  await tp.first().selectOption({ label: "Round 1 (2023-06)" }); await wait(p, 600);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 3500);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 3000);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 3500);
  await card(p, "data-hfa-changes", L("New HFA import"), L("Keep all"));
});
S("hfa-timepoints", { width: 1100, height: 520 }, async (p) => { await toDataRow(p, "Time points", 0); await full(p, "hfa-timepoints"); });
S("hfa-indicators", {}, async (p) => { await toDataRow(p, "Indicators", 1); await full(p, "hfa-indicators"); });
S("hfa-code", {}, async (p) => { await toDataRow(p, "Indicators", 1); await p.getByText("Oxytocin", { exact: true }).first().click(); await wait(p, 4000); await full(p, "hfa-code"); });

// ---------- user guide ----------
S("user-index-products", {}, async (p) => { await expandAll(p); const exp = p.locator(`button[aria-label="${L("Expand navigation")}"]`); if (await exp.count()) await exp.first().click(); await full(p, "user-index-products"); });
S("products-new-menu", {}, async (p) => { await expandAll(p); await p.getByRole("button", { name: L("New"), exact: true }).first().click(); await wait(p, 700); await full(p, "products-new-menu"); });
S("products-manage-access", {}, async (p) => { await expandAll(p); await p.getByText("Q1 2025 service delivery review", { exact: true }).first().click({ button: "right" }); await wait(p, 600); await p.getByText(L("Manage access…"), { exact: true }).click(); await wait(p, 1500); await card(p, "products-manage-access", L("General access"), L("Cancel")); });
S("products-version-history", {}, async (p) => {
  await openProduct(p, "Q1 2025 service delivery review");
  await p.getByRole("button", { name: L("History") }).click(); await wait(p, 4000);
  const rows = p.locator("text=/\\d+ (slides|diapositives)/");
  if (await rows.count() > 1) { await rows.nth(0).click(); await wait(p, 5000); }
  await full(p, "products-version-history");
});
async function openSlide(p, i) { await openProduct(p, "Q1 2025 service delivery review"); await p.locator('[data-tour="deck-slide-card"]').nth(i).click(); await wait(p, 3500); }
S("slide-decks-editor", {}, async (p) => { await openSlide(p, 1); await full(p, "slide-decks-editor"); });
S("slide-decks-layout-menu", {}, async (p) => {
  await openSlide(p, 1);
  await p.mouse.click(560, 480); await wait(p, 700);
  await p.mouse.click(560, 480, { button: "right" }); await wait(p, 700);
  await p.getByText(L("Split"), { exact: true }).last().hover(); await wait(p, 700);
  await full(p, "slide-decks-layout-menu");
});
S("slide-decks-download", { height: 640 }, async (p) => {
  await openSlide(p, 0);
  await p.getByRole("button", { name: L("File") }).click(); await wait(p, 500);
  await p.getByText(L("Download…"), { exact: true }).click(); await wait(p, 1500);
  await card(p, "slide-decks-download", L("Download slide deck"), L("Download"));
});
S("reports-editor", {}, async (p) => { await openProduct(p, "Annual data quality report 2024"); await wait(p, 3000); await full(p, "reports-editor"); });
S("reports-download", { height: 700 }, async (p) => {
  await openProduct(p, "Annual data quality report 2024");
  await p.getByRole("button", { name: L("File") }).click(); await wait(p, 500);
  await p.getByText(L("Download…"), { exact: true }).first().click(); await wait(p, 1500);
  await card(p, "reports-download", L("Download report"), "HTML");
});
S("visualizations-editor", {}, async (p) => { await openProduct(p, "Annual change by region"); await full(p, "visualizations-editor"); });
S("explore-page", {}, async (p) => {
  await rail(p, "Explore"); await collapseRail(p); await wait(p, 6000);
  await full(p, "explore-page");
});
S("ai-prompt-library", {}, async (p) => {
  await p.locator(`button[aria-label="${L("Open AI panel")}"]`).click(); await wait(p, 2000);
  await p.locator(`button[aria-label="${L("More actions")}"]`).last().click().catch(() => {}); await wait(p, 600);
  await p.getByText(L("Prompt library"), { exact: true }).first().click(); await wait(p, 4000);
  await card(p, "ai-prompt-library", L("Prompt library"), L("My prompts"));
});


// visualization type panels (cropped; montaged afterwards)
async function exploreType(p, type, name) {
  await rail(p, "Explore"); await collapseRail(p); await wait(p, 5000);
  await p.getByRole("button", { name: L(type), exact: true }).click(); await wait(p, 5000);
  if (type === "Map") {
    const combo = p.locator('input[role=combobox]:visible').first();
    await combo.click(); await wait(p, 500);
    await p.locator("[popover]:popover-open").last().getByText("Antenatal care 1", { exact: true }).first().click(); await wait(p, 5000);
  }
  await wait(p, 1500);
  await p.addStyleTag({ content: ".fixed.right-0{display:none!important}" }); await settle(p);
  await p.screenshot({ path: `${OUT}/${name}-${LANG}.png`, clip: { x: 56, y: 132, width: 1384, height: 610 } }); console.log("saved", name);
}
S("vt-table", {}, async (p) => exploreType(p, "Table", "vt-table"));
S("vt-timeseries", {}, async (p) => exploreType(p, "Over time", "vt-timeseries"));
S("vt-map", {}, async (p) => {
  await expandAll(p);
  await p.getByRole("button", { name: L("New"), exact: true }).first().click(); await wait(p, 400);
  await p.getByText(L("New visualization"), { exact: true }).click(); await wait(p, 1200);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 2500);
  const d = dlg(p);
  await d.getByText(L("Data quality assessment"), { exact: true }).first().click().catch(async () => { await d.getByText("Data quality assessment", { exact: true }).first().click(); }); await wait(p, 800);
  await d.getByText(/Proportion of completed records|Proportion d/).first().click();
  await d.getByRole("button", { name: L("Next") }).click(); await wait(p, 5000);
  await d.getByText(/Completeness map|Carte de complétude|map by Admin Area 2/i).first().click();
  await d.getByRole("button", { name: L("Insert") }).click(); await wait(p, 9000);
  await p.addStyleTag({ content: ".fixed.right-0{display:none!important}" }); await settle(p);
  await p.screenshot({ path: `${OUT}/vt-map-${LANG}.png`, clip: { x: 384, y: 58, width: 1056, height: 842 } }); console.log("saved vt-map");
  // Remove the visualization this shot created, so the demo data stays as it was.
  await back(p); await expandAll(p);
  const made = p.getByText(/^(Proportion of completed records|Proportion d)/).first();
  if (await made.count()) { await made.click({ button: "right" }); await wait(p, 600); await p.getByText(L("Delete"), { exact: true }).last().click(); await wait(p, 800); await p.getByRole("button", { name: L("Confirm") }).last().click(); await wait(p, 1500); }
});
S("vt-bar", {}, async (p) => { await openProduct(p, "Annual change by region"); await wait(p, 2000); await p.addStyleTag({ content: ".fixed.right-0{display:none!important}" }); await settle(p); await p.screenshot({ path: `${OUT}/vt-bar-${LANG}.png`, clip: { x: 384, y: 58, width: 1056, height: 842 } }); console.log("saved vt-bar"); });


S("ai-panel", {}, async (p) => {
  await openSlide(p, 2);
  await p.locator(`button[aria-label="${L("Open AI panel")}"]`).click(); await wait(p, 2500);
  const q = LANG === "fr"
    ? "Quelles régions ont la complétude la plus faible pour les soins postnatals des nouveau-nés ? Réponds en deux phrases."
    : "Which regions have the lowest completeness for postnatal care for newborns? Answer in two sentences.";
  const box = p.locator("textarea:visible").last();
  await box.click(); await box.fill(q); await p.keyboard.press("Enter");
  for (let i = 0; i < 60; i++) { await wait(p, 2000); const busy = await p.locator('button[aria-label*="Stop" i], button:has-text("Stop")').count(); if (i > 5 && !busy) break; }
  await wait(p, 2000);
  await full(p, "ai-panel");
});


S("visualizations-create", { height: 820 }, async (p) => {
  await expandAll(p);
  await p.getByRole("button", { name: L("New"), exact: true }).first().click(); await wait(p, 400);
  await p.getByText(L("New visualization"), { exact: true }).click(); await wait(p, 1200);
  await p.getByRole("button", { name: L("Next") }).click(); await wait(p, 2500);
  const d = dlg(p);
  await d.getByText(/^(Indicator value|Valeur de l.indicateur)/).first().click(); await wait(p, 600);
  await d.getByRole("button", { name: L("Next") }).click(); await wait(p, 10000);
  await card(p, "visualizations-create", L("Insert visualization"), L("Back"));
});

// ---------- run ----------
const failed = [];
for (const [name, { opts, fn }] of Object.entries(SHOTS)) {
  const named = WANT.includes(name);
  if (!named && !(WANT.includes("all") && !MANUAL.includes(name))) continue;
  // A failed shot must not leave an older capture behind for postprocess.py to reuse.
  rmSync(`${OUT}/${name}-${LANG}.png`, { force: true });
  let ctx, page;
  try { ({ ctx, page } = await newPage(opts)); await fn(page); } catch (e) {
    failed.push(name);
    console.log("FAIL", name, e.message.split("\n")[0]);
    await page?.screenshot({ path: `${OUT}/_fail_${name}-${LANG}.png` }).catch(() => {});
  }
  await ctx?.close();
}
await browser.close();
writeFileSync(`${OUT}/_failed-${LANG}.json`, JSON.stringify(failed));
if (failed.length) { console.log(`${failed.length} shot(s) failed: ${failed.join(", ")}`); process.exitCode = 2; }
