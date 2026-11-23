# Docs screenshots

The screenshots in the Admin and User guides (`public/images/*-en.png` and
`*-fr.png`) are captured automatically from a demo instance of the platform. The
**Screenshots** workflow (`.github/workflows/screenshots.yml`) recaptures them
and opens a pull request with any images that changed. It runs:

- after the platform's docs sync pushes changes to the guides,
- every Monday, to catch interface changes the docs sync didn't mention,
- by hand from the Actions tab (choose a platform branch, and `all` or a list of shots).

Review the images in the pull request's **Files changed** tab before merging.
If a shot can't be captured (usually because the interface changed), the run
fails and names it; update its function in `capture.mjs`.

## The demo instance

`fixture/` holds everything the instance needs, all fictional and safe to publish:

- `main.sql.gz`: the `main` database. "Demo Republic" with six made-up regions,
  957 facilities with random IDs, synthetic monthly HMIS counts (2022-01 to
  2025-04), two synthetic HFA survey rounds, demo users (`@example.org`), scopes,
  folders, slide decks, reports and saved visualizations.
- `runs.tar.gz`: the pinned "April 2025" results package (manifest, parquet and
  logs only; the large CSV copies are left out, the server doesn't read them).
- `assets.tar.gz`: the files on the Assets page (HFA survey files, boundaries).
- `meta.json`: the platform version the fixture was made with, and the clock
  time captures start from, so dates and "last active" times are stable.
- `generate/`: the scripts that produced the synthetic HMIS data, boundaries and
  HFA files.

The instance uses persona sign-in (no Clerk; you are `sarah.okoro@example.org`,
an admin) and runs beside a normal dev instance: server 8010, client 3010,
postgres 7002, valkey 7380 (`config.mjs`).

## Running it locally

```bash
git clone https://github.com/FASTR-Analytics/platform /tmp/fastr-shots-platform   # a throwaway checkout
git clone https://github.com/FASTR-Analytics/modules /tmp/fastr-shots-modules     # module definitions (the generate wizard reads them)
npm ci --prefix /tmp/fastr-shots-platform/client
export SHOTS_MODULES_DIR=/tmp/fastr-shots-modules
npm ci --prefix screenshots && (cd screenshots && npx playwright-core install chromium-headless-shell)

node screenshots/prepare_platform.mjs /tmp/fastr-shots-platform   # patches + .env (never run on your working copy)
bash screenshots/boot.sh /tmp/fastr-shots-platform                # http://localhost:3010/?persona=sarah.okoro@example.org
node screenshots/labels.mjs /tmp/fastr-shots-platform             # French labels for the fr run

node screenshots/capture.mjs en all          # or: en products-new-menu,reports-editor
node screenshots/capture.mjs fr all
python3 screenshots/postprocess.py           # writes changed images to public/images

bash screenshots/stop.sh /tmp/fastr-shots-platform
```

Needs Docker, Deno 2, Node 20 and Python with Pillow. The first server start
downloads the platform's npm dependencies and takes a few minutes.

`prepare_platform.mjs` patches the checkout for screenshot mode: guided tours off,
the AI client calling a same-origin Vite proxy (so the persona cookie reaches it),
ports, a stub for the git-ignored `server/auth/h_users.ts`, and the `.env` files.
Each patch checks its anchor and stops with a clear error if the platform code moved.

## Adding or changing a screenshot

1. Add a function to `capture.mjs` with `S("<name>", { width, height }, async (p) => { ... })`.
   Use `L("English label")` for anything you click, so the French run finds the
   French label. `full()` saves the whole window; `card()` crops to a dialog;
   `clipTexts()` crops to the area between two pieces of text.
2. Add `<name>` to `manifest.json` (`images`, and `crops` if it's a crop).
3. Reference it in the page as `/images/<name>-en.png` (English page) and
   `/images/<name>-fr.png` (French page).
4. Capture and run `postprocess.py`.

The AI panel shot (`ai-panel`) is manual: it needs a real `ANTHROPIC_API_KEY` and
the answer differs every run, so `all` skips it. Name it explicitly to recapture it.

## Refreshing the fixture

When the demo data needs to change (a new feature needs content to show):

1. Boot the instance as above and make the changes in the browser (signed in as
   Sarah), or with `seed.mjs`, which rebuilds the demo products on an instance
   with no products. If you regenerate the results package, the modules need R
   and `FASTR_MODULES_LOCAL_DIR` pointing at a modules checkout.
2. Run `bash screenshots/make_fixture.sh <platform-dir>` to rewrite `fixture/`.
3. Check nothing real slipped in before committing: the repo is public.
4. Capture and post-process everything, and commit the fixture with the new images.
