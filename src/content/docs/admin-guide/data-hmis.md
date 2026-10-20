---
title: "Data: HMIS"
description: Importing and managing routine health data from CSV files or DHIS2.
sidebar:
  order: 4
---

HMIS (Health Management Information System) data forms the foundation of most health system analyses in FASTR. This data contains routine statistics collected from facilities - service delivery counts, disease surveillance figures, and program performance metrics reported on a monthly basis. Before running analytical modules or creating visualizations, you need to import this data into your instance.

## Viewing the data

Go to the **Data** section and select **HMIS Data**. The page shows your data and, for global administrators, import controls in a side panel.

### Visualization

The main area shows the data that has been imported, one figure at a time. A record is one value reported by one facility for one month.

Choose whether to view **Common indicators** or **Raw indicators** using the toggle at the top of the left panel. Common indicators are the named metrics in your dictionary; raw indicators are the identifiers from your DHIS2 server that map to them.

Choose **Count** to count the records, or **Sum** to add the reported values together. Choose **Chart** or **Table** to switch between a timeseries line graph and a pivot table.

The list of indicators on the left applies to the figure.

## Import methods

FASTR supports two ways to bring in HMIS data. You can upload a CSV file if you have data exported from another system or prepared manually. Alternatively, if your organization uses DHIS2, you can connect directly and pull data from the live system.

CSV uploads work well for periodic imports or historical data. Direct DHIS2 integration suits regular updates from a live national system, since you can select specific raw indicators and time periods without manual file preparation, and you can schedule the import to repeat.

## Starting an import

If you are a global administrator, the heading bar at the top of the HMIS Data page shows an **Imports** button that opens the imports view. While an import is running, a status notice appears in the side panel. The view has four tabs and two buttons, **New DHIS2 import** and **Upload CSV file**.

- **Current** shows the running import with its progress and current phase, the imports queued behind it, and any CSV import waiting for review. You can cancel the running import or remove a queued one.
- **Future** lists the scheduled imports: recurring schedules and one-time runs that have not started yet. **Edit** opens the wizard pre-filled with the schedule's settings, and the trash icon deletes it. A schedule that was refused, missed, or whose last run failed is highlighted in red with the error under its status, and a red notice above the tabs says that a scheduled import needs attention.
- **History** lists every run that has started, including the running one, with when it started, who started it, whether it came from DHIS2 or CSV, what it selected, the number of pairs fetched and failed for a DHIS2 run, its status, and a **Version** button that opens the import information for the dataset version the run created. Click a row for its detail.
- **By indicator** shows the import ledger pivoted by raw indicator. Click a row to see the per-month detail and access the re-import and retry actions.

Imports run in the background, one at a time. If an import is already running, a new one is queued and starts when the current one finishes.

## CSV import workflow
<!-- help#hmis-csv -->

When importing from CSV, you'll work through three steps.

1. **Upload your file.** Select an existing CSV from your instance's assets, or upload a new one. FASTR reads the column headings as soon as a file is selected.

2. **Map columns.** Match your CSV columns to the four required fields: `facility_id`, `raw_indicator_id`, `period_id`, and `count`.

3. **Review & launch.** The review shows the file and the column assignments. Click **Start import**, or **Queue import** if another import is running. FASTR then stages the file: it checks the period, the count, the facility, and the raw indicator on every row. Rows whose `raw_indicator_id` value does not match any registered raw indicator are dropped and counted as unmapped indicators. If nothing is dropped, the staged rows are merged into the dataset automatically. If some rows are dropped, the run pauses with the status **Needs review**. It appears as a card on the Current tab, and you choose one of two actions:

- **Integrate anyway** merges the surviving rows and ignores the dropped ones.
- **Discard** cancels the import; nothing is merged.

If every row is dropped, the run ends with an error instead of pausing.

Merging updates the rows already present for a facility, raw indicator and month, and inserts the rest. Cells absent from the file keep their previous value.

## DHIS2 import workflow
<!-- help#hmis-dhis2 -->

