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

Navigate to the **Data** section and select **HMIS Data**. If you have admin permissions, you'll see an **Imports** panel on the right. Click **Start new import** and choose your source type: CSV file or DHIS2.

:::caution[Screenshot needed]
HMIS data view showing the Imports panel with the Start new import button.
:::

## CSV import workflow

When importing from CSV, you'll work through four steps.

1. **Upload your file.** Select an existing CSV from your instance's assets, or upload a new one.

2. **Map columns.** Match your CSV columns to the four required fields: facility_id, raw_indicator_id, period_id (YYYYMM format), and count. The interface shows all available columns so you can match them correctly even if your source uses different naming conventions.

3. **Stage the data.** Click **Start staging** to validate and prepare your data. The system checks each row against your indicator mappings and facility registry. Progress updates automatically.

4. **Review and integrate.** Check the staging summary - total records, validation issues, rows dropped. If results look correct, click **Integrate and finalize** to complete the import.

:::caution[Screenshot needed]
Column mapping interface showing the four required fields with dropdown selectors.
:::

## DHIS2 import workflow

1. **Connect to DHIS2.** Enter your server URL and credentials. FASTR validates the connection before proceeding.

2. **Select indicators and periods.** Choose which indicators to fetch from a table showing all indicators configured in your instance, then select a date range. You can choose how to handle failures - abort entirely if any combination fails, or continue with whatever succeeds.

3. **Fetch data.** Click **Start fetching from DHIS2** to retrieve the selected data.

4. **Review and integrate.** Same as CSV imports - check results and click **Integrate and finalize**.

:::caution[Screenshot needed]
DHIS2 selection interface showing indicator table with checkboxes and period range selector.
:::

## Validation and error handling

The staging process catches several types of issues: missing required fields, invalid numeric values, facilities not in your registry, and unmapped indicators. For each category, the summary shows how many rows were affected and provides sample entries. If too many rows are being dropped, consider fixing source data or updating instance configuration before re-importing.

## Managing import history

Each successful import creates a new dataset version. Click **View previous imports** to see all versions with their dates and row counts. You can also delete data if needed - this action is irreversible and available only to global administrators.

## After importing

Once data is integrated, it becomes available to all projects in your instance. Projects can set their data window to include the new periods, and modules will pick up the fresh data on their next run.
