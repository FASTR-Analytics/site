---
title: Indicators
description: Defining and managing health indicators.
sidebar:
  order: 3
---

Indicators are the health metrics your FASTR instance tracks - things like immunization coverage rates, facility reporting rates, or outpatient visit counts. Before you can analyze data, you need to define which indicators matter and where their data comes from. This page covers indicator configuration for both HMIS and HFA data.

## HMIS indicators

HMIS indicators form a single dictionary. Each indicator has a type that says what fills it: a **DHIS2 element** is a monthly count the DHIS2 import fetches by its DHIS2 id, an **Uploaded** indicator is a monthly count filled by CSV import, a **Sum** is the total of DHIS2 element or Uploaded indicators added per facility and month, and a **Calculated** indicator is a formula over other indicators and population terms. The three count types are adjusted by the data quality modules; a calculated indicator is computed from the formula after the data is adjusted and aggregated.

The indicator list shows every indicator with its ID, label, type, and what defines it. A **Special** badge marks indicators the analysis modules read by name as counts - these are always analysed and can only be a DHIS2 element, Uploaded, or a Sum.

### Managing indicators
<!-- help#ind-list -->

To create an indicator, click **Create new**. Give it an ID and a label, then choose its type. The type determines what definition fields appear.

To sort the list order used by every indicator axis in every visualization, click **Sort**.

To see what each type entails, click **Indicator types** in the heading bar. To see the special indicator IDs, population terms, and reserved words, click **Special indicators and reserved words**.

Global administrators can select rows in the list and use the **Delete** bulk action to remove the selected indicators, subject to the usual dependency checks. Individual indicators can also be deleted from within the indicator editor using the **Delete** button in the footer. The **Include in analysis** and **Exclude from analysis** bulk actions toggle the flag on the selected rows. The **DHIS2 data import** bulk action opens the DHIS2 import wizard pre-selected with the chosen indicators.

From the overflow menu in the toolbar, global administrators also have access to two occasional maintenance actions: **Download** exports the indicator dictionary as a CSV file containing columns for the indicator ID, label, type, DHIS2 id (including the DHIS2 name last read from DHIS2), members, formula, include-in-analysis flag, format, thresholds, direction, target, and expected-low-counts flag. **Refresh DHIS2 names** reads the current name of every DHIS2 element indicator from DHIS2 by its DHIS2 id and stores it alongside the indicator, without changing any labels, ids, or data. Use this after DHIS2 data elements are renamed on the DHIS2 server. After the refresh completes, the result modal shows how many names were refreshed, how many were already current, which indicators point to DHIS2 formulas (what DHIS2 calls indicators) rather than data elements, and which ids were not found in DHIS2. If any indicators point to DHIS2 formulas or are not found, contact the FASTR team to run the DHIS2 id repair, which fixes the underlying ids while keeping any data already imported.

#### Indicator types

- **DHIS2 element** — a monthly count fetched from DHIS2 by a data element UID or UID.COC operand. Its rows are stored under that DHIS2 id. When you add a DHIS2 element indicator, FASTR reads and stores the element's current name from DHIS2 as the **DHIS2 name**; this stored name is shown next to the DHIS2 id in the indicator editor and in the indicator list for reference. The DHIS2 name is kept up to date when you use **Refresh DHIS2 names**, and is cleared automatically if you change the indicator's type to something other than a DHIS2 element. The DHIS2 name is not the indicator label and is not used in analysis.
- **Uploaded** — a monthly count filled by CSV import. FASTR gives it an internal identifier; the Mapping step of each CSV import points file values at it. Uploaded indicators are not fetched by DHIS2 imports.
- **Sum** — the total of its member indicators (DHIS2 elements or Uploaded indicators), added per facility and month. A sum cannot contain another sum.
- **Calculated** — a formula over other indicators and population terms, computed after the data is adjusted and aggregated. It has no rows of its own.

All three count types are adjusted by the data quality modules. A calculated indicator is not.

#### Calculated indicators
<!-- help#ind-calculated -->

A calculated indicator is defined by a formula over other indicators, for example `anc4 / anc1` for a coverage rate. It is computed after the data is aggregated, so a regional or annual figure is the formula applied to the summed parts, not an average of ratios.

