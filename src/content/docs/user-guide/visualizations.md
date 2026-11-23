---
title: Visualizations
description: Creating and customizing charts, maps, and tables.
sidebar:
  order: 3
---

Visualizations turn the results in a results package into charts, maps, and tables. You can save a visualization as a product of its own on the Products page, or place visualizations inside slide decks and reports. Either way, you build and adjust them with the same editor.

## Visualization types

FASTR offers several types of visualization, each suited to different questions. A **bar chart** compares values across categories - outpatient visits by facility type, or coverage across districts. A **time series** shows how a metric changes over time, which helps spot trends and seasonal patterns. A **map** shows regional variation at a glance. A **table** gives the full numeric detail when you need precise values. A **pie chart** shows how a total divides into parts.

The type you choose depends on the question. "How do our districts compare?" suits a map or bar chart. "What's the exact number for District X in March?" suits a table.

![A bar chart, map, time series, and table](/images/visualizations-types-en.png)

## Creating a visualization
<!-- help#viz-create -->

Every visualization starts with a **metric** - a result produced by one of the package's modules, such as "ANC1 coverage" or "reporting completeness".

To save a visualization as its own product, go to the **Products** page, click **New**, and choose **New visualization**. Choose a results package and scope, click **Next**, and work through three steps:

1. **Metric** - browse by module or search for the metric you want. **Primary results** collects the most-used metrics.
2. **Presets** - pick one of the ready-made views the module provides. Each shows a live preview. Picking a preset creates the visualization straight away.
3. **Configure** - if no preset fits, choose **Custom**, then choose the **Visualization type** and what to **Disaggregate by**.

![The Presets step of the Insert visualization wizard](/images/visualizations-create-en.png)

The visualization is named after its metric and saved to the **General** folder. Rename it from the editor header.

Inside a slide deck or report, the same three steps appear when you insert a new visualization. There, the visualization uses the deck's or report's own package and scope.

## Reusing a saved visualization

When you add a visualization to a slide or report, you can choose **Insert existing visualization** and pick a saved one. FASTR inserts a **copy**. Changes you make to the copy don't affect the saved visualization, and later changes to the saved one don't affect the copy. This lets you build a library of standard charts that people can drop into their own work.

## The visualization editor

The editor shows a live preview on the right and the settings on the left, in three tabs. Changes appear in the preview straight away.

![Visualization editor](/images/visualizations-editor-en.png)

### Data tab
<!-- help#viz-data-tab -->

The Data tab controls what information appears. **Presentation type** switches between table, time series, bar chart, pie chart, and map. In a saved visualization, **Change metric** starts again with a different metric.

**Filter (subset)** narrows the data - most often the **Time period**, such as the last 12 months or the last full calendar year, but also particular areas or indicators. **Display (disaggregate)** breaks the numbers down. Adding facility type to a bar chart, for example, shows separate bars for hospitals, health centres, and dispensaries instead of a single total.

Choose **Different charts (replicants)** for a dimension to make one chart per value - one per region, say. A strip above the preview then lets you pick which one to show, with previous and next buttons to step through them.

When you break results down by admin area, you can add a total row with **Include National results**. The option is only offered where the metric can be added up across areas.

If a visualization looks wrong, the Data tab is usually the first place to check. Too many disaggregations at once often makes a chart cluttered.

### Presentation tab
<!-- help#viz-presentation-tab -->

The Presentation tab changes how the visualization looks without changing the data. Options depend on the type: colour scales, data labels, decimal places, the legend, axis ranges, stacked bars, map projection and region labels, and a custom order for values.

**Conditional formatting** colours values by how good or bad they are. Choose **Indicator** to use the rules set for each indicator by your administrator, **Scale** for a colour gradient, or **Thresholds** to set your own cutoffs with a direction such as **Higher is better**.

### Text tab

The Text tab adds context. The **Caption** is the main title, the **Sub-caption** sits beneath it, and the **Footnote** goes at the bottom - useful for data sources and caveats. You can type `DATE_RANGE` to insert the time period covered, or `REPLICANT` to insert the name of the replicant on show.

Good captions make a visualization self-explanatory. Someone seeing it on a slide shouldn't need to read anything else to understand it.

## Saving

A saved visualization saves automatically as you work, and colleagues can edit it with you at the same time. Use **History** in the header to see and restore earlier versions - see [Products](/user-guide/products/).

When you edit a visualization inside a slide deck or report, the editor shows **Apply** and **Cancel** after you make a change; click **Apply** to put your changes on the slide or page.

## Out-of-date visualizations

When a product is moved to a newer results package or a different scope, or its scope's limits change, the visualizations in it are marked as out of date. A badge shows which package they came from, with a button to update them to the current one. In a deck or report, **Update all visualizations** in the header updates them all at once. Saved visualizations show **Out of date** on the Products page.

## Downloading
<!-- help#viz-download -->

Click **Download** in the editor and choose a format:

- **Image** - a PNG file, with a white or transparent background and with or without margins
- **Aggregated data for the visualization** - a CSV file of the numbers behind the chart
- **Table data (as shown)** - for tables, a CSV laid out as you see it
- **Results file data** - the module's full results file for this metric

## Common issues

**"No data available with current filter selection"**: The filters leave nothing to show, or the package has no data for that period. Widen the time period or remove a filter.

**The chart is cluttered or hard to read**: Remove a disaggregation, filter to fewer values, or try a table instead.

**"Too many data points"**: The visualization would have too many bars or rows to draw. Remove a disaggregation or narrow the period.

**The numbers look old**: The product is on an older results package. Check the package label in the editor header and update if a newer one is available.