Click **New DHIS2 import**. A DHIS2 import fetches the values facilities reported, one raw indicator and month at a time, directly from your DHIS2 server. It has five steps.

1. **Credentials.** FASTR checks whether a stored DHIS2 connection exists for this instance. If one is stored, the step shows the connection URL and lets you continue with it. If none is stored, or if you want to use different credentials for this run only, enter the DHIS2 URL, username, and password. Inline credentials are used only for the current run and are not saved. A future or recurring import always uses stored credentials; the step explains this and offers a link back to save credentials if needed.

2. **Indicators.** Select the raw indicators to import. The list shows every raw indicator registered in your instance. Select the ones whose data you want to fetch.

3. **Time.** Run the import **Now**, **Once, at a set time**, or **Recurring**, in the timezone you choose. A recurring import runs daily, weekly or monthly. A weekly schedule runs every 1, 2 or 4 weeks, on the weekday of the first run date you pick. A monthly schedule runs on a chosen weekday of the month (the first, second, third, fourth or last), every 1 or 3 months. Scheduling a future or recurring import requires stored credentials — the step says so if they are missing.

4. **Config.** For **Now** and **Once, at a set time**, choose a fixed period range. For **Recurring**, choose **Last N months** (up to 24), recalculated each time the import runs.

5. **Review & launch.** The review lists the connection, the number of indicators, and, for a non-recurring run, the number of (indicator, month) pairs to fetch. Click **Start import** (or **Queue import** if another import is running) for a run now, **Schedule import** for a one-time run later, or **Save schedule** for a recurring import. If the import would be queued but you are using inline credentials, the review explains that queued imports always use the stored connection and blocks submission until you either save the credentials or wait for the running import to finish.

You can also click **Manage connection** in the imports heading bar to update the stored DHIS2 connection at any time without starting a new import.

Each (raw indicator, month) pair is fetched and merged on its own. For a pair that is fetched successfully, FASTR removes the existing rows for exactly the facilities it queried, then inserts the values DHIS2 returned. A pair that fails does not touch existing data, and a run that stops keeps every pair already merged.

FASTR routes each raw indicator to the appropriate DHIS2 API automatically. Data elements and operands are fetched from the dataValueSets API, which returns the values facilities reported directly. DHIS2 indicators — which represent server-side formulas — are fetched from the analytics API. Both routes produce the same output stored in your instance, so the routing is transparent to you and to any downstream analysis.

A raw indicator whose ID matches nothing in DHIS2 is not fetched. Every selected month of it fails without a fetch and will fail every run until the ID is fixed or the raw indicator is deleted from the list.

## Validation and error handling
<!-- help#hmis-validation -->

The staging process catches several types of issues: missing required fields, invalid numeric values, facilities not in your facility list, invalid periods, and rows with unmapped indicator IDs (raw indicator IDs in the file that do not match any registered raw indicator, shown with a sample). For each category, the summary shows a count. Fix the file or register the missing raw indicators before importing again.

For a DHIS2 import, the run detail shows the summary, the indicators not found in DHIS2, and every failed (indicator, month) pair with its error. Each error is classed as **Configuration** (an unknown ID or another refusal by DHIS2), which fails again until the indicator list is fixed, or **Server** (a timeout or a server error), which may succeed on a retry. When any month has failed, **Retry failed pairs** on the **By indicator** tab of the imports view opens the wizard with every failed pair selected, and a run's detail offers the same for that run's failed pairs.

## Managing import history

Each import that merges data creates a new dataset version. The **History** tab of the imports view lists every run, and a run's **Version** button opens the import information for its version, with the number of rows inserted, updated or removed. To see the import status of each indicator month by month, and to re-import a raw indicator, use the **By indicator** tab of the imports view.

To delete data, click **Delete data** in the heading bar, choose all indicators or a selection of them and the period range, and type `yes please delete` to confirm. Only a global administrator can delete data. Deleting is irreversible and is refused while an import is running.

## After importing

Once data is integrated, it becomes available for use when generating a results package. Generate a new results package from the instance **Results packages** page to include the fresh data in your projects.
