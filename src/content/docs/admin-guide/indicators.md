---
title: Indicators
description: Defining and managing health indicators.
sidebar:
  order: 3
---

Indicators are the health metrics your FASTR instance tracks - things like immunization coverage rates, facility reporting rates, or outpatient visit counts. Before you can analyze data, you need to define which indicators matter and where their data comes from. This page covers indicator configuration for both HMIS and HFA data.

## HMIS indicators

Every HMIS indicator is one row in the indicator list. There is no separate list of DHIS2 identifiers. A DHIS2 element is an indicator that carries the DHIS2 id of a data element on your DHIS2 server. A count that arrives in CSV files is an uploaded indicator. Each CSV import maps the values in the file's indicator column onto the indicators they belong to. A total or a rate is an indicator built from other indicators.

You build the indicator list yourself. Importing data never adds an indicator to it: a DHIS2 data import fetches values for DHIS2 elements that are already indicators, and a CSV import can only place rows under indicators that already exist. Create the indicators first, in this list or with **Add indicators from DHIS2**, then import the data.

The indicator's id and label are names you give the data, and you can change them at any time without moving a row. A DHIS2 element's data rows are stored under its DHIS2 id, which is fixed once data has been imported under it. An uploaded indicator's rows are stored under an identifier FASTR manages for it; you never see it and never type it.

### The indicator list
<!-- help#ind-list -->

The list shows every indicator with its id, label, type and definition. The **Type** column has four values:

- **DHIS2 element** is a count fetched from DHIS2. The **Defined by** column shows the DHIS2 id of the data element (or of the operand, a data element narrowed to one category option combination, written `UID.COC`) the import fetches into it.
- **Uploaded** is a count filled by CSV import. The **Defined by** column is empty: at the Mapping step of each CSV import you choose which values in the file belong to it, and that choice is not stored on the indicator.
- **Sum** is the total of other indicators. The **Defined by** column lists its members. Members are DHIS2 elements or uploaded indicators; a sum cannot contain a sum. The members' counts are added per facility and month, and the result goes through the same data quality adjustment as any other count.
- **Derived** is a formula over other indicators and populations, evaluated after the data is adjusted and aggregated. The **Defined by** column shows the formula.

The **Format** column shows how a derived indicator is displayed: Number, Percent or Rate per 10,000. It is blank for the other three types, which are always numbers.

The **Indicator types** button explains the four types side by side: where each type's data comes from, whether the data quality modules adjust it, and whether it has data rows of its own. A DHIS2 element, an uploaded indicator and a sum are counts, and the data quality modules adjust them. A DHIS2 element and an uploaded indicator are the two types with data rows of their own; a sum is read from its members' rows, and a derived indicator is computed from its formula after the data is adjusted and aggregated. The same three facts appear under the type selector when you create or edit an indicator.

Each indicator has an id (like `anc1`), a label and an **Include in analysis** checkbox. Some ids are marked **Special**: the analysis modules read them by name, so an indicator with a special id is always analysed (its **Include in analysis** checkbox is on and cannot be cleared), and it cannot be a derived indicator. A new instance starts with an empty list. The **Special indicators and reserved words** button lists the special ids. Create the ones your data uses in the same way as any other indicator.

To create an indicator by hand, click **Create indicator**, choose the type and fill in the definition. A DHIS2 element has a **DHIS2 id** field, which is required. An uploaded indicator has no definition field: you give it an id and a label, and each CSV import decides which values in the file belong to it. A sum has a member picker. A derived indicator has a formula field. An indicator id cannot contain commas, semicolons, colons or square brackets, and must be at most 128 characters. Population ids and function names cannot be used as indicator ids, and a special id can only be given to a DHIS2 element, an uploaded indicator or a sum.

To rename an indicator, open it and change its id. Renaming rewrites every formula and every scheduled import that names the indicator. Its data stays where it is, and results packages already generated keep the old id. A special id can be renamed too, but the analysis modules then stop finding it until some count carries that id again. The new id is refused if another indicator already has it, or if it is a reserved word.

A DHIS2 id cannot be changed while the indicator has data. To give the data a different name, rename the indicator instead. A DHIS2 element can become an uploaded indicator at any time and keeps its data. An uploaded indicator can become a DHIS2 element only as long as it has no data; it then takes the DHIS2 id you type, in DHIS2's format. Switching a DHIS2 element or an uploaded indicator to a sum or a derived indicator is refused while it has data or while a sum lists it as a member.

