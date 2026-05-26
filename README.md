# wb-fastr-site

Marketing site and documentation for FASTR. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

Production: [fastr-analytics.org](https://fastr-analytics.org)

---

## Local development

```bash
pnpm install
pnpm dev
```

Opens at <http://localhost:4321> (or the next free port if 4321 is taken).

To preview a production build locally:

```bash
pnpm build      # writes to dist/
pnpm preview    # serves dist/ at http://localhost:4321
```

## Writing and updating content

Documentation pages are Markdown files under [src/content/docs/](src/content/docs/). English at the top level, French in a parallel tree under [src/content/docs/fr/](src/content/docs/fr/). Each top-level folder is a sidebar section configured in [astro.config.mjs](astro.config.mjs):

| Folder           | Sidebar label         |
|------------------|-----------------------|
| `overview/`      | Overview              |
| `admin-guide/`   | Admin guide           |
| `user-guide/`    | User guide            |
| `methodology/`   | Methodology — **vendored, don't edit, see below** |
| `resources/`     | Resources             |

### To add a new page

1. Create a `.md` file in the relevant folder.
2. Add the same file under `src/content/docs/fr/<folder>/` for the French version (otherwise the French site falls back to the English page).
3. Include frontmatter at the top:

   ```md
   ---
   title: Your page title
   description: Short summary used for meta tags and the sidebar.
   ---
   ```

4. The sidebar entry appears automatically (alphabetical by filename). To control order, add `sidebar: { order: 10 }` to the frontmatter.

### To edit an existing page

Just edit the `.md` file. Save, push, done. Push your changes when ready (see Deploy below).

## Screenshots, videos, and other static assets

Anything in [public/](public/) is served at the matching URL with no processing.

| Type        | Put it in            | Reference as                |
|-------------|----------------------|-----------------------------|
| Screenshots | `public/images/`     | `/images/your-shot.png`     |
| Videos      | `public/videos/`     | `/videos/your-video.mp4`    |
| Logos       | `public/images/`     | `/images/FASTR_*.png`       |

Example in a markdown file:

```md
![FASTR dashboard](/images/screenshot-dashboard.png)
```

```md
<video controls src="/videos/walkthrough.mp4"></video>
```

Use absolute paths (`/images/foo.png`), not relative paths — relative paths break when Starlight rewrites URLs.

> **Don't put files in `public/methodology/`** — that folder is managed by the methodology sync (see next section) and gets wiped on each sync.

## Methodology sync

The Methodology section is vendored from [FASTR-Analytics/fastr-resource-hub](https://github.com/FASTR-Analytics/fastr-resource-hub) on GitHub. To pull the latest version:

```bash
pnpm sync:methodology
```

This:

- Sparse-clones the upstream repo into a temp dir
- Copies `.md` files (English + French) into `src/content/docs/methodology/` and `src/content/docs/fr/methodology/`
- Copies images into `public/methodology/resources/`
- Normalises MkDocs syntax for Starlight (strips kramdown attributes, rewrites paths, adds frontmatter)

After running, review with `git status` and commit. **Never edit synced files directly** — they're overwritten on the next sync. Fix upstream and re-run.

The sync is local-only — Netlify never runs it. Methodology only updates when someone runs `pnpm sync:methodology` and commits the result.

> Requires [Deno](https://deno.land) installed locally (`brew install deno` on macOS). The sync script is TypeScript run via Deno's shebang.

## Deploy

Deploys are automatic.

**Push to `main` → Netlify rebuilds and goes live in ~2 minutes.** No manual deploy step.

- Production URL: <https://fastr-analytics.org>
- Branch pushes and pull requests get a preview URL automatically (see the Netlify check on the PR)
- Build config: [netlify.toml](netlify.toml)
- Node version: pinned to 20 via [.nvmrc](.nvmrc) and `netlify.toml`
- Package manager: pnpm, pinned via the `packageManager` field in [package.json](package.json)

If a deploy fails, the Netlify dashboard shows the build log.

## Further reading

- [DESIGN.md](DESIGN.md) — design system, colours, Starlight theming
