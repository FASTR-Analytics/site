#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run
/**
 * sync-methodology.ts — vendors FASTR methodology docs from
 * fastr-resource-hub into this repo. Run with `pnpm sync:methodology`.
 *
 * Source:   github.com/FASTR-Analytics/fastr-resource-hub/methodology/
 * Target:   src/content/docs/methodology/        (EN)
 *           src/content/docs/fr/methodology/     (FR)
 *           public/methodology/resources/        (images)
 *
 * Rules — intentionally simple so upstream changes propagate cleanly:
 *   • Every top-level .md  → EN docs
 *   • Every fr/*.md        → FR docs
 *   • All of resources/    → public image dir
 *   • Anything else (mkdocs.yml, *.bib, javascripts/, overrides/,
 *     plugins/, stylesheets/) is ignored.
 *
 * Vendored files are committed. Do NOT edit them by hand — fix upstream
 * and re-run this script. Local edits will be overwritten on next sync.
 */

import { copy } from "jsr:@std/fs/copy";
import { walk } from "jsr:@std/fs/walk";
import { join } from "jsr:@std/path";

const REPO = "FASTR-Analytics/fastr-resource-hub";
const SRC = "methodology";
const EN_DST = "src/content/docs/methodology";
const FR_DST = "src/content/docs/fr/methodology";
const ASSETS_DST = "public/methodology/resources";

// --- Normalisation -------------------------------------------------------
// Transforms applied to every .md file. Anything more elaborate should be
// fixed upstream in fastr-resource-hub — keep this list small.

const KRAMDOWN_ATTRS = /\{:\s*[^}]*\}/g;
const MD_RESOURCE_LINK = /\]\((?:\.\.\/)*resources\//g;
const HTML_RESOURCE_ATTR = /((?:src|href)\s*=\s*["'])(?:\.\.\/)*resources\//g;
const INTERNAL_MD_LINK = /\]\(([^)/][^)]*?)\.md(#[^)]*)?\)/g;

function normalise(text: string): string {
  let out = text
    .replace(KRAMDOWN_ATTRS, "")
    .replace(MD_RESOURCE_LINK, "](/methodology/resources/")
    .replace(HTML_RESOURCE_ATTR, "$1/methodology/resources/")
    .replace(INTERNAL_MD_LINK, "]($1$2)");

  // Already has frontmatter — leave alone.
  if (out.trimStart().startsWith("---")) return out;

  // Pull the first H1 out of the body and promote it to `title:`. Starlight
  // renders the frontmatter title as the page H1; keeping it in the body
  // would produce a duplicate heading.
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

async function copyMarkdownFlat(src: string, dst: string): Promise<void> {
  try {
    for await (const e of Deno.readDir(src)) {
      if (e.isFile && e.name.endsWith(".md")) {
        await Deno.copyFile(join(src, e.name), join(dst, e.name));
      }
    }
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) throw e;
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
    await git("-C", join(tmp, "repo"), "sparse-checkout", "set", SRC);

    console.log("→ Resetting destinations…");
    for (const d of [EN_DST, FR_DST]) {
      await rmrf(d);
      await Deno.mkdir(d, { recursive: true });
    }
    await rmrf(ASSETS_DST);
    await Deno.mkdir(join(ASSETS_DST, ".."), { recursive: true });

    console.log("→ Copying English markdown…");
    await copyMarkdownFlat(join(tmp, "repo", SRC), EN_DST);

    console.log("→ Copying French markdown…");
    await copyMarkdownFlat(join(tmp, "repo", SRC, "fr"), FR_DST);

    console.log("→ Copying image resources…");
    const resSrc = join(tmp, "repo", SRC, "resources");
    try {
      await copy(resSrc, ASSETS_DST);
    } catch (e) {
      if (!(e instanceof Deno.errors.NotFound)) throw e;
    }

    console.log("→ Normalising for Starlight…");
    for (const dst of [EN_DST, FR_DST]) {
      for await (const f of walk(dst, { exts: [".md"], maxDepth: 1 })) {
        if (f.isFile) {
          await Deno.writeTextFile(f.path, normalise(await Deno.readTextFile(f.path)));
        }
      }
    }

    console.log("✓ Done. Review with 'git status' and commit when satisfied.");
  } finally {
    await rmrf(tmp);
  }
}

await main();
