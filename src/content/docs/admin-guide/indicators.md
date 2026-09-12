---
title: Indicators
description: Defining and managing health indicators.
sidebar:
  order: 3
---

Indicators are the health metrics your FASTR instance tracks - things like immunization coverage rates, facility reporting rates, or outpatient visit counts. Before you can analyze data, you need to define which indicators matter and where their data comes from. This page covers indicator configuration for both HMIS and HFA data.

## HMIS indicators

Every HMIS indicator is one row in the indicator list. There is no separate list of DHIS2 identifiers. A DHIS2 data element is an indicator that carries a DHIS2 id. A column in an uploaded CSV file is an indicator whose id is the one written in the file. A total or a rate is an indicator built from other indicators. Every data row belongs to the indicator it was fetched or uploaded for.

### The indicator list
<!-- help#ind-list -->

The list shows every indicator with its id, label, type and definition. The **Type** column has four values:

- **DHIS2 element** is a count fetched from DHIS2. The **Defined by** column shows the DHIS2 id of the data element (or of the operand, a data element narrowed to one category option combination, written `UID.COC`) the import fetches into it.
- **Uploaded** is a count filled by CSV upload. The indicator column of the file holds this indicator's own id.
- **Sum** is the total of other indicators. The **Defined by** column lists its members. Members are DHIS2 elements or uploaded indicators; a sum cannot contain a sum. The members' counts are added per facility and month, and the result goes through the same data quality adjustment as any other count.
- **Derived** is a formula over other indicators and populations, evaluated after the data is adjusted and aggregated. The **Defined by** column shows the formula.

Each indicator has an id (like `anc1`), a label and an **Include in analysis** checkbox. Some ids are marked **Special**: the analysis modules read them by name, so they are always analysed and cannot be derived indicators.

To create an indicator by hand, click **Create indicator**, choose the type and fill in the definition. A DHIS2 element or an uploaded indicator has a **DHIS2 id** field: leave it empty for an uploaded indicator; once a DHIS2 id is set it cannot be changed. A sum has a member picker. A derived indicator has a formula field. An indicator id cannot contain commas, semicolons, colons or square brackets, must be at most 128 characters, and cannot be changed after the indicator is created. Population ids and function names cannot be used as indicator ids, and a special id can only be given to a DHIS2 element, an uploaded indicator or a sum.

Deleting an indicator is refused while it has data, while a sum lists it as a member, or while another indicator's formula needs it.

:::caution[Screenshot needed]
The indicator list showing the Type, Defined by, Include in analysis and Status columns.
:::

### Importing from DHIS2
<!-- help#ind-dhis2-import -->

Click **Import from DHIS2** to add data elements from your DHIS2 server. FASTR uses the instance's stored connection; **Change connection** lets you use another one. Search by name, code or id. The results list data elements and DHIS2 indicators, and each row says whether it can be imported. A data element can be imported only when DHIS2 describes it as an additive monthly count: aggregation type sum, a numeric value type, and at least one monthly data set. Anything else is refused, with the reason shown.

Add the elements you want, then click **Next: name indicators**. The naming step shows each element with a proposed id based on its DHIS2 name, which you can edit before saving. Typing the id of an existing uploaded indicator assigns the DHIS2 id to that indicator instead of creating a new one. This is how a special indicator such as `anc1`, which every new instance starts with, becomes a DHIS2 element. Any other existing id is refused. An element whose DHIS2 id is already in the list is shown as already imported and creates nothing.

A DHIS2 indicator (a formula in DHIS2, such as a coverage rate) is never imported as values. FASTR reads its numerator and denominator, imports each data element they use as an indicator of its own, and creates a derived indicator with the formula `(numerator) / (denominator)` over them. A DHIS2 formula that FASTR cannot express, for example one that uses program indicators, organisation unit groups or functions, is refused, and the message names the part of the formula that stopped it.

Importing an element only adds it to the list. To fetch its data, run an HMIS import (see Data: HMIS).

