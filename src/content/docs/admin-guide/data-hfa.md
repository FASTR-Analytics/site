---
title: "Data: HFA"
description: Importing and managing facility assessment survey data.
sidebar:
  order: 5
---

Health Facility Assessment (HFA) data captures point-in-time snapshots of facility characteristics - infrastructure, equipment, staffing, and service readiness. Unlike HMIS data which flows continuously from routine reporting, HFA data comes from periodic surveys conducted at specific "time points" (such as "Round 1" or "Baseline December 2024"). This survey-based structure shapes how you import and manage HFA data in FASTR.

## What HFA data includes

HFA surveys collect information about facilities not captured in routine reporting: availability of essential equipment, stock levels of medicines, presence of trained staff, and infrastructure like water and electricity. This data complements HMIS by providing context about facility capacity - helping explain why some facilities perform differently than others.

## Required files
<!-- help#hfa-required-files -->

Each HFA import requires two files:

- **CSV data file** - one row per facility with columns for each survey question. The first column should contain facility identifiers matching your registry.
- **XLSForm questionnaire file** - defines the survey structure following the XLSForm standard. FASTR reads this to extract variable names, question labels, and value labels.

## Import workflow
<!-- help#hfa-import -->

Navigate to the **Data** section and select **HFA Data**. Click **Start new import** to begin a five-step process.

1. **Upload files.** Select or upload both your CSV data file and XLSForm questionnaire file.

2. **Configure mapping.** Specify which CSV column contains facility identifiers and select the time point this data belongs to. You can also add optional row filter conditions here. Each condition specifies a column, an operator (equals or does not equal), and a value. Rows that fail any condition are dropped before duplicate handling — for example, to keep only surveyed facilities, you might require a consent column to equal 1. Values are compared as exact text.

3. **Review duplicates.** If any facilities appear more than once after filtering, this step lets you choose which row to keep for each. A quick-set control lets you apply "first row" or "last row" across all duplicates at once; you can then override individual facilities. Row numbers count data rows from 1 in file order (excluding the header). Click **Save** to confirm your duplicate-handling choices before proceeding.

4. **Stage the data.** Click **Start staging** to validate facility IDs, match columns to XLSForm definitions, and expand "select multiple" questions into individual variables. The staging summary shows total rows staged.

5. **Review and integrate.** Check the summary statistics — rows in file, valid rows, total values to import, invalid rows by category, duplicate rows with the strategy applied, rows removed by filter, and dictionary statistics. Click **Integrate and finalize** to complete.

![HFA Upload](/images/hfa-upload-en.png)

![HFA Upload Round](/images/hfa-upload-round-en.png)

## Time points
<!-- help#hfa-time-points -->

HFA data is organized by time points rather than continuous periods. Before importing data, create your time points on the **HFA Time Points** page. Each time point has a label and a calendar period (year and month). Time points define the named rounds - such as "Round 1" or "Baseline Dec 2024" - that appear throughout the platform.

After importing, use the **HFA Time Points** page to edit labels, adjust dates, reorder, add new time points, or delete individual survey rounds. Deleting a time point removes all its data and sampling weights.

![HFA Timepoints](/images/hfa-timepoints-en.png)

## Validation details

Rows can be dropped during staging for several reasons: missing facility IDs, facility IDs not in your registry, duplicate facilities within a single import (handled by the strategy you chose in step 3), or rows excluded by the filter conditions you set in step 2. The staging summary shows each category separately. If you see many "Facility Not Found" entries, check whether your facility registry needs updating.

## XLSForm handling

FASTR extracts survey structure from your XLSForm to provide meaningful labels throughout the platform. Variable names become technical identifiers. Labels appear in visualizations and reports. Value labels map numeric response codes to descriptive text.

For "select_multiple" questions, FASTR automatically expands each choice into a separate binary variable - a question with five options becomes five yes/no indicators.

Certain variable names are reserved and cannot be used as survey variable names. Reserved names include R functions and operators used in indicator code, as well as columns the analysis script generates (such as `weight`, `time_point`, and facility-related columns). If your XLSForm contains a reserved variable name, rename it before importing.

## Working with HFA data

Once imported, HFA data flows into the analytical pipeline alongside HMIS data. Modules can reference HFA variables in their calculations, and visualizations can display facility assessment results. Because HFA represents discrete survey rounds rather than continuous reporting, it's typically used for cross-sectional comparisons rather than time trends.
