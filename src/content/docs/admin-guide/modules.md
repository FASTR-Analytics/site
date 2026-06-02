---
title: Modules
description: Installing and managing analytical modules.
sidebar:
  order: 7
---

Modules are the analytical engine of FASTR. Each module runs R scripts that process your project's data - calculating indicators, detecting outliers, generating coverage estimates, or performing other statistical analyses. The results become metrics that power your visualizations and reports. You decide which modules to enable based on what questions you need to answer.

## Understanding module architecture

A module has two parts. The **compute definition** contains the R scripts that process data and produce results - these run in isolated Docker containers. The **presentation definition** specifies which metrics the module produces and how they can be visualized.

When you install a module into a project, you create a module instance. This instance tracks its parameter settings, when it last ran, and whether definitions have been updated. Multiple projects can install the same module but configure it differently.

## Installing modules
<!-- help#amod-install -->

Navigate to **Modules** in the left sidebar. The page lists all modules available for your instance, showing which are currently enabled and which are available to install. Modules that are installed display their status - whether they're ready, running, or waiting for data.

To install a module, find it in the list and click **Enable**. Some modules depend on others - you might need to enable a base data quality module before you can enable an outlier detection module that builds on its results. FASTR checks these dependencies automatically and will prompt you to install prerequisites first.

Once enabled, a module typically enters a "waiting" state until its data requirements are met. When your project has data windowed and any prerequisite modules have run, the module will begin processing.

:::caution[Screenshot needed]
Modules page showing a mix of enabled modules with status indicators and available modules with Enable buttons.
:::

## Configuring module parameters
<!-- help#amod-configure -->

Many modules accept parameters that control their behavior. A data quality module might let you set thresholds for outliers. A coverage module might need target population figures.

Click **Settings** on any installed module to view and edit its parameters. The interface varies by module - some have numeric inputs, others have dropdowns or checkboxes. When you save parameter changes, FASTR marks the module as needing to re-run and will process it again automatically.

:::caution[Screenshot needed]
Module settings panel showing parameter inputs like thresholds and dropdown selections.
:::

## Module execution and status
<!-- help#amod-status -->

Each module displays its current status in the module list:

- **Ready** means results are available. You'll see timestamps for definitions and when the module last ran.
- **Running** indicates the module is currently processing. Progress messages show which step is executing.
- **Waiting** means the module can't run yet - the project lacks data or a prerequisite hasn't completed.
- **Error** signals something went wrong. Check the logs for details.

When upstream data changes, downstream modules become outdated and re-process automatically. This dependency tracking keeps results consistent with underlying data.

:::caution[Screenshot needed]
Installed module card showing ready status with definition timestamps and last run time.
:::

## Updating module definitions

Module definitions evolve as methodologies improve or bugs are fixed. FASTR checks for updates when you visit the modules page and shows a badge when updates are available.

Click **Update** on any module to fetch the latest definition, or use **Update all** to refresh every installed module at once. After updating, modules re-run to produce results using the new methodology. The module card shows commit references (short SHA hashes) so you can track exactly which version produced your results.

## Viewing logs and diagnostics

When a module errors or produces unexpected results, check the logs first. Click the three-dot menu on any module and select **Logs** to see R console output, warnings, errors, and timing information.

For complex issues, view **Script** to see the exact R code that ran. The **Files** option shows data files the module produced, useful for manual inspection of intermediate results.

## Disabling modules

If you no longer need a module's results, open the module's menu and select **Disable**. The module's results and visualizations that used its metrics will be removed.

Disabling affects downstream dependencies - modules that depended on it will enter a waiting state. You must disable dependent modules before disabling their prerequisites. Disabling is reversible; you can re-enable a module later and re-run to regenerate results.
