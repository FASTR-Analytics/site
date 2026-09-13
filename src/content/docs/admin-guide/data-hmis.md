---
title: "Data: HMIS"
description: Importing and managing routine health data from CSV files or DHIS2.
sidebar:
  order: 4
---

HMIS (Health Management Information System) data forms the foundation of most health system analyses in FASTR. This data contains routine statistics collected from facilities - service delivery counts, disease surveillance figures, and program performance metrics reported on a monthly basis. Before running analytical modules or creating visualizations, you need to import this data into your instance.

## Import methods

FASTR supports two ways to bring in HMIS data. You can upload a CSV file if you have data exported from another system or prepared manually. Alternatively, if your organization uses DHIS2, you can connect directly and pull data from the live system.

CSV uploads work well for periodic imports or historical data. Direct DHIS2 integration suits regular updates from a live national system, since you can select specific indicators and time periods without manual file preparation.

## Starting an import

Navigate to the **Data** section and select **HMIS Data**. If your account has permission to configure data, the sidebar shows an **Imports** button that opens the imports view. Its tabs are **Current** (the running or queued import), **Future** (scheduled imports), **History** (every past run) and **By indicator** (what has been imported for each indicator). Click **New import** and choose CSV or DHIS2.

Imports run in the background, one at a time. If an import is already running, a new one is queued and starts when the current one finishes.

:::caution[Screenshot needed]
The HMIS data view with the Imports button in the sidebar and the imports view open on the Current tab.
:::

## CSV import workflow
<!-- help#hmis-csv -->

A CSV import has four steps: upload the file, match its columns to the four required fields, map the values in the indicator column to your indicators, and launch. FASTR then stages the file and merges it into the dataset, or pauses for review when rows were dropped.

1. **Upload.** Select a CSV file already uploaded to your instance (its assets), or upload a new one.

2. **Columns.** Match your CSV columns to the four required fields: **Facility id**, **Indicator**, **Period** (YYYYMM format) and **Count**. The interface shows all the file's columns, so you can match them even if your file uses different names.

3. **Mapping.** FASTR reads the file and lists every distinct value in the indicator column with the number of rows that carry it. For each value, choose the indicator its rows belong to, or **Skip this value**. The indicator must already exist in your indicator list (see Indicators); an import never creates one. A value is pre-selected when it matches an indicator's id, ignoring case and punctuation, or when it is exactly a DHIS2 element's DHIS2 id. When a value could match two indicators, nothing is pre-selected and you choose. The same applies when two values would go to the same indicator: within one import, an indicator can take only one value. You cannot continue while a value is undecided, while an indicator is chosen for two values, or while every value is skipped. Your choices are not saved: the next import, even of the same file, starts from the same pre-selection.

4. **Review & launch.** Click **Start import**, or **Queue import** if another import is running. The file must not have changed since the Mapping step read it; if it has, the launch is refused and you have to run the import again from the Upload step.

FASTR then stages the file: it checks the period, the count and the facility on every row and records how many rows it drops, writes each surviving row under the indicator its value is mapped to, and totals the rows under the values you skipped. If nothing is dropped, the staged rows are merged into the dataset with no further action. Rows under skipped values are reported in the results but do not pause the import. If some rows are dropped for another reason, the run pauses with the status **Needs review**. It appears as a card on the Current tab, with the staging results, and you choose one of two actions:

- **Integrate anyway** merges the surviving rows and ignores the dropped ones.
- **Discard** cancels the import; nothing is merged.

Merging updates the rows already present for a facility, indicator and month, and inserts the rest. Cells absent from the file keep their previous value.

If the indicator column has more than 2000 distinct values, the Mapping step stops and shows how many values it found. That almost always means the wrong column was chosen.

:::caution[Screenshot needed]
The Columns step showing the four required fields with dropdown selectors.
:::

## DHIS2 import workflow
<!-- help#hmis-dhis2 -->

A DHIS2 import fetches the values facilities reported, one DHIS2 element and month at a time, directly from your DHIS2 server. It has five steps.

1. **Credentials.** FASTR uses the instance's stored DHIS2 connection. You can enter a connection for this run only; a scheduled import needs the stored one.

2. **Indicators.** Select the indicators to import from your indicator list. A DHIS2 element is fetched by its DHIS2 id. Selecting a sum fetches its members, and selecting a derived indicator fetches the indicators its formula uses. Uploaded indicators are not fetched.

3. **Time.** Run the import **Now**, **Once, at a set time**, or **Recurring** (daily, weekly or monthly, in the timezone you choose). Pick a low-traffic window for the DHIS2 server.

4. **Config.** Choose the months: **Last N months**, recalculated each time a recurring import runs, or a fixed period range.

5. **Review & launch.** The review lists the connection, the number of indicators and the DHIS2 elements they expand to, the months, and the number of (DHIS2 element, month) pairs to fetch. Click **Start import**.

Each (DHIS2 element, month) pair is fetched and merged on its own, and the rows are stored under the element's DHIS2 id. For a pair that is fetched successfully, FASTR removes the existing rows for exactly the facilities it queried, then inserts the values DHIS2 returned. Cells DHIS2 no longer returns, because the value was deleted or corrected to zero there, are removed rather than left behind. A pair that fails does not touch existing data, and a run that stops keeps every pair already merged. A facility value that is not a whole, non-negative number is not imported; it is skipped and counted in the run detail.

An indicator whose DHIS2 id is a DHIS2 indicator (a formula) rather than a data element is not fetched. The run detail says so and points to **Import from DHIS2** in the indicator list, which turns the formula into data elements. An id that DHIS2 does not know is listed under **DHIS2 ids not found in DHIS2**.

:::caution[Screenshot needed]
The Indicators step showing the indicator list with the Type and Defined by columns and a selection.
:::

## Validation and error handling
<!-- help#hmis-validation -->

For a CSV import, the staging results list every issue by category, with a count and sample rows. The categories are: rows with missing required fields, rows with invalid values, facilities not in your facility list, and invalid periods. Rows under values you skipped in the Mapping step appear with the row counts rather than in the list of issues. If many rows are being dropped, fix the file or the facility list before importing again.

For a DHIS2 import, the run detail shows every failed (DHIS2 element, month) pair with its error, with the DHIS2 id and the indicator that carries it. **Retry failed pairs** on the By indicator tab launches a new run over every failed pair, and a run's detail offers the same for that run's failed pairs.

## Managing import history

Each import that merges data creates a new dataset version. The **History** tab lists every run with when it ran, how it was imported (CSV or DHIS2), what it selected, and how many rows it inserted, updated or removed. Click a run for its detail. The **By indicator** tab shows the same history organised by indicator, with the DHIS2 id beside each DHIS2 element. For each it shows which months have been imported and when, with a per-month detail and **Re-import this indicator** to fetch it again from DHIS2. A renamed indicator keeps its history here, because the history is kept under the identifier the data itself is stored under, which renaming does not change.

To delete data, click **Delete data** in the sidebar, choose all indicators or a selection of them, the admin areas and the period range, and type `yes please delete` to confirm. Deleting is irreversible and is refused while an import is running.

## Deleting ICEH data

The ICEH dataset has two deletion options. To delete all ICEH data, check **Delete ALL ICEH data**, type `yes please delete` in the confirmation field, and click **Delete**. To remove only specific indicators while keeping others, uncheck **Delete ALL ICEH data**, select the indicators you want to remove from the list, and click **Delete**. Only the selected indicators are removed; all other indicators are kept.

## After importing

Once data is integrated, it becomes available to all projects in your instance. Projects can set their data window to include the new periods, and modules will pick up the fresh data on their next run.
