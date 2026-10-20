---
title: Reports
description: Writing long-form documents with embedded live figures.
sidebar:
  order: 6
---

Reports are long-form documents you write inside FASTR - a quarterly review, a country brief, an analytical narrative. You write the text in markdown and drop in live visualizations, so the charts in the document stay tied to your data instead of being pasted-in pictures that go stale. When the report is ready, export it as a PDF, a Word document, or an HTML file.

A report is the right tool when you need prose around your numbers. If you mainly want charts on a page, a [dashboard](/user-guide/dashboards/) fits better; if you're presenting to a room, a [slide deck](/user-guide/slide-decks/) does. Reports are for the written word.

## Creating a report
<!-- help#report-create -->

Open the **Products** tab on your instance home screen. Reports appear as cards in the product explorer alongside slide decks. Click **New** and choose **New report** to create one — the editor opens straight away with the new report ready to write. You can organise reports into folders using **New folder**, and move them between folders from their card menu.

## Writing in the editor

The editor uses FASTR Markdown, so you write plain text and format it with simple marks - `#` for headings, `-` for bullet lists, `1.` for numbered lists, and pipes for tables. Bold, italic, and inline code work the way they do anywhere else. FASTR Markdown also supports `:::` blocks for callouts, stat tiles, bands, cover pages, and other structured content — the **Widgets** menu lists them all.

Your work saves on its own as you type. A status indicator in the header shows where things stand - **Saving** while a change is in flight, **Saved** with the time of the last save once it lands, and a clear error state if a save ever fails so you know to check your connection rather than lose work.

When live collaboration is active, the save indicator changes: it shows **Live** with a green dot while edits are streaming to the server continuously, **Offline — reconnecting…** with a yellow dot if the connection drops, and **Not saving — retrying…** with a red dot if the server-side checkpoint is failing. In Live mode the REST autosave is replaced by the room's continuous checkpoint, so the indicator no longer cycles through Saving/Saved.

## Edit mode

FASTR Markdown reports open directly in **Edit** mode — the finished page layout is what you see as you type. The markdown editor and the rendered preview are one and the same: page boxes, live visualizations, and all block styling appear in place while you write, so there is no separate View or Split toggle for this format.

Older plain Markdown and HTML reports retain the **Edit / Split / View** toggle. **Edit** shows the markdown source. **Split** shows the editor and rendered preview side by side. **View** renders the report as it will read when finished.

![Edit and View Modes](/images/edit-and-view-modes-en.png)

## The toolbar

FASTR Markdown reports include a toolbar above the editor with two rows. The **menu row** contains **File**, **Widgets**, **Figures**, and **Page** menus. The **toolbar row** is a persistent row of formatting controls that adapts to the cursor's context.

The **File** menu holds whole-document operations: download, email, rename, and duplicate. The **Widgets** menu lists every block type you can add — headings, callouts, stat tiles, tables, links, logos, cover pages, and more. The **Figures** menu lets you insert a visualization or an image. The **Page** menu controls the document's theme, background, orientation, and numbered sections.

The toolbar row shows text controls (heading style, bold, italic, underline, text size, highlight, link, text colour, and list types) whenever no embed is selected. When the cursor sits inside a `:::` block, the block's name and its own controls (tone, columns, kind, and similar attributes) appear appended to the right of the text controls. When a visualization or image is selected, the embed's controls replace the text controls.

## Adding visualizations and images
<!-- help#report-figures -->

Reports hold two kinds of visual content, and the difference matters. A **visualization** is a live chart or map from the product's results package - it renders from current data and updates when that data changes. An **image** is a static file you upload, such as a diagram or a photo.

To add a visualization, open the **Figures** menu and choose **Visualization…**, then pick a visualization from the product's results package. To add a picture, choose **Image…** and upload a file or choose one from your project's assets. Either way, the item appears in the document as a card you can select.

Selecting a visualization or image reveals controls in the toolbar for working with it:

- **Edit visualization** opens the visualization's settings - adjust the period, disaggregation, or styling
- **Switch** replaces the visualization with a different one
- **Delete** removes the visualization or image from the report

Because visualizations stay linked to the results package, a report you wrote last quarter shows this quarter's numbers the next time you open it - no manual updating, no re-pasting charts.

If a visualization or image cannot be loaded when you export the report, FASTR replaces it with a short notice in place of the missing item rather than aborting the export. The rest of the report exports normally.

![Adding Figures and Images](/images/adding-figures-and-images-en.png)

## Adding logos

FASTR Markdown reports support a **Logos** block that renders a row of logos — your organization's, partners', or FASTR's. Insert one from the **Widgets** menu. Clicking an empty logos row, or double-clicking one that already has logos, opens the logo picker where you choose which logos appear and in what order. The picker shows FASTR's built-in logos and all image files you have uploaded to the instance. Upload a new logo directly from the picker using **Upload logo**. Drag items in the chosen list to reorder them.

When a logos block is selected, the toolbar shows alignment and size controls for the row.

## Report settings

Click **Settings** in the report header to open the report settings panel. Here you can change the report's name and move it to a different folder. To change the results package or geographic scope, click **Results package and scope…** from the report's card menu. Changing the package or scope affects every visualization in the report — visualizations that came from a different package or scope show an update badge.

## Choosing a theme

