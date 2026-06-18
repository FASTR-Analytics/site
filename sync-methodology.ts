#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run
/**
 * sync-methodology.ts — vendors FASTR methodology docs from
 * fastr-resource-hub into this repo. Run with `pnpm sync:methodology`.
 *
 * Source:   github.com/FASTR-Analytics/fastr-resource-hub
 *             methodology/      — chapter markdown + references.bib
 *             resources/        — images (methodology/resources is a symlink)
 *
 * Target:   src/content/docs/methodology/        (EN)
 *           src/content/docs/fr/methodology/     (FR)
 *           public/methodology/resources/        (images)
 *
 * Rules — intentionally simple so upstream changes propagate cleanly:
 *   • Every top-level .md in methodology/  → EN docs
 *   • Every fr/*.md                        → FR docs
 *   • All of resources/ (repo root)        → public image dir
 *   • Files in SKIP_FILES are never copied (covered elsewhere on site)
 *   • Files in PRESERVE_FILES survive the dest wipe (site-maintained copy)
 *   • Citations [@key] are resolved against references.bib and a
 *     "References" section is appended to chapters that use them
 *
 * Vendored files are committed. Do NOT edit them by hand — fix upstream
 * and re-run this script. Local edits will be overwritten on next sync.
 */

import { copy } from "jsr:@std/fs/copy";
import { walk } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path";

const REPO = "FASTR-Analytics/fastr-resource-hub";
const METHODOLOGY_SRC = "methodology";
const RESOURCES_SRC = "resources";
const EN_DST = "src/content/docs/methodology";
const FR_DST = "src/content/docs/fr/methodology";
const ASSETS_DST = "public/methodology/resources";

// Covered by user-guide / admin-guide / overview sections on the site,
// or otherwise not wanted in the vendored methodology tree.
const SKIP_FILES = new Set([
  "03_fastr_analytics_platform.md",
  "03b_ai_assistant.md",
  "11_user_guide.md",
  "EDITING.md",
  "index.md",
  "disclaimer.md",
  "README.md",
]);

// Files that the site repo owns and the sync must leave alone.
const PRESERVE_FILES = new Set([
  "disclaimer.md",
]);

// --- BibTeX parsing ------------------------------------------------------

type Author = { display: string; surname: string };

type BibEntry = {
  key: string;
  authors: Author[]; // "others" sentinel: surname === "others"
  year: string;
  title: string;
  journal?: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  url?: string;
  institution?: string;
  address?: string;
};

type BibMap = Map<string, BibEntry>;

function stripBibBraces(s: string): string {
  return s.replace(/[{}]/g, "").trim();
}

function parseAuthors(raw: string): Author[] {
  return raw
    .split(/\s+and\s+/)
    .map((a) => a.trim())
    .filter(Boolean)
    .map((a): Author => {
      if (a.toLowerCase() === "others") {
        return { display: "et al.", surname: "others" };
      }
      // Brace-wrapped institutional author, e.g. {World Health Organization}.
      const brace = a.match(/^\{(.+)\}$/);
      if (brace) {
        const full = stripBibBraces(brace[1]);
        return { display: full, surname: full };
      }
      const cleaned = stripBibBraces(a);
      const comma = cleaned.indexOf(",");
      if (comma !== -1) {
        return { display: cleaned, surname: cleaned.slice(0, comma).trim() };
      }
      const parts = cleaned.split(/\s+/);
      return { display: cleaned, surname: parts[parts.length - 1] };
    });
}

function parseBib(text: string): BibMap {
  const map: BibMap = new Map();
  const entryRe = /@(\w+)\s*\{\s*([^,\s]+)\s*,([\s\S]*?)\n\}/g;
  for (const m of text.matchAll(entryRe)) {
    const key = m[2];
    const body = m[3];
    const fields: Record<string, string> = {};
    const fieldRe = /(\w+)\s*=\s*(\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}|"([^"]*)")/g;
    for (const f of body.matchAll(fieldRe)) {
      const name = f[1].toLowerCase();
      const raw = f[3] ?? f[4] ?? "";
      // Preserve braces on author so corporate-author wrappers {{...}} survive
      // for parseAuthors to detect.
      fields[name] = name === "author" ? raw : stripBibBraces(raw);
    }
    map.set(key, {
      key,
      authors: parseAuthors(fields.author ?? ""),
      year: fields.year ?? "n.d.",
      title: fields.title ?? "",
      journal: fields.journal,
      volume: fields.volume,
      number: fields.number,
      pages: fields.pages,
      doi: fields.doi,
      url: fields.url,
      institution: fields.institution,
      address: fields.address,
    });
  }
  return map;
}

