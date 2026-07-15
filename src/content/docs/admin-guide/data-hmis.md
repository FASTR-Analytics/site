---
title: "Data: HMIS"
description: Importing and managing routine health data from CSV files or DHIS2.
sidebar:
  order: 4
---

HMIS (Health Management Information System) data forms the foundation of most health system analyses in FASTR. This data contains routine statistics collected from facilities - service delivery counts, disease surveillance figures, and program performance metrics reported on a monthly basis. Before running analytical modules or creating visualizations, you need to import this data into your instance.

## Import methods

FASTR supports two ways to bring in HMIS data. You can upload a CSV file if you have data exported from another system or prepared manually. Alternatively, if your organization uses DHIS2, you can connect directly and import data through the DHIS2 import runs system, which fetches data per indicator and month and integrates it incrementally.

CSV uploads work well for periodic imports or historical data. The DHIS2 import system suits regular updates from a live national system. It supports immediate runs, one-time scheduled runs, and recurring scheduled imports.

## Starting an import

Navigate to the **Data** section and select **HMIS Data**. If you have admin permissions, you'll see an **Imports** panel on the right.

## CSV import workflow
<!-- help#hmis-csv -->

Click **Upload CSV file** to begin a CSV import. You'll work through four steps.

1. **Upload your file.** Select an existing CSV from your instance's assets, or upload a new one.

2. **Map columns.** Match your CSV columns to the four required fields: facility_id, raw_indicator_id, period_id (YYYYMM format), and count. The interface shows all available columns so you can match them correctly even if your source uses different naming conventions.

3. **Stage the data.** Click **Start staging** to validate and prepare your data. The system checks each row against your indicator mappings and facility registry. Progress updates automatically.

4. **Review and integrate.** Check the staging summary - total records, validation issues, rows dropped. If results look correct, click **Integrate and finalize** to complete the import.

:::caution[Screenshot needed]
Column mapping interface showing the four required fields with dropdown selectors.
:::

## DHIS2 import workflow
<!-- help#hmis-dhis2 -->

Click **Import from DHIS2** to open the DHIS2 imports view. This view has three tabs: **Current**, **Future**, and **History**.

### Launching an import

Click **New import** to open the import wizard. The wizard walks you through up to five steps depending on the options you choose.

1. **Credentials.** Choose whether to use a stored DHIS2 connection or enter connection details for this run only. If a stored connection exists, it is shown with the URL and the user who saved it. You can replace it or delete it here. Entering credentials without saving them means they are used only for this run and are not stored.

2. **Indicators.** Select which raw indicators to import from the table of all indicators configured in your instance.

3. **Time.** Choose when the import runs: **Now** starts it immediately (or queues it if another import is active), **Once, at a set time** schedules a one-time run at a specific date and time, or **Recurring** sets up a weekly or fortnightly schedule on a chosen day and time in a chosen timezone.

4. **Config.** For immediate or one-time runs, select the period range to import. For recurring runs, set how many months back from the current month to include on each fire.

5. **Review & launch.** A summary shows the connection, number of indicators, timing, and the total number of indicator-month pairs. If another import is currently running, the launch queues the new import to start automatically when the running one finishes.

### How DHIS2 imports work

Each import run fetches data per (indicator, month) pair. For each pair, the system removes any existing rows for that indicator and month within the facilities it queried, then inserts the newly fetched values. This scoped delete-then-insert approach ensures that values DHIS2 no longer returns are properly removed rather than left behind.

Completed pairs are saved as they finish. If a run is cancelled or encounters an error, the pairs that already completed are kept. Per-indicator results are visible in the **Import status by indicator** view.

### Current tab

The Current tab shows the running import (if any) with a live progress bar, percentage, pair counts, and the phase (classifying, fetching, or finalizing). It also lists any queued imports. You can cancel a running import or remove a queued one. When no import is running, the tab shows the next scheduled import if one exists, and a **New import** button.

### Future tab

The Future tab lists scheduled imports - both recurring schedules and pending one-time runs. For each schedule you can click **Edit** to open the wizard pre-filled with its settings, or **Delete** to remove it. A recurring schedule that was refused, missed, or whose last run failed is highlighted in red.

### History tab

The History tab shows all completed, cancelled, and errored import runs with their start time, who triggered them, the selection (indicators and period range), pair outcome counts, and final status.

### Managing the DHIS2 connection

Click **Manage connection** to open a dialog for updating or deleting the stored DHIS2 credentials without going through the full wizard. Credentials are encrypted on the server. Once saved, the password is not sent back to the browser.

### Scheduling and the unattended gate

Scheduled and queued imports always run with the stored connection. To create a scheduled import or queue an import, stored credentials must exist. Additionally, scheduling is only unlocked after one import against the stored DHIS2 URL has completed a shadow verification pass - a cross-check that confirms the data fetched via the direct route matches the analytics engine. Run one immediate import first, then return to set up a schedule.

### Import status by indicator
<!-- help#hmis-import-ledger -->

Click **Import status by indicator** to see the import ledger - a table showing the latest import state for every (indicator, month) pair that has ever been imported. For each indicator it shows how many months have data, when data was last imported, the source (DHIS2 or CSV), and how many months have failed. Click on an indicator row to see the month-by-month detail including record counts, service counts, error messages, and error classification (configuration error or server error).

If any pairs have failed, a **Retry failed pairs** button appears. Clicking it opens the wizard pre-configured to re-import exactly the failed pairs.

From the per-indicator detail view, a **Re-import this indicator** button opens the wizard to re-import all months in the current window for that indicator.

## Validation and error handling
<!-- help#hmis-validation -->

The CSV staging process catches several types of issues: missing required fields, invalid numeric values, facilities not in your registry, and unmapped indicators. For each category, the summary shows how many rows were affected and provides sample entries. If too many rows are being dropped, consider fixing source data or updating instance configuration before re-importing.

For DHIS2 imports, per-pair errors are recorded in the import ledger with an error classification. Configuration errors (such as an indicator ID not found in DHIS2) are marked permanent and will fail again until the configuration is fixed. Server errors (such as timeouts) are marked transient and may succeed on a later retry.

## Managing import history

Each successful import creates a new dataset version. Click **View previous imports** to see all versions with their dates and row counts. You can also delete data if needed - this action is irreversible and available only to global administrators.

## Deleting ICEH data

The ICEH dataset has two deletion options. To delete all ICEH data, check **Delete ALL ICEH data**, type `yes please delete` in the confirmation field, and click **Delete**. To remove only specific indicators while keeping others, uncheck **Delete ALL ICEH data**, select the indicators you want to remove from the list, and click **Delete**. Only the selected indicators are removed; all other indicators are kept.

## After importing

Once data is integrated, it becomes available to all projects in your instance. Projects can set their data window to include the new periods, and modules will pick up the fresh data on their next run.
