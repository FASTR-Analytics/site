---
title: Slide decks
description: Building slide decks and exporting documents.
sidebar:
  order: 5
---

Slide decks let you assemble visualizations into polished presentations for stakeholders. Instead of exporting individual charts and manually arranging them in PowerPoint, you build the deck directly in FASTR - complete with consistent styling, cover pages, and section dividers. When you're done, export the whole thing as a PDF or PowerPoint file.

## Creating a slide deck
<!-- help#deck-create -->

Open your project and click **Slide decks** in the left sidebar. Click **Create slide deck** to start. You'll name it and optionally assign it to a folder for organization.

A new deck starts empty. The left panel shows your slides, and the main area shows a preview of the selected slide. You'll build out the deck by adding different slide types.

:::caution[Screenshot needed]
Empty slide deck view showing the slide list panel on the left and the main preview area.
:::

## Slide types

Decks contain three types of slides. **Cover slides** introduce the presentation with a title, subtitle, optional presenter name, and date. **Section slides** divide content into logical groups with a section title. Both use a bold, full-bleed design. **Content slides** are where your data lives - these contain visualizations, text, and images.

When you add a slide, you choose its type. You can convert between types later using the dropdown in the editor.

## Building content slides
<!-- help#deck-content-slides -->

Content slides use a flexible layout system with one or more content blocks. A block can hold text (formatted with markdown), a visualization from your project, or an uploaded image.

To add a visualization, click on an empty figure block and choose **Select visualization**. Select one from the list and it appears in the block, rendered with its current settings. If you need to adjust the display - different time period or disaggregation - you can edit the embedded visualization directly from the slide.

Right-click on a block to access layout options like "Split left/right" or "Delete block." You can drag dividers between blocks to adjust their relative sizes.

If a visualization or image cannot be rendered - for example because of a data error or a missing file - FASTR shows a short notice in the block rather than leaving it blank or stopping the export.

:::caution[Screenshot needed]
Content slide editor showing a two-column layout with text on the left and a visualization on the right.
:::

## Deck styling

Click **Settings** in the deck header to configure styling that applies across all slides. Options include color theme, font family, layout template, and cover treatment. You can also configure which logos appear on cover slides, headers, and footers.

:::caution[Screenshot needed]
Slide deck settings panel showing style options and color theme picker.
:::

## Exporting and sharing
<!-- help#deck-export -->

Click **Download** to export your deck. **Native PDF** produces a high-quality vector file where text stays sharp at any zoom level. **PPTX with raster figures** creates a PowerPoint file with visualizations embedded as images - useful if recipients need to make edits.

You can also share decks directly by email. Click **Share**, select recipients from your instance's user list or add email addresses, and optionally include a message. FASTR generates a PDF and sends it as an attachment.

:::caution[Screenshot needed]
Download dialog showing PDF and PPTX export options.
:::

## Organization

Use folders to keep decks organized as your project grows. In the list view, click **New folder** to create one, then right-click on decks to move them. You can duplicate decks when creating variations for different audiences. The search box filters decks by name.
