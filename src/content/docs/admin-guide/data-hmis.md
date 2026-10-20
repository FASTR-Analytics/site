---
title: "Data: HMIS"
description: Importing and managing routine health data from CSV files or DHIS2.
sidebar:
  order: 4
---

HMIS (Health Management Information System) data forms the foundation of most health system analyses in FASTR. This data contains routine statistics collected from facilities - service delivery counts, disease surveillance figures, and program performance metrics reported on a monthly basis. Before running analytical modules or creating visualizations, you need to import this data into your instance.

## Viewing the data

Go to the **Data** section and select **HMIS Data**. The page shows your data across two tabs.

### Visualization tab

The main area shows the data that has been imported. A record is one value reported by one facility for one month.

Choose **Records** to count the records, or **Service counts** to add the reported values together. Choose **Heat map** or **Line graph** to switch between a presence heat map and a timeseries line graph. The heat map shows which indicators have data for each period — a filled cell means at least one record exists; by month or by year depending on the **Periods** toggle.

The indicator selector at the top filters both the line graph and the heat map.

### Ledger tab

The Ledger tab shows the import ledger pivoted by indicator. Each row covers one data id across the dataset's period window, with columns for the indicator ID, label, DHIS2 id (for DHIS2 element indicators), months with data, latest import, failed months, and skipped values. Click any row to open the per-month detail and access the re-import and retry actions.

For global administrators, the heading bar shows an **Imports** button, an **Import running** badge when an import is active, and **Delete data**.

## Import methods

FASTR supports two ways to bring in HMIS data. You can upload a CSV file if you have data exported from another system or prepared manually. Alternatively, if your organization uses DHIS2, you can connect directly and pull data from the live system.

CSV uploads work well for periodic imports or historical data. Direct DHIS2 integration suits regular updates from a live national system, since you can select specific indicators and time periods without manual file preparation, and you can schedule the import to repeat.

## Starting an import

Click **Imports** in the heading bar to open the imports view. The view has three tabs and two buttons, **New DHIS2 import** and **Upload CSV file**.

- **Current** shows the running import with its progress and current phase, the imports queued behind it, and any CSV import waiting for review. You can cancel the running import or remove a queued one.
- **Future** lists the scheduled imports: recurring schedules and one-time runs that have not started yet. **Edit** opens the wizard pre-filled with the schedule's settings, and the trash icon deletes it. A schedule that was refused, missed, or whose last run failed is highlighted in red with the error under its status, and a red notice above the tabs says that a scheduled import needs attention.
- **History** lists every run that has started, including the running one, with when it started, who started it, whether it came from DHIS2 or CSV, what it selected, the number of pairs fetched and failed for a DHIS2 run, its status, and a **Version** button that opens the import information for the dataset version the run created. Click a row for its detail.

Imports run in the background, one at a time. If an import is already running, a new one is queued and starts when the current one finishes. If a DHIS2 import is currently running, generating a new results package that includes HMIS data is temporarily blocked — a message explains why when you attempt to launch generation.

## CSV import workflow
<!-- help#hmis-csv -->

A CSV import has four steps: upload the file, match its columns to the four required fields, map the values in the indicator column to your indicators, and launch.

1. **Upload your file.** Select an existing CSV from your instance's assets, or upload a new one. FASTR reads the column headings as soon as a file is selected.

2. **Columns.** Match your CSV columns to the four required fields: the facility id column, the indicator column, the period column (yyyymm), and the count column.

3. **Mapping.** FASTR scans the file for every distinct value in the indicator column and lists them with their row counts. Point each value at an existing indicator or mark it as skipped. A value is pre-selected when it matches an indicator's ID or a DHIS2 element's DHIS2 id. Skipped values are dropped and counted during staging — this is not a validation issue, since you chose the skip. Two values may not map onto the same indicator in one import.

4. **Review & launch.** The review shows the file, the column assignments, and a summary of how many values are mapped and skipped. It also lists the data ids the import will write each mapped indicator's rows under. Click **Start import**, or **Queue import** if another import is running. FASTR then stages the file: it checks the period, the count, and the facility on every row. Rows under skipped values are dropped and counted. If nothing else is dropped, the staged rows are merged into the dataset automatically. If some rows are dropped for other reasons, the run pauses with the status **Needs review**. It appears as a card on the Current tab, and you choose one of two actions:

- **Integrate anyway** merges the surviving rows and ignores the dropped ones.
- **Discard** cancels the import; nothing is merged.