function formatInlineAuthors(authors: Author[]): string {
  const real = authors.filter((a) => a.surname !== "others");
  const hasOthers = authors.some((a) => a.surname === "others");
  if (real.length === 0) return "Anon.";
  if (hasOthers || real.length >= 3) return `${real[0].surname} et al.`;
  if (real.length === 2) return `${real[0].surname} & ${real[1].surname}`;
  return real[0].surname;
}

function formatBibEntry(e: BibEntry): string {
  // APA-ish, single line.
  const names = e.authors.map((a) => a.display);
  let auth: string;
  if (names.length === 0) auth = "Anon.";
  else if (names.length === 1) auth = names[0];
  else {
    const last = names[names.length - 1];
    const head = names.slice(0, -1).join(", ");
    auth = last === "et al." ? `${head}, et al.` : `${head}, & ${last}`;
  }
  const parts: string[] = [];
  parts.push(`${auth} (${e.year}). ${e.title}.`);
  if (e.journal) {
    let j = `*${e.journal}*`;
    if (e.volume) j += `, ${e.volume}`;
    if (e.number) j += `(${e.number})`;
    if (e.pages) j += `, ${e.pages.replace(/--/g, "–")}`;
    parts.push(j + ".");
  } else if (e.institution) {
    let i = `*${e.institution}*`;
    if (e.address) i += `, ${e.address}`;
    parts.push(i + ".");
  }
  if (e.doi) parts.push(`doi:${e.doi}`);
  else if (e.url) parts.push(e.url);
  return parts.join(" ");
}

// --- Normalisation -------------------------------------------------------

const KRAMDOWN_ATTRS = /\{:\s*[^}]*\}/g;
const MD_RESOURCE_LINK = /\]\((?:\.\.\/)*resources\//g;
const HTML_RESOURCE_ATTR = /((?:src|href)\s*=\s*["'])(?:\.\.\/)*resources\//g;
const INTERNAL_MD_LINK = /\]\(([^)/][^)]*?)\.md(#[^)]*)?\)/g;
const SLIDE_BLOCK = /<!--\s*SLIDE:[^>]*-->[\s\S]*?<!--\s*\/SLIDE\s*-->\n?/g;
const CITE_GROUP = /\[(@[a-zA-Z0-9_:-]+(?:\s*;\s*@[a-zA-Z0-9_:-]+)*)\]/g;
// Pandoc placeholder section the upstream chapters end with — we replace it
// with the inline-resolved References section.
const BIB_PLACEHOLDER = /##\s+(?:References|Références)\s*\n+\\full_bibliography\s*\n+(?:---\s*\n+)?/g;
// Lonely horizontal rule left dangling after SLIDE blocks are stripped.
const TRAILING_HR = /\n---\s*(?:\n\s*)*$/;

function convertCollapsibles(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^(\?\?\?\+?)\s+(?:"([^"]+)"|(.+?))\s*$/);
    if (!m) {
      out.push(lines[i]);
      i++;
      continue;
    }
    const open = m[1] === "???+";
    const title = (m[2] ?? m[3] ?? "").trim();
    i++;
    const body: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l === "" || /^\s*$/.test(l)) {
        body.push("");
        i++;
        continue;
      }
      if (/^( {4}|\t)/.test(l)) {
        body.push(l.replace(/^( {4}|\t)/, ""));
        i++;
        continue;
      }
      break;
    }
    while (body.length && body[body.length - 1] === "") body.pop();
    out.push(`<details${open ? " open" : ""}>`);
    out.push(`<summary>${title}</summary>`);
    out.push("");
    out.push(...body);
    out.push("");
    out.push("</details>");
    out.push("");
  }
  return out.join("\n");
}

function resolveCitations(
  text: string,
  bib: BibMap,
  lang: "en" | "fr",
): string {
  const used = new Set<string>();
  const replaced = text.replace(CITE_GROUP, (match, group: string) => {
    const keys = group.split(";").map((s) => s.trim().replace(/^@/, ""));
    const formatted = keys.map((k) => {
      const e = bib.get(k);
      if (!e) return `@${k}`;
      used.add(k);
      return `${formatInlineAuthors(e.authors)}, ${e.year}`;
    });
    if (formatted.every((f, idx) => f === `@${keys[idx]}`)) return match;
    return `(${formatted.join("; ")})`;
  });
  if (used.size === 0) return replaced;
  const heading = lang === "fr" ? "Références" : "References";
  const items = [...used]
    .map((k) => bib.get(k)!)
    .sort((a, b) => (a.authors[0]?.surname ?? "").localeCompare(b.authors[0]?.surname ?? ""))
    .map((e) => `- ${formatBibEntry(e)}`)
    .join("\n");
  return `${replaced.trimEnd()}\n\n## ${heading}\n\n${items}\n`;
}