FASTR Markdown reports have a design theme that controls fonts, colours, and the look of every block. Open the **Page** menu and choose **Theme** to switch between built-in themes with a quick preview, or choose **All themes and saved styles…** to open the full theme picker where real stylesheet previews are shown side by side. You can re-theme a report at any time without touching the body text.

On a new report that still holds only its title, the theme picker offers a second step: a template gallery. Templates give the report its sections and blocks, with grey guidance text in each slot to type over. The AI assistant is told which template you chose and writes to its shape. Pick a template and click **Use template** to apply it, or click **Skip** to start with a blank page. You can open the theme picker again at any time from the **Page** menu — the template step only appears while the report body is still empty.

The theme picker also shows any custom styles saved by your instance's administrators. A custom style gives the AI a specific design brief when writing or restructuring HTML reports, or a colour palette for FASTR Markdown reports. Saved styles appear alongside the built-in themes in the picker.

## Collaborating on a report

When multiple people have the same report open, you can see where colleagues are working. Live cursors appear on both the code editor pane and the rendered preview, so you know at a glance whether someone else is editing the section you are about to change. A small presence avatar also appears on the report card in the list view. Collaborators who are currently viewing the same report appear as avatar icons in the header.

The editor is collaborative: remote collaborators' text selections are highlighted in their color, and hovering over a highlighted selection shows the person's name. When the AI assistant proposes a text edit that you accept, the change is rebased over any concurrent edits your colleagues made while the proposal was open - if a hunk could not be applied cleanly, the assistant lets you know which lines were skipped.

When a collaborator has a visualization selected, a colored presence border appears around that visualization in both the editor and preview panes, with their name shown above it. If they have the visualization editor open, the border is labeled with an edit indicator so others know the visualization configuration is being actively changed.

## Version history

Click **History** in the report header to open the version history panel. Versions are saved automatically at the end of each editing session and grouped by day on the left side. Select any version to see a diff of what that session changed - added text is highlighted in the editor's color, removed text is shown struck through, and hovering over a change shows who made it.

From the version preview you can also switch to a **Preview** view that renders the full report snapshot as it looked at that point. Use **Restore** to reset the report to that version (your current content is saved as a new version first, so nothing is lost), or **Restore as copy** to create a brand-new report from the snapshot while leaving the current one untouched.

If the report has unsaved live edits that cannot be saved at the moment you request a restore, FASTR will let you know and ask you to retry once saving has recovered.

## AI assistance

The **AI** button opens an assistant that can help as you write. It can rewrite a passage you've selected, insert or replace visualizations, and edit existing visualizations in place - for example, changing the replicant a chart displays, adjusting its filters, or updating captions. The assistant proposes text changes for you to accept or reject in a modal before anything is applied; visualization edits are applied immediately to the live preview and saved. See [AI assistant](/user-guide/ai-assistant/) for the full picture.

## Undo and redo

The report toolbar includes **Undo** and **Redo** buttons that reverse your own body-text changes without affecting your colleagues' edits. These buttons appear only when you have permission to edit the report. They operate the same history as the keyboard shortcuts Ctrl+Z and Ctrl+Shift+Z inside the editor.

## Find and replace

Press **Ctrl+F** (or **Cmd+F** on Mac) while the editor is focused to open the find-and-replace panel over the source text. Unlike the browser's own Ctrl+F, this panel reaches text inside collapsed blocks that are not visible in the rendered preview.

## Sharing by email

Click **Email** from the **File** menu to send the report as an email attachment. Enter one or more recipient addresses and an optional message. FASTR attaches the report in its native export format — an HTML file for HTML and FASTR Markdown reports, and a PDF for plain Markdown reports — and sends it on your behalf.

## Exporting
<!-- help#report-export -->

Click **Download** to open the export options. The formats available depend on the report type:

- **Markdown reports** offer **PDF** and **Word (.docx)**. PDF is best for a final, fixed document you're distributing or archiving; Word is best when a colleague needs to edit or comment.
- **FASTR Markdown reports** offer **PDF** (paginated exactly as the editor shows), **Word (.docx)**, and **HTML file**. The PDF has exactly the pages the editor shows. The Word file keeps headings, text, tables and visualizations editable; covers, bands and tiles are pictures with their text in editable boxes on top. The HTML file is self-contained with visualizations embedded as images and reads as one continuous page.
- **HTML reports** offer **HTML file** and **Print / save as PDF**. The HTML file is self-contained. Print opens your browser's print dialog where you can save as PDF.

Live visualizations are rendered into the document at export time.

![Exporting Reports](/images/exporting-reports-en.png)

## Common issues

**A visualization shows nothing or looks wrong**: The visualization behind it has no data for the current window, or its configuration needs a change. Select the visualization and use **Edit visualization** - see [Visualizations](/user-guide/visualizations/).

**The status says "Save failed"**: A save didn't reach the server, usually a connection issue. Stay on the page, check your connection, and keep editing - FASTR retries; don't close the tab until you see **Saved**.

**The exported file doesn't match what I see**: Export renders the current saved version. Make sure the header shows **Saved**, then download again.

**Restore says saving must recover first**: If the report has live edits that are currently failing to save, the safety version cannot be created until saving resumes. Wait for the **Not saving** indicator to clear, then retry the restore.
