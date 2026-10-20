---
title: Slide decks
description: Building slide decks and exporting documents.
sidebar:
  order: 5
---

Slide decks let you assemble visualizations into polished presentations for stakeholders. Instead of exporting individual charts and manually arranging them in PowerPoint, you build the deck directly in FASTR - complete with consistent styling, cover pages, and section dividers. When you're done, export the whole thing as a PDF or PowerPoint file.

## Creating a slide deck
<!-- help#deck-create -->

Open the **Products** tab on your instance home screen. Slide decks appear as cards in the product explorer alongside reports. Click **New** and choose **New deck** to create one — the editor opens straight away. You can organise decks into folders using **New folder**, and move them between folders from their card menu.

A new deck starts empty. A rail on the left shows your slides, and the main area beside it shows the slide currently open for editing. You'll build out the deck by adding different slide types.

To create slide decks, a results package must be pinned at the instance level first.

![Creating Slide Deck](/images/creating-slide-deck-en.png)

## Slide types

Decks contain three types of slides. **Cover slides** introduce the presentation with a title, subtitle, optional presenter name, and date. **Section slides** divide content into logical groups with a section title. Both use a bold, full-bleed design. **Content slides** are where your data lives - these contain visualizations, text, and images.

When you add a slide, you choose its type. You can convert between types later using the **Slide** menu in the slide toolbar.

## Building content slides
<!-- help#deck-content-slides -->

Content slides use a flexible layout system with one or more content blocks. A block can hold text (formatted with markdown), a visualization from the deck's results package, or an uploaded image.

To add a visualization to an empty figure block, click **Insert visualization** and choose a metric and configuration from the product's results package. If you need to adjust the display — different time period or disaggregation — you can edit the embedded visualization directly from the slide using **Edit visualization**. To swap an existing visualization for a different one, use **Replace visualization** from the same panel.

Right-click on a block to access layout options like "Split left/right" or "Delete block." You can drag dividers between blocks to adjust their relative sizes.

If a visualization or image cannot be rendered - for example because of a data error or a missing file - FASTR shows a short notice in the block rather than leaving it blank or stopping the export.

![Building Content Slides](/images/building-content-slides-en.png)

## Editing slides

The deck editor shows all your slides in a rail on the left. Click any slide thumbnail to open it for editing in the main area beside the rail. The current slide is highlighted with a ring in the rail and its number is shown in bold. A toolbar spanning the full width of the editor shows formatting controls for the open slide. The toolbar has two rows: a **menu row** (with **Slide**, **Insert**, and **Split panel** menus) above a **formatting pill** that adapts to what is selected on the canvas.

To type directly on the slide, double-click a text block or title field on the canvas. A dashed outline marks the area being edited, and the caret appears inside it. Press **Escape** or click outside to finish. For markdown text blocks, a **Markdown** option in the toolbar opens the full markdown source in a modal — useful for links, code blocks, or anything else the canvas editor cannot reach.

## The slide toolbar

The toolbar's menu row contains three menus.

- **Slide** lets you change the slide type (cover, section, or content) and control logo visibility for headers and footers.
- **Insert** lists every text field available on the current slide type — click an entry to jump to it or add it if it is absent.
- **Split panel** (content slides only) adds a decorative strip on the left or right of the slide, with controls for its size and fill (plain colour, pattern, or image).

Below the menu row, a pill shows controls that follow your selection. While typing in a text block it shows bold, italic, bullet list, numbered list, and background colour controls. While a title field is selected it shows font size and weight controls. While a content block is selected it shows the block type (text, visualization, or image), a **Layout** button to split, add, move, or delete blocks, and controls for the selected block type.

## Deck settings

Click **Settings** in the deck toolbar to open the deck settings panel. Here you can change the deck's name, move it to a different folder, switch the results package it serves visualizations from, and change the geographic scope. Changing the package or scope affects every visualization in the deck — visualizations that came from a different package or scope show an update badge.

To change the package or scope, click **Package, scope and folder** from the deck's overflow menu. This opens the product settings panel where you can update those properties.

## Presenting slides

Click **Present** in the slide list toolbar to open the fullscreen presenter. The presenter shows one slide at a time and preloads neighbouring slides so navigation is instant. Use the arrow keys or the on-screen controls to move between slides. Press **Escape** or click the close button to exit. Click the maximize icon to enter true fullscreen mode; pressing **Escape** while in fullscreen exits the presentation entirely.

