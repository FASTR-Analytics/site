---
title: Slide decks
description: Building, presenting, and exporting slide decks.
sidebar:
  order: 5
---

Slide decks let you build a presentation directly in FASTR, with live visualizations drawn from your results package. Instead of exporting charts one by one and arranging them in PowerPoint, you build the deck in one place with a consistent theme, then present it from the browser or download it as a PDF or PowerPoint file.

## Creating a slide deck
<!-- help#deck-create -->

On the **Products** page, click **New** and choose **New deck**. Give the deck a name, choose a folder, results package, and scope, and click **Create** - see [Products](/user-guide/products/) for what the package and scope mean.

The deck opens straight away and asks you to choose a theme. Pick one and click **Apply theme**; you can change it later from the **Deck** menu.

## The deck editor

The editor has a **slide rail** on the left, listing your slides as thumbnails, and the open slide beside it. Above them, the header holds the deck name (click it to rename), the package and scope label, the save status, **Present**, and **History**. Below the header is a row of menus - **Add slide**, **File**, **Deck**, and, for the open slide, **Slide**, **Insert**, and **Split panel** - and a formatting toolbar.

In the rail, click a card to open that slide and drag cards to reorder them. Select several slides with Ctrl/Cmd-click or Shift-click, and right-click to duplicate or delete them.

There is no Save button. Changes save as you work, and other people can edit the same deck with you at the same time. **Undo** and **Redo** in the toolbar (or Ctrl/Cmd+Z) only affect your own changes.

![Slide deck editor](/images/slide-decks-editor-en.png)

## Slide types

Click **Add slide** and choose a slide type. A **Cover slide** opens the presentation with a title, subtitle, presenter, and date. A **Section slide** divides the deck into parts. A **Content slide** is where your data lives - it holds text, visualizations, and images.

To change the type of the open slide, use **Slide** > **Slide type**. If you switch and then switch back, the earlier content returns.

## Building content slides
<!-- help#deck-content-slides -->

A content slide is made of one or more blocks. Each block holds text, a visualization, or an image - choose with **Content type** in the toolbar when a block is selected. To change the layout, click **Layout** (or right-click the slide) and use **Split** to divide a block into rows or columns, **Add** to insert a column or row next to it, **Move** to shift it, or **Delete this cell**. Drag the dividers between blocks to resize them, and drag one block onto another to swap them.

To write, double-click a text block or title and type directly on the slide. The toolbar has text styles, bold, italic, lists, and quotes. Body text resizes itself to fit its block.

Use **Insert** to add the slide's header, sub-header, date, or footer. **Split panel** adds a coloured, patterned, or image panel down one side of a content slide.

![Layout menu on a content slide](/images/slide-decks-layout-menu-en.png)

## Adding visualizations
<!-- help#deck-visualizations -->

Select an empty visualization block and choose either:

- **Insert new visualization** - pick a metric and a preset, then adjust it in the visualization editor. See [Visualizations](/user-guide/visualizations/).
- **Insert existing visualization** - pick one of the saved visualizations on the Products page. FASTR inserts a copy, so later changes to the saved visualization don't affect the slide, and changes on the slide don't affect the saved one.

Once a block holds a visualization, select it and use **Edit visualization** to change its period, filters, or styling, or **Replace visualization** to swap it for another.

If the deck is moved to a newer results package, its visualizations are marked as out of date. Update them one at a time from the badge on each block, or all at once with **Update all visualizations** in the header.

## Deck themes and settings

The **Deck** menu controls how the whole deck looks. **Theme** offers a set of ready-made designs. **Logos** chooses which logos appear on cover slides, content headers, and footers. **Footer & page numbers** sets one footer for every content slide and turns page numbers on or off. Changes apply immediately. **All deck settings…** opens the same options on a single screen.

## Copying slides to another deck

To reuse slides, select them in the rail and choose **File** > **Copy N slides to deck…**. Pick a destination deck you can edit and click **Save**. Visualizations are copied as they are; if the destination uses a different package or scope, they show an update button there.

## Presenting
<!-- help#deck-present -->

Click **Present** to show the deck full screen. Use the arrow keys, Space, or Page Up and Page Down to move between slides, and Esc to leave.

## Downloading and sharing
<!-- help#deck-export -->

Choose **File** > **Download…** to export the deck. **Native PDF** is recommended - text stays sharp at any zoom. **Native PPTX with raster visualizations** creates a PowerPoint file in which charts are images, useful when someone needs to edit the slides.

To email the deck, choose **File** > **Share…**. Select people from the instance or type email addresses, add an optional message, and click **Send**. Each recipient receives the deck as a PDF attachment.

Viewers can also present, download, and share a deck, and can copy its slides into a deck of their own.

![Download slide deck dialog](/images/slide-decks-download-en.png)