Deleting an indicator is refused while it has data, while a sum lists it as a member, or while another indicator's formula needs it.

When you select rows in the list, two actions become available. **Import HMIS data from DHIS2** opens the DHIS2 import wizard with the selected indicators already chosen in its Indicators step (see Data: HMIS); after the launch, a notice in the list says where to follow the run. **Delete** removes the selected indicators, subject to the rules above.

:::caution[Screenshot needed]
The indicator list showing the Type, Defined by, Include in analysis and Status columns.
:::

### Adding indicators from DHIS2
<!-- help#ind-dhis2-import -->

Click **Add indicators from DHIS2** to add data elements from your DHIS2 server to the list as DHIS2 elements. FASTR uses the instance's stored connection; **Change connection** lets you use another one. Search by name, code or id. The results list data elements and DHIS2 indicators, and each row says whether it can be added. A data element can be added only when DHIS2 describes it as an additive monthly count: aggregation type sum, a numeric value type, and at least one monthly data set. Anything else is refused, with the reason shown.

Add the elements you want, then click **Next: name indicators**. The naming step shows each element with a proposed id based on its DHIS2 name, which you can edit before saving; you can also rename the indicator later. An id that already belongs to an indicator is refused. A data element whose DHIS2 id is already in the list is shown as already added and creates nothing.

A DHIS2 indicator (a formula in DHIS2, such as a coverage rate) is never added as values. FASTR reads its numerator and denominator, adds each data element they use as a DHIS2 element of its own, and creates a derived indicator with the formula `(numerator) / (denominator)` over them. A DHIS2 formula that FASTR cannot express, for example one that uses program indicators, organisation unit groups or functions, is refused, and the message names the part of the formula that stopped it.

Adding a data element only puts it in the list. To fetch its data, select the new indicators in the list and choose **Import HMIS data from DHIS2**, or start an import from Data: HMIS.

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

You also set the display format (number, percent, or rate per 10,000) and, optionally, a conditional formatting rule for colour coding, for example green above 80% and yellow between 70% and 80%. Only a derived indicator has these two settings. A DHIS2 element, an uploaded indicator or a sum is a count: it is always displayed as a number and has no conditional formatting rule.

The editor checks a formula as you type. It refuses a formula that names an indicator that does not exist, that refers back to itself, or that needs more than eight indicators once every sum and derived indicator it refers to is expanded. The **Status** column in the list says whether each derived indicator can be computed. A formula that uses an indicator with no data yet can be saved, but results cannot be generated until that data is imported.

:::caution[Screenshot needed]
The indicator editor for a derived indicator, showing the formula field, the pickers, the legend and the format.
:::

### Include in analysis
<!-- help#ind-include -->

Every indicator has an **Include in analysis** checkbox. When it is on, every results package analyses the indicator: the data quality modules adjust it and it is available in visualizations. When it is off, the indicator is in the dictionary only. Its data is still imported and stored, it can still be a member of a sum, and it can still be used in a formula, but no package carries it on its own.

This is how you keep a data element for use in a total or a rate without filling the results with it. A special indicator is always analysed. When an included derived indicator uses an indicator that is not included, the editor says so, and the package includes that indicator anyway.

### Downloading the list

**Download CSV** writes the whole list to one file, for review or for sharing. The columns are `indicator_id`, `label`, `type`, `dhis2_id`, `members`, `expression`, `include_in_analysis`, `format_as` and `thresholds`. The `type` is `uploaded`, `dhis2_element`, `sum` or `derived`. The `dhis2_id` column holds the DHIS2 id of a `dhis2_element` and is empty for the other types. For a sum, `members` lists the member ids separated by semicolons. For a derived indicator, `expression` is the formula, `format_as` is `number`, `percent` or `rate_per_10k`, and `thresholds` is its conditional formatting rule; the other types are always `number` and have no rule. The file cannot be uploaded back into FASTR; you edit the list in the app.

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

Choose indicator IDs that are short but descriptive. Avoid spaces and special characters - stick to lowercase letters, numbers, and underscores. An id can be changed later, so a better name found after the first import is not lost.

Check the DHIS2 ids in the list when data elements are changed or replaced on the DHIS2 server. A replaced data element has a new DHIS2 id, so create a new DHIS2 element for it, and make a sum over the old and new elements if the series should continue as one. For derived indicators, document your threshold choices - future analysts will want to understand the reasoning behind cutoffs.
