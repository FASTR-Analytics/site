---
title: Structure
description: Configuring admin areas, facilities, and geographic data.
sidebar:
  order: 2
---

Structure in FASTR refers to the organizational hierarchy of your health system - the administrative boundaries that define where services are delivered, and the facilities that deliver them. Setting this up correctly is one of the first tasks when configuring a new instance, because most other features depend on it.

## Administrative areas
<!-- help#struct-admin-areas -->

Administrative areas represent geographic boundaries organized in a hierarchy. FASTR supports up to four levels, though most countries use two or three. The exact meaning of each level depends on your country - what FASTR calls "Admin Area 2" might be a region in one country and a province in another. You can customize labels for each level from the **Admin area labels** row in the Data section.

A typical hierarchy: Admin Area 1 represents the entire country, Admin Area 2 contains regions or provinces, Admin Area 3 contains districts, and Admin Area 4 (if used) contains sub-districts. Each facility links to one admin area at the lowest level you're using, and FASTR automatically rolls up data to higher levels.

Admin areas are derived from the facility rows — each facility carries its admin area path, and FASTR creates and removes admin areas automatically as you import and delete facilities. You do not manage admin areas directly. A count of admin areas at each level is shown on the HMIS and HFA facility rows after importing.

![Admin Areas](/images/admin-areas-en.png)

## Health facilities
<!-- help#struct-facilities -->

FASTR maintains two separate facility registries: one for HMIS facilities and one for HFA facilities. Both registries share the same admin area hierarchy, but each has its own import flow, its own table of facility records, and its own configuration for admin area depth and facility columns.

Facilities can have optional attributes: facility type (hospital, health center, dispensary), ownership category (public, private, faith-based), and up to five custom attributes for additional categorization.

These attributes enable disaggregation in visualizations. If you want to compare performance between public and private facilities, you need those attributes populated in your structure data.

![Health Facilities](/images/health-facilities-en.png)

## Registry configuration

Each registry (HMIS and HFA) has its own configuration row accessible from the Data page. Open the **HMIS configuration** or **HFA configuration** row to adjust two independent settings.

**Max admin area level** sets how many administrative levels this registry's facilities are organised into. The options are 2, 3, or 4. Changing this setting requires deleting all of that registry's facilities first — the server enforces this to prevent mismatched data.

**Facility columns** controls which optional columns this registry's facility imports carry, and the label shown for each. The available columns are Facility Names, Facility Types, Facility Ownership, and up to five Custom Fields. Enable a column and optionally enter a custom label; leave the label blank to use the default. The two saves — admin level and facility columns — are independent, so a column change never trips the depth guard.

## Admin area labels

Admin area level names such as "Region" or "District" are shared by both registries. Set them from the **Admin area labels** row in the Data section. Enter the singular form of the name for each level in use. Leave a level blank to use the default. These labels appear everywhere data is disaggregated by area.

## Importing HMIS facilities

To import HMIS facilities, navigate to the **Data** section and open the **HMIS Facilities** row. The import uses a multi-step wizard.

**Step 0 - Choose source.** Select CSV or DHIS2 as your import method.

**Step 1 - Upload file (CSV) or confirm connection (DHIS2).** For CSV, upload a file with one row per facility. For DHIS2, confirm the instance-wide stored connection.

**Step 2 - Map columns (CSV) or select org unit levels (DHIS2).** For CSV, turn on the columns you want to import and map each to a column in your file. Only the Facility ID column is required. Administrative areas are all-or-nothing: either map all levels or none. Optional metadata columns can each be toggled on or off independently. For DHIS2, select which org unit levels to import.

**Step 3 - Stage data.** FASTR validates the file and streams rows into a staging table. Progress updates automatically.

**Step 4 - Review values (CSV sources only).** If the staged data contains columns whose values can be reassigned before import — such as facility type or ownership — a review step appears. Check which values need reassigning, select affected facilities in the table, and use the **Assign to** dropdown to map them to a target value. You can also add new category values by typing them in the **New category** field. For CSV imports, you can show additional columns from your file alongside the assignment table to help identify facilities. This step is optional — if nothing needs reassigning, click **Continue to import**. When you are done, click **Save and continue** to record your reassignments.

**Step 5 - Review and integrate.** The staging summary shows how many facilities are in your file and how many already exist in the registry. If you saved value reassignments in the previous step, the summary shows how many facilities will be recoded per column. Choose an integration mode:

- **Replace all existing facilities** — your file becomes the registry. Facilities in your file are added or updated, and every facility not in your file is deleted. Columns you did not map are cleared on updated facilities. This requires administrative areas to be mapped. FASTR blocks this mode if any dataset or sampling weights still reference facilities that would be deleted.
- **Add new facilities and update existing ones** - adds facilities with new IDs and updates existing ones with the columns you mapped. This also requires administrative areas.
- **Update existing facilities only** - updates only facilities already in the registry; the import is rejected if your file contains any ID not already present.

