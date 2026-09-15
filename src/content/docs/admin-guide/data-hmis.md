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

Navigate to the **Data** section and select **HMIS Data**. If you have admin permissions, you'll see **Imports** and other controls in the heading bar. Click **Imports** to open the unified imports surface, which contains tabs for current activity, scheduled runs, and history.

## CSV import workflow
<!-- help#hmis-csv -->

From the imports surface, click **Upload CSV** to open the CSV import wizard. The wizard collects everything needed before sending anything to the server — abandoning it at any point has no effect.

A CSV import has four steps: upload the file, match its columns to the four required fields, map the values in the indicator column to your indicators, and launch. FASTR then stages the file and either integrates it automatically or holds it for your review.

1. **Upload your file.** Select an existing CSV from your instance's assets, or upload a new one. The wizard reads the CSV headers as soon as a file is selected. If the file cannot be parsed, an error appears.

2. **Columns.** Match your CSV columns to the four required fields: the facility identifier, the indicator column, the period (YYYYMM format), and the count.

3. **Mapping.** The wizard scans the file for every distinct value in the indicator column. Point each value at the indicator its rows belong to, or mark it as skipped. A value is pre-selected when it matches an indicator's ID or a DHIS2 element's DHIS2 id. Values under skipped entries are dropped and counted, but they never block the import — the user chose the skip. At least one value must be mapped (not skipped) before you can proceed.

4. **Review and launch.** A summary shows the selected file, column assignments, and how many values are mapped versus skipped. Read the notice about staging. If another import is currently running, the button changes to **Queue import** and the import starts automatically when the running one finishes.

Once launched, staging validates each row (periods, counts, facilities) and writes each row under the indicator its value is mapped to. A fully clean file integrates automatically. If any rows are dropped for reasons other than skipped mapping values, the import holds in a **needs review** state — nothing is merged until you act from the **Current** tab of the Imports view.

## DHIS2 import workflow
<!-- help#hmis-dhis2 -->

A DHIS2 import fetches the values facilities reported, one DHIS2 element and month at a time, directly from your DHIS2 server. It uses the instance's stored DHIS2 connection, which is set in the DHIS2 connection card on the Data page. If no stored connection exists, set one up there before starting a DHIS2 import.

From the imports surface, click **New DHIS2 import** to open the DHIS2 import wizard.

### Launching an import

The wizard walks you through up to four steps depending on the options you choose.

1. **Indicators.** Select which indicators to import from the table of all indicators configured in your instance. Only DHIS2 element, Sum, and Calculated indicators are shown — Uploaded indicators are not fetched from DHIS2. The wizard shows how many DHIS2 elements the selection expands to, which parts are dropped (population terms, Uploaded indicators), and warns if a calculated indicator's formula cannot be resolved.

2. **Time.** Choose when the import runs: **Now** starts it immediately (or queues it if another import is active), **Once, at a set time** schedules a one-time run at a specific date and time in a chosen timezone, or **Recurring** sets up a schedule on a chosen cadence. Recurring schedules support daily, weekly (with a configurable interval of every 1, 2, or 4 weeks), and monthly (nth weekday of the month, with a configurable interval of every 1 or 3 months) options. For weekly schedules, pick the date of the first run — the day of the week is derived from it. For monthly schedules with a 3-month interval, also set the starting month to anchor the phase.

3. **Config.** For immediate or one-time runs, select the period range to import. For recurring runs, set how many months back from the current month to include on each fire.

4. **Review & launch.** A summary shows the connection URL, number of indicators and the DHIS2 elements they expand to, timing, and the total number of element-month pairs. If another import is currently running, the launch queues the new import to start automatically when the running one finishes.

### How DHIS2 imports work

Each import run fetches data per (DHIS2 element, month) pair. The selection you make in terms of indicators is expanded to DHIS2 elements at launch: a Sum contributes its members' data ids, a Calculated indicator flattens through its formula to the DHIS2 elements it reaches. Population terms and Uploaded indicators are dropped and listed in the run detail. For each pair, the system removes any existing rows for that data id and month within the facilities it queried, then inserts the newly fetched values. This scoped delete-then-insert approach ensures that values DHIS2 no longer returns are properly removed rather than left behind.

Completed pairs are saved as they finish. If a run is cancelled or encounters an error, the pairs that already completed are kept.

### Current tab

The Current tab shows any running import with a live progress bar and the current phase, as well as any queued imports. It also shows any imports in a **needs review** state — these are CSV imports where staging dropped rows. For each needs review import, you can choose to **Integrate anyway** (merging the surviving rows) or **Discard** (abandoning the import without merging anything). You can cancel a running import or remove a queued one.

### Future tab

The Future tab lists scheduled imports - both recurring schedules and pending one-time runs. For each schedule you can click **Edit** to open the wizard pre-filled with its settings, or **Delete** to remove it. A recurring schedule that was refused, missed, or whose last run failed is highlighted in red, with the error detail shown beneath the status. To schedule an import, click **New DHIS2 import** and, when asked when to run it, choose **Once, at a set time** or **Recurring**.

### History tab

The History tab shows all completed, cancelled, and errored import runs. The **Imported via** column shows whether each run came from DHIS2 or CSV. For DHIS2 runs, the selection column shows the number of indicators alongside the number of DHIS2 elements they expanded to, plus the period range. Pair outcome counts are shown for DHIS2 runs; CSV runs show the file name instead. Click any row to open the run detail view.

For DHIS2 runs, the detail view shows the full run summary, any DHIS2 ids not found in DHIS2, any ids that are DHIS2 indicators (formulas, which cannot be fetched directly — re-create these through the DHIS2 indicator import in the indicator configuration), pairs where facility values were skipped as non-integer, per-pair fetch failures, and a **Version** button that opens the import information for the dataset version created by that run. From a DHIS2 run detail you can also click **Retry failed pairs** to open the wizard pre-configured to re-import exactly the failed pairs.

## Validation and error handling
<!-- help#hmis-validation -->

For a CSV import, the staging results list every issue by category, with a count and sample rows. The categories are: rows with missing required fields, rows with invalid values, facilities not in your registry, and rows under values skipped in the mapping step. The skipped-by-mapping count is informational — the user chose those skips — and never causes the import to hold for review. Rows dropped for any other reason hold the import in a **needs review** state until you act.

For DHIS2 imports, per-pair errors are recorded in the run detail with an error classification. Configuration errors (such as a DHIS2 id not found in DHIS2, or an id that belongs to a DHIS2 indicator formula rather than a data element) are marked permanent and will fail again until the configuration is fixed. Server errors (such as timeouts) are marked transient and may succeed on a later retry. Facility values that are not non-negative integers are skipped rather than causing the pair to fail; the count and a sample are shown in the run detail and recorded in the ledger.

## Managing import history

Each successful import creates a new dataset version. From a DHIS2 run's detail view, click the **Version** button to open the import information for that version directly. You can also delete data if needed - this action is irreversible and available only to global administrators.

## After importing

Once data is integrated, it becomes available for use when generating a results package. Generate a new results package from the instance **Results packages** page to include the fresh data in your projects.
