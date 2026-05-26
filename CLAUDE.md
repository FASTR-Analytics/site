# CLAUDE.md

Notes for Claude when working in this repo.

## What this is

Astro + Starlight site combining a marketing landing page with the FASTR documentation. Production: <https://fastr-analytics.org>.

## Authoritative docs — read these first

- [README.md](README.md) — local dev, content folders, static assets, methodology sync, deploy.
- [DOC_CONTENT_GUIDE.md](DOC_CONTENT_GUIDE.md) — **required reading before writing or editing any docs page.** Covers audience, page structure, prose-vs-bullets rules, terminology, screenshots, localization.
- [DESIGN.md](DESIGN.md) — design system, colours, Starlight theming.

## Key conventions (the things easy to get wrong)

- Bilingual site: every English page under `src/content/docs/` needs a French counterpart under `src/content/docs/fr/` mirroring the same path. Falling back to English is not the desired behaviour.
- The Methodology section (`src/content/docs/methodology/` and the French mirror) is **vendored** via `pnpm sync:methodology` from [FASTR-Analytics/fastr-resource-hub](https://github.com/FASTR-Analytics/fastr-resource-hub). Never hand-edit those files — fix upstream and re-sync.
- Don't put files in `public/methodology/` — that whole tree is wiped on each sync.
- Static assets use **absolute** paths (`/images/foo.png`), never relative — Starlight rewrites URLs.
- Site is light-only ([src/components/ForceLightThemeProvider.astro](src/components/ForceLightThemeProvider.astro)); don't add dark-mode-only styling.
- Starlight tokens are bridged to FASTR colour tokens in [src/styles/tailwind.css](src/styles/tailwind.css). Change colours in `@theme`, not in the `--sl-*` block.

## Landing page vs docs

- Landing page: [src/pages/index.astro](src/pages/index.astro) (EN) and [src/pages/fr/index.astro](src/pages/fr/index.astro) (FR). Hand-built Astro, not Starlight.
- Docs: everything under `src/content/docs/`, rendered by Starlight per [astro.config.mjs](astro.config.mjs).