A formula can use `+`, `-`, `*`, `/`, parentheses and numbers, comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`), logical operators (`AND`, `OR`, `NOT`, or equivalently `&`, `|`, `!`), and the functions `abs()` (absolute value), `coalesce()` (the first value that is not empty) and `nullif()` (empty when the two values are equal). A formula may refer to another calculated indicator, whose definition is inserted in place of its ID.

A formula can also divide by a population term, for example `population_pregnancies`. Populations come from the instance's Population page (Data → Population): annual population counts per admin area and population type, uploaded as a CSV.

For a calculated indicator you also set the display format (number, percent, or rate per 10,000), an optional target value, and optionally a conditional formatting rule for colour coding. The **direction** field (higher is better or lower is better) applies to every indicator type and is used by the conditional formatting rule.

The **Status** column in the list says whether each calculated indicator can be computed. A calculated indicator cannot be computed if an indicator it uses has no data. A warning above the list says when any calculated indicator cannot be computed.

#### Include in analysis
<!-- help#ind-include -->

Every indicator has an **Include in analysis** toggle. When it is on, every results package analyses the indicator: the data quality modules adjust it and it is available in visualizations. When it is off, the indicator is dictionary-only — its data is still imported and stored, and it is still usable as a member or in an expression, but it is not adjusted or included in the analysed set. Toggle this in the indicator editor or using the bulk actions. Special indicators are always analysed regardless of this flag. A calculated indicator that cannot be computed is flagged in the **Status** column.

### Adding indicators from DHIS2
<!-- help#ind-dhis2-import -->

Click **Add from DHIS2** to add data elements or DHIS2 indicators from your DHIS2 server. FASTR uses the instance's stored DHIS2 connection, which is set in the DHIS2 connection row on the Data page; if none is stored, an alert explains how to set one.

The form has two phases. In the **Select** phase, search by name, code, or ID. Results show both data elements and DHIS2 indicators. A data element can be added as-is or expanded to select individual category option combos (operands). A DHIS2 indicator is decomposed into its operands and a calculated indicator whose formula is over the indicators those operands become; the form shows the formula and flags any operand that cannot be added. Select the items you want and click **Next: name indicators**.

In the **Name** phase, each data element or operand becomes a new DHIS2 element indicator. The form proposes an indicator ID generated from the element's name; edit it inline. Each DHIS2 indicator becomes a calculated indicator whose ID you also set here. An element whose DHIS2 id is already carried by an existing indicator is shown as already added and creates nothing new. Click **Save** to create the indicators in a single transaction.

Adding indicators from DHIS2 only registers them in the dictionary. To fetch their data, run a DHIS2 import from the Imports view (see Data: HMIS).

When you add a DHIS2 element indicator, FASTR reads and stores the element's current name from DHIS2 as the **DHIS2 name**. This stored name is shown next to the DHIS2 id in the indicator editor and in the indicator list, making it easier to identify elements without memorising their UIDs. The DHIS2 name is not the indicator label and is not used in analysis; it is purely for reference. Use **Refresh DHIS2 names** from the toolbar overflow menu to update these stored names after elements are renamed on the DHIS2 server. If you change a DHIS2 element indicator's type to Uploaded or another type, the stored DHIS2 name is cleared automatically.

## HFA indicators

Health Facility Assessment data works differently from HMIS. HFA surveys have custom question structures that vary by assessment, so HFA indicators require code to extract values from raw survey data.

### Defining HFA indicators

Each HFA indicator has an indicator ID, category, sub-category, service categories, a short label, a definition, data type (binary or numeric), and aggregation method (sum or average). The indicator ID is assigned automatically by the platform when you create the indicator and serves as the technical identifier throughout — in indicator code, in the data dictionary, and when other indicators reference it.

The **service categories** field is optional and provides an additional cross-cutting classification that is independent of the category/sub-category hierarchy. An indicator can belong to multiple service categories at once. Service categories are managed on their own tab in the HFA indicator manager and can be assigned to any indicator regardless of its category. When filtering visualizations or project data by service category, a match is made if the indicator belongs to any of the selected service categories — it does not need to belong to all of them.

![HFA Indicators](/images/hfa-indicators-en.png)

### Searching indicators

The HFA indicator manager includes a search box in the toolbar. Type any text to filter the indicator list by label, definition, category, sub-category, or service category. The table also supports column filters for category, sub-category, service categories, type, status, and consistency — click a column header's filter icon to narrow results by specific values.

### Indicator code
<!-- help#ind-r-code -->

Each HFA indicator requires indicator code specifying how to extract its value from raw survey data. The code runs for each facility and should evaluate to yes/no for binary indicators or a number for numeric ones.

The indicator code language supports comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`), logical operators (`AND`, `OR`, `NOT`, and their symbol equivalents `&`, `|`, `!`), the list test `x IN (1, 2, 3)` (negated as `x NOT IN (1, 2, 3)`), arithmetic (`+`, `-`, `*`, `/`), numbers, and text in quotes. There are no functions. Write an index or average as arithmetic, for example `(a + b + c) / 3`.

