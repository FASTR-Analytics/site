#!/usr/bin/env node
// Rebuilds the demo products when the fixture is remade (see README): folders,
// saved visualizations, slide decks, reports, their content, and sharing.
// Run against a demo instance whose "April 2025" package is pinned and whose
// scopes ("Northern region", "Maternal and newborn health") exist, with no
// products yet.
//   node seed.mjs all     build everything
//   node seed.mjs edit    a second editing session on the Q1 deck, so its version
//                         history shows edited slides (run after the first session
//                         has been saved, about a minute later)
import { chromium } from "playwright-core";
import { CONFIG } from "./config.mjs";

const BASE = process.env.SHOTS_BASE ?? `http://localhost:${CONFIG.clientPort}`;
const PERSONA = CONFIG.persona;
const PHASE = process.argv[2] ?? "all";

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox", "--disable-gpu"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => { try { localStorage.setItem("fastrLanguage", "en"); } catch {} });
const page = await ctx.newPage();
page.on("dialog", (d) => d.accept());
const w = (ms) => page.waitForTimeout(ms);
const dlg = () => page.locator("[role=dialog], dialog").last();
const step = (s) => console.log("·", s);

async function home() { await page.goto(`${BASE}/?persona=${PERSONA}`, { waitUntil: "load" }); await w(9000); }
async function back() { await page.locator("button:visible").first().click(); await w(2500); const keep = page.getByRole("button", { name: /^Keep$/ }); if (await keep.isVisible().catch(() => false)) { await keep.click(); await w(1500); } }
async function expandAll() {
  const c = page.locator('button[aria-label="Collapse all"]'); if (await c.count()) { await c.first().click(); await w(700); }
  const e = page.locator('button[aria-label="Expand all"]'); if (await e.count()) { await e.first().click(); await w(1000); }
}
async function rename(name) {
  await page.locator('[title="Click to rename"]').first().click(); await w(400);
  await page.keyboard.press("Control+A"); await page.keyboard.type(name); await page.keyboard.press("Enter"); await w(1000);
}
async function newMenu(item) { await page.getByRole("button", { name: "New", exact: true }).first().click(); await w(400); await page.getByText(item, { exact: true }).click(); await w(1200); }

async function folder(name) {
  await newMenu("New folder");
  await dlg().locator("input").first().fill(name);
  await dlg().getByRole("button", { name: /^Save$/ }).click(); await w(1500);
}
async function viz({ module, metric, preset, name }) {
  await newMenu("New visualization");
  await page.getByRole("button", { name: /^Next$/ }).click(); await w(2500);
  if (module) { await dlg().getByText(module, { exact: true }).first().click(); await w(800); }
  await dlg().getByText(metric, { exact: true }).first().click();
  await dlg().getByRole("button", { name: /^Next$/ }).click(); await w(6000);
  if (preset) await dlg().getByText(preset, { exact: true }).first().click();
  else { const lines = (await dlg().innerText()).split("\n"); await dlg().getByText(lines[7], { exact: true }).first().click(); }
  await dlg().getByRole("button", { name: /^Insert$/ }).click(); await w(8000);
  await rename(name); await back();
}
async function product(kind, name, folderName, scope) {
  await newMenu(kind);
  const sels = dlg().locator("select");
  await dlg().locator("input").first().fill(name);
  await sels.nth(0).selectOption({ label: folderName });
  if (scope) await sels.nth(2).selectOption({ label: scope });
  await dlg().getByRole("button", { name: /^Create$/ }).click(); await w(7000);
  const apply = page.getByRole("button", { name: /Apply theme/ });
  if (await apply.isVisible().catch(() => false)) { await apply.click(); await w(1500); }
}
async function canvasType(x, y, text) {
  await page.mouse.dblclick(x, y); await w(600);
  await page.keyboard.press("Control+A"); await page.keyboard.type(text);
  await page.keyboard.press("Escape"); await w(800);
}
async function blockToExistingViz(x, y, name) {
  await page.mouse.click(x, y); await w(600);
  await page.mouse.click(x, y, { button: "right" }); await w(700);
  await page.getByText("Change to", { exact: true }).last().hover(); await w(500);
  await page.getByText("Visualization", { exact: true }).last().click(); await w(1200);
  await page.mouse.click(x, y, { button: "right" }); await w(700);
  await page.getByText("Insert existing visualization", { exact: true }).last().click(); await w(2000);
  await dlg().getByText(name, { exact: true }).first().click(); await w(400);
  await dlg().getByRole("button", { name: /Insert a copy/ }).click(); await w(6000);
}
async function share(name, people, general = "Anyone in this instance can view") {
  await page.getByText(name, { exact: true }).first().click({ button: "right" }); await w(600);
  await page.getByText("Manage access…", { exact: true }).click(); await w(1200);
  const d = dlg();
  await d.locator("select").first().selectOption({ label: general });
  for (const [who, lvl] of people) {
    await d.locator('input[placeholder^="Add a person"]').click(); await w(400);
    await page.keyboard.type(who.split(" ")[0]); await w(500);
    await page.locator("[popover]:popover-open").getByText(new RegExp(who)).first().click(); await w(500);
    if (lvl === "Can edit") { const s = d.locator("select"); await s.nth(await s.count() - 1).selectOption({ label: "Can edit" }); }
  }
  await d.getByRole("button", { name: /^Save$/ }).click(); await w(1500);
}

