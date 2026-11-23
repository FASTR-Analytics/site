#!/usr/bin/env bash
# Rebuilds fixture/ from a running demo instance (see README "Refreshing the fixture").
#
#   bash make_fixture.sh <platform-dir>
#
# Dumps the `main` database (ownership dropped), keeps only
# what the server reads from the pinned results package (manifest, parquet, logs,
# small files; the large CSV copies are left out) and packs the instance assets.
# Records the current time as the capture clock, so "last active" and similar
# relative times are stable from run to run.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
PLAT="$(cd "${1:?platform dir}" && pwd)"
DATA="$PLAT/$(node -e "import('$HERE/config.mjs').then(m => console.log(m.CONFIG.dataDir))")"
PG=fastr-shots-pg
OUT="$HERE/fixture"; mkdir -p "$OUT"

RUN_ID=$(docker exec "$PG" psql -U postgres -d main -tAc "select id from runs where pinned")
# Remove rows left behind by deletes that skipped cascades, so the restore cannot fail.
docker exec -i "$PG" psql -U postgres -d main -q -v ON_ERROR_STOP=1 < "$HERE/fixture/delete_orphans.sql"
[ -n "$RUN_ID" ] || { echo "no pinned results package"; exit 1; }

docker exec "$PG" pg_dump -U postgres -d main --no-owner --no-privileges | gzip -9 > "$OUT/main.sql.gz"

TMP=$(mktemp -d)
( cd "$DATA/runs" && find "$RUN_ID" -type f \( -name '*.parquet' -o -name 'manifest.json' -o -name '*logs*' -o -size -1000k \) \
    ! -path "*/inputs/datasets/*" -print0 | tar --null -T - -czf "$TMP/runs.tar.gz" )
mv "$TMP/runs.tar.gz" "$OUT/runs.tar.gz"
( cd "$DATA/assets" && tar --exclude=repo_assets -czf "$OUT/assets.tar.gz" . )
rm -rf "$TMP"

node -e "
const fs = require('fs');
fs.writeFileSync('$OUT/meta.json', JSON.stringify({
  createdAt: new Date().toISOString(),
  clockTime: new Date().toISOString(),
  platformVersion: fs.readFileSync('$PLAT/VERSION', 'utf8').trim(),
  runId: '$RUN_ID',
}, null, 2) + '\n');"
ls -la "$OUT"
