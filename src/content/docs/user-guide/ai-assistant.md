---
title: AI assistant
description: Getting AI-powered insights from your data.
sidebar:
  order: 7
---

The AI assistant helps you explore and interpret your data through conversation. It is available across the entire platform — in slide decks, reports, the Explore page, the Results packages page, the Products page, and individual package views — so you can ask questions wherever you are working.

## Opening the assistant
<!-- help#ai-open -->

Click the **Ask AI** button at the bottom-right edge of the screen to open the assistant panel. The panel slides in alongside your current view. To close it, click the chevron button in the panel header or click the **Ask AI** button again.

The panel remembers whether you left it open or closed. If you closed it in a previous session, it stays closed until you open it again; if you left it open, it reopens automatically on your next visit.

The assistant is context-aware: each message tells it the current view and, where a results package is in view, the package and scope every data read resolves under. You do not need to specify which package to use.

![Opening the Assistant](/images/opening-the-assistant-en.png)

## Asking questions
<!-- help#ai-ask -->

Type your question in the input field at the bottom of the panel. The assistant can explain what specific metrics measure, describe patterns in your data, answer questions about module outputs, and help draft narrative content for reports.

Good questions are specific. Instead of "tell me about the data," try "what does the OPD utilization rate in Region X look like compared to last year?" The more context you provide, the more useful the response.

## The prompt library
<!-- help#ai-prompt-library -->

The prompt library contains pre-written prompts for common analysis tasks. Click the menu icon in the AI panel header and select **Prompt library** to browse. Prompts are organized by category - interpretation, comparison, data quality checks, and more.

When you select a prompt, you can customize it before running. You can also save your own prompts to the library for reuse. Prompts can be saved as **My prompts** (private, visible only to you) or **Country prompts** (shared with all users in your instance). Only administrators can save country-scoped prompts.

![Prompt Library](/images/prompt-library-en.png)

## Attaching documents

You can attach PDF documents to a conversation to give the assistant additional context - for example, a policy brief, a protocol, or a background report. Click the document icon in the chat input area to open the document selector.

The selector shows PDF files available in your instance's assets. Select one or more files to attach them, or upload a new PDF directly from your device. Documents you attach are pending until you send your next message. Pending attachments appear as chips in the input area and can be removed before sending by clicking the **×** on each chip.

Once a message is sent with attachments, those documents are shown in the conversation history without a remove option - they have already been sent to the assistant. Pending attachments that have not yet been sent can still be removed.

Each conversation tracks its own set of attachments. When you switch to a different conversation, the pending attachments update to reflect that conversation's state.

## Working with slides

The assistant is particularly helpful when building slide decks. You can ask it to draft content for slides, suggest visualizations that support a narrative, or help structure your presentation. It knows which slides you've already added and can reference available metrics.

When you ask the assistant to create a slide, it drafts the content and shows a preview. If the deck is currently open and you can edit it, you can add the draft to it directly from the preview card.

When working in the deck editor, the assistant can read the open slide's current content — including any unsaved edits shown on the canvas — and modify slides throughout the deck. It can change text, update layouts, tweak existing visualizations (replicant, filters, disaggregation, period, captions), and edit any slide in the deck whether or not it is currently open, saving those changes immediately. For the open slide, changes appear on the canvas at once and save automatically.

When the assistant creates a content slide that includes a figure built from a metric with multiple indicators, it filters the figure to the indicators named in the slide's text. An unfiltered multi-indicator metric draws one panel per indicator, which can overflow the slide's layout.

Every visualization in a slide deck is resolved under that deck's own results package and scope. When the assistant creates or edits a visualization, it uses the deck's attached package automatically — you do not need to specify which package to use.

## Working with reports

In the report editor, the assistant can rewrite passages, insert new visualizations, and edit existing visualizations in place. When you ask it to change text, it proposes a diff in a modal that you accept or reject before anything changes. When you ask it to edit a visualization - for example, to change its replicant or period filter - it applies the change directly to the live preview and saves immediately, without a diff step. To replace a visualization with a completely different chart or metric, ask the assistant to replace the visualization rather than edit it.

Every visualization in a report is resolved under that report's own results package and scope. When the assistant inserts or replaces a visualization, it uses the report's attached package automatically.

When you open a new report that has not yet had any content added, the assistant works through a brief, outline, and draft sequence before writing. It first asks a few short questions about the intended audience, length, and focus; then looks at the relevant data; then proposes an outline for your approval before writing the full document. If you prefer to skip straight to a draft, just say so.

## Listing products

On the Products page, you can ask the assistant to list every product you can see, along with its folder, results package, scope, and your access level. The assistant cannot open products for you — you do that by clicking them — but it can describe what is available and help you decide where to find what you need.

## Conversations and history

Each conversation is saved automatically. You can start new conversations and switch between past ones using the menu in the panel header. The assistant remembers what you've discussed within a conversation, so you can build on previous questions.

Only one browser tab can run the AI chat at a time. If you open FASTR in multiple tabs, the tab where the assistant is active shows the full chat; other tabs show a notice. If the active tab is still generating a response, the notice explains that the AI is answering there and asks you to wait before moving the chat. Once it is idle, click **Use it here** to move the chat to the current tab.

## Usage limits

AI usage is subject to daily limits that apply across your instance. A usage indicator at the bottom of the panel shows how much of your daily limit you've consumed. If you reach the limit, wait until it resets - typically at midnight UTC. You can adjust the model, maximum token budget, and reasoning effort in the AI settings panel, accessible from the panel header menu.

## Tips for better results

Ask specific questions rather than broad ones. Reference specific metrics, time periods, and geographic areas when relevant. When asking for interpretation, include context about your audience - "explain this for a ministry presentation" produces different output than "summarize for the technical team."

If you get an unexpected result, try rephrasing. Using the exact metric names and terminology from your modules often helps the assistant find the right information.
