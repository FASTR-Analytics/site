#!/usr/bin/env node
// Wraps `astro build` with a content-cache invalidation step.
//
// Astro's content layer cache lives in node_modules/.astro/. Netlify caches
// node_modules between builds, which is great for normal commits but causes
// deleted pages to keep being generated until the cache is manually cleared
// (see Astro issues #9061 and #12761).
//
// The cache key has two parts: the methodology sync marker (sync-methodology.ts
// writes a fresh UUID to .methodology-sync-id every run, committed alongside the
// methodology changes) and the sorted list of files under src/content/docs/, so
// adding, deleting or renaming any docs page also invalidates the cache. We
// compare the key against the value stashed in the Astro cache last time we
// built. If it changed, the cache may hold pages that no longer exist and we
// wipe it before building.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const MARKER_SRC = ".methodology-sync-id";
const DOCS_DIR = "src/content/docs";
const ASTRO_CACHE = "node_modules/.astro";
const MARKER_CACHED = `${ASTRO_CACHE}/.last-sync-id`;

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8").trim() : "");

const docFiles = existsSync(DOCS_DIR)
  ? readdirSync(DOCS_DIR, { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => `${d.parentPath ?? d.path}/${d.name}`)
    .sort()
  : [];
const docsHash = createHash("sha256").update(docFiles.join("\n")).digest("hex").slice(0, 16);

const current = `${read(MARKER_SRC)}:${docsHash}`;
const cached = read(MARKER_CACHED);

if (current !== cached) {
  console.log(`Content cache key changed (${cached || "none"} → ${current}); clearing Astro cache.`);
  rmSync(ASTRO_CACHE, { recursive: true, force: true });
  mkdirSync(ASTRO_CACHE, { recursive: true });
  writeFileSync(MARKER_CACHED, current);
}

const result = spawnSync("astro", ["build"], { stdio: "inherit", shell: true });
process.exit(result.status ?? 1);
