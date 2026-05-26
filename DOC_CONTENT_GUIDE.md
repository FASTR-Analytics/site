# Content Guide — FASTR Documentation Site

Reference for writing and maintaining content on the FASTR docs site.

## Site purpose

The docs site serves two audiences:

1. **Administrators** — Setting up and managing FASTR instances (users, structure, data imports, projects, modules)
2. **Users** — Working with projects, creating visualizations, building slide decks, using AI assistant

The site also hosts the FASTR Methodology (reference material), which is synced from a separate source and not covered by this guide.

## Sidebar structure

```
├── Overview               # What is FASTR, who it's for
├── Admin guide            # How-to for administrators
├── User guide             # How-to for analysts/editors/viewers
├── Methodology            # Reference (synced, not hand-written)
├── Resources              # Downloads, links
```

## Audience

- Health program managers and data analysts in low/middle-income countries
- Mix of technical comfort levels
- English and French (site is bilingual)

## Content principles

- **Task-oriented** — Focus on "how to do X", not abstract descriptions
- **Scannable** — Use headings, short paragraphs, lists
- **Practical** — Show real examples from the app
- **Complete but concise** — Cover what's needed, nothing more

## Page structure

Each guide page should follow this pattern:

1. **Title** — What the page covers
2. **Intro paragraph** — 1-2 sentences on what you'll learn / what this feature does
3. **Sections** — Logical groupings of related tasks or concepts
4. **Steps** — Numbered for procedures, bullets for lists
5. **Screenshots/videos** — Embedded at relevant points

## Content length targets

| Guide | Words per page | Screenshots | Videos |
|-------|----------------|-------------|--------|
| Admin guide | 400-800 | 2-4 | 0-1 (complex flows only) |
| User guide | 300-600 | 2-3 | 0-1 (overview/intro) |

These are guidelines, not hard limits. Some pages may be shorter (simple feature) or longer (complex workflow).

## Writing style

- **Voice**: Direct, professional, helpful
- **Tense**: Present tense ("Click the button" not "You will click")
- **Person**: Second person ("You can..." or imperative "Click...")
- **Jargon**: Use FASTR terminology consistently (see Terminology section below)
- **Formatting**: Bold for UI elements ("Click **Save**"), code for values/inputs
- **Dashes**: Use spaced hyphens ( - ) not em-dashes (—)

## Prose and structure

Good documentation balances prose with structure. The goal is writing that feels human and helpful, not a wall of bullets that reads like a spec sheet.

### The core rule: prose introduces, lists enumerate

Every section begins with prose that explains the concept, context, or purpose. Lists appear only when you're enumerating specific items—steps in a procedure, options in a menu, features in a comparison. If you find yourself writing single-word or fragment bullets, you're probably avoiding prose where prose belongs.

**Wrong:**

```md
## Data tab

- Period filter
- Disaggregations
- Filters
- Value display
```

**Right:**

```md
## Data tab

The Data tab controls what information appears in your visualization. You can narrow the time range, break down results by different dimensions, or filter to specific values. Changes here affect what data is fetched and displayed—if something looks wrong in your chart, this is usually the first place to check.
```

### Paragraph length

Keep paragraphs to 2-4 sentences. After about 50 words, readers need a visual break—a new paragraph, a heading, a screenshot, or a code block. Long paragraphs signal that you're trying to explain too much at once.

One-sentence paragraphs are fine when you're making a single important point. But multiple one-sentence paragraphs in a row create a choppy, list-like feel. Vary your rhythm.

### When to use lists

**Numbered lists** are for sequences where order matters:

1. Click **Create visualization**
2. Select a metric from the list
3. Choose a preset or configure manually
4. Click **Create** to open the editor

**Bulleted lists** are for sets of parallel items where order doesn't matter—features, options, requirements. Each bullet should be a complete thought, not a single word.

**Wrong:**

```md
The editor has three tabs:
- Data
- Presentation
- Text
```

**Right:**

```md
The editor has three tabs:
- **Data** controls what information appears—time periods, disaggregations, and filters
- **Presentation** adjusts visual styling—colors, labels, axes, and legends
- **Text** adds context—caption, sub-caption, and footnotes
```

### Explain the "why," not just the "what"

Don't just describe features—explain why someone would use them and what problem they solve. Anticipate questions.

**Weak:**

```md
You can lock a project to prevent modifications.
```

**Better:**

