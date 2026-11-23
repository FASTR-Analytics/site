#!/usr/bin/env node
// Builds out/labels.json, the English -> French UI label map capture.mjs uses to
// click the French interface. It reads every inline t3({ en, fr }) pair in the
// platform source.   node labels.mjs <platform-dir>
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const dir = resolve(process.argv[2] ?? "");
const roots = ["client/src", "report-forge", "lib", "panther"].map((r) => join(dir, r));
const map = {};
function walk(d) {
  let names; try { names = readdirSync(d); } catch { return; }
  for (const n of names) {
    if (n === "node_modules" || n.startsWith(".")) continue;
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(n)) {
      const s = readFileSync(p, "utf8");
      for (const re of [/en:\s*"((?:[^"\\]|\\.)*)",\s*fr:\s*"((?:[^"\\]|\\.)*)"/g, /en:\s*`([^`$]*)`,\s*fr:\s*`([^`$]*)`/g]) {
        let m; while ((m = re.exec(s))) if (!(m[1] in map)) map[m[1]] = m[2];
      }
    }
  }
}
roots.forEach(walk);
const here = new URL(".", import.meta.url).pathname;
mkdirSync(join(here, "out"), { recursive: true });
writeFileSync(join(here, "out/labels.json"), JSON.stringify(map));
console.log(`labels.json: ${Object.keys(map).length} labels`);