If every row is dropped, the run ends with an error instead of pausing.

Merging updates the rows already present for a facility, indicator and month, and inserts the rest. Cells absent from the file keep their previous value.

## DHIS2 import workflow
<!-- help#hmis-dhis2 -->

A DHIS2 import fetches the values facilities reported, one DHIS2 element and month at a time, directly from your DHIS2 server. It uses the instance's stored DHIS2 connection, which is set in the DHIS2 connection row on the Data page. Click **New DHIS2 import** to open the wizard. If no connection is stored, an alert explains how to set one. The wizard has four steps.

1. **Indicators.** Select the indicators to import. The list shows every indicator registered in your instance that has DHIS2 elements to fetch — Uploaded indicators are not shown because a DHIS2 import cannot fetch them. Select the ones whose data you want to fetch. The wizard shows which DHIS2 elements the selection expands to, and flags any selected calculated indicator whose formula does not resolve.

2. **Time.** Run the import **Now**, **Once, at a set time**, or **Recurring**, in the timezone you choose. A recurring import runs daily, weekly or monthly. A weekly schedule runs every 1, 2 or 4 weeks, on the weekday of the first run date you pick. A monthly schedule runs on a chosen weekday of the month (the first, second, third, fourth or last), every 1 or 3 months.

3. **Config.** For **Now** and **Once, at a set time**, choose a fixed period range. For **Recurring**, choose **Last N months** (up to 24), recalculated each time the import runs.

4. **Review & launch.** The review lists the connection, the number of indicators, the number of DHIS2 elements they expand to, and for a non-recurring run the number of (DHIS2 element, month) pairs to fetch. It also shows which indicators are not fetched and why — Uploaded indicators and population terms are listed separately with their reasons. Click **Start import** (or **Queue import** if another import is running) for a run now, **Schedule import** for a one-time run later, or **Save schedule** for a recurring import.

Each (DHIS2 element, month) pair is fetched and merged on its own. For a pair that is fetched successfully, FASTR removes the existing rows for exactly the facilities it queried, then inserts the values DHIS2 returned. A pair that fails does not touch existing data, and a run that stops keeps every pair already merged.

FASTR fetches each DHIS2 element indicator and operand from the dataValueSets API, which returns the values facilities reported directly. This is the only fetch route the importer uses.

A DHIS2 id that matches nothing in DHIS2 causes every selected month of the indicators carrying it to fail without a fetch, and will fail every run until the id is fixed or the indicator is deleted. A DHIS2 id that matches a DHIS2 indicator (formula) rather than a data element also causes failures — the run detail explains this and suggests recreating the indicator using **Add from DHIS2**, which decomposes the formula into its data elements.

Facility values that are not non-negative integers are skipped rather than causing the whole pair to fail. The run detail shows a count of skipped values per pair, and the Ledger tab accumulates them per indicator.

## Validation and error handling
<!-- help#hmis-validation -->

For a CSV import, the staging results list every issue by category, with a count and sample rows. The categories are: rows with missing required fields, rows with invalid values, facilities not in your facility list, and invalid periods. Rows under skipped indicator values are also counted separately and are not treated as errors. Fix the file or update your indicator mapping before importing again.

For a DHIS2 import, the run detail shows the summary, any DHIS2 ids not found in DHIS2, any DHIS2 ids that turned out to be formula indicators rather than data elements, a count of skipped facility values, and every failed (DHIS2 element, month) pair with its error. Each error is classed as **Configuration** (an unknown ID or another refusal by DHIS2), which fails again until the indicator list is fixed, or **Server** (a timeout or a server error), which may succeed on a retry. When any month has failed, **Retry failed pairs** on the per-month detail view opens the wizard with every failed pair selected.

## Managing import history

Each import that merges data creates a new dataset version. The **History** tab of the imports view lists every run, and a run's **Version** button opens the import information for its version, with the number of rows inserted, updated or removed. To see the import status of each indicator month by month, and to re-import an indicator, use the **Ledger** tab on the HMIS Data page.

To delete data, click **Delete data** in the heading bar, choose all indicators or a selection of them and the period range, and type `yes please delete` to confirm. Only a global administrator can delete data. Deleting is irreversible and is refused while an import is running.

## After importing

Once data is integrated, it becomes available for use when generating a results package. Generate a new results package from the instance **Results packages** page to include the fresh data in your projects.