When collaborators add, remove, or reorder slides while the presenter is open, the presenter picks up those changes automatically. The slide list and page counter update to reflect the current deck, and cached renders are refreshed whenever a peer edits a slide you have already loaded.

## Deck styling

Click **Settings** in the deck toolbar to configure styling that applies across all slides. Options include color theme, font family, layout template, and cover treatment. You can also configure which logos appear on cover slides, headers, and footers.

When choosing a color theme, click **More themes…** next to the color theme label to open the theme picker modal. The modal displays all available standard and special color themes as side-by-side previews rendered on a sample content slide, so you can compare them before committing. Select a theme card to apply it and close the modal. A **Custom** card lets you enter a hex color code to derive a full theme from your organization's brand color.

![Deck Styling](/images/deck-styling-en.png)

## Collaborating on a slide deck

When multiple people have the same slide deck open, each person's cursor appears as a colored arrow with their name on the slide canvas. You can also see who is currently editing a specific slide - a small presence avatar appears at the bottom of slide thumbnails in the rail. Avatar icons in the deck toolbar show who else has the deck open at the same time. This makes it easy to coordinate without overwriting someone else's work.

When a slide is open for editing, text fields for the slide title, header, and other root-level text are collaboratively bound: remote collaborators' carets appear inside the same text field you are typing in, so you can see exactly where they are. Body text blocks on content slides work the same way.

The AI assistant will not edit a slide that another collaborator currently has open in the editor, to avoid overwriting live in-progress changes. If you ask the AI to modify a slide being edited by a colleague, it will let you know and wait for you to try again once the slide is free.

## Undo and redo in the slide editor

The slide toolbar includes **Undo** and **Redo** buttons. These reverse your own slide changes - adding blocks, changing layouts, moving visualizations, and text typed in any text field on the slide - without affecting edits made by collaborators. The buttons appear only when you have permission to edit the deck. You can also use Ctrl+Z and Ctrl+Shift+Z (or Cmd+Z and Cmd+Shift+Z on Mac) as keyboard shortcuts; these work both while focus is on the slide canvas and while you are typing inside a text field on the slide.

## Copying slides between decks

To copy slides from one deck to another, select the slides you want in the slide rail, then open the deck's overflow menu and choose **Copy to deck…**. A dialog lets you pick the destination deck. The slides are copied with their visualizations intact; the visualizations will resolve under the destination deck's own results package and scope.

## Version history

Click **Version history** in the deck's overflow menu to open the version history panel. Versions are saved automatically at the end of each editing session and grouped by day on the left. Select a version to see a grid of all slide thumbnails as they looked at that point. New, edited, and removed slides are badged with the name of the collaborator who made the change. Click any thumbnail to open a full-size view; edited slides also show a breakdown of which text fields and blocks changed within that session.

The change breakdown now detects layout changes more precisely. Wrapping blocks into columns, unwrapping a container, or resizing a layout container are all reported as arrangement changes in the session diff, even when the order of the individual content blocks did not change.

Use **Restore** to reset the deck to that version (your current content is saved as a new version first), or **Restore as copy** to create a new deck from the snapshot.

If the deck has unsaved live edits that cannot be saved at the moment you request a restore, FASTR will let you know and ask you to retry once saving has recovered.

## Exporting and sharing
<!-- help#deck-export -->

Click **Download** to export your deck. **Native PDF** produces a high-quality vector file where text stays sharp at any zoom level. **PPTX with raster visualizations** creates a PowerPoint file with visualizations embedded as images - useful if recipients need to make edits.

You can also share decks directly by email. Click **Share**, select recipients from your instance's user list or add email addresses, and optionally include a message. FASTR validates email addresses before generating the PDF, so any invalid addresses are flagged immediately rather than after a lengthy export. FASTR generates a PDF and sends it as an attachment.

![Exporting and Sharing](/images/exporting-and-sharing-en.png)

## Organisation

Use folders to keep decks organized as your project grows. In the Products explorer, click **New** and choose **New folder** to create one, then use a deck's card menu to move it. You can duplicate decks when creating variations for different audiences. The search box filters decks by name. Use the sort control to order decks by name or by recently updated.