```md
Locking a project prevents anyone from changing its configuration while still allowing access to reports and exports. This is useful when you've finalized an analysis and want to ensure the underlying data and settings stay fixed—for example, before sharing results with stakeholders or archiving for future reference.
```

### Use concrete scenarios

Abstract descriptions are forgettable. Ground explanations in real situations your users face.

**Abstract:**

```md
Disaggregation breaks down data by dimensions.
```

**Concrete:**

```md
Disaggregation lets you break down a single metric into more specific views. Instead of seeing "total outpatient visits," you might disaggregate by facility type to compare hospitals versus health centers, or by month to spot seasonal patterns.
```

### Structure varies by section type

Different parts of a page call for different approaches:

| Section type | Structure |
| ------------ | --------- |
| **Concept introduction** | 2-4 paragraphs of prose explaining what it is, why it matters, when you'd use it |
| **Procedure** | Brief intro sentence, then numbered steps. Each step is a complete sentence. |
| **Feature overview** | Prose paragraph introducing the category, then a table or bulleted list of specific features |
| **Reference** | Can be list-heavy—tables, definition lists, quick lookups |
| **Tips / gotchas** | Short prose paragraphs or a bulleted list of complete sentences |

### Earning your bullets

A bullet list at the end of a section can summarize key points—but only after you've explained them in prose. Bullets recap; they don't replace explanation.

**Pattern from good docs:**

```md
## Image Optimization

Image Optimization helps you achieve faster page loads by reducing the size of images and using modern image formats.

When deploying to Vercel, images are automatically optimized on demand, keeping your build times fast while improving your page load performance and Core Web Vitals.

When self-hosting, Image Optimization uses the default Next.js server for optimization. This server manages the rendering of pages and serving of static files.

**To summarize:**
- Zero-configuration when using `next/image`
- Images optimized on-demand, not at build time
- No additional services needed
```

The bullets work because the prose already did the heavy lifting.

### Red flags to watch for

- **Multiple consecutive one-word or fragment bullets** — Convert to prose or expand each bullet
- **A section that's only a list** — Add an intro paragraph explaining context
- **Bullets that start with "You can..."** — Often a sign of lazy listing; consider prose
- **No paragraphs longer than one sentence** — Vary your rhythm
- **No paragraphs on the entire page** — You've written a spec sheet, not documentation

## Screenshots and videos

### When to use

- **Screenshot**: Single UI state, dialog, or result
- **Video**: Multi-step workflow where sequence matters, or when showing interaction (hover, drag, etc.)

### Placeholder format

Use Starlight's caution callout for visible placeholders:

```md
:::caution[Screenshot needed]
Description of what the screenshot should show.
:::

:::caution[Video needed]
Description of what the video should demonstrate.
:::
```

### Naming convention

```
/screenshots/admin-guide/{page}-{description}.png
/screenshots/user-guide/{page}-{description}.png
/videos/admin-guide/{page}-{description}.mp4
/videos/user-guide/{page}-{description}.mp4
```

Example: `/screenshots/admin-guide/users-add-dialog.png`

### Screenshot guidelines

- Capture only the relevant portion of the UI (not full browser window unless needed)
- Use consistent browser/viewport size
- Blur or redact any sensitive data
- Prefer light mode

## Terminology

Use these terms consistently:

| Term | Not |
|------|-----|
| Instance | Organization, workspace |
| Project | Analysis, workspace |
| Admin area | Region, geography (unless referring to specific level) |
| Facility | Health facility, site |
| Module | Script, analysis (when referring to the platform feature) |
| Slide deck | Report, presentation |
| Visualization | Chart, graph (when referring generically) |
| Data window | Filter, scope |

## Localization

- English is the source; French is translated
- Write English content first
- French translations go in `src/content/docs/fr/` mirroring the English structure
- Keep sentences simple to aid translation

## File conventions

- Filenames: lowercase, hyphens (`data-hmis.md` not `data_hmis.md`)
- Frontmatter: Always include `title`, `description`, and `sidebar.order`
- Images: Store in `/public/screenshots/` or `/public/videos/`

## Existing Scribe tutorials

The methodology user guide (`src/content/docs/methodology/11_user_guide.md`) contains Scribe embeds for:

- Landing page tour
- Creating a FASTR account
- Signing into the platform
- Understanding modules

Link to these from the Admin/User guides where relevant rather than duplicating content.
