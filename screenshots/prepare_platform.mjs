#!/usr/bin/env node
// Puts a platform checkout into screenshot mode. Run once on a fresh checkout
// (a CI clone or a `git archive` of platform main), never on a working copy.
//
//   node prepare_platform.mjs <platform-dir>
//
// It writes the server .env and the client .env.development.local for persona
// sign-in (no Clerk), and patches four things that only matter here:
//   1. the dev server address and the Vite port (so it can run beside a normal dev instance),
//   2. a Vite proxy for /ai, and the AI client calling it same-origin, so the
//      persona cookie reaches the AI proxy (cross-port requests carry no cookie),
//   3. guided tours never start (persona mode has nowhere to remember them).
// Every patch checks its anchor and fails loudly if the platform code moved.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { CONFIG } from "./config.mjs";

const dir = resolve(process.argv[2] ?? "");
if (!existsSync(join(dir, "main.ts"))) {
  console.error(`Not a platform checkout: ${dir}`);
  process.exit(1);
}
const { serverPort, clientPort, pgPort, valkeyPort, pgPassword, dataDir } = CONFIG;

function patch(rel, fn, label, applied) {
  const p = join(dir, rel);
  const before = readFileSync(p, "utf8");
  if (before.includes(applied)) { console.log(`already patched: ${label}`); return; }
  const after = fn(before);
  if (after === before) throw new Error(`Patch "${label}" found no anchor in ${rel}: the platform code changed; update prepare_platform.mjs`);
  writeFileSync(p, after);
  console.log(`patched ${label}`);
}

patch("client/src/server_actions/index.ts",
  (s) => s.replace(/"http:\/\/localhost:\d+"/, `"http://localhost:${serverPort}"`), "dev server address", `"http://localhost:${serverPort}"`);

patch("client/vite.config.ts",
  (s) => s.replace(/port: \d+,/, `port: ${clientPort},\n    proxy: { "/ai": { target: "http://localhost:${serverPort}", changeOrigin: true } },`), "vite port and /ai proxy", `proxy: { "/ai"`);

patch("client/src/components/_shared/ai_proxy_client.ts",
  (s) => s.replace(/const baseURL = _SERVER_HOST\s*\?\s*`\$\{_SERVER_HOST\}\/ai`\s*:\s*`\$\{window\.location\.origin\}\/ai`;/,
    "const baseURL = `${window.location.origin}/ai`; // screenshot mode: same-origin via the Vite proxy"), "AI client same-origin", "screenshot mode: same-origin");

patch("client/src/onboarding/index.ts", (s) => {
  const start = s.indexOf("const pages: Record<string, () => boolean> = {");
  if (start < 0) return s;
  const end = s.indexOf("\n  };", start);
  if (end < 0) return s;
  return s.slice(0, end + 5) + "\n  for (const k of Object.keys(pages)) pages[k] = () => false; // screenshot mode: no tours" + s.slice(end + 5);
}, "tours off", "screenshot mode: no tours");

// server/auth/h_users.ts is git-ignored (operator emails), so a clean checkout
// lacks it. An empty stub is enough here: no operators, no feedback recipients.
const hUsers = join(dir, "server/auth/h_users.ts");
if (!existsSync(hUsers)) {
  writeFileSync(hUsers, [
    "export const H_USERS: string[] = [];",
    "export const _FEEDBACK_EMAIL_RECIPIENTS: string[] = [];",
    "export const _FEEDBACK_PLAN_RECIPIENTS: { email: string; name: string }[] = [];",
    "export const _DEV_USERS: string[] = [];",
    "",
  ].join("\n"));
  console.log("wrote stub server/auth/h_users.ts");
}

const version = readFileSync(join(dir, "VERSION"), "utf8").trim();
const data = resolve(dir, dataDir);
for (const d of ["runs", "assets", "modules"]) mkdirSync(join(data, d), { recursive: true });

writeFileSync(join(dir, ".env"), [
  `PORT=${serverPort}`,
  `CLIENT_ORIGIN=http://localhost:${clientPort},http://127.0.0.1:${clientPort}`,
  `RUNS_DIR_PATH=${join(data, "runs")}`,
  `RUNS_DIR_PATH_EXTERNAL=${join(data, "runs")}`,
  `RUNS_DIR_PATH_POSTGRES_INTERNAL=/app/runs`,
  `ASSETS_DIR_PATH=${join(data, "assets")}`,
  // Module definitions: the generate wizard reads them. SHOTS_MODULES_DIR points at a
  // checkout of FASTR-Analytics/modules (public); without it that one screen shows an error.
  `FASTR_MODULES_LOCAL_DIR=${process.env.SHOTS_MODULES_DIR ? resolve(process.env.SHOTS_MODULES_DIR) : join(data, "modules")}`,
  `BYPASS_AUTH=`,
  `PERSONA_AUTH=1`,
  `INSTANCE_NAME="Demo"`,
  `INSTANCE_ID=demo`,
  `INSTANCE_LANGUAGE=en`,
  `INSTANCE_CALENDAR=gregorian`,
  `ISO_COUNTRY_CODE=SLE`,
  `PG_HOST=localhost`,
  `PG_PORT=${pgPort}`,
  `PG_PASSWORD=${pgPassword}`,
  `VALKEY_URL=redis://localhost:${valkeyPort}`,
  `ANTHROPIC_API_URL=https://api.anthropic.com/v1/messages`,
  `ANTHROPIC_API_KEY=${process.env.ANTHROPIC_API_KEY || "not-set"}`,
  `STATUS_API_KEY=screenshots`,
  `SEND_GRID_API=not-set`,
  `SERVER_VERSION=${version}`,
  `DATABASE_FOLDER=screenshots`,
  "",
].join("\n"));
// Clerk's client library throws at startup without a publishable key, even though
// persona mode never contacts Clerk; a well-formed dummy key is enough.
const dummyClerkKey = "pk_test_" + Buffer.from("example.clerk.accounts.dev$").toString("base64");
writeFileSync(join(dir, "client/.env.development.local"), `VITE_BYPASS_AUTH=false\nVITE_PERSONA_AUTH=true\nVITE_CLERK_PUBLISHABLE_KEY=${dummyClerkKey}\n`);
console.log(`wrote .env (platform ${version}, server ${serverPort}, client ${clientPort})`);