The code editor shows which survey variables are available in your dataset at each time point, identified by their variable ID. If survey structure changed between assessments, you can write different code for different time points. FASTR validates syntax and flags unknown variables as errors. It also checks whether your code's result type matches the indicator's declared type — for example, a binary indicator whose code is purely arithmetic will show a type mismatch warning.

Type mismatch warnings (shown in amber) are advisory and do not block saving. Errors (shown in red) — including syntax errors and references to variables not found in the dataset — do block the indicator from being marked as ready.

The code editor's right-hand panel lists survey variables so you can click any entry to insert its variable ID into the code at the cursor position. The search box filters both lists by matching every word of your query against the variable ID and label together, in any order. The panel also lists other indicators, so you can click any to insert its indicator ID — useful when one indicator's code references another.

![HFA Code](/images/hfa-code-en.png)

### Filter code

Each time-point code entry also supports an optional filter code field. Filter code restricts which facilities contribute to the indicator's value — only facilities where the filter expression evaluates to true are included. If you enter filter code for a time point, you must also provide indicator code for that same time point; a filter without indicator code is not valid and blocks saving.

### Variant groups and per-item code

An indicator can be assigned to a **variant group**, which defines a set of response options (items) that the indicator can be broken down by. When a variant group is assigned, the code editor shows a per-item numerator section below the main code for each time point. Each item gets its own code snippet that shares the time point's filter code. Use this when the same indicator needs separate numerator logic for each response option — for example, separate calculations for each ownership category.

Variant groups and their items are managed on the **Variant groups** tab in the HFA indicator manager. Each item has a short ID (lowercase letters, digits, and underscores, starting with a letter, maximum 64 characters) and a display label. Items are ordered within their group and can be reordered by dragging.

To assign a variant group to an indicator, open the indicator's code editor and select the group from the **Variant group** dropdown. If the indicator already has per-item code for a different group and you switch groups, FASTR asks for confirmation before clearing the old group's code.

### Code consistency

When an indicator applies to multiple time points, FASTR tracks whether extraction code is consistent. Inconsistent code may be intentional (survey questions change between rounds), but it's worth reviewing. Use **Revalidate all** after making changes to refresh validation across all indicators.

The indicator list shows a summary of code status: **ready** (no errors), **type mismatch** (the code's result type does not match the indicator's declared type), and **error** (syntax or unknown-variable errors). The **Revalidate all**, **Check unused variables**, **Download Excel**, and **Import Excel** buttons are disabled when no HFA time points have been defined yet, because those actions depend on the survey data dictionary. Add a time point from **HFA → Time points** to enable them.

### Importing default indicators

The HFA indicator manager includes an **Import default indicators** button alongside the **Import Excel** button. Clicking it fetches the standard FASTR HFA indicator set directly from the FASTR resource hub on GitHub — no file selection required. The form shows how many indicators and categories were retrieved before you confirm the import. You choose the same import modes as with a file upload: **Add to existing** adds only new indicator IDs, while **Replace all existing** deletes all current indicators before importing.

### Deleting indicators

Before deleting an indicator or a set of indicators, FASTR checks whether any other indicators reference the deleted indicator IDs in their indicator code or variant code. If references are found, the confirmation dialog lists the affected indicators and warns that their code will fail validation after deletion. You can delete an individual indicator from its code editor using the **Delete** button in the header, or from the edit indicator dialog using the **Delete** button in the footer. Multiple indicators can be deleted at once using the bulk action in the indicator list.

### AI assistant for indicators

The AI assistant in the HFA Indicator Manager can clean up labels, organise indicators into categories, and create new indicators from the underlying survey dataset. It reads and writes indicators through a set of dedicated tools — loading current state before proposing changes, validating indicator code against the data dictionary, and showing a confirmation dialog with a diff before any edits are applied. When the assistant creates new indicators, it assigns each indicator's ID automatically and returns the assigned IDs after creation. When applying bulk updates, all changes are sent to the server in a single transactional operation.

