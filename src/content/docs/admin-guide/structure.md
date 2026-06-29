---
title: Structure
description: Configuring admin areas, facilities, and geographic data.
sidebar:
  order: 2
---

Structure in FASTR refers to the organizational hierarchy of your health system - the administrative boundaries that define where services are delivered, and the facilities that deliver them. Setting this up correctly is one of the first tasks when configuring a new instance, because most other features depend on it.

## Administrative areas
<!-- help#struct-admin-areas -->

Administrative areas represent geographic boundaries organized in a hierarchy. FASTR supports up to four levels, though most countries use two or three. The exact meaning of each level depends on your country - what FASTR calls "Admin Area 2" might be a region in one country and a province in another. You can customize labels for each level in instance settings.

A typical hierarchy: Admin Area 1 represents the entire country, Admin Area 2 contains regions or provinces, Admin Area 3 contains districts, and Admin Area 4 (if used) contains sub-districts. Each facility links to one admin area at the lowest level you're using, and FASTR automatically rolls up data to higher levels.

Admin areas are created automatically when facilities are imported - each facility row carries its admin area path. They are also removed automatically when no facility in either registry references them, so you do not need to manage admin areas directly.

![Admin Areas](/images/admin-areas-en.png)

## Health facilities
<!-- help#struct-facilities -->

FASTR maintains two separate facility registries: one for HMIS facilities and one for HFA facilities. Both registries share the same admin area hierarchy, but each has its own import flow and its own table of facility records.

Facilities can have optional attributes: facility type (hospital, health center, dispensary), ownership category (public, private, faith-based), and up to five custom attributes for additional categorization.

These attributes enable disaggregation in visualizations. If you want to compare performance between public and private facilities, you need those attributes populated in your structure data.

![Health Facilities](/images/health-facilities-en.png)

## Importing facilities

To import facilities, navigate to the **Data** section and open either the **HMIS Facilities** card or the **HFA Facilities** card depending on which registry you want to update. Each registry has its own import wizard. Each registry's import is independent - you can run an HMIS import and an HFA import at the same time.

### CSV import

The CSV import follows a multi-step wizard.

**Step 0 - Choose source.** Select CSV as your import method.

**Step 1 - Upload file.** Upload a CSV file with one row per facility.

**Step 2 - Map columns.** Turn on the columns you want to import and map each one to a column in your file. Only the Facility ID column is required. Administrative areas are all-or-nothing: either map all levels or none. Optional metadata columns (name, type, ownership, custom fields) can each be toggled on or off independently. If you are only updating metadata and not moving facilities geographically, you can leave administrative areas turned off.

**Step 3 - Stage data.** FASTR validates the file and streams rows into a staging table. Progress updates automatically.

**Step 4 - Review and integrate.** The staging summary shows how many facilities are in your file and how many of those already exist in the registry. Choose an integration mode:

- **Replace all existing facilities** - deletes every facility currently in this registry, then adds all facilities from your file. This requires administrative areas to be mapped. FASTR blocks this mode if any dataset or sampling weights still reference the existing facilities.
- **Add new facilities and update existing ones** - adds facilities with new IDs and updates existing ones with the columns you mapped. This also requires administrative areas.
- **Update existing facilities only** - updates only facilities already in the registry; the import is rejected if your file contains any ID not already present.

Before confirming, the summary shows how many existing facilities match IDs in your file and how many are new. If none match and you expected updates, the facility ID column is probably mapped to the wrong column, or you are importing into the wrong registry (HMIS vs HFA).

![Structure Import](/images/structure-import-en.png)

### DHIS2 import

DHIS2 import is available for HMIS facilities. Connect with your DHIS2 credentials, then select which org unit levels to import. FASTR maps DHIS2 levels to admin area levels. HFA facilities can only be imported from CSV.

## Managing existing facilities

Once imported, facilities appear as a searchable table showing all records with their admin area assignments and attributes. To update - adding facilities, correcting assignments, or updating attributes - run another import with the appropriate integration mode.

To delete all facilities in a registry, open that registry's card and click **Delete facilities**. This removes only the facilities in that registry; admin areas shared with the other registry are preserved. Only global administrators can delete facilities.

To remove all admin areas and facilities from both registries at once, open the **Admin areas** card and click **Clear all admin areas and facilities**. Use this option with caution, as it affects modules and visualizations that reference the old structure.

![Managing Existing Facilities](/images/managing-existing-facilities-en.png)

## HFA facility sampling weights

For HFA analyses that require weighted estimates, you can upload per-facility sampling weights. Open the **Data** section and click the **Sampling weights** card to open the weights manager. Only global administrators can import or delete weights; all users with data access can view the weights table.

Prepare a CSV file with a facility ID column and a weight column. Each import covers one time point. To upload weights, select or upload your CSV, then map the facility ID column, the weight column, and the target time point. A blank weight cell means the facility is not in that round's sample and will be skipped. A successful import reports how many weights were imported, how many blank cells were skipped, and which time point was covered. Re-importing updates existing weights for the same facility and time point.

The weights manager displays a coverage summary showing, for each time point, how many facilities with data have a corresponding weight. A warning highlight indicates time points where some facilities have data but no weight - those facilities will count with weight 1 when weighted analysis is enabled. You can download the current weights as a CSV and re-import after editing.

To remove all sampling weights, click **Delete all weights**. This does not affect any facility records or HFA data.

## GeoJSON for maps
<!-- help#struct-geojson -->

Map visualizations require geographic boundary data in GeoJSON format. Upload one GeoJSON file per admin area level - typically for Admin Area 2 (regions) and Admin Area 3 (districts).

Each GeoJSON file should contain polygons with a property matching admin area names in your structure data. FASTR attempts to match features to admin areas during upload and reports any mismatches. Unmatched areas appear blank on maps.

![GeoJSON](/images/geojson-en.png)

If naming differs between your GeoJSON and structure data, the GeoJSON editor lets you modify feature properties to resolve matching issues.
