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

Raw indicators are the technical identifiers from DHIS2. To import them, click **Import DHIS2 indicator**. FASTR uses the instance's stored DHIS2 connection to search for data elements — if a stored connection exists, the search opens immediately. If not, you can enter connection details for this session only. Select which data elements to bring in, and FASTR creates a raw indicator for each using the DHIS2 ID and display name. You can also change the connection mid-session using **Change connection** in the search view.

When creating a new raw or common indicator ID, the ID must not contain commas, semicolons, colons, or square brackets, and must be at most 128 characters. Once created, indicator IDs cannot be changed — renaming would break existing data references.

:::caution[Screenshot needed]
DHIS2 indicator import dialog showing available data elements with selection checkboxes.
:::

### Common indicators
<!-- help#ind-common -->

Common indicators are the standardized names analysts work with. A common indicator like "ANC1 visits" might map to different raw DHIS2 IDs in different countries. This abstraction means analysis code and visualizations reference consistent names even when underlying data sources change.

Each common indicator has an ID (like `anc1_visits`), a display label, and a type. Click **Add Common Indicator** to open the editor, where you configure everything in one place.

:::caution[Screenshot needed]
Common indicator editor showing ID, label, type selector, and definition fields.
:::

### Indicator types: base and derived
<!-- help#ind-calculated -->

Every common indicator has a type, chosen in the same editor. A **base** indicator is defined by the raw indicators mapped to it, which are summed at data extraction. A **derived** indicator is defined by a formula over other common indicators and population terms.

Write a derived indicator's formula using `+`, `-`, `*`, `/`, and parentheses. Use other common indicator IDs directly (for example `anc4 / anc1`), or reference a population by writing `[population:type_id]` (for example `anc4 / [population:pregnancies]`). The functions `abs()`, `coalesce()`, and `nullif()` are available. Use the **Insert indicator** and **Insert population** palette controls in the editor to insert correctly written identifiers at the cursor position; a legend below the formula names every identifier the formula references and shows population data coverage.

A base indicator always produces a count and its format is fixed as a number. A derived indicator can be formatted as a number, a percent, or a rate per 10,000.

You can also set a conditional formatting rule on any common indicator. When a visualization uses the **Indicator** CF source, each value is coloured by its own indicator's rule. The figure's legend shows the colour bands drawn from all the displayed indicators' rules together.

Indicators can be sorted using the **Sort** button on the Common Indicators tab. The saved order is what every indicator axis in every figure sorts by.

:::caution[Screenshot needed]
Common indicator editor showing type selector (Base / Derived), formula field, indicator/population palette, and display section with format and conditional formatting rule.
:::

### Batch import

For instances with many indicators, batch import lets you upload a CSV with indicator definitions. This is useful when setting up a new instance or migrating from another system.

## HFA indicators

Health Facility Assessment data works differently from HMIS. HFA surveys have custom question structures that vary by assessment, so HFA indicators require R code to extract values from raw survey data.

### Defining HFA indicators

Each HFA indicator has a variable name, category, sub-category, service categories, definition, data type (binary or numeric), and aggregation method (sum or average). Keep variable names short and consistent, like `has_essential_medicines` or `staff_trained_count`.

Variable names must start with a letter and contain only letters, digits, and underscores, with a maximum of 64 characters. Once an indicator is created, its variable name cannot be changed — other indicators may reference it in their R code, and renaming would break those references. Choose names carefully before saving.

Variable names must also not be reserved words. Reserved names include R functions and operators used in indicator code, as well as columns the analysis script generates (such as `weight`, `time_point`, and facility-related columns). The editor shows an error if you attempt to create an indicator with a reserved name.

Variable names must also not duplicate any survey variable name already present in your HFA dataset. Using a survey variable name as an indicator variable name would shadow the dataset column inside other indicators' R code, producing incorrect results.

The **service categories** field is optional and provides an additional cross-cutting classification that is independent of the category/sub-category hierarchy. An indicator can belong to multiple service categories at once. Service categories are managed on their own tab in the HFA indicator manager and can be assigned to any indicator regardless of its category. When filtering visualizations or project data by service category, a match is made if the indicator belongs to any of the selected service categories — it does not need to belong to all of them.

