#!/usr/bin/env bash
# Stops the demo instance started by boot.sh.   bash stop.sh <platform-dir>
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PLAT="$(cd "${1:?platform dir}" && pwd)"
DATA="$PLAT/$(node -e "import('$HERE/config.mjs').then(m => console.log(m.CONFIG.dataDir))")"
for f in server client; do
  pid="$(cat "$DATA/$f.pid" 2>/dev/null)" || continue
  kill -- "-$pid" 2>/dev/null || kill "$pid" 2>/dev/null  # boot.sh starts each under setsid: kill the group
done
# Anything still holding the instance's ports (e.g. started by an older boot).
for port in $(node -e "import('$HERE/config.mjs').then(m => console.log(m.CONFIG.serverPort, m.CONFIG.clientPort))"); do
  fuser -k "$port/tcp" >/dev/null 2>&1 || true
done
docker rm -f fastr-shots-pg fastr-shots-valkey >/dev/null 2>&1
echo "stopped"
