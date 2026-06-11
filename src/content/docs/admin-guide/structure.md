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

To import facilities, navigate to the **Data** section and open either the **HMIS Facilities** card or the **HFA Facilities** card depending on which registry you want to update. Each registry has its own import wizard.

Only one facility import can be in progress at a time across both registries. If an import is already underway for one registry, finish or discard it before starting one for the other.

### CSV import

The CSV import follows a multi-step wizard. Upload a CSV file with one row per facility, containing columns for facility ID, admin area hierarchy (one column per level), and optional attributes. After uploading, map your CSV columns to FASTR's expected fields.

FASTR then validates the data and shows a staging preview - how many admin areas and facilities will be created at each level, plus any validation warnings. Review this before proceeding.

![Structure Import](/images/structure-import-en.png)

The final step asks you to choose an integration strategy:

- **Add new and update existing** - the default, works for most cases
- **Replace all** - deletes all existing facilities in this registry first, useful for a fresh start
- **Add new only** - ignores records that already exist
- **Update selected columns** - only modify specific attributes for existing facilities

### DHIS2 import

DHIS2 import is available for HMIS facilities. Connect with your DHIS2 credentials, then select which org unit levels to import. FASTR maps DHIS2 levels to admin area levels. HFA facilities can only be imported from CSV.

## Managing existing facilities

Once imported, facilities appear as a searchable table showing all records with their admin area assignments and attributes. To update - adding facilities, correcting assignments, or updating attributes - run another import with the appropriate integration strategy.

To delete all facilities in a registry, open that registry's card and click **Delete these facilities**. This removes only the facilities in that registry; admin areas shared with the other registry are preserved. Only global administrators can delete facilities, and deletion is blocked if the registry is referenced by an existing dataset.

To remove all admin areas and facilities from both registries at once, open the **Admin areas** card and click **Clear all admin areas and facilities**. Use this option with caution, as it affects modules and visualizations that reference the old structure.

![Managing Structure](/images/managing-structure-en.png)

## HFA facility sampling weights

For HFA analyses that require weighted estimates, you can upload per-facility sampling weights. Open the **Data** section and click the **Sampling weights** card to open the weights manager. Only global administrators can import or delete weights; all users with data access can view the weights table.

Prepare a CSV file in wide format: one row per facility, with a `facility_id` column followed by one column per time point label. A blank cell means the facility is not in that round's sample and will not have a weight stored for it. Time point column headers must exactly match labels already created by an HFA data import.

To upload weights, select or upload your CSV using the file selector, then click **Import weights**. FASTR validates every row. Rows with invalid facility IDs are rejected with an error message listing the first few problem cases. Cells with non-positive weight values are also rejected. Blank cells are silently skipped - they represent facilities not in that round's sample. A successful import reports how many weight cells were imported, how many blank cells were skipped, and which time points were covered. Re-uploading updates existing weights for the same facility and time point.

The weights manager displays a coverage summary showing, for each time point, how many facilities with data have a corresponding weight. A warning highlight indicates time points where some facilities have data but no weight - those facilities will count with weight 1 when weighted analysis is enabled. You can download the current weights as a CSV in the same wide format, edit it, and re-import it.

To remove all sampling weights, click **Delete all weights**. This does not affect any facility records or HFA data.

## GeoJSON for maps
<!-- help#struct-geojson -->

Map visualizations require geographic boundary data in GeoJSON format. Upload one GeoJSON file per admin area level - typically for Admin Area 2 (regions) and Admin Area 3 (districts).

Each GeoJSON file should contain polygons with a property matching admin area names in your structure data. FASTR attempts to match features to admin areas during upload and reports any mismatches. Unmatched areas appear blank on maps.

![GeoJSON](/images/geojson-en.png)

If naming differs between your GeoJSON and structure data, the GeoJSON editor lets you modify feature properties to resolve matching issues.
