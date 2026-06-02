# Updating the Site — Keeping Docs in Step with the App

How to keep this site's **Admin guide** and **User guide** in line with changes to the FASTR app. This is the *process* doc — what to update and when. For *how to write* a page once you know it needs writing, read [DOC_CONTENT_GUIDE.md](DOC_CONTENT_GUIDE.md) first.

## Why this matters

The guides describe what the app actually does. When the app gains a feature, changes a workflow, or renames a UI element, the docs drift out of date — screenshots show the wrong screen, steps reference buttons that moved, and whole features go undocumented. Stale docs are worse than no docs because users trust them.

The two guides are the only parts of this site tied to the app's behaviour:

- **Admin guide** (`src/content/docs/admin-guide/`) — instance setup, users, data imports, projects, modules, structure, indicators.
- **User guide** (`src/content/docs/user-guide/`) — projects, modules, visualizations, slide decks, AI assistant.

The Overview, Methodology, and Resources sections are not driven by app releases. Methodology is vendored (see [README.md](README.md)); leave it alone here.

## Source of truth: the app changelog

The app maintains a tagged changelog at `../wb-fastr/CHANGELOG_AUTO.txt` (sibling repo: [/Users/timroberton/projects/apps/wb-fastr](../wb-fastr)). Every line is pre-classified, which is exactly what you need to triage doc work:

```
[1.39.0] [user]  [added]    - Reports section for creating long-form analytical documents
[1.39.0] [admin] [added]    - Report editor now has Edit/View toggle for live HTML preview
[1.39.2] [user]  [fixed]    - Charts update properly after new data imports
[1.39.0] [user]  [internal] - Dashboard public bundle generation shared between editor and public viewer
```

Each line is `[version] [audience] [category] - description`.

- **audience** — `[user]` maps to the **User guide**, `[admin]` maps to the **Admin guide**. Many features ship both.
- **category** — tells you whether docs are likely affected:

| Category | Doc action |
| --- | --- |
| `[added]` | **Usually needs a new section or page.** A capability that didn't exist now does. |
| `[changed]` | **Check existing pages.** A workflow, label, or layout moved — steps and screenshots may be wrong. |
| `[fixed]` | **Usually ignore.** Bug fixes rarely change documented behaviour. Skim anyway: a fix occasionally restores or alters a flow the docs describe. |
| `[internal]` | **Always ignore.** Refactors and plumbing with no user-visible effect. |

## The update workflow

Do this after each app release (or in a batch every few releases — the version tags let you pick up where you left off).

