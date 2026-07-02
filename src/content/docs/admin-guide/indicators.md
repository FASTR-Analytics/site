---
title: Indicators
description: Defining and managing health indicators.
sidebar:
  order: 3
---

Indicators are the health metrics your FASTR instance tracks - things like immunization coverage rates, facility reporting rates, or outpatient visit counts. Before you can analyze data, you need to define which indicators matter and how they map to raw data. This page covers indicator configuration for both HMIS and HFA data sources.

## HMIS indicators

HMIS data typically comes from DHIS2, where data elements have technical identifiers like `qHJdhOrhklI` that mean nothing to analysts. FASTR uses a two-layer system: raw indicators (DHIS2 identifiers) and common indicators (human-readable names).

### Raw DHIS2 indicators

Raw indicators are the technical identifiers from DHIS2. To import them, click **Import DHIS2 indicator**, enter your credentials, and select which data elements to bring in. FASTR creates a raw indicator for each using the DHIS2 ID and display name.

When creating a new raw or common indicator ID, the ID must not contain commas, semicolons, or colons, and must be at most 128 characters. Once created, indicator IDs cannot be changed — renaming would break existing data references.

:::caution[Screenshot needed]
DHIS2 indicator import dialog showing available data elements with selection checkboxes.
:::

### Common indicators
<!-- help#ind-common -->

Common indicators are the standardized names analysts work with. A common indicator like "ANC1 visits" might map to different raw DHIS2 IDs in different countries. This abstraction means analysis code and visualizations reference consistent names even when underlying data sources change.

Each common indicator has an ID (like `anc1_visits`), a display label, and mappings to one or more raw indicators. When multiple raw indicators map to the same common indicator, their values are summed.

:::caution[Screenshot needed]
Common indicator editor showing ID, label, and raw indicator mapping fields.
:::

### Calculated indicators
<!-- help#ind-calculated -->

Derived metrics that combine multiple indicators - like coverage rates - use calculated indicators. Each specifies a numerator (which common indicator), a denominator (another indicator, population estimate, or nothing for raw counts), and formatting rules.

You also set thresholds for color coding: the green cutoff for good performance, yellow for acceptable. For example, a coverage indicator with green at 80 and yellow at 70 shows green above 80%, yellow for 70-80%, and red below 70%.

When creating a calculated indicator, you can also duplicate an existing one using the copy action. The copy opens with a new suggested ID and label pre-filled, ready for you to adjust before saving.

Note that only common indicators whose IDs start with a lowercase letter and contain only lowercase letters, numbers, and underscores can be used as numerators or denominators in calculated indicators. If you select a common indicator with an ID that does not meet this requirement, the editor shows a warning and will not allow saving.

:::caution[Screenshot needed]
Calculated indicator editor showing numerator/denominator selection and threshold configuration.
:::

### Batch import

For instances with many indicators, batch import lets you upload a CSV with indicator definitions. This is useful when setting up a new instance or migrating from another system.

## HFA indicators

Health Facility Assessment data works differently from HMIS. HFA surveys have custom question structures that vary by assessment, so HFA indicators require R code to extract values from raw survey data.

### Defining HFA indicators

Each HFA indicator has a variable name, category, sub-category, service categories, definition, data type (binary or numeric), and aggregation method (sum or average). Keep variable names short and consistent, like `has_essential_medicines` or `staff_trained_count`.

Variable names must start with a letter and contain only letters, digits, and underscores, with a maximum of 64 characters. Once an indicator is created, its variable name cannot be changed — other indicators may reference it in their R code, and renaming would break those references. Choose names carefully before saving.

Variable names must also not duplicate any survey variable name already present in your HFA dataset. Using a survey variable name as an indicator variable name would shadow the dataset column inside other indicators' R code, producing incorrect results.

The **service categories** field is optional and provides an additional cross-cutting classification that is independent of the category/sub-category hierarchy. An indicator can belong to multiple service categories at once. Service categories are managed on their own tab in the HFA indicator manager and can be assigned to any indicator regardless of its category.

![HFA Indicators](/images/hfa-indicators-en.png)

### R code for extraction
<!-- help#ind-r-code -->