if (PHASE === "all") {
  await home();
  step("folders"); for (const f of ["Quarterly reviews", "Data quality", "Regional briefs"]) await folder(f);
  step("visualizations");
  await viz({ metric: "Indicator value", preset: "Scorecard table", name: "Health sector scorecard" });
  await viz({ metric: "Indicator value", preset: "Indicator values over time (monthly)", name: "Monthly service volumes" });
  await viz({ metric: "Indicator value", preset: "Annual change by Admin Area 2", name: "Annual change by region" });
  await viz({ module: "Data quality assessment", metric: "Proportion of completed records", preset: null, name: "Reporting completeness" });

  step("Q1 deck");
  await q1Deck();
}

async function q1Deck() {
  // A new deck starts with one blank cover slide: fill it, then add content slides.
  await product("New deck", "Q1 2025 service delivery review", "Quarterly reviews");
  await page.locator('[data-tour="deck-slide-card"]').first().click(); await w(2500);
  await canvasType(825, 450, "Q1 2025 service delivery review");
  await canvasType(825, 525, "Quarterly review meeting · April 2025");
  await page.getByRole("button", { name: /Add slide/ }).click(); await w(500);
  await page.getByText("Content slide", { exact: true }).click(); await w(3000);
  await canvasType(380, 201, "Service volumes in every region");
  await page.mouse.click(825, 520, { button: "right" }); await w(700);
  await page.getByText("Split", { exact: true }).last().hover(); await w(500);
  await page.getByText("Into columns", { exact: true }).last().click(); await w(1500);
  await page.mouse.dblclick(540, 480); await w(700);
  for (const [i, line] of ["Outpatient visits up on Q1 2024 in every region", "ANC1 visits highest in Northern", "Western still below the national average"].entries()) {
    await page.keyboard.type(line); if (i < 2) await page.keyboard.press("Enter");
  }
  await page.keyboard.press("Control+A");
  await page.getByRole("button", { name: "Bulleted list" }).click().catch(() => {});
  await page.keyboard.press("Escape"); await w(1000);
  await blockToExistingViz(1120, 480, "Monthly service volumes");
  await page.getByRole("button", { name: /Add slide/ }).click(); await w(500);
  await page.getByText("Content slide", { exact: true }).click(); await w(2500);
  await canvasType(380, 201, "Reporting completeness is above 85% in most areas");
  await blockToExistingViz(825, 520, "Reporting completeness");
  await back();
}

