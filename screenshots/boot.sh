#!/usr/bin/env bash
# Boots a demo FASTR instance from the fixture, for screenshots.
#
#   bash boot.sh <platform-dir>     (run prepare_platform.mjs on that dir first)
#   bash stop.sh <platform-dir>     (tear it down)
#
# Starts postgres + valkey containers, restores fixture/main.sql.gz into a fresh
# `main` database, unpacks the fixture's results package and asset files, then
# starts the platform server (deno) and client (vite) in the background and waits
# until both answer. Logs go to <platform-dir>/_screenshots_data/{server,client}.log.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
PLAT="$(cd "${1:?platform dir}" && pwd)"
cfg() { node -e "import('$HERE/config.mjs').then(m => console.log(m.CONFIG.$1))"; }
PG_PORT=$(cfg pgPort); VK_PORT=$(cfg valkeyPort); PG_PW=$(cfg pgPassword)
SERVER_PORT=$(cfg serverPort); CLIENT_PORT=$(cfg clientPort)
DATA="$PLAT/$(cfg dataDir)"
PG=fastr-shots-pg; VK=fastr-shots-valkey

echo "== fixture -> $DATA"
rm -rf "$DATA/runs" "$DATA/assets"
mkdir -p "$DATA/runs" "$DATA/assets" "$DATA/modules"
tar -xzf "$HERE/fixture/runs.tar.gz" -C "$DATA/runs"
tar -xzf "$HERE/fixture/assets.tar.gz" -C "$DATA/assets"

echo "== postgres (:$PG_PORT) and valkey (:$VK_PORT)"
docker rm -f "$PG" "$VK" >/dev/null 2>&1 || true
docker run -d --name "$PG" -p "$PG_PORT:5432" -e POSTGRES_PASSWORD="$PG_PW" \
  -v "$DATA/runs:/app/runs" postgres:17.4 \
  -c shared_preload_libraries=pg_stat_statements -c pg_stat_statements.track=all >/dev/null
docker run -d --name "$VK" -p "$VK_PORT:6379" valkey/valkey:8.0 >/dev/null
for _ in $(seq 1 60); do docker exec "$PG" pg_isready -U postgres >/dev/null 2>&1 && break; sleep 1; done
sleep 2
docker exec "$PG" createdb -U postgres main
gunzip -c "$HERE/fixture/main.sql.gz" | docker exec -i "$PG" psql -U postgres -d main -q -v ON_ERROR_STOP=1 >/dev/null

echo "== server (:$SERVER_PORT)"
( cd "$PLAT" && nohup setsid deno run --allow-all --env-file --unstable-broadcast-channel main.ts > "$DATA/server.log" 2>&1 < /dev/null & echo $! > "$DATA/server.pid" )
for i in $(seq 1 900); do  # first start downloads the npm dependencies
  grep -q "Listening on" "$DATA/server.log" 2>/dev/null && break
  if ! kill -0 "$(cat "$DATA/server.pid")" 2>/dev/null; then echo "server exited:"; tail -40 "$DATA/server.log"; exit 1; fi
  sleep 1
done
grep -q "Listening on" "$DATA/server.log" || { echo "server did not start:"; tail -40 "$DATA/server.log"; exit 1; }

echo "== client (:$CLIENT_PORT)"
( cd "$PLAT/client" && nohup setsid npx vite --port "$CLIENT_PORT" --strictPort > "$DATA/client.log" 2>&1 < /dev/null & echo $! > "$DATA/client.pid" )
for _ in $(seq 1 120); do curl -sf "http://localhost:$CLIENT_PORT/" >/dev/null && break; sleep 1; done
curl -sf "http://localhost:$CLIENT_PORT/" >/dev/null || { echo "client did not start:"; tail -40 "$DATA/client.log"; exit 1; }
echo "== demo instance up: http://localhost:$CLIENT_PORT/?persona=$(cfg persona)"