Each HFA indicator requires R code specifying how to extract its value from raw survey data. The code runs for each facility and should return TRUE/FALSE for binary indicators or a number for numeric ones.

The code editor shows which variables are available in your dataset at each time point. If survey structure changed between assessments, you can write different code for different time points. FASTR validates syntax and flags unknown variables as errors, and warns about potential issues like lone `=` operators that may be unintended comparisons. It also checks whether your code's result type matches the indicator's declared type — for example, a binary indicator whose code performs no comparison will show a type warning.

Warnings (shown in amber) are advisory and do not block saving. Errors (shown in red) — including syntax errors and references to variables not found in the dataset — do block the indicator from being marked as ready.

![HFA Code](/images/hfa-code-en.png)

### Filter code

Each time-point code entry also supports an optional filter code field. Filter code restricts which facilities contribute to the indicator's value — only facilities where the filter expression evaluates to TRUE are included. If you enter filter code for a time point, you must also provide R code for that same time point; a filter without R code is not valid and blocks saving.

### Code consistency

When an indicator applies to multiple time points, FASTR tracks whether extraction code is consistent. Inconsistent code may be intentional (survey questions change between rounds), but it's worth reviewing. Use **Revalidate all** after making changes to refresh validation across all indicators.

The indicator list shows a summary of code status: **ready** (no errors or warnings), **warning** (advisory issues only), and **error** (syntax or unknown-variable errors). The **Revalidate all**, **Check unused variables**, **Download Excel**, and **Import Excel** buttons are disabled when no HFA data has been imported yet, because those actions depend on the survey data dictionary.

### Deleting indicators

Before deleting an indicator or a set of indicators, FASTR checks whether any other indicators reference the deleted variable names in their R code. If references are found, the confirmation dialog lists the affected indicators and warns that their code will fail validation after deletion.

### AI assistant for indicators

Global administrators can open an AI assistant panel directly in the HFA Indicator Manager by clicking the **AI** button in the top bar. The assistant can clean up labels, organise indicators into categories, and create new indicators from the underlying survey dataset. It reads and writes indicators through a set of dedicated tools — loading current state before proposing changes, validating R code against the data dictionary, and showing a confirmation dialog with a diff before any edits are applied. The assistant operates on instance-level HFA indicators and is fully isolated from the project AI assistant.

### Managing service categories

Service categories are created and managed from the **Service categories** tab in the HFA indicator manager. Click **Add** to create a new service category - you provide a label and FASTR derives an ID automatically, though you can edit it. You can reorder service categories by dragging, and edit or delete them individually. Deleting a service category removes it from any indicators currently assigned to it. Note that service category IDs cannot contain the pipe character (`|`).

### Excel workbook upload

HFA indicators support batch creation via Excel workbook. Upload an Excel workbook (.xlsx) with three sheets:

- **Categories**: id, label
- **Sub-categories**: id, categoryId, label
- **Service categories**: id, label (optional)
- **Indicators**: varName, categoryId, subCategoryId, serviceCategoryId (pipe-separated for multiple), shortLabel, definition, type, aggregation, r_code__&lt;time point&gt;, r_filter_code__&lt;time point&gt;, …

If the Service categories sheet is omitted, indicators are imported with no service categories assigned.

When importing, choose between **Add to existing** and **Replace all existing** import modes. In **Add to existing** mode, indicators whose variable names already exist on the platform are skipped — only new variable names are created. After import, a summary lists any skipped indicators. In **Replace all existing** mode, all existing indicators, categories, sub-categories, and service categories are permanently deleted before importing. To confirm a replace-all import, you must type `yes please delete` in the confirmation field before the **Import** button becomes active.

FASTR detects the time point columns embedded in the file and presents a mapping step where you confirm which platform time point each column should import into. If the column labels match your platform time points exactly, the mapping is pre-filled automatically. Each platform time point can only receive one workbook column — mapping two columns to the same time point is rejected.

## Best practices

Choose indicator IDs that are short but descriptive. Avoid spaces and special characters - stick to lowercase letters, numbers, and underscores.

Keep common indicator mappings current when DHIS2 configurations change. For calculated indicators, document your threshold choices - future analysts will want to understand the reasoning behind cutoffs.