if (PHASE === "all") {
  step("other products");
  await product("New report", "Annual data quality report 2024", "Data quality"); await back();
  await product("New deck", "Northern region quarterly brief", "Regional briefs", "Northern region"); await back();
  await product("New report", "Maternal and newborn health update", "General", "Maternal and newborn health"); await back();
  await product("New deck", "Immunization programme review", "Quarterly reviews"); await back();

  step("report content");
  await expandAll();
  await page.getByText("Annual data quality report 2024", { exact: true }).first().click(); await w(8000);
  const apply = page.getByRole("button", { name: /Apply theme/ }); if (await apply.isVisible().catch(() => false)) { await apply.click(); await w(1500); }
  await page.locator(".cm-content").first().click(); await page.keyboard.press("Control+End");
  const t = (s) => page.keyboard.type(s, { delay: 2 }); const enter = (n = 1) => { for (let i = 0; i < n; i++) page.keyboard.press("Enter"); };
  await page.keyboard.press("Enter"); await page.keyboard.press("Enter");
  await t("This report reviews the completeness and consistency of routine health data reported through the HMIS between May 2024 and April 2025. It is intended for regional health management teams and the national HMIS unit.");
  await page.keyboard.press("Enter"); await page.keyboard.press("Enter");
  await t("## Key findings"); await page.keyboard.press("Enter"); await page.keyboard.press("Enter");
  await t("- Reporting completeness was above 85% for most indicators in five of six regions."); await page.keyboard.press("Enter");
  await t("Postnatal care for newborns has the lowest completeness, especially in Southern and Eastern."); await page.keyboard.press("Enter");
  await t("Highlands and Western reported most consistently across all indicators."); await page.keyboard.press("Enter"); await page.keyboard.press("Enter");
  await t("## Completeness by region"); await page.keyboard.press("Enter"); await page.keyboard.press("Enter");
  await t("The table below shows the percentage of facility-months with complete data for each indicator over the last 12 months. Cells are coloured green at 90% or above and red below 80%.");
  await page.keyboard.press("Enter"); await page.keyboard.press("Enter"); await w(800);
  await page.getByRole("button", { name: /^Figures$/ }).click(); await w(500);
  await page.getByText("Existing visualization…", { exact: true }).click(); await w(2000);
  await dlg().getByText("Reporting completeness", { exact: true }).first().click(); await w(400);
  await dlg().getByRole("button", { name: /Insert a copy/ }).click(); await w(7000);
  await page.keyboard.press("Control+End"); await page.keyboard.press("Enter");
  await t("## Recommendations"); await page.keyboard.press("Enter"); await page.keyboard.press("Enter");
  await t("Regional teams should follow up with facilities that have not reported postnatal care in the last three months, starting with Southern region.");
  await w(3000); await back();

  step("sharing");
  await expandAll();
  await share("Q1 2025 service delivery review", [["Amina Diallo", "Can edit"], ["Joseph Mensah", "Can view"]]);
  await share("Immunization programme review", []);
  await share("Annual data quality report 2024", [["Daniel Osei", "Can edit"]]);
  for (const v of ["Health sector scorecard", "Monthly service volumes", "Reporting completeness", "Annual change by region"]) await share(v, []);
  await share("Northern region quarterly brief", [["Grace Kamara", "Can edit"]], "Restricted");
}

if (PHASE === "q1") {
  await home(); step("Q1 deck"); await q1Deck();
  await expandAll(); await share("Q1 2025 service delivery review", [["Amina Diallo", "Can edit"], ["Joseph Mensah", "Can view"]]);
}

if (PHASE === "edit") {
  // A second editing session on the Q1 deck, so its version history has edited slides.
  await home(); await expandAll();
  await page.getByText("Q1 2025 service delivery review", { exact: true }).first().click(); await w(8000);
  await page.locator('[data-tour="deck-slide-card"]').nth(1).click(); await w(2500);
  await canvasType(380, 201, "Service volumes rose in every region in Q1");
  await page.locator('[data-tour="deck-slide-card"]').nth(2).click(); await w(2500);
  await canvasType(380, 201, "Reporting completeness is above 85% in most regions");
  await back();
}
console.log("done", PHASE);
await browser.close();