1. **Find what's new.** Read `../wb-fastr/CHANGELOG_AUTO.txt` from the top down to the last version you documented. The current app version is in `../wb-fastr/VERSION`.
2. **Triage by tag.** Keep `[added]` and `[changed]` lines for `[user]` and `[admin]`. Drop everything `[internal]`, and most `[fixed]`.
3. **Map each survivor to a page.** Use the page map below. A changelog cluster about one feature (e.g. the ~20 Reports lines across v1.39.0) usually means one page or one substantial section — not one edit per line.
4. **Decide new page vs. edit.** If the feature fits an existing page's scope, edit it. If it's a new top-level capability (like Reports), add a page and register it in the sidebar in [astro.config.mjs](astro.config.mjs).
5. **Write the content** following [DOC_CONTENT_GUIDE.md](DOC_CONTENT_GUIDE.md) — audience, prose-vs-bullets, length targets, terminology.
6. **Mirror in French.** Every English page needs its `src/content/docs/fr/` counterpart at the same path. Falling back to English is not acceptable (see [CLAUDE.md](CLAUDE.md)).
7. **Mark screenshots.** New or changed screens need new captures. Use the `:::caution[Screenshot needed]` placeholder (see DOC_CONTENT_GUIDE) so gaps are visible rather than silently missing.
8. **Add help tags where the app links in.** If a new section is one the app should deep-link to from a help button, drop a `<!-- help#some-id -->` tag under its heading in both the EN and FR page (see [Help buttons](#help-buttons--deep-links-from-the-app) below). New or renamed UI usually means a new or moved help target.
9. **Deploy.** Push to `main`; Netlify rebuilds (~2 min). See [README.md](README.md).

## Page map — app feature → guide page

Use this to route a changelog entry to the right place. If a feature has no obvious home, that's a signal it may need a new page.

**Admin guide** (`src/content/docs/admin-guide/`)

| Page | App area it documents |
| --- | --- |
| `index.md` | Admin guide intro |
| `users.md` | User management, approvals, instance/project permissions |
| `projects.md` | Creating and configuring projects |
| `modules.md` | Installing, configuring, and running analysis modules |
| `structure.md` | Admin areas, facilities, instance structure |
| `indicators.md` | Indicators and metric definitions |
| `data-hmis.md` | HMIS data import (CSV / DHIS2) |
| `data-hfa.md` | HFA data import |

**User guide** (`src/content/docs/user-guide/`)

| Page | App area it documents |
| --- | --- |
| `index.md` | User guide intro |
| `projects.md` | Working with projects |
| `modules.md` | Using module outputs |
| `visualizations.md` | Charts, maps, tables, filters, disaggregation |
| `dashboards.md` | Dashboards, replicant groups, public dashboards / sharing |
| `slide-decks.md` | Building and sharing slide decks |
| `reports.md` | Long-form documents, embedded live figures, PDF/Word export |
| `ai-assistant.md` | AI analysis and editing |

### Drift example: Reports and Dashboards

Through app v1.39, **Reports** (markdown editor, embedded live figures, PDF/Word export, AI editing) and **Dashboards** (live grids, replicant groups, public sharing) were substantial user-facing features with no pages in the User guide — a textbook case of the drift this doc exists to prevent. Both pages were added (`user-guide/reports.md`, `user-guide/dashboards.md`, plus French mirrors). Note: the sidebar is autogenerated by directory and ordered by each page's `sidebar.order` frontmatter, so a new page needs no `astro.config.mjs` edit — just the file and a correct `order`.

## Help buttons — deep links from the app

The FASTR app shows small **help buttons** next to its UI. Each opens a short summary and a "Read more…" link that deep-links into this site, at a specific section, in the reader's language. That content comes from these docs, so keeping help targets in step with the app is part of the update job.

To make a section linkable, drop a one-line tag directly under its heading:

```md
## Data tab
<!-- help#data-tab -->
The Data tab is where you pick the indicator…
```

The tag carries only the `#id`. Everything else is inferred: the **heading above** becomes the link anchor and title; the **first ~200 characters of prose below** become the modal summary. The tag is an HTML comment, so it is invisible on the rendered page.

Three things to get right:

- **Tag both languages with the same id.** The id couples the EN section to its FR translation. Present on one side only → the app-side build fails. No English fallback.
- **Ids are globally unique** across the whole site (EN and FR combined), and **kebab-case** (`data-tab`, `viz-data-tab`, `add-users`). Duplicates fail the build.
- **Put the tag immediately under a `#` or `##` heading** — the anchor is the heading, not the tag.

Don't tag **Methodology** pages — they're vendored and overwritten on each sync; add the tag upstream in `fastr-resource-hub` instead. You don't run any build here: once tags are in, an app developer runs the help-button build on the `wb-fastr` side. Full rules in [DOC_HELP_BUTTONS.md](DOC_HELP_BUTTONS.md).

## What not to chase

- **`[internal]` lines** — no user-visible change, ever.
- **Most `[fixed]` lines** — the documented behaviour was already the intended behaviour; the fix just makes the app match the docs.
- **Methodology / Overview / Resources** — not tied to app releases. Methodology is vendored via `pnpm sync:methodology`; never hand-edit it here (see [CLAUDE.md](CLAUDE.md)).

## Cross-references

- [DOC_CONTENT_GUIDE.md](DOC_CONTENT_GUIDE.md) — required reading before writing any page (audience, structure, terminology, screenshots, localization).
- [DOC_HELP_BUTTONS.md](DOC_HELP_BUTTONS.md) — how to mark sections as in-app help targets (the `<!-- help#id -->` tags).
- [CLAUDE.md](CLAUDE.md) — bilingual rule, vendored methodology, light-only theme, asset paths.
- [README.md](README.md) — local dev, deploy, methodology sync.
- `../wb-fastr/CHANGELOG_AUTO.txt` and `../wb-fastr/VERSION` — the app-side feed driving all of the above.
