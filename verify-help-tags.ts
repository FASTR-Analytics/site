#!/usr/bin/env -S deno run --allow-read
/**
 * verify-help-tags.ts — checks the `<!-- help#id -->` tags in this site are
 * valid, before a platform developer regenerates the app's lookup table with
 * `deno task build:help-buttons` (in the wb-fastr repo). Run with
 * `pnpm verify:help-tags`. See DOC_HELP_BUTTONS.md.
 *
 * Reports every problem at once (not just the first), and exits non-zero if any:
 *
 *   • each tag is well-formed — only `<!-- help#id -->`, nothing inside it;
 *   • each tag sits under a heading (that heading is its anchor);
 *   • each id appears EXACTLY TWICE — once in English, once in French, on the
 *     same page.
 *
 * It also lists every untagged H1/H2 — sections that could have a help button
 * but don't (informational; does not fail the check).
 */

import { walk } from "jsr:@std/fs/walk";
import { relative } from "jsr:@std/path";

const DOCS = "src/content/docs";

type Heading = { level: number; text: string; line: number; tagged: boolean };
type Tag = { id: string; line: number };
type Occurrence = { slug: string; lang: "en" | "fr"; file: string; line: number };

function stripFrontmatter(s: string): string {
  if (!s.startsWith("---")) return s;
  const end = s.indexOf("\n---", 3);
  if (end === -1) return s;
  const after = s.indexOf("\n", end + 1);
  return after === -1 ? "" : s.slice(after + 1);
}

function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .trim();
}

/** Parse a file's headings + help tags, fence-aware. Binds each tag to the
 *  nearest heading above it and collects per-file problems into `issues`. */
function parseDoc(content: string, file: string, issues: string[]): { headings: Heading[]; tags: Tag[] } {
  const lines = stripFrontmatter(content).split("\n");
  const headings: Heading[] = [];
  const tags: Tag[] = [];
  let inFence = false;
  let fenceChar = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      const ch = fence[1][0];
      if (!inFence) (inFence = true), (fenceChar = ch);
      else if (ch === fenceChar) inFence = false;
      continue;
    }
    if (inFence) continue;

    const commentStart = line.indexOf("<!--");
    if (commentStart !== -1) {
      let end = i;
      let raw = line.slice(commentStart);
      while (!raw.includes("-->") && end + 1 < lines.length) raw += "\n" + lines[++end];
      const inner = raw.slice(4, raw.indexOf("-->")).trim();
      if (/^help#/.test(inner) || inner === "help") {
        const m = inner.match(/^help#([a-z0-9][a-z0-9-]*)$/);
        if (!m) {
          issues.push(`${file}:${i + 1}  malformed tag — only "<!-- help#id -->" is allowed, got "<!-- ${inner} -->"`);
        } else {
          const heading = headings.at(-1);
          if (!heading) issues.push(`${file}:${i + 1}  help#${m[1]} is not under a heading`);
          else heading.tagged = true;
          tags.push({ id: m[1], line: i + 1 });
        }
      }
      i = end;
      continue;
    }

    const h = line.match(/^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/);
    if (h) headings.push({ level: h[1].length, text: stripInline(h[2]), line: i + 1, tagged: false });
  }

  return { headings, tags };
}

function pageSlug(rel: string): string {
  return rel
    .replace(/\\/g, "/")
    .replace(/^fr\//, "")
    .replace(/\.md$/, "")
    .replace(/\/index$/, "")
    .replace(/^index$/, "");
}

async function main() {
  const issues: string[] = [];
  const byId = new Map<string, Occurrence[]>();
  const untagged = new Map<string, Heading[]>(); // EN file → untagged H1/H2

  for await (const entry of walk(DOCS, { exts: [".md"], includeDirs: false })) {
    const rel = relative(DOCS, entry.path).replaceAll("\\", "/");
    const lang: "en" | "fr" = rel.startsWith("fr/") ? "fr" : "en";
    const slug = pageSlug(rel);

    const { headings, tags } = parseDoc(await Deno.readTextFile(entry.path), entry.path, issues);

    for (const t of tags) {
      const occ = byId.get(t.id) ?? byId.set(t.id, []).get(t.id)!;
      occ.push({ slug, lang, file: entry.path, line: t.line });
    }

    if (lang === "en") {
      const gaps = headings.filter((hd) => hd.level <= 2 && !hd.tagged);
      if (gaps.length > 0) untagged.set(entry.path, gaps);
    }
  }

  // Each id must appear exactly twice: once EN, once FR, on the same page.
  for (const [id, occ] of byId) {
    const where = occ.map((o) => `${o.file}:${o.line}`).join(", ");
    if (occ.length !== 2) {
      issues.push(`help#${id} appears ${occ.length} time(s) — must be exactly twice (once EN, once FR). At: ${where}`);
      continue;
    }
    if (new Set(occ.map((o) => o.slug)).size !== 1) {
      issues.push(`help#${id} is on different pages (${[...new Set(occ.map((o) => o.slug))].join(", ")}) — both must be the same page. At: ${where}`);
    } else if (occ.map((o) => o.lang).sort().join("+") !== "en+fr") {
      issues.push(`help#${id} must be once in English and once in French. At: ${where}`);
    }
  }

  if (issues.length > 0) {
    console.error(`✗ ${issues.length} problem${issues.length === 1 ? "" : "s"} with help tags:\n`);
    for (const issue of issues.sort()) console.error(`  • ${issue}`);
  } else {
    console.log(`✓ ${byId.size} help target${byId.size === 1 ? "" : "s"}, all valid.`);
  }

  if (untagged.size > 0) {
    console.log(`\nUntagged H1/H2 (candidates for a help button):`);
    for (const file of [...untagged.keys()].sort()) {
      console.log(`\n  ${file}`);
      for (const h of untagged.get(file)!) console.log(`    H${h.level}  ${h.text}`);
    }
    console.log("");
  }

  Deno.exit(issues.length > 0 ? 1 : 0);
}

await main();
