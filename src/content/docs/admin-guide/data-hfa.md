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

Navigate to the **Data** section and select **HFA Data**. Click **Start new import** to begin a four-step process.

1. **Upload files.** Select or upload both your CSV data file and XLSForm questionnaire file.

2. **Configure mapping.** Specify which CSV column contains facility identifiers. Then assign a label and date for this time point - use something descriptive like "Round 1" or "Baseline Dec 2024".

3. **Stage the data.** Click **Start staging** to validate facility IDs, match columns to XLSForm definitions, and expand "select multiple" questions into individual variables.

4. **Review and integrate.** The summary shows valid rows, dropped rows (due to missing or invalid facility IDs), and data dictionary statistics. Click **Integrate and finalize** to complete.

:::caution[Screenshot needed]
HFA import step 1 showing the two file upload areas for CSV and XLSForm.
:::

:::caution[Screenshot needed]
HFA staging results showing row statistics and data dictionary counts.
:::

## Time points
<!-- help#hfa-time-points -->

HFA data is organized by time points rather than continuous periods. Each import creates a new time point with the label you specified. After importing, use **Manage time points** to edit labels, adjust dates, reorder, or delete individual survey rounds.

:::caution[Screenshot needed]
Time points management interface showing list of imported rounds with edit and reorder controls.
:::

## Validation details

Rows can be dropped during staging for several reasons: missing facility IDs, facility IDs not in your registry, or duplicate facilities within a single import. The staging summary shows each category separately. If you see many "Facility Not Found" entries, check whether your facility registry needs updating.

## XLSForm handling

FASTR extracts survey structure from your XLSForm to provide meaningful labels throughout the platform. Variable names become technical identifiers. Labels appear in visualizations and reports. Value labels map numeric response codes to descriptive text.

For "select_multiple" questions, FASTR automatically expands each choice into a separate binary variable - a question with five options becomes five yes/no indicators.

## Working with HFA data

Once imported, HFA data flows into the analytical pipeline alongside HMIS data. Modules can reference HFA variables in their calculations, and visualizations can display facility assessment results. Because HFA represents discrete survey rounds rather than continuous reporting, it's typically used for cross-sectional comparisons rather than time trends.
