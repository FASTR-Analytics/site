#!/usr/bin/env node
// Wraps `astro build` with a content-cache invalidation step.
//
// Astro's content layer cache lives in node_modules/.astro/. Netlify caches
// node_modules between builds, which is great for normal commits but causes
// deleted methodology pages to keep being generated until the cache is
// manually cleared (see Astro issues #9061 and #12761).
//
// sync-methodology.ts writes a fresh UUID to .methodology-sync-id every run,
// which is committed alongside the methodology changes. Here we compare the
// committed marker against the value stashed in the Astro cache last time we
// built. If it changed, the cache is stale relative to the latest sync and
// we wipe it before building.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const MARKER_SRC = ".methodology-sync-id";
const ASTRO_CACHE = "node_modules/.astro";
const MARKER_CACHED = `${ASTRO_CACHE}/.last-sync-id`;

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8").trim() : "");

const current = read(MARKER_SRC);
const cached = read(MARKER_CACHED);

if (current && current !== cached) {
  console.log(`Methodology sync marker changed (${cached || "none"} → ${current}); clearing Astro cache.`);
  rmSync(ASTRO_CACHE, { recursive: true, force: true });
  mkdirSync(ASTRO_CACHE, { recursive: true });
  writeFileSync(MARKER_CACHED, current);
}

const result = spawnSync("astro", ["build"], { stdio: "inherit", shell: true });
process.exit(result.status ?? 1);