:::caution[Screenshot needed]
The naming step showing proposed ids for two data elements and the formula preview of a decomposed DHIS2 indicator.
:::

### Sums

A sum adds the counts of its members per facility and month. Use it where the same service is reported under several data elements, for example a vaccine recorded under one element for fixed sessions and another for outreach. Create it with **Create indicator**, choose the type **Sum**, and pick the members from the DHIS2 elements and uploaded indicators in the list. A sum needs at least one member.

### Derived indicators
<!-- help#ind-derived -->

A derived indicator is defined by a formula over other indicators, for example `anc4 / anc1` for a coverage rate. It is computed after the data is aggregated, so a regional or annual figure is the formula applied to the summed parts, not an average of ratios.

A formula can use `+`, `-`, `*`, `/`, parentheses and numbers, and the functions `abs()` (absolute value), `coalesce()` (the first value that is not empty) and `nullif()` (empty when the two values are equal). It is not limited to a numerator and a denominator: `(anc1 - anc4) / anc1` is a valid definition, and so is any combination of three or more indicators. A formula may refer to a sum or to another derived indicator; its definition is inserted in place of its id.

A formula can also divide by a population, written with the population type's id, for example `anc4 / population_pregnancies`. Populations come from the instance's Population page (Data → Population): annual population counts per admin area and population type, uploaded as a CSV. A value divided by a population is annualised, so a monthly value reads as a rate per year. Values are then computed only at the admin level of the population data, with no values for areas below it, and only for the areas and months the population data covers. A results package cannot be generated while a formula uses a population type that has no data at all.

You do not have to type identifiers by hand: the **Insert indicator** and **Insert population** pickers above the formula field insert them at the cursor, correctly written. The legend under the field lists every identifier the formula uses with its label. Write an id plainly when it is all lowercase letters, digits and underscores; otherwise put it in square brackets, like `[ANC.1]`.

You also set the display format (number, percent, or rate per 10,000) and, optionally, a conditional formatting rule for colour coding, for example green above 80% and yellow between 70% and 80%. A DHIS2 element, an uploaded indicator or a sum is a count and is always displayed as a number.

The editor checks a formula as you type. It refuses a formula that names an indicator that does not exist, that refers back to itself, or that needs more than eight indicators once every sum and derived indicator it refers to is expanded. The **Status** column in the list says whether each derived indicator can be computed. A formula that uses an indicator with no data yet can be saved, but results cannot be generated until that data is imported.

:::caution[Screenshot needed]
The indicator editor for a derived indicator, showing the formula field, the pickers, the legend and the format.
:::

### Include in analysis
<!-- help#ind-include -->

Every indicator has an **Include in analysis** checkbox. When it is on, every results package analyses the indicator: the data quality modules adjust it and it is available in visualizations. When it is off, the indicator is in the dictionary only. Its data is still imported and stored, it can still be a member of a sum, and it can still be used in a formula, but no package carries it on its own.

This is how you keep a data element for use in a total or a rate without filling the results with it. A special indicator is always analysed. When an included derived indicator uses an indicator that is not included, the editor says so, and the package includes that indicator anyway.

### Batch import
<!-- help#ind-batch -->

For instances with many indicators, **Batch import from CSV** uploads the whole list from one file, and **Download CSV** produces the same file from the current list, so you can edit the whole dictionary in a spreadsheet and upload it back. The columns are `indicator_id`, `label`, `type`, `dhis2_id`, `members`, `expression`, `include_in_analysis`, `format_as` and `thresholds`. The `type` is `base`, `sum` or `derived`. For a `base` indicator (a DHIS2 element or an uploaded indicator), `dhis2_id` is the DHIS2 data element or operand id, and is empty for an uploaded indicator. For a sum, `members` lists the member ids separated by semicolons. For a derived indicator, `expression` is the formula. Indicators the file names are created or updated, and existing ones keep their sort order.

Tick **Replace the whole dictionary with this file** to also delete every indicator the file does not name. The upload is refused, with the reasons listed, if it would remove an indicator that has data or one that a sum or formula still uses. It is also refused if it would move a DHIS2 id to another indicator while the old one has data.

