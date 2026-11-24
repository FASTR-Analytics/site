---
title: Results packages
description: Generating, pinning, and managing results packages.
sidebar:
  order: 6
---

A results package is a complete, fixed set of analysis results. When you generate one, FASTR takes a snapshot of the instance's data, runs the analysis modules over it, and stores everything the modules produce. Every slide deck, report, and visualization reads its numbers from a package, so the **Results** page is where new data becomes available to the people building products.

## Why packages are fixed

A package never changes after it is generated. Importing new data does not alter existing packages - it only affects the next one you generate. This means a report written against the October package keeps showing October's numbers, even after November's data arrives. Authors move their products to a newer package when they are ready, and FASTR marks the affected visualizations as out of date so they can update them.

The trade-off is that new data reaches products only after two steps: you import it, and then you generate a new package.

## Generating a package
<!-- help#results-generate -->

You need the **Configure data** permission to generate a package. On the **Results** page, click **Generate new results package** and work through three steps:

1. **Data** - choose which data to include: **HMIS data**, **HFA data**, and **ICEH equity data**. A type is unavailable if nothing has been imported for it, or while a DHIS2 import is running.
2. **Modules** - choose which modules to run. Every module starts ticked, and any module another depends on is added automatically.
3. **Confirm and launch** - enter a **Label** of up to 20 characters. Today's date is suggested. Labels must be unique.

Click **Launch generation**. The new package's page opens and a progress bar shows each stage - exporting the data, running each module, and publishing the package. Generation runs in the background, so you can leave the page and come back.

Modules reuse earlier outputs where their inputs haven't changed, so a new package is often faster to generate than the first one. Settings for each module come from the **Module defaults** button on the Results page - see [Modules](/admin-guide/modules/).

![Generate results package wizard](/images/results-packages-generate-en.png)

## The results list

The Results page lists every package with the data it contains, its module count, when and by whom it was created, its status, and how many products use it. Statuses are **Generating**, **Ready**, **Failed**, and **Retired**. Click a row to open the package.

## Inside a package

A ready package opens on a page with one tab for each type of data it contains. Each tab lists its modules on the left. Select a module to see its preset visualizations - the default charts, maps, and tables the module provides - and use the **Scope** selector to see how they look under a particular scope.

Each module also shows its **Settings**, its **Script and logs**, and its **Output files**, which you can download. If the package used population data, a **Population** row shows the level and how many areas and months were covered.

If generation failed, the page shows **Generation failed** with the logs of the module that stopped, so you can see what went wrong.

![Results package page](/images/results-packages-package-page-en.png)

## Pinning a package
<!-- help#results-pin -->

One package can be pinned. The pinned package is the default for new products, so pin the package you want people to build on - usually the latest one that looks right.

Open a ready package and click **Pin**. Pinning never changes existing products; they keep the package they were built on. To remove the pin, click **Unpin**. FASTR never pins a package automatically, so after generating a new one you choose when to switch.

## Deleting packages

Packages take up disk space, so delete ones nobody needs. Open the package and click **Delete**, or select several in the list and use **Delete**. A package can't be deleted while it is generating, while it is pinned, or while any product uses it - the page shows the reason in place of the Delete button. Deleting removes the package's files permanently.