The code editor also has its own AI tools. When you open an indicator's code editor, the assistant can read the editor's current draft and apply changes to it — label edits, type and aggregation changes, category assignments, and per-round code changes — as if you had made them yourself. Changes land in the editor's draft unsaved, so you keep them with **Save** or discard them with **Cancel**.

### Unused variables

Click **Check unused variables** from the overflow menu to open a modal listing survey variables that no indicator currently references, grouped by time point. Structural variables used internally by the analysis are excluded from this list. From this modal you can click **Add** next to any variable to open the create indicator dialog pre-filled with that variable's label, making it easy to turn unused variables into new indicators.

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
- **Indicators**: indicatorId (leave blank for a new indicator; the platform assigns one), categoryId, subCategoryId, serviceCategoryId (pipe-separated for multiple), shortLabel, label, type, aggregation, variantGroupId (optional), r_code__&lt;time point&gt;, r_filter_code__&lt;time point&gt;, r_variant_code__&lt;itemId&gt;__&lt;time point&gt;, …

Text columns such as `label` and `shortLabel` can alternatively be provided per language using suffixed column names: `label_en`, `label_fr`, and `label_pt`. When per-language columns are present, the import reads the instance language's column and falls back to English if that column is blank or absent. This lets a single workbook serve every instance regardless of its configured language.

If the Service categories, Variant groups, or Variant items sheets are omitted, indicators are imported with no service categories or variant assignments.

Variant code columns use the format `r_variant_code__<itemId>__<timePointLabel>`. Each variant code column must reference an item ID from the Variant items sheet, and the time point label must match a labeled `r_code__` column in the same file. An indicator with variant code must also have a `variantGroupId` that matches the item's group.

When importing, choose between **Add to existing** and **Replace all existing** import modes. In **Add to existing** mode, indicators whose IDs already exist on the platform are skipped — only new ones are created. After import, a summary lists any skipped indicators. In **Replace all existing** mode, all existing indicators, categories, sub-categories, and service categories are permanently deleted before importing. To confirm a replace-all import, you must type the confirmation phrase shown in the field before the **Import** button becomes active.

FASTR detects the time point columns embedded in the file and presents a mapping step where you confirm which platform time point each column should import into. If the column labels match your platform time points exactly, the mapping is pre-filled automatically. Each platform time point can receive one or more workbook columns — the same code can be applied to multiple time points at once by mapping several columns to the same time point.

## XLSForm variable labels

When FASTR reads your XLSForm questionnaire during an HFA import, it constructs labels for variables using the survey structure. For most variables the label is simply the question text. For variables inside matrix question groups (ODK `begin_group` or `begin_repeat` blocks), FASTR qualifies the label with the immediate enclosing group's label, separated by " — ". For example, a child question labelled "Infrastructure" inside a group labelled "Block B: Challenges" becomes "Block B: Challenges — Infrastructure". This ensures that matrix children, which often share identical question text across multiple groups, are identifiable in the data dictionary and in visualizations.

For "select_multiple" questions, the expanded binary variables follow the same pattern: the composed variable label is joined to the choice label with the same " — " separator.

FASTR also strips HTML markup and normalizes whitespace from XLSForm labels before storing them, so labels authored with on-screen formatting appear cleanly in the dictionary.

## Best practices

Choose indicator IDs that are short but descriptive. Avoid spaces and special characters - stick to lowercase letters, numbers, and underscores. An ID can be renamed later; renaming rewrites every formula and import schedule that references it, while data stays in place.

Check the DHIS2 ids in the list when data elements are changed or replaced on the DHIS2 server. A replaced data element has a new DHIS2 UID, so create a new DHIS2 element indicator for it. Use **Refresh DHIS2 names** periodically to keep the stored DHIS2 names current. If the refresh reveals indicators pointing to DHIS2 formulas or ids not found in DHIS2, contact the FASTR team to run the DHIS2 id repair. The repair fixes the underlying DHIS2 ids — including ids that point to DHIS2 formulas rather than data elements, ids that match nothing in DHIS2, and cases where a UID.COC operand with a default category option combo is duplicating the bare element — while keeping any data already imported. After the repair, a follow-up DHIS2 import refetches data for the affected indicators.
