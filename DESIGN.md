# wb-fastr-site — Design system

This site has two surfaces:

- **Marketing pages** — hand-built Astro pages under [src/pages/](src/pages/) (e.g. [src/pages/index.astro](src/pages/index.astro)). Layout and copy are bespoke; styling uses Tailwind utilities backed by the `@theme` tokens declared in [src/styles/tailwind.css](src/styles/tailwind.css).
- **Docs pages** — [Starlight](https://starlight.astro.build/) under [src/content/docs/](src/content/docs/). Layout is Starlight's standard three-column docs layout (nav / sidebar / content / table of contents).

The two surfaces share **colours and fonts** but **not** layout or typography scale. Marketing pages get to be loud (`text-7xl` hero); docs pages stay ergonomic (Starlight's defaults). That difference is intentional.

## Source of truth

[src/styles/tailwind.css](src/styles/tailwind.css) is the only file that should declare colour or font values. It is structured as:

1. **`@theme` block** — the FASTR tokens this site actually consumes. Nothing else: no aspirational palette entries, no "we might need warning colours someday" rows. If a token isn't referenced by the marketing pages or the Starlight bridge below, it doesn't belong here.
2. **`@layer base`** — `@font-face` declarations for Inter + Roboto Mono, and the `html` / `body` baseline.
3. **Starlight token bridge** — aliases every `--sl-*` Starlight uses to a `var(--color-*)` from the `@theme` block. This is what makes the docs side pick up FASTR colours without per-component edits.

### Rules

- **No hardcoded hex values outside `@theme`.** Everywhere else, use `var(--color-*)`, `var(--font-*)`, or a Tailwind utility (`text-primary`, `bg-base-200`, …) backed by `@theme`.
- **No `!important` overrides** in the bridge or anywhere else. If a rule isn't winning, fix the selector or change the bridge — don't bolt `!important` onto a band-aid.
- **No component-level overrides for Starlight.** The bridge maps tokens; Starlight's own CSS does the rest. If a single component looks wrong, the fix usually belongs in the bridge (one of the existing aliases is pointing at the wrong FASTR token), not in a new override rule.

## Token bridge (Starlight ← FASTR)

When Starlight needs a value, it reads a `--sl-*` variable. The bridge in [src/styles/tailwind.css](src/styles/tailwind.css) maps each one to a FASTR token:

| Starlight token              | FASTR token                       | Used for                                |
|------------------------------|-----------------------------------|-----------------------------------------|
| `--sl-font`                  | `--font-sans` (Inter)             | All Starlight UI text                   |
| `--sl-font-mono`             | `--font-mono` (Roboto Mono)       | Code blocks, inline code                |
| `--sl-color-bg`              | `--color-base-100` (#ffffff)      | Page background                         |
| `--sl-color-bg-nav`          | `--color-base-100`                | Top nav background                      |
| `--sl-color-bg-sidebar`      | `--color-base-100`                | Left sidebar background                 |
| `--sl-color-bg-inline-code`  | `--color-base-200` (#f2f2f2)      | Inline `code` chip background           |
| `--sl-color-bg-accent`       | `--color-primary` (#0e706c teal)  | Accent-coloured fills                   |
| `--sl-color-text`            | `--color-base-content` (#2a2a2a)  | Body text                               |
| `--sl-color-text-accent`     | `--color-primary`                 | Links, active nav, site title           |
| `--sl-color-text-invert`     | `--color-primary-content` (#fff)  | Text on accent-coloured backgrounds     |
| `--sl-color-white`           | `--color-base-content`            | Highest-contrast text (light mode)      |
| `--sl-color-gray-1` / `-2`   | `--color-base-content`            | Strong text                             |
| `--sl-color-gray-3` / `-4`   | `--color-neutral`                 | Secondary / muted text                  |
| `--sl-color-gray-5`          | `--color-base-300` (#cacaca)      | Borders                                 |
| `--sl-color-gray-6` / `-7`   | `--color-base-200`                | Soft surfaces                           |
| `--sl-color-black`           | `--color-base-100`                | Page background (light mode)            |
| `--sl-color-accent-low`      | derived from `--color-primary`    | Accent tint (12% on white)              |
| `--sl-color-accent`          | `--color-primary`                 | Accent solid                            |
| `--sl-color-accent-high`     | derived from `--color-primary`    | Accent shaded (70% mixed with black)    |
| `--sl-color-hairline-light`  | `--color-base-300`                | Light dividers                          |
| `--sl-color-hairline`        | `--color-base-300`                | Standard borders                        |
| `--sl-color-hairline-shade`  | `--color-base-300`                | Page header bottom border, sidebar edge |

If Starlight adds a new `--sl-*` token in a future version, add a row here and a `var(--color-*)` alias in the bridge.

## Light-mode lock

Starlight defaults to a dark/light theme toggle. This site is light-only. Two pieces enforce that:

- [src/components/ForceLightThemeProvider.astro](src/components/ForceLightThemeProvider.astro) replaces Starlight's stock `ThemeProvider` and hard-sets `document.documentElement.dataset.theme = "light"`.
- [src/components/EmptyThemeSelect.astro](src/components/EmptyThemeSelect.astro) replaces the dark/light dropdown in the header so users can't toggle.

Both are wired up in the `components:` block of [astro.config.mjs](astro.config.mjs).

## Changing the palette

Change a colour in one place — the `@theme` block in [src/styles/tailwind.css](src/styles/tailwind.css) — and both the marketing pages and docs pages update. Update the table above if you add/rename tokens.
