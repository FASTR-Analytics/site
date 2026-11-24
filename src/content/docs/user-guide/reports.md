---
title: Reports
description: Writing long-form documents with live visualizations.
sidebar:
  order: 6
---

Reports are long-form documents you write inside FASTR - a quarterly review, a country brief, an assessment report. You write and format text much as you would in a word processor, and place live visualizations from your results package alongside it. The editor lays the document out as printed pages while you work, and you can download it as a PDF, a Word document, or an HTML file.

A report is the right tool when you need prose around your numbers. If you're presenting to a room, a [slide deck](/user-guide/slide-decks/) fits better.

## Creating a report
<!-- help#report-create -->

On the **Products** page, click **New** and choose **New report**. Give it a name, choose a folder, results package, and scope, and click **Create** - see [Products](/user-guide/products/). The report opens straight into the editor and asks you to choose a theme. Click **Apply theme**; you can change it later from the **Page** menu.

If you leave a new report without adding anything, FASTR asks whether to **Keep** it or **Delete** it.

## The report editor

At the top, the header shows the report's name (click it to rename), its package and scope, who else is editing, the save status, and **History**. Below are four menus - **File**, **Widgets**, **Figures**, and **Page** - and a formatting toolbar with text styles, bold, italic, underline, text size and colour, highlight, links, lists, quotes, tables, and alignment.

The **Report tabs** panel on the left lists your headings. Click one to jump to it.

The report is laid out on A4 pages exactly as it will appear in the PDF, so what you see is what you'll get. Your work saves as you type, and colleagues can edit the same report at the same time - each person's **Undo** only undoes their own changes.

![Report editor](/images/reports-editor-en.png)

## Widgets and page templates
<!-- help#report-widgets -->

The **Widgets** menu adds structured content that would be hard to build by hand:

- **Callout** - a coloured box for a note, good news, or a caution
- **Tiles** and **Statistic** - key numbers displayed prominently
- **Columns** - side-by-side text
- **Pull quote** and **Full-width band** - emphasis and visual breaks
- **Cover page** - a title page, in one of several layouts
- **Logos…** - a row of logos, including the FASTR logos
- **Numbered steps**, **Table of contents**, **Page break**, and **Table**

**Page template** inserts a whole pre-designed page - such as **Executive summary**, **Key findings**, **District profile**, or **Scorecard** - with marked areas for your text and visualizations. Choose where the new page should go, then click into each area to fill it.

When your cursor is inside a widget, the toolbar shows that widget's options, such as the callout type or the number of columns.

## Adding visualizations and images
<!-- help#report-figures -->

Open the **Figures** menu and choose **New visualization…**, **Existing visualization…**, or **Image…**. A new visualization starts with the metric and preset steps described in [Visualizations](/user-guide/visualizations/). An existing visualization is inserted as a copy. Images can be uploaded or picked from your assets, with alt text for screen readers.

Click a visualization in the report to select it. Use **Edit visualization** to change its data or styling, **Replace visualization** to swap it, and **Size** to make it **Small**, **Medium**, **Full width**, or **Edge to edge**.

Visualizations stay linked to the report's results package. When the report moves to a newer package, they show as out of date - update them one at a time or use **Update all visualizations** in the header.

## Themes and page setup

The **Page** menu controls the look of the whole report. **Theme** applies one of a set of designed themes, each with its own fonts and colours; **All themes and saved styles…** shows them all, including any report backbones your administrator has created. The same menu sets the page **Background**, turns **Numbered sections** on or off, and switches **Orientation** between portrait and landscape. **Document details** shows word, heading, and visualization counts.

## Report backbones and house styles

A report backbone is a saved style that tells the AI how to write a report: its look, length, structure, preferred chart types, and voice. When you apply a backbone (through **All themes and saved styles…** in the Page menu), it sets the report's formatting and adds a configuration line to the document body that the AI reads when writing or editing.

Backbones are created by administrators using **New report backbone** in the style picker. They can be drafted by the AI from an example PDF, or measured from the open report. Every setting - theme, cover layout, page furniture, section structure, and writing tone - is editable before saving.

## AI assistance

Open the AI assistant with the **AI** button on the right edge of the screen. In a report it can answer questions about the content, rewrite a section, edit wording, and add or replace visualizations. Select some text first and it works on just that part.

Changes to the text are shown as a proposal first - click **Accept** to apply them or **Reject** to discard them. Asked to write a report from scratch, the assistant first asks about the audience and focus, then proposes an outline before drafting. When a report backbone is applied, the AI writes to its house style automatically. See [AI assistant](/user-guide/ai-assistant/).

## Downloading and sharing
<!-- help#report-export -->

Choose **File** > **Download…** and pick a format:

- **PDF** - exactly the pages the editor shows. Best for a final document you're distributing.
- **Word (.docx)** - a plain, editable document for colleagues who need to edit or comment. Covers, tiles, and other widgets become the text they contain.
- **HTML file (.html)** - a single self-contained web page.

**File** > **Email this file…** sends the report to colleagues as a PDF attachment. **Make a copy…** creates your own copy. People with view access see the report read-only, with a File menu for downloading, emailing, and copying.

![Download report dialog](/images/reports-download-en.png)

## Common issues

**A visualization shows nothing or looks wrong**: Its data or filters need adjusting. Select it and click **Edit visualization** - see [Visualizations](/user-guide/visualizations/).

**The status says "Save failed" or "Not saving - retrying"**: A change didn't reach the server, usually because of the connection. Keep the page open and check your connection; don't close the tab until the status shows the report is saved.

**A block says it continues on the next page**: The content is longer than a page. Shorten it, make a visualization smaller, or add a page break.