function normalise(
  text: string,
  ctx: { bib: BibMap; lang: "en" | "fr" },
): string {
  let out = text
    .replace(SLIDE_BLOCK, "")
    .replace(BIB_PLACEHOLDER, "")
    .replace(KRAMDOWN_ATTRS, "")
    .replace(MD_RESOURCE_LINK, "](/methodology/resources/")
    .replace(HTML_RESOURCE_ATTR, "$1/methodology/resources/")
    .replace(INTERNAL_MD_LINK, "]($1$2)")
    .replace(TRAILING_HR, "\n");

  out = convertCollapsibles(out);
  out = resolveCitations(out, ctx.bib, ctx.lang);

  if (out.trimStart().startsWith("---")) return out;

  const h1 = out.match(/^#\s+(.+)$/m);
  let title = "Untitled";
  if (h1?.index !== undefined) {
    title = h1[1]
      .trim()
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/"/g, "'");
    out = (out.slice(0, h1.index) + out.slice(h1.index + h1[0].length)).replace(/^\n+/, "");
  }
  return `---\ntitle: "${title}"\n---\n\n${out}`;
}

// --- Pipeline ------------------------------------------------------------

async function git(...args: string[]): Promise<void> {
  const { success, code } = await new Deno.Command("git", {
    args,
    stderr: "inherit",
  }).output();
  if (!success) throw new Error(`git ${args.join(" ")} exited ${code}`);
}

async function rmrf(path: string): Promise<void> {
  await Deno.remove(path, { recursive: true }).catch(() => {});
}

async function cleanMarkdown(dir: string): Promise<void> {
  try {
    for await (const e of Deno.readDir(dir)) {
      if (e.isFile && e.name.endsWith(".md") && !PRESERVE_FILES.has(e.name)) {
        await Deno.remove(join(dir, e.name));
      }
    }
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) throw e;
  }
}

async function copyMarkdownFlat(src: string, dst: string): Promise<void> {
  try {
    for await (const e of Deno.readDir(src)) {
      if (e.isFile && e.name.endsWith(".md") && !SKIP_FILES.has(e.name)) {
        await Deno.copyFile(join(src, e.name), join(dst, e.name));
      }
    }
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) throw e;
  }
}

async function readBib(path: string): Promise<BibMap> {
  try {
    return parseBib(await Deno.readTextFile(path));
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) return new Map();
    throw e;
  }
}

async function main(): Promise<void> {
  const tmp = await Deno.makeTempDir();
  try {
    console.log(`→ Cloning ${REPO}…`);
    await git(
      "clone",
      "--quiet",
      "--depth", "1",
      "--filter=blob:none",
      "--sparse",
      `https://github.com/${REPO}.git`,
      join(tmp, "repo"),
    );
    await git(
      "-C", join(tmp, "repo"),
      "sparse-checkout", "set",
      METHODOLOGY_SRC, RESOURCES_SRC,
    );

    console.log("→ Cleaning destinations (preserving site-owned files)…");
    for (const d of [EN_DST, FR_DST]) {
      await Deno.mkdir(d, { recursive: true });
      await cleanMarkdown(d);
    }
    await rmrf(ASSETS_DST);
    await Deno.mkdir(join(ASSETS_DST, ".."), { recursive: true });

    console.log("→ Copying English markdown…");
    await copyMarkdownFlat(join(tmp, "repo", METHODOLOGY_SRC), EN_DST);

    console.log("→ Copying French markdown…");
    await copyMarkdownFlat(join(tmp, "repo", METHODOLOGY_SRC, "fr"), FR_DST);

    console.log("→ Copying image resources…");
    const resSrc = join(tmp, "repo", RESOURCES_SRC);
    try {
      await copy(resSrc, ASSETS_DST);
    } catch (e) {
      if (!(e instanceof Deno.errors.NotFound)) throw e;
    }

    console.log("→ Loading references.bib…");
    const bib = await readBib(join(tmp, "repo", METHODOLOGY_SRC, "references.bib"));

    console.log("→ Normalising for Starlight…");
    for (const [dst, lang] of [[EN_DST, "en"], [FR_DST, "fr"]] as const) {
      for await (const f of walk(dst, { exts: [".md"], maxDepth: 1 })) {
        if (!f.isFile || PRESERVE_FILES.has(f.name)) continue;
        await Deno.writeTextFile(
          f.path,
          normalise(await Deno.readTextFile(f.path), { bib, lang }),
        );
      }
    }

    // Bumping this marker tells scripts/build.mjs to wipe the Astro content
    // cache before the next build, so deleted methodology pages don't linger
    // (see Astro #9061 / #12761). Commit alongside the methodology changes.
    console.log("→ Bumping cache-bust marker…");
    await Deno.writeTextFile(".methodology-sync-id", `${crypto.randomUUID()}\n`);

    console.log("✓ Done. Review with 'git status' and commit when satisfied.");
  } finally {
    await rmrf(tmp);
  }
}

await main();
