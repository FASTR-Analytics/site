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

A CSV import has three steps: upload the file, match its columns to the four required fields, and launch. FASTR then stages the file and merges it into the dataset, or pauses for review when rows were dropped.

1. **Upload.** Select a CSV file already uploaded to your instance (its assets), or upload a new one.

2. **Columns.** Match your CSV columns to the four required fields: **Facility id**, **Indicator**, **Period** (YYYYMM format) and **Count**. The interface shows all the file's columns, so you can match them even if your file uses different names.

3. **Review & launch.** Click **Start import**, or **Queue import** if another import is running.

The indicator column can hold three kinds of value. A value that is an indicator's file id or DHIS2 id lands under that indicator. Otherwise, if the value is an indicator's own id and that indicator already has data, the rows land under that indicator's file id or DHIS2 id: a file that uses your own indicator ids works too. Any other value is unknown, and the import pauses so you can decide what to do with it. A value that is one indicator's file id and another indicator's id fails the import, naming both, since it could belong to either.

FASTR then stages the file: it checks every row against your facilities and your indicators and counts what it drops. If nothing is dropped, the staged rows are merged into the dataset with no further action. If some rows are dropped, the run pauses with the status **Needs review**. It appears as a card on the Current tab, with the staging results, and you choose one of three actions:

- **Integrate anyway** merges the surviving rows and ignores the dropped ones.
- **Create indicators for the unknown ids and re-stage** opens the naming step over every unknown value in the file. Each becomes an uploaded indicator carrying the value as its file id, under a proposed id you can edit, with the label you give it. Typing the id of an existing uploaded indicator that has no file id assigns the value to that indicator instead. The same file is then staged again.
- **Discard** cancels the import; nothing is merged.

Merging updates the rows already present for a facility, file id and month, and inserts the rest. Cells absent from the file keep their previous value.

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

For a CSV import, the staging results list every issue by category, with a count and sample rows. The categories are: rows with missing required fields, rows with invalid values, facilities not in your facility list, invalid periods, and values in the indicator column that match no indicator. For the unknown values, the results show the most frequent ones and the full set, and the Current card offers to create indicators for them (see the CSV import workflow above). If many rows are being dropped, fix the file or the facility list before importing again.

For a DHIS2 import, the run detail shows every failed (DHIS2 element, month) pair with its error, with the DHIS2 id and the indicator that carries it. **Retry failed pairs** on the By indicator tab launches a new run over every failed pair, and a run's detail offers the same for that run's failed pairs.

## Managing import history

Each import that merges data creates a new dataset version. The **History** tab lists every run with when it ran, how it was imported (CSV or DHIS2), what it selected, and how many rows it inserted, updated or removed. Click a run for its detail. The **By indicator** tab shows the same history organised by DHIS2 id or file id, with the indicator that carries each one. For each it shows which months have been imported and when, with a per-month detail and **Re-import this indicator** to fetch it again from DHIS2. A renamed indicator keeps its history here, because the history is kept under the DHIS2 id or file id, not under the indicator's own id.

To delete data, click **Delete data** in the sidebar, choose all indicators or a selection of them, the admin areas and the period range, and type `yes please delete` to confirm. The rows deleted are those stored under the selected indicators' DHIS2 ids and file ids. Deleting is irreversible and is refused while an import is running.

## Deleting ICEH data

The ICEH dataset has two deletion options. To delete all ICEH data, check **Delete ALL ICEH data**, type `yes please delete` in the confirmation field, and click **Delete**. To remove only specific indicators while keeping others, uncheck **Delete ALL ICEH data**, select the indicators you want to remove from the list, and click **Delete**. Only the selected indicators are removed; all other indicators are kept.

## After importing

Once data is integrated, it becomes available to all projects in your instance. Projects can set their data window to include the new periods, and modules will pick up the fresh data on their next run.
