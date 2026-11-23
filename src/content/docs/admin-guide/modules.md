---
title: Modules
description: The analysis modules, their settings, and their logs.
sidebar:
  order: 7
---

Modules are the analyses FASTR runs when it generates a results package. Each module is an R script that reads the instance's data, or the output of other modules, and produces results files - outlier lists, adjusted service counts, coverage estimates, survey indicators. Those results become the metrics people use in visualizations, slide decks, and reports.

You don't install or update modules yourself. FASTR offers the same set of modules on every instance, and each new results package runs the current version of each module. Your job is to choose their settings and to check their output when something looks wrong.

## The modules

Modules are grouped by the type of data they use. Within each group, one primary module produces the main results, and supporting analyses feed it or add to it.

| Data | Module | What it does |
|---|---|---|
| HMIS | **Service utilization** (primary) | Service volumes and indicator values for each area and period. Indicators whose formulas use population terms need population data - see [Indicators](/admin-guide/indicators/). |
| HMIS | **Data quality assessment** | Outliers, reporting completeness, and internal consistency between related indicators. |
| HMIS | **Data quality adjustments** | Service counts adjusted for outliers and for incomplete reporting. |
| HMIS | **Disruption detection** | Expected service volumes, to show where services fell short. |
| HMIS | **Coverage denominators** | Target populations used to calculate coverage. |
| HMIS | **Coverage estimates** | Coverage of key services, compared with survey estimates. |
| HFA | **Health facility assessment** | Indicators from the health facility assessment survey rounds. |
| ICEH | **ICEH survey analysis** | Equity indicators from ICEH survey data. |

Some modules need others to run first. Data quality adjustments needs the data quality assessment, and disruption detection, service utilization, and coverage denominators all use the adjusted counts. Coverage estimates needs the coverage denominators. FASTR handles this for you when you generate a package.

For how each analysis works, see the [Methodology](/methodology/00_introduction/) section.

## Configuring module defaults
<!-- help#amod-configure -->

Module settings - thresholds, which indicators to check, which admin level to analyse at - are set in one place and used by every results package you generate. You need the **Configure data** permission.

On the **Results** page, click **Module defaults**. The modules that have settings are listed on the left, grouped by data type. Select one to see its settings on the right.

Every setting starts at the default chosen by the module's authors. When you change one, it is marked **Differs from default**, with the default value beside it and a button to put it back. The list on the left shows how many settings you have changed in each module. **Reset to definition defaults** puts every setting in the current module back, and **Reset all to definition defaults** does the same for every module.

Click **Apply** to save your changes, or **Cancel** to discard them. New settings apply to the next package you generate; existing packages keep the settings they were generated with.

![Module defaults](/images/modules-defaults-en.png)

## Choosing modules when you generate
<!-- help#amod-install -->

The second step of the generate wizard, **Configure modules**, lists every module by data type. Every module the chosen data can run starts ticked. When you tick a module, the modules it depends on are ticked too, and you can't untick a module while another ticked module needs it - the list shows which modules require it.

A module is greyed out if it needs data you didn't choose in the first step, with a note naming the missing data. Go **Back** to add it.

The wizard doesn't let you change settings. If a module's stored settings aren't valid, the wizard names the module, and you fix it in **Module defaults** before launching.

See [Results packages](/admin-guide/results-packages/) for the rest of the wizard.

![Configure modules step](/images/modules-wizard-en.png)

## Module execution and status
<!-- help#amod-status -->

While a package is generating, its page shows a progress bar and the latest line of output from the module that is running. Generation runs in the background, so you can leave the page.

When the package is ready, the **Modules** row at the top of its page lists every module it includes, grouped by data type. Click a module to open its logs.

If a module fails, the package fails with it. The page shows **Generation failed** with the logs of the module that stopped, so you can see what went wrong. Fix the cause - often the data or a module setting - and generate a new package.

## Settings, scripts, and logs

Each tab of a package page lists its modules on the left. Select one to see, below its preset visualizations:

- **Settings** - the setting values this package was generated with.
- **Script and logs** - **Script** shows the exact R code that ran, and **Logs** shows its console output, including warnings and errors.
- **Output files** - the results files the module produced, which you can download for your own checks.

Script, logs, and files need the **View data** permission.

![A module's settings, script, logs, and files](/images/modules-package-module-en.png)

Logs are the first place to look when a module's results seem wrong. They show each step the script took, how much data it found, and any warnings it raised along the way.

![Module logs](/images/modules-logs-en.png)
