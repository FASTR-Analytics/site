---
title: Modules
description: Understanding module outputs and analytical results.
sidebar:
  order: 2
---

Modules are the analytical engines that transform raw health data into meaningful outputs. They run R scripts behind the scenes to calculate coverage rates, quality scores, trend analyses, and other metrics. As a user, you don't need to write or understand code - you just need to know how to find and work with the results modules produce.

## What modules produce

Each module processes your project's data and generates **results objects** - structured datasets containing calculated values. A data quality module might produce completeness scores for each facility and month. A coverage module might calculate immunization rates by district and quarter. These results become the raw material for visualizations.

Results objects contain **metrics** - the specific values you can visualize. A single module might produce dozens of metrics across several results objects. For example, a data quality module could generate reporting rate, outlier score, and internal consistency metrics all at once. When you create a visualization, you select one of these metrics as your starting point.

:::caution[Screenshot needed]
Modules tab showing two or three installed modules with their status indicators.
:::

## Module status
<!-- help#umod-status -->

The Modules tab shows each installed module and its current state. A status badge next to each module name tells you what's happening:

- **Ready** - Results are current; you can create visualizations immediately
- **Running** - The module is processing data; you'll see progress text as it works
- **Waiting** - The module is queued, waiting for dependencies or data
- **Error** - Something went wrong; view logs for details (requires admin attention)

## When modules re-run

Modules automatically re-run when their inputs change, ensuring visualizations always reflect the latest calculations. Triggers include data refreshes, configuration changes, and upstream module updates. You'll see status indicators update in real-time as modules progress through the queue.

## Viewing module outputs
<!-- help#umod-outputs -->

While you typically interact with module results through visualizations, you can inspect raw outputs directly from the Modules tab. Click the menu button on any ready module to access **Logs** (R console output), **Files** (downloadable CSV results), or **Script** (the R code itself, if you have permission).

:::caution[Screenshot needed]
Module expanded view showing logs and files options in the dropdown menu.
:::

## Metrics and visualizations
<!-- help#umod-metrics -->

The connection between modules and visualizations runs through metrics. When you create a visualization, you first select a metric from a module's results. The visualization then queries that metric according to your configuration choices.

Understanding this chain helps troubleshoot issues. If a visualization shows "no data," check whether the underlying module is ready. If results look stale, check whether modules need to re-run. If you're missing a metric you expected, verify that the relevant module is installed.

Some metrics come with **presets** - preconfigured visualization templates created by the module authors. Presets represent common ways to view that output and are a good starting point when you're unfamiliar with a metric's dimensions.

## Module updates

Modules evolve over time as methodologies improve. The Modules tab shows when updates are available. Applying updates is an administrative task that typically triggers a re-run. If you see "Update available" badges and believe the updates matter for your work, contact your project administrator.
