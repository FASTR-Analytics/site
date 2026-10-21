---
title: "Data: HFA"
description: Importing and managing facility assessment survey data.
sidebar:
  order: 5
---

Health Facility Assessment (HFA) data captures point-in-time snapshots of facility characteristics - infrastructure, equipment, staffing, and service readiness. Unlike HMIS data which flows continuously from routine reporting, HFA data comes from periodic surveys conducted at specific "time points" (such as "Round 1" or "Baseline December 2024"). This survey-based structure shapes how you import and manage HFA data in FASTR.

## What HFA data includes

HFA surveys collect information about facilities not captured in routine reporting: availability of essential equipment, stock levels of medicines, presence of trained staff, and infrastructure like water and electricity. This data complements HMIS by providing context about facility capacity - helping explain why some facilities perform differently than others.

## The HFA facility list

HFA facilities are created and updated by each time point's data import. Unlike HMIS facilities, they are not imported through a separate facility import wizard. Open the **HFA Facilities** row in the Data section to view a table of all HFA facilities with their admin areas and attributes. A global administrator can click any row to edit that facility's admin areas and optional columns - any value you change becomes a user-set value, so later imports keep it by default.

The **Unused facilities** panel lets you remove facilities that have no data and no sampling weights. Click **Remove** to count and then confirm the deletion. Admin areas that are left with no facility are removed at the same time.

## Required files
<!-- help#hfa-required-files -->

Each HFA import requires two files:

- **CSV data file** - one row per facility with columns for each survey question. The file must include a facility identifier column.
- **XLSForm questionnaire file** - defines the survey structure following the XLSForm standard. FASTR reads this to extract question IDs, question labels, and value labels.

## Import workflow
<!-- help#hfa-import -->

Navigate to the **Data** section and select **HFA Data**. The sidebar shows an **Imports** button that opens the imports history and lets you start a new import from within that surface.

The import wizard collects everything needed before any data is sent to the server. Abandoning the wizard at any point has no effect — nothing is stored until you click **Start import** on the final step.

### Step 1 — Upload files

Select or upload your CSV data file and your XLSForm questionnaire file. Both files must be present before the wizard can proceed; the wizard parses the CSV headers against the XLSForm as soon as both are selected. If the files cannot be parsed together, an error appears and you should verify the XLSForm matches the CSV. FASTR pre-fills the facility ID column based on the latest import's column choice and the questionnaire's standard column names.

### Step 2 — Mappings

Specify which CSV column contains facility identifiers, select the time point this data belongs to, and add optional row filter conditions. Each condition specifies a column, an operator (equals or does not equal), and a value. Rows that fail any condition are dropped before duplicate handling.

### Step 3 — Facilities

Choose which CSV columns carry the facility's admin areas and optional attributes such as facility type and ownership. FASTR pre-fills these pickers from the latest import's choices and, where a column matches a standard questionnaire name, by column name. A correction column for any picker, where filled, replaces the main column's value for that row.

For each mapped column, FASTR shows a preview: the number of distinct values, how many are blank, and the most frequent values. It also shows any values not yet in the HFA facility list (for facilities already in the registry) and any XLSForm codes that could not be resolved to a label.

The first admin area level is entered as a text value (the country name) rather than mapped to a column. Levels 2 and up are mapped to CSV columns. You must map all levels or none; if the HFA facility list is empty every facility in the file is new, so all levels are required.

### Step 4 — Duplicates

This step shows any facilities that appear more than once after filtering and lets you choose which row to keep for each. When no duplicates exist, a message confirms there is nothing to resolve.

### Step 5 — Changes

This step shows every facility the import would change in the HFA facility list: new facilities being added, and existing facilities whose admin areas or optional columns differ from the file. For each type of change you decide to **Keep** the current value in the facility list or **Take** the file's value. A value set by a user or by a later time point is kept by default; a value from this or an earlier time point gives way to the file by default.

Click any change group row to expand it and decide individual facilities one by one. Use **Keep all** and **Take all** to set the whole group at once.

The step also shows the impact on admin areas: areas that would be lost and the scopes and maps naming them, and new admin area paths the import would introduce.

If none of the file's facility IDs match the existing facility list and you expected to update existing facilities, a warning appears. You must confirm that the facilities are genuinely new before proceeding.

