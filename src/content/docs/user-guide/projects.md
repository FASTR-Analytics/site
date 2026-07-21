---
title: Projects
description: Navigating projects and understanding data windows.
sidebar:
  order: 1
---

A project is your workspace for analysis in FASTR. It contains a defined slice of your organization's health data, analytical modules that process that data, and the visualizations and reports you create from the results. Understanding how projects work helps you find what you need and make sense of what you're seeing.

## Opening a project
<!-- help#uproj-open -->

When you sign in to FASTR, you'll see a list of projects you have access to. The list can be sorted by name or by recently updated using the sort control at the top. Click any project name to open it. The project view has a navigation sidebar on the left with tabs for different sections - typically **Slide decks**, **Visualizations**, **Modules**, **Data**, and **Settings**. What you see depends on your permissions; viewers won't see configuration options, for example.

The project name appears at the top of the screen alongside a status indicator. This indicator shows whether analytical modules are up to date or if something is currently processing. A green checkmark means everything is current. A spinning indicator means modules are running. If you see a warning or error symbol, some module needs attention - usually because upstream data changed or a configuration issue occurred.

:::caution[Screenshot needed]
Project view showing the navigation sidebar and project header with status indicator.
:::

## Understanding the data window
<!-- help#uproj-data-window -->

Every project works with a specific subset of your organization's data. This subset is called the **data window**, and it defines the boundaries of everything you can analyze or visualize within that project.

The data window typically includes three constraints. The **time period** specifies which months or years of data are available - for example, January 2022 through December 2024. The **geographic scope** determines which admin areas and facilities are included, allowing projects to focus on specific regions or facility types. The **indicators** filter controls which health indicators (like ANC visits or vaccination counts) the project can access.

To see your project's data window, look at the **Data** tab in the navigation. It shows when data was last exported into the project and summarizes the current settings - time range, included admin areas, facility types, and selected indicators.

:::caution[Screenshot needed]
Data tab showing HMIS data window summary with time period, admin areas, and indicator list.
:::

Why does this matter? When you create visualizations, you can only work with data inside your window. If you filter a chart to March 2021 but your project's time period starts in January 2022, you'll see no data. If a colleague's visualization shows different results than yours, check whether your projects have different data windows - that's often the explanation.

## Data freshness and updates

Your project's data is a snapshot. When your administrator uploads new data at the instance level, your project doesn't automatically update. Instead, the Data tab shows a warning indicating what changed - new monthly data, structure updates, or indicator mapping changes.

Updating project data is an administrative task. If you see a staleness warning and need current figures, contact your project administrator. When they refresh the data, all modules re-run automatically to incorporate the changes.

## Locked projects
<!-- help#uproj-locked -->

Administrators can lock a project to prevent changes. A locked project works normally for viewing - you can browse visualizations, export images, and generate reports. But you can't create new visualizations, modify existing ones, or change any settings.

Locking is useful when you've finalized an analysis and want to preserve it exactly as-is - for example, before sharing results with external stakeholders or archiving for future reference. If you need to make changes to a locked project, contact your administrator to unlock it.

## Collaborating in real time

When multiple people have a project open at the same time, you can see who else is present. Live cursors show where your colleagues are pointing on the Visualizations, Slide decks, Reports, and other tab pages - each person's cursor appears as a colored arrow with their name. The same presence indicators appear as small avatar icons on visualization cards, slide deck cards, and report cards, so you can see at a glance who is editing what before you open it.

If you lose your connection to the collaboration server, a banner appears at the top of the screen letting you know. Your edits continue to save normally; the banner disappears and shows a brief "Live again" confirmation once the connection is restored.
