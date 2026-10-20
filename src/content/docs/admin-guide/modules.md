---
title: Modules
description: Installing and managing analytical modules.
sidebar:
  order: 7
---

Modules are the analytical engine of FASTR. Each module runs R scripts that process your project's data - calculating indicators, detecting outliers, generating coverage estimates, or performing other statistical analyses. The results become metrics that power your visualizations and reports. Modules are configured at the instance level through results packages, which are then read by slide decks and reports.

## Understanding module architecture

A module has two parts. The **compute definition** contains the R scripts that process data and produce results - these run in isolated Docker containers. The **presentation definition** specifies which metrics the module produces and how they can be visualized.

Modules are included when generating a results package at the instance level. A results package bundles together the outputs of all selected modules for a chosen set of data. Every slide deck and report reads its figures from an attached results package.

## Configuring module defaults
<!-- help#amod-configure -->

Instance administrators can set default module selections and parameter values that pre-fill the results package generation wizard. Navigate to **Results packages** at the instance level and click **Module defaults**. Select which modules are pre-checked by default and set default parameter values for each.

These defaults configure the generation wizard when a new results package is generated. Module parameter values are set only here and apply to every package that includes the module — they are not editable in the wizard itself.

## Generating a results package
<!-- help#amod-install -->

To produce module outputs, generate a new results package from the instance **Results packages** page. Click **Generate new results package** to open the wizard. The wizard walks you through three steps: selecting which data families to include (HMIS, HFA, ICEH equity data), choosing which modules to run, and confirming the label.

The wizard is an ephemeral modal — nothing is saved to the server before you click **Launch generation**. The entire configuration (data family selections, module choices, and label) is submitted in a single step. If you close the wizard before launching, nothing is stored.

After you click **Launch generation**, the new package's page opens automatically once the SSE notification arrives. You can leave the page and follow progress on the Results packages surface.

![Installing Modules](/images/installing-modules-en.png)

### Step 1 — Choose data

Select which data families this results package is generated from. Each included family is captured in full. Only families that have data uploaded to the instance are available for selection. If a DHIS2 import is currently running, HMIS data is temporarily unavailable and a note explains why — you must wait for the import to finish before generating a package that includes HMIS data.

### Step 2 — Configure modules

Choose which modules to run. The selection list shows every available module organised by data family, with primary modules first and supporting analyses beneath them. Select a module by checking its box. Selecting a module automatically includes all modules it depends on; a module cannot be unchecked while another selected module depends on it. Modules that require data families not chosen in step 1 are shown as unavailable, with a note naming which family is missing so you can go back to step 1 and add it.

If any selected module has parameter values stored in the module defaults that fail validation, those module names are listed below the selection with a prompt to fix them in **Module defaults** before launching. Parameter values are not editable in the wizard.

Available modules include:

- **Disruption detection** — detects service disruptions using a Negative Binomial Bayesian model. Produces observed, expected, lower bound, and upper bound series that power the Bayesian disruptions chart. Requires the data quality adjustments module as a prerequisite.
- **Coverage estimates** — computes coverage estimates. Requires the coverage denominators module as a prerequisite.
- **Indicator values** — computes derived common indicator values by applying each indicator's formula to the summed ingredients from the HMIS extract. Requires the data quality adjustments module as a prerequisite. When population terms are used in indicator formulas, this module uses person-years data from the population store; areas and months not covered by the population store are dropped for those indicators.

### Step 3 — Confirm and launch

Enter a label for the results package and review the data and module selections. The wizard suggests a label based on the current date. Click **Launch generation** to start.

## Population data and indicator values

When one or more indicator formulas reference a population term, the indicator values module requires population data to be imported at the instance level before generation. The generation will fail if population data is referenced but not present for any area of the current HMIS structure at the configured population level.

The population level must be set on the instance Population page and must not be deeper than the HMIS structure's admin area depth. If the population level is deeper than the structure, generation fails with a clear message explaining the mismatch.

For areas and months where population data exists, the module computes the indicator. For areas or months where the population store has no coverage, the module drops those cells for population-dependent indicators rather than failing the whole generation. The results package records which population types were active and what coverage was achieved.

## Deleting results packages in bulk

As you generate packages over time, old ones accumulate. Select the packages you no longer need in the Results packages table and use the **Delete** bulk action. The guard checks each package in turn — packages that are pinned, still generating, or attached to a product are refused with the reason shown, while the rest are deleted. Nothing is refetched after each deletion; the list shrinks live as each package is removed.

## Pinning a results package

Administrators can designate one ready package as the instance's **pinned package**. New slide decks and reports start on the pinned package. Existing products keep their own package unless an editor manually switches them. To pin a package, open its detail view on the Results packages page and click **Pin**. To unpin, click **Unpin** on the currently pinned package.

The pinned package is also the package the FASTR MCP connector reads. When you connect a compatible AI client to your instance's MCP endpoint, it reads metrics and data from whichever package is currently pinned.

## Module execution and status
<!-- help#amod-status -->

Each module in a results package displays its current generation status:

- **Ready** means results are available. You'll see timestamps and which data and parameter versions produced the output.
- **Running** indicates the module is currently generating. Progress messages show which step is executing.
- **Error** signals something went wrong during generation.

Once a package is fully generated its status is shown on the results packages catalogue page. Opening a package from the catalogue shows a status bar with the generation progress, module chips grouped by data family for a ready package, the live R output line while a script is running, which products use the package, and the population stamp if applicable.

![Module Status](/images/module-status-en.png)

## Viewing logs and diagnostics

When a module errors or produces unexpected results, check the logs from the results package detail view. Access **Logs** to see R console output, warnings, errors, and timing information.

For complex issues, view **Script** to see the exact R code that ran. The **Files** option shows data files the module produced, useful for manual inspection of intermediate results.

Script and file access require the **View data** permission; log access requires the **View logs** permission. Both permissions apply whether you are browsing from the instance catalogue or from a product's Results package tab.

## Deleting results packages

To remove a results package, open it from the instance results packages catalogue and click **Delete**. FASTR refuses to delete a package while any product is using it, while it is pinned, or while it is still generating. The detail view explains the reason when deletion is blocked. Deletion permanently removes the package's files and cached results and cannot be undone.