## HFA indicators

Health Facility Assessment data works differently from HMIS. HFA surveys have custom question structures that vary by assessment, so HFA indicators require R code to extract values from raw survey data.

### Defining HFA indicators

Each HFA indicator has a variable name, category, sub-category, service categories, definition, data type (binary or numeric), and aggregation method (sum or average). Keep variable names short and consistent, like `has_essential_medicines` or `staff_trained_count`.

Variable names must start with a letter and contain only letters, digits, and underscores, with a maximum of 64 characters. Once an indicator is created, its variable name cannot be changed — other indicators may reference it in their R code, and renaming would break those references. Choose names carefully before saving.

Variable names must also not duplicate any survey variable name already present in your HFA dataset. Using a survey variable name as an indicator variable name would shadow the dataset column inside other indicators' R code, producing incorrect results.

The **service categories** field is optional and provides an additional cross-cutting classification that is independent of the category/sub-category hierarchy. An indicator can belong to multiple service categories at once. Service categories are managed on their own tab in the HFA indicator manager and can be assigned to any indicator regardless of its category. When filtering visualizations or project data by service category, a match is made if the indicator belongs to any of the selected service categories — it does not need to belong to all of them.

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

Global administrators can open an AI assistant panel directly in the HFA Indicator Manager by clicking the **AI** button. The button appears in the top bar of the manager and also in the header of the code editor and the Excel workbook upload form when the panel is not already open. The assistant can clean up labels, organise indicators into categories, and create new indicators from the underlying survey dataset. It reads and writes indicators through a set of dedicated tools — loading current state before proposing changes, validating R code against the data dictionary, and showing a confirmation dialog with a diff before any edits are applied. When applying bulk updates, all changes are sent to the server in a single transactional operation: either all indicators are updated or none are, so a partial failure cannot leave the dataset in an inconsistent state. The assistant operates on instance-level HFA indicators and is fully isolated from the project AI assistant.

### Managing service categories

Service categories are created and managed from the **Service categories** tab in the HFA indicator manager. Click **Add** to create a new service category - you provide a label and FASTR derives an ID automatically, though you can edit it. You can reorder service categories by dragging, and edit or delete them individually. Deleting a service category removes it from any indicators currently assigned to it. Note that service category IDs cannot contain the pipe character (`|`).

### Excel workbook upload

HFA indicators support batch creation via Excel workbook. Upload an Excel workbook (.xlsx) with four sheets:

- **Categories**: id, label
- **Sub-categories**: id, categoryId, label
- **Service categories**: id, label (optional)
- **Indicators**: varName, categoryId, subCategoryId, serviceCategoryId (pipe-separated for multiple), shortLabel, definition, type, aggregation, r_code__&lt;time point&gt;, r_filter_code__&lt;time point&gt;, …

If the Service categories sheet is omitted, indicators are imported with no service categories assigned.

When importing, choose between **Add to existing** and **Replace all existing** import modes. In **Add to existing** mode, indicators whose variable names already exist on the platform are skipped — only new variable names are created. After import, a summary lists any skipped indicators. In **Replace all existing** mode, all existing indicators, categories, sub-categories, and service categories are permanently deleted before importing. To confirm a replace-all import, you must type `yes please delete` in the confirmation field before the **Import** button becomes active.

FASTR detects the time point columns embedded in the file and presents a mapping step where you confirm which platform time point each column should import into. If the column labels match your platform time points exactly, the mapping is pre-filled automatically. Each platform time point can only receive one workbook column — mapping two columns to the same time point is rejected.

## Best practices

Choose indicator IDs that are short but descriptive. Avoid spaces and special characters - stick to lowercase letters, numbers, and underscores.

Check the DHIS2 ids in the list when data elements are changed or replaced on the DHIS2 server. For derived indicators, document your threshold choices - future analysts will want to understand the reasoning behind cutoffs.
