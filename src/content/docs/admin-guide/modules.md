---
title: Modules
description: Installing and managing analytical modules.
sidebar:
  order: 7
---

Modules are the analytical engine of FASTR. Each module runs R scripts that process your project's data - calculating indicators, detecting outliers, generating coverage estimates, or performing other statistical analyses. The results become metrics that power your visualizations and reports. Modules are configured at the instance level through results packages, which are then attached to projects.

## Understanding module architecture

A module has two parts. The **compute definition** contains the R scripts that process data and produce results - these run in isolated Docker containers. The **presentation definition** specifies which metrics the module produces and how they can be visualized.

Modules are included when generating a results package at the instance level. A results package bundles together the outputs of all selected modules for a chosen set of data. Projects serve their visualizations from an attached results package.

## Configuring module defaults
<!-- help#amod-configure -->

Instance administrators can set default module selections and parameter values that pre-fill the results package generation wizard. Navigate to **Results packages** at the instance level and click **Module defaults**. Select which modules are pre-checked by default and set default parameter values for each. These defaults apply to every new package configuration but can be overridden when generating any individual package.

## Generating a results package
<!-- help#amod-install -->

To produce module outputs, generate a new results package from the instance **Results packages** page. Click **Generate new results package** to open the wizard. The wizard walks you through three steps: selecting which data families to include (HMIS, HFA, ICEH equity data), choosing which modules to run and configuring their parameter values, and confirming the label and optionally attaching the package to specific projects immediately.

If a configuration is already in progress, a **Resume configuration** button appears instead. Resuming picks up from where you left off.

![Installing Modules](/images/installing-modules-en.png)

### Step 1 — Choose data

Select which data families this results package is generated from. Each included family is captured in full. Only families that have data uploaded to the instance are available for selection.

### Step 2 — Configure modules

Choose which modules to run. Selecting a module automatically includes all modules it depends on; a module cannot be unchecked while another selected module depends on it. Modules that require data families not chosen in step 1 are shown as unavailable. For each selected module, configure its parameter values — the wizard pre-fills defaults from the module defaults settings.

### Step 3 — Confirm and launch

Enter a label for the results package and review the data and module selections. Optionally, select projects to attach the new package to immediately — these projects will switch to the new package when generation succeeds. Click **Launch generation** to start. Generation runs in the background; you can leave the page and follow progress on the Results packages surface.

## Module execution and status
<!-- help#amod-status -->

Each module in a results package displays its current generation status:

- **Ready** means results are available. You'll see timestamps and which data and parameter versions produced the output.
- **Running** indicates the module is currently generating. Progress messages show which step is executing.
- **Error** signals something went wrong during generation.

Once a package is fully generated its status is shown on the results packages catalogue page.

![Module Status](/images/module-status-en.png)

## Viewing logs and diagnostics

When a module errors or produces unexpected results, check the logs from the results package detail view. Access **Logs** to see R console output, warnings, errors, and timing information.

For complex issues, view **Script** to see the exact R code that ran. The **Files** option shows data files the module produced, useful for manual inspection of intermediate results.

## Deleting results packages

To remove a results package, click **Delete** on its card in the instance results packages catalogue. FASTR refuses to delete a package while any project is using it or while it is still generating. The card explains the reason when deletion is blocked. Deletion permanently removes the package's files and cached results and cannot be undone.
