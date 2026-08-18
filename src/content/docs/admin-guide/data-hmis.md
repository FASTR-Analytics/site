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

Navigate to the **Data** section and select **HMIS Data**. If you have admin permissions, you'll see an **Imports** panel on the right. Click **Imports** to open the unified imports surface, which contains tabs for current activity, scheduled runs, history, and import status by indicator.

## CSV import workflow
<!-- help#hmis-csv -->

From the imports surface, click **Upload CSV** to open the CSV import wizard. The wizard collects everything needed before sending anything to the server — abandoning it at any point has no effect.

The wizard has three steps.

1. **Upload your file.** Select an existing CSV from your instance's assets, or upload a new one. The wizard reads the CSV headers as soon as a file is selected. If the file cannot be parsed, an error appears.

2. **Map columns.** Match your CSV columns to the four required fields: facility_id, raw_indicator_id, period_id (YYYYMM format), and count.

3. **Review and launch.** A summary shows the selected file and all column mappings. Read the notice about how staging validates every row and how a fully clean file integrates automatically while dropped rows hold the import for your review. If another import is currently running, the button changes to **Queue import** and the import starts automatically when the running one finishes.

Once launched, staging validates each row against your indicator mappings and facility registry. A fully clean file integrates automatically. If any rows are dropped, the import holds in a **needs review** state — nothing is merged until you act from the **Current** tab of the Imports view.

## DHIS2 import workflow
<!-- help#hmis-dhis2 -->

From the imports surface, click **New DHIS2 import** to open the DHIS2 import wizard. This view has four tabs: **Current**, **Future**, **History**, and **By indicator**.

### Launching an import

The wizard walks you through up to five steps depending on the options you choose.

1. **Credentials.** Choose whether to use a stored DHIS2 connection or enter connection details for this run only. If a stored connection exists, it is shown with the URL and the user who saved it. You can replace it or delete it here. Entering credentials without saving them means they are used only for this run and are not stored.

2. **Indicators.** Select which raw indicators to import from the table of all indicators configured in your instance.

3. **Time.** Choose when the import runs: **Now** starts it immediately (or queues it if another import is active), **Once, at a set time** schedules a one-time run at a specific date and time in a chosen timezone, or **Recurring** sets up a schedule on a chosen cadence. Recurring schedules support daily, weekly (with a configurable interval of every 1, 2, or 4 weeks), and monthly (nth weekday of the month, with a configurable interval of every 1 or 3 months) options. For weekly schedules, pick the date of the first run — the day of the week is derived from it. For monthly schedules with a 3-month interval, also set the starting month to anchor the phase.

4. **Config.** For immediate or one-time runs, select the period range to import. For recurring runs, set how many months back from the current month to include on each fire.

5. **Review & launch.** A summary shows the connection, number of indicators, timing, and the total number of indicator-month pairs. If another import is currently running, the launch queues the new import to start automatically when the running one finishes.

### How DHIS2 imports work

Each import run fetches data per (indicator, month) pair. For each pair, the system removes any existing rows for that indicator and month within the facilities it queried, then inserts the newly fetched values. This scoped delete-then-insert approach ensures that values DHIS2 no longer returns are properly removed rather than left behind.

Completed pairs are saved as they finish. If a run is cancelled or encounters an error, the pairs that already completed are kept. Per-indicator results are visible in the **By indicator** tab.

### Current tab

The Current tab shows any running import with a live progress bar and the current phase, as well as any queued imports. It also shows any imports in a **needs review** state — these are CSV imports where staging dropped rows. For each needs review import, you can choose to **Integrate anyway** (merging the surviving rows) or **Discard** (abandoning the import without merging anything). You can cancel a running import or remove a queued one.

### Future tab

The Future tab lists scheduled imports - both recurring schedules and pending one-time runs. For each schedule you can click **Edit** to open the wizard pre-filled with its settings, or **Delete** to remove it. A recurring schedule that was refused, missed, or whose last run failed is highlighted in red, with the error detail shown beneath the status.

### History tab

The History tab shows all completed, cancelled, and errored import runs. The table includes a **Source** column showing whether each run came from DHIS2 or CSV. For DHIS2 runs, pair outcome counts are shown; CSV runs show the file name instead. Click any row to open the run detail view. For DHIS2 runs, the detail view shows the full run summary, any indicators not found in DHIS2, per-pair fetch failures, and a **Version** button that opens the import information for the dataset version created by that run. From a DHIS2 run detail you can also click **Retry failed pairs** to open the wizard pre-configured to re-import exactly the failed pairs.

### By indicator tab
<!-- help#hmis-import-ledger -->

The **By indicator** tab shows the import ledger - a table showing the latest import state for every (indicator, month) pair that has ever been imported. For each indicator it shows how many months have data, when data was last imported, the source (DHIS2 or CSV), and how many months have failed. Click on an indicator row to see the month-by-month detail including record counts, service counts, error messages, and error classification (configuration error or server error).

If any pairs have failed, a **Retry failed pairs** button appears at the top of the tab. Clicking it opens the wizard pre-configured to re-import exactly the failed pairs.

From the per-indicator detail view, a **Re-import this indicator** button opens the wizard to re-import all months in the current window for that indicator.

### Managing the DHIS2 connection

Click **Manage connection** in the Imports view to open a dialog for updating or deleting the stored DHIS2 credentials. Credentials are encrypted on the server. Once saved, the password is not sent back to the browser. The stored connection is shared across all DHIS2 flows in the instance — the same credentials are used by the indicator manager, the GeoJSON wizard, and the structure import.

### Scheduling requirements

Scheduled and queued imports always run with the stored connection. To create a scheduled import or queue an import, stored credentials must exist. Save credentials in step 1 of the wizard before setting up a recurring or future schedule.

## Validation and error handling
<!-- help#hmis-validation -->

The CSV staging process catches several types of issues: missing required fields, invalid numeric values, facilities not in your registry, and unmapped indicators. For each category, the summary shows how many rows were affected and provides sample entries. If too many rows are being dropped, consider fixing source data or updating instance configuration before re-importing.

For DHIS2 imports, per-pair errors are recorded in the import ledger with an error classification. Configuration errors (such as an indicator ID not found in DHIS2) are marked permanent and will fail again until the configuration is fixed. Server errors (such as timeouts) are marked transient and may succeed on a later retry.

## Managing import history

Each successful import creates a new dataset version. From a DHIS2 run's detail view, click the **Version** button to open the import information for that version directly. You can also delete data if needed - this action is irreversible and available only to global administrators.

## After importing

Once data is integrated, it becomes available for use when generating a results package. Generate a new results package from the instance **Results packages** page to include the fresh data in your projects.