For new facilities and the changes you take, you can reassign values facility by facility in the **Reassign values** section. Check the values that need reassigning, and for each affected facility choose a target value from the dropdown. Extra columns from your file can be shown alongside the table to help identify facilities.

### Step 6 — Review and launch

A summary shows all choices: the data file, XLSForm file, facility ID column, time point, row filters, the facility column mappings, the count of new facilities, the changes taken per column, and any value reassignments. Read the notice: the import replaces all existing data for the selected time point and writes the new facilities and taken changes to the HFA facility list. Click **Start import** to launch.

A file in which every row has a facility ID and every new facility has complete admin areas integrates automatically. Otherwise the import pauses in a **needs review** state before anything is written.

## Monitoring imports

Click **Imports** to open the imports history. The **Current** section shows any running import with a live progress bar and percentage. The **History** table lists all completed, cancelled, and errored runs with their time point, file name, values imported, and status. Click any history row to see the full run detail including staging diagnostics.

### Needs review

When some rows have no facility ID, or new facilities have no complete admin areas, the import holds in a **needs review** state before anything is merged. A card at the top of the imports view explains what happened and shows the staging results. You can choose to **Integrate anyway** — which leaves out those rows and facilities — or **Discard** to abandon the import without writing anything.

### Cancelling a running import

While an import is running, a **Cancel import** button appears. Cancelling stops the run; nothing already merged is affected.

![HFA Upload](/images/hfa-upload-en.png)

![HFA Upload Round](/images/hfa-upload-round-en.png)

## Time points
<!-- help#hfa-time-points -->

HFA data is organized by time points rather than continuous periods. Before importing data, create your time points on the **HFA Time Points** page. Each time point has a label and a calendar period (year and month). Time points define the named rounds - such as "Round 1" or "Baseline Dec 2024" - that appear throughout the platform.

After importing, use the **HFA Time Points** page to edit labels, adjust dates, reorder, add new time points, or delete individual survey rounds. Deleting a time point removes all its data and sampling weights.

![HFA Timepoints](/images/hfa-timepoints-en.png)

## Validation details

Rows can be dropped during staging for several reasons: missing facility IDs or rows excluded by the filter conditions you set in the mappings step. The staging summary shows each category separately and includes a facilities section showing how many facilities are already in the registry, how many are new, how many are in the registry but not in this file, and any new facilities that lack complete admin areas. It also shows how many XLSForm questions had no matching CSV column and which CSV columns had no matching XLSForm question, with samples in each category.

If no CSV column matches any staged-type question in the XLSForm, the import stops immediately with an error explaining the mismatch.

## XLSForm handling

FASTR extracts survey structure from your XLSForm to provide meaningful labels throughout the platform. Question IDs become technical identifiers used in R code and the data dictionary. Labels appear in visualizations and reports. Value labels map numeric response codes to descriptive text.

FASTR matches CSV column headers to XLSForm question IDs case-insensitively. An ODK group path like `section_a/SERV_08B` is matched on its last segment, so the path matches the question `serv_08b`. If two CSV columns match the same question — for example `serv_08b` and `SERV_08B` both present — the import stops with an error naming both columns.

For "select_multiple" questions, FASTR automatically expands each choice into a separate binary variable.

Certain question IDs are reserved and cannot be used as survey question IDs. Reserved names include R functions and operators used in indicator code, as well as columns the analysis script generates. If your XLSForm contains a reserved question ID, rename the question in the XLSForm and its column in the CSV before importing.

## HFA facility sampling weights

For HFA analyses that require weighted estimates, you can upload per-facility sampling weights. Open the **Data** section and click the **Sampling weights** row. Prepare a CSV with a facility ID column and a weight column, and optionally a sampling stratum column. Each import covers one time point. Import the time point's data first: the data import creates the HFA facilities, and a weight for a facility not in the HFA facility list is skipped.

To upload weights, select or upload your CSV, then map the facility ID column, the weight column, the stratum column (optional), and the target time point. A successful import reports how many weights were imported, the number of strata if a stratum column was mapped, how many weights with no stratum were found, and any facilities whose weights were skipped because the facility is not in the HFA facility list.

## Working with HFA data

Once imported, HFA data flows into the analytical pipeline alongside HMIS data. Modules can reference HFA variables in their calculations, and visualizations can display facility assessment results. Because HFA represents discrete survey rounds rather than continuous reporting, it's typically used for cross-sectional comparisons rather than time trends.
