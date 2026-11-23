// Shared settings for the screenshot tooling. Ports are chosen so a demo
// instance can run beside a normal platform dev instance (8000 / 3000 / 7001 / 7379).
export const CONFIG = {
  serverPort: Number(process.env.SHOTS_SERVER_PORT ?? 8010),
  clientPort: Number(process.env.SHOTS_CLIENT_PORT ?? 3010),
  pgPort: Number(process.env.SHOTS_PG_PORT ?? 7002),
  valkeyPort: Number(process.env.SHOTS_VALKEY_PORT ?? 7380),
  pgPassword: process.env.SHOTS_PG_PASSWORD ?? "screenshots",
  // Where the instance's runs/assets live, relative to the platform checkout.
  dataDir: "_screenshots_data",
  persona: "sarah.okoro@example.org",
};
