# DOC_HELP_BUTTONS.md — Marking sections as help targets

The FASTR app ([wb-fastr](../wb-fastr)) can show small **help buttons** next to
its UI. Each button opens a short summary and a "Read more…" link that deep-links
**into this site**, at a specific section, in the reader's language.

The content comes from **these docs**. To make a section linkable from the app,
you add a one-line **help tag** under its heading — in both the English and the
French page. That's the only authoring you do here; an app developer then runs
the build step on the `wb-fastr` side (see
[wb-fastr/DOC_HELP_BUTTONS.md](../wb-fastr/DOC_HELP_BUTTONS.md)).

---

## How to mark a section

Drop the tag on its own line, directly under the heading. **The tag reads its
meaning from what surrounds it** — the heading above, the prose below:

```md
## Data tab                                    ← ABOVE the tag: heading → anchor + title
<!-- help#data-tab -->                         ← the tag itself: only the #id
The Data tab is where you pick the indicator…  ← BELOW the tag: prose → summary (first ~200 chars)
```

Then do the **same in the French translation**, under the translated heading,
with the **same id**:

```md
## Onglet Données
<!-- help#data-tab -->

L'onglet Données est l'endroit où vous choisissez l'indicateur…
```

The tag is a normal HTML comment, so it is **invisible** on the rendered page.

## The rules

1. **The id is globally unique across the whole site.** Not just per page —
   across every page, EN and FR combined. If `data-tab` is taken, use something
   more specific like `viz-data-tab`. The build **fails** on a duplicate, so you
   find out immediately.

2. **The same id must appear in both languages.** The id is what links the
   English section to its French translation. If the EN page has `#data-tab` but
   the FR page doesn't (or vice-versa), the build **fails**. Falling back to
   English is not acceptable — every help target is bilingual, like the rest of
   the site.

3. **Put the tag directly under the heading it describes.** The deep-link anchor
   is that **heading**, not the tag. The tag must sit immediately beneath a
   heading (the build fails otherwise). Use it under `#` or `##` headings.

4. **Use kebab-case ids** (`data-tab`, `viz-data-tab`, `add-users`). They are
   identifiers, not prose.

## The summary shown in the modal

The summary is the **first ~200 characters of the prose that follows the
heading** (trimmed at a word boundary). That's the whole rule — there is nothing
to configure, and **nothing ever goes inside the tag** except the `#id`.

Just write a good lead sentence under the heading, which good docs have anyway.
If a summary reads badly, fix the lead prose on the page itself — the docs page
and the modal stay in sync because they're the same words.

## What you do NOT do here

- You do **not** edit anything in the `wb-fastr` app or run any build here. Once
  your tags are in, an app developer runs `deno task build:help-buttons` in
  `wb-fastr` to pick them up (see
  [wb-fastr/DOC_HELP_BUTTONS.md](../wb-fastr/DOC_HELP_BUTTONS.md)).
- You do **not** invent anchor ids on the headings. The anchor is generated from
  the heading text automatically; the `#id` in the tag is a separate, stable
  key used only to couple EN↔FR and to reference the section from the app.

## Note on the Methodology section

Methodology pages are **vendored** (`pnpm sync:methodology`, see
[CLAUDE.md](CLAUDE.md)) and overwritten on each sync — do **not** add help tags
to them by hand. If a methodology section needs a help button, add the tag
upstream in `fastr-resource-hub` so it survives the next sync.
