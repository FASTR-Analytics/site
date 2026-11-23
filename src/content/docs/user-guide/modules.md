---
title: Modules
description: Where the results come from, and how to find a module's output.
sidebar:
  order: 2
---

Modules are the analyses behind every number in FASTR. When your administrator generates a results package, each module runs an R script over the instance's data - checking data quality, adjusting service counts for outliers and missing reports, estimating coverage, analysing survey rounds - and stores what it finds. You don't need to write or read code to use the results. It helps to know which module a number comes from when you want to understand it or check it.

## What modules produce

Each module produces **metrics**: the values you can show in a visualization, such as reporting completeness, adjusted service volumes, or coverage of the first antenatal visit. One module can produce dozens of metrics.

Modules are grouped by the type of data they use. **Service utilization** is the main HMIS module, with supporting analyses for data quality, data quality adjustments, disruption detection, and coverage. **Health facility assessment** analyses HFA survey rounds, and **ICEH survey analysis** analyses ICEH equity data. A results package includes only the modules your administrator chose and the data supported, so a module can be missing from one package and present in another.

For how each analysis works, see the [Methodology](/methodology/00_introduction/) section.

## Module status
<!-- help#umod-status -->

A module's results are available when the package it belongs to is **Ready**. Every product shows which package it uses in the label in its editor header - see [Products](/user-guide/products/).

If you have the **View data** permission, the **Results** page lists every package and its status, and opening a package shows the modules it includes. If a package's generation failed, its modules' results aren't available - ask your administrator, who can see what went wrong in the logs.

## When results update

Module results never change inside a package. New results arrive when your administrator generates a new package, usually after importing new data or after a module is improved. Your products keep their package until an editor moves them to a newer one, and their visualizations are then marked as out of date so you can update them.

## Viewing module outputs
<!-- help#umod-outputs -->

The easiest way to look through a module's results is the [Explore](/user-guide/explore/) page, which shows each module's results as ready-made tables, charts, and maps.

If you have the **View data** permission, you can also look behind the results. On the **Results** page, open a package and select a module on the left. Below its preset visualizations you'll find:

- **Settings** - the settings the module ran with, such as outlier thresholds.
- **Script and logs** - the R code that ran, and its console output.
- **Output files** - the module's results files, which you can download.

![A module's settings, script, logs, and files](/images/modules-package-module-en.png)

## Metrics and visualizations
<!-- help#umod-metrics -->

Every visualization starts from one metric. When you create one, you browse metrics by module or search for them, and then choose one of the module's **presets** - ready-made charts, maps, and tables that the module's authors designed as good starting points. See [Visualizations](/user-guide/visualizations/).

Knowing this chain helps when something looks wrong:

- **A metric you expected is missing** - the package doesn't include the module that produces it, or your scope leaves it out.
- **A visualization shows no data** - the package has no results for that metric under the product's scope and filters.
- **The numbers look old** - the product is on an older package. Check the label in the editor header.
