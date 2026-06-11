---
title: Projects
description: Creating and configuring analysis projects.
sidebar:
  order: 6
---

Projects are the primary workspace for analysis in FASTR. Each project brings together a subset of your instance data with a specific set of analytical modules, producing visualizations, reports, and slide decks for a focused purpose. You might create separate projects for different time periods, geographic regions, or program areas.

## Creating a project
<!-- help#aproj-create -->

Any user with the "Create projects" permission can start a new project from the home screen. Click **Create project**, enter a name that identifies the project's scope, and the system will set up an isolated workspace with its own database.

New projects start empty - no modules installed, no data windowed. Your next steps will typically be to enable the modules you need and configure the data window.

:::caution[Screenshot needed]
Create project dialog showing the project name field.
:::

## Configuring the data window
<!-- help#aproj-data-window -->

The data window determines which subset of your instance's data flows into the project. When you import HMIS data at the instance level, all of that data becomes available for windowing into projects - but each project can select a different slice.

Open the project and navigate to **Data** in the left sidebar. Here you'll configure what data the project can access across several dimensions.

**Time period** defines the months or years to include. A chart displays record counts by month, helping you visualize data availability. Use the period selectors to set your start and end bounds - records outside this range won't appear in module results or visualizations.

**Indicators** can be filtered to include only what's relevant for your analysis. If you're focused on maternal health, for example, you might exclude unrelated indicators to keep metrics lists manageable. Toggle "Include all indicators" for the full set, or select specific indicators when you need a narrower focus.

**Administrative areas** let you restrict the project to specific regions or districts. This is useful when running separate analyses for different subnational units, or when certain areas have data quality issues you want to exclude while investigating.

**Facility types and ownership** provide additional filtering when your instance includes these facility attributes. You might window to only public facilities, or focus on hospitals while excluding lower-level health posts.

**HFA service categories** control which HFA indicators are included when HFA data is enabled for the project. When you enable or re-configure the HFA dataset, a settings dialog lets you choose to include all service categories or restrict to a specific selection. Only indicators tagged with a selected service category are imported into the project. Leave the setting on "Include all" if you want every HFA indicator regardless of service category.

:::caution[Screenshot needed]
Data windowing interface showing the time period chart with selectors, and the indicator selection panel.
:::

## Managing project users and permissions

Project access is controlled through a granular permission system. Click **Settings** in the left sidebar, then scroll to **Project users**. The table shows all instance users and their current role in this project.

FASTR organizes permissions into three categories:

- **Analytical Products** covers viewing and configuring visualizations, reports, and slide decks
- **Data & Modules** includes viewing data, metrics, and logs, plus configuring and running modules
- **Project Administration** handles settings, user management, and backup operations

Click the edit button next to any user to modify their permissions. You can toggle individual permissions or use presets like "Viewer" or "Editor." Instance administrators automatically have full access to all projects.

For bulk changes, select multiple users using the checkboxes, then click **Edit permissions**. The bulk editor uses a three-state toggle - unchanged, grant, or revoke - letting you modify specific permissions without affecting others.

:::caution[Screenshot needed]
Project users table with permission columns and edit buttons.
:::

## Locking projects
<!-- help#aproj-lock -->

When an analysis is complete, you can lock the project to preserve its state. A locked project prevents changes to modules, data configuration, and visualizations while still allowing users to view reports and export outputs.

In project **Settings**, find the **Project lock status** section and click **Lock project**. The project card on the home screen will display a lock icon. To resume editing, return to settings and click **Unlock project**.

## Copying projects

Sometimes you need a project similar to an existing one - perhaps the same modules but for a different time period. Rather than starting from scratch, copy the original.

Open the source project, go to **Settings**, and click **Copy project**. Enter a name for the new project. The copy runs in the background and may take several minutes for large projects. The new project appears on the home screen once complete, with all module installations, parameter settings, visualizations, and reports included.

:::caution[Screenshot needed]
Copy project dialog showing the new project name field.
:::

## Project AI context

FASTR's AI assistant can interpret charts and suggest insights, but its responses are more useful when it understands the project's context. In **Settings**, you can set a **Project context for AI interpretation** - a description of what this project analyzes or the questions it aims to answer. A few sentences about the project's purpose can significantly improve the quality of AI-assisted analysis.