Before confirming, the summary shows how many existing facilities match IDs in your file and how many are new. If none match and you expected updates, the facility ID column is probably mapped to the wrong column.

After a successful integration, if any previously uploaded GeoJSON map boundaries no longer match an admin area, the summary displays a warning. Repair those mismatches in the GeoJSON editor.

![Structure Import](/images/structure-import-en.png)

## HFA facilities

HFA facilities are created and updated by each time point's data import rather than through a separate facility import wizard. Open the **HFA Facilities** row in the Data section to view and edit the HFA facility list. A global administrator can click any row to edit that facility's admin areas and optional columns.

The panel on the left shows an explanation of how HFA facilities are managed. If facilities exist, an **Unused facilities** section appears with a **Remove** button that counts and then confirms the deletion of facilities that have no data and no weights.

For DHIS2 import, FASTR uses the instance's stored DHIS2 connection. The DHIS2 password is stored encrypted on the server and is never sent back to the browser.

## Managing existing facilities

Once imported, facilities appear as a searchable table showing all records with their admin area assignments and attributes. To update HMIS facilities — adding facilities, correcting assignments, or updating attributes — run another import with the appropriate integration mode.

To delete all facilities in a registry, open that registry's row and click **Delete facilities**. This removes only the facilities in that registry; admin areas that are still referenced by the other registry are preserved. Only global administrators can delete facilities.

![Managing Existing Facilities](/images/managing-existing-facilities-en.png)

## HFA facility sampling weights

For HFA analyses that require weighted estimates, you can upload per-facility sampling weights. Open the **Data** section and click the **Sampling weights** row to open the weights manager. Only global administrators can import or delete weights; all users with data access can view the weights table and download the current weights as a CSV.

Prepare a CSV file with a facility ID column, a weight column, and optionally a sampling stratum column. Each import covers one time point. Import the time point's data first: the data import creates the HFA facilities, and a weight for a facility not in the HFA facility list is skipped. To upload weights, select or upload your CSV, then map the facility ID column, the weight column, the stratum column (optional), and the target time point. A blank weight cell means the facility is not in that round's sample and will be skipped.

A successful import reports how many weights were imported, the number of strata if a stratum column was mapped, how many weights had no stratum value, and which facility IDs were skipped because they are not in the HFA facility list.

The weights manager displays a coverage summary showing, for each time point, how many facilities with data have a corresponding weight. A warning highlight indicates time points where some facilities have data but no weight.

To remove all sampling weights, click **Delete all weights**. This does not affect any facility records or HFA data.

## GeoJSON for maps
<!-- help#struct-geojson -->

Map visualizations require geographic boundary data in GeoJSON format. FASTR maintains separate GeoJSON maps for the HMIS registry and the HFA registry. Upload one GeoJSON file per admin area level for each registry — typically for Admin Area 2 (regions) and Admin Area 3 (districts). Open the **GeoJSON maps** row for the relevant registry from the Data page.

Each GeoJSON file should contain polygons with a property matching admin area names in your structure data. FASTR attempts to match features to admin areas during upload and reports any mismatches. Unmatched areas appear blank on maps. Features without geometry are automatically skipped during both analysis and upload.

When you delete a GeoJSON level, the map cache for that level is automatically cleared so that stale boundary data no longer appears in map visualizations.

![GeoJSON](/images/geojson-en.png)

If naming differs between your GeoJSON and structure data, the GeoJSON editor lets you modify feature properties to resolve matching issues. You can also explicitly unmap a feature by setting its area ID to empty — this removes a previously matched feature from map visualizations without needing to re-upload the file.

Unmapped features in the upload wizard are kept in the file and can be mapped later using the GeoJSON editor.

### Uploading a DHIS2 GeoJSON map

If your boundaries are stored in DHIS2, the GeoJSON upload wizard can also fetch them directly from your DHIS2 server. FASTR uses the instance's stored DHIS2 connection. After you select a DHIS2 level, FASTR fetches lightweight org-unit metadata (names and codes) to let you build the mapping without downloading the full polygon dataset. The full geometry is only downloaded when you confirm and save, which can take up to several minutes for large countries.

After saving, FASTR reports how many boundaries were stored, how many matched an admin area, and how many were left unmatched (shown as a warning count). Unmatched boundaries can be mapped later using **Edit mappings**.

If the match property you selected is not present on the DHIS2 GeoJSON features, FASTR rejects the save and shows an error rather than storing an empty map.