![HFA Indicators](/images/hfa-indicators-en.png)

### Searching indicators

The HFA indicator manager includes a search field in the indicators panel header. Type any text to filter the indicator list by variable name, label, definition, category, sub-category, or service category. The count in the panel header updates to show how many indicators match your search out of the total. When no indicators match, the table shows "No indicators match your search."

### R code for extraction
<!-- help#ind-r-code -->

Each HFA indicator requires R code specifying how to extract its value from raw survey data. The code runs for each facility and should return TRUE/FALSE for binary indicators or a number for numeric ones.

The code editor shows which variables are available in your dataset at each time point. If survey structure changed between assessments, you can write different code for different time points. FASTR validates syntax and flags unknown variables as errors, and warns about potential issues like lone `=` operators that may be unintended comparisons, or use of `&&` and `||` operators that fail when the code runs across all facilities at once (use `&` and `|` instead). It also checks whether your code's result type matches the indicator's declared type — for example, a binary indicator whose code performs no comparison will show a type warning.

Warnings (shown in amber) are advisory and do not block saving. Errors (shown in red) — including syntax errors and references to variables not found in the dataset — do block the indicator from being marked as ready.

![HFA Code](/images/hfa-code-en.png)

### Filter code

Each time-point code entry also supports an optional filter code field. Filter code restricts which facilities contribute to the indicator's value — only facilities where the filter expression evaluates to TRUE are included. If you enter filter code for a time point, you must also provide R code for that same time point; a filter without R code is not valid and blocks saving.

### Variant groups and per-item code

An indicator can be assigned to a **variant group**, which defines a set of response options (items) that the indicator can be broken down by. When a variant group is assigned, the code editor shows a per-item numerator section below the main code for each time point. Each item gets its own R code snippet that shares the time point's filter code. Use this when the same indicator needs separate numerator logic for each response option — for example, separate calculations for each ownership category.

Variant groups and their items are managed on the **Variant groups** tab in the HFA indicator manager. Each item has a short ID (lowercase letters, digits, and underscores, starting with a letter, maximum 64 characters) and a display label. Items are ordered within their group and can be reordered by dragging.

To assign a variant group to an indicator, open the indicator's code editor and select the group from the **Variant group** dropdown. If the indicator already has per-item code for a different group and you switch groups, FASTR asks for confirmation before clearing the old group's code.

### Code consistency

When an indicator applies to multiple time points, FASTR tracks whether extraction code is consistent. Inconsistent code may be intentional (survey questions change between rounds), but it's worth reviewing. Use **Revalidate all** after making changes to refresh validation across all indicators.

The indicator list shows a summary of code status: **ready** (no errors or warnings), **warning** (advisory issues only), and **error** (syntax or unknown-variable errors). The **Revalidate all**, **Check unused variables**, **Download Excel**, and **Import Excel** buttons are disabled when no HFA time points have been defined yet, because those actions depend on the survey data dictionary. Add a time point from **HFA → Time points** to enable them.

### Importing default indicators

The HFA indicator manager includes an **Import default indicators** button alongside the **Import Excel** button. Clicking it fetches the standard FASTR HFA indicator set directly from the FASTR resource hub on GitHub — no file selection required. The form shows how many indicators and categories were retrieved before you confirm the import. You choose the same import modes as with a file upload: **Add to existing** adds only new variable names, while **Replace all existing** deletes all current indicators before importing.

### Deleting indicators

Before deleting an indicator or a set of indicators, FASTR checks whether any other indicators reference the deleted variable names in their R code or variant code. If references are found, the confirmation dialog lists the affected indicators and warns that their code will fail validation after deletion.

### AI assistant for indicators

Global administrators can open an AI assistant panel directly in the HFA Indicator Manager by clicking the **AI** button. The button appears in the top bar of the manager and also in the header of the code editor and the Excel workbook upload form when the panel is not already open. The assistant can clean up labels, organise indicators into categories, and create new indicators from the underlying survey dataset. It reads and writes indicators through a set of dedicated tools — loading current state before proposing changes, validating R code against the data dictionary, and showing a confirmation dialog with a diff before any edits are applied. When applying bulk updates, all changes are sent to the server in a single transactional operation: either all indicators are updated or none are, so a partial failure cannot leave the dataset in an inconsistent state. The assistant operates on instance-level HFA indicators and is fully isolated from the project AI assistant.

### Managing service categories

Service categories are created and managed from the **Service categories** tab in the HFA indicator manager. Click **Add** to create a new service category - you provide a label and FASTR derives an ID automatically, though you can edit it. You can reorder service categories by dragging, and edit or delete them individually. Deleting a service category removes it from any indicators currently assigned to it. Note that service category IDs cannot contain the pipe character (`|`).

### Managing variant groups

Variant groups are created and managed from the **Variant groups** tab in the HFA indicator manager. The tab shows a two-panel layout: groups on the left and the selected group's items on the right.

Click **Add** in the groups panel to create a new group — provide a label and FASTR derives an ID automatically. You can reorder groups by dragging. Click the pencil icon to edit a group's label, or the trash icon to delete it. Deletion is refused while any indicator is still assigned to the group.

Select a group to manage its items in the right panel. Click **Add** to create a new item — provide a label and FASTR derives an ID from it, though you can edit the ID before saving. Item IDs must start with a lowercase letter and contain only lowercase letters, digits, and underscores (maximum 64 characters). You can reorder items within a group by dragging. Edit or delete individual items using the icons on each row; deleting an item removes any per-item code authored for it.

### Excel workbook upload

HFA indicators support batch creation via Excel workbook. Upload an Excel workbook (.xlsx) with these sheets:

- **Categories**: id, label
- **Sub-categories**: id, categoryId, label
- **Service categories**: id, label (optional)
- **Variant groups**: id, label (optional)
- **Variant items**: id, groupId, label (optional)
- **Indicators**: varName, categoryId, subCategoryId, serviceCategoryId (pipe-separated for multiple), shortLabel, definition, type, aggregation, variantGroupId (optional), r_code__&lt;time point&gt;, r_filter_code__&lt;time point&gt;, r_variant_code__&lt;itemId&gt;__&lt;time point&gt;, …

If the Service categories, Variant groups, or Variant items sheets are omitted, indicators are imported with no service categories or variant assignments.

Variant code columns use the format `r_variant_code__<itemId>__<timePointLabel>`. Each variant code column must reference an item ID from the Variant items sheet, and the time point label must match a labeled `r_code__` column in the same file. An indicator with variant code must also have a `variantGroupId` that matches the item's group.

When importing, choose between **Add to existing** and **Replace all existing** import modes. In **Add to existing** mode, indicators whose variable names already exist on the platform are skipped — only new variable names are created. After import, a summary lists any skipped indicators. In **Replace all existing** mode, all existing indicators, categories, sub-categories, and service categories are permanently deleted before importing. To confirm a replace-all import, you must type `yes please delete` in the confirmation field before the **Import** button becomes active.

FASTR detects the time point columns embedded in the file and presents a mapping step where you confirm which platform time point each column should import into. If the column labels match your platform time points exactly, the mapping is pre-filled automatically. Each platform time point can only receive one workbook column — mapping two columns to the same time point is rejected.

## XLSForm variable labels

When FASTR reads your XLSForm questionnaire during an HFA import, it constructs labels for variables using the survey structure. For most variables the label is simply the question text. For variables inside matrix question groups (ODK `begin_group` or `begin_repeat` blocks), FASTR qualifies the label with the immediate enclosing group's label, separated by " — ". For example, a child question labelled "Infrastructure" inside a group labelled "Block B: Challenges" becomes "Block B: Challenges — Infrastructure". This ensures that matrix children, which often share identical question text across multiple groups, are identifiable in the data dictionary and in visualizations.

For "select_multiple" questions, the expanded binary variables follow the same pattern: the composed variable label is joined to the choice label with the same " — " separator.

FASTR also strips HTML markup and normalizes whitespace from XLSForm labels before storing them, so labels authored with on-screen formatting appear cleanly in the dictionary.

## Best practices

Choose indicator IDs that are short but descriptive. Avoid spaces and special characters - stick to lowercase letters, numbers, and underscores.

Keep common indicator mappings current when DHIS2 configurations change. For derived indicators, document your formula choices — future analysts will want to understand what each term represents and why specific population types were chosen.
