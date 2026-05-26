---
title: Structure
description: Configuring admin areas, facilities, and geographic data.
sidebar:
  order: 2
---

Structure in FASTR refers to the organizational hierarchy of your health system - the administrative boundaries that define where services are delivered, and the facilities that deliver them. Setting this up correctly is one of the first tasks when configuring a new instance, because most other features depend on it.

## Administrative areas

Administrative areas represent geographic boundaries organized in a hierarchy. FASTR supports up to four levels, though most countries use two or three. The exact meaning of each level depends on your country - what FASTR calls "Admin Area 2" might be a region in one country and a province in another. You can customize labels for each level in instance settings.

A typical hierarchy: Admin Area 1 represents the entire country, Admin Area 2 contains regions or provinces, Admin Area 3 contains districts, and Admin Area 4 (if used) contains sub-districts. Each facility links to one admin area at the lowest level you're using, and FASTR automatically rolls up data to higher levels.

:::caution[Screenshot needed]
Instance settings showing admin area level labels configuration.
:::

## Health facilities

Facilities are the health service delivery points where data is collected. Each facility belongs to one admin area and can have optional attributes: facility type (hospital, health center, dispensary), ownership category (public, private, faith-based), and up to five custom attributes for additional categorization.

These attributes enable disaggregation in visualizations. If you want to compare performance between public and private facilities, you need those attributes populated in your structure data.

:::caution[Screenshot needed]
Facility columns configuration in instance settings showing type, ownership, and custom fields.
:::

## Importing structure data

Structure data can come from a CSV file or directly from a DHIS2 system.

### CSV import

The CSV import follows a multi-step wizard. Upload a CSV file with one row per facility, containing columns for facility ID, admin area hierarchy (one column per level), and optional attributes. After uploading, map your CSV columns to FASTR's expected fields.

FASTR then validates the data and shows a staging preview - how many admin areas and facilities will be created at each level, plus any validation warnings. Review this before proceeding.

:::caution[Screenshot needed]
Step 4 of the structure import wizard showing staging results with admin area and facility counts.
:::

The final step asks you to choose an integration strategy:

- **Add new and update existing** - the default, works for most cases
- **Replace all** - deletes existing data first, useful for a fresh start
- **Add new only** - ignores records that already exist
- **Update selected columns** - only modify specific attributes for existing facilities

### DHIS2 import

If your country uses DHIS2, you can pull organizational unit data directly. Connect with your DHIS2 credentials, then select which org unit levels to import. FASTR maps DHIS2 levels to admin area levels. This keeps your structure aligned with your national HMIS system.

## Managing existing structure

Once imported, structure appears as a searchable table showing all facilities with their admin area assignments and attributes. To update - adding facilities, correcting assignments, or updating attributes - run another import with the appropriate integration strategy.

The "Clear admin areas and facilities" option removes everything. Use cautiously, as it affects modules and visualizations that reference the old structure.

:::caution[Screenshot needed]
Structure management view showing facility table with admin area columns.
:::

## GeoJSON for maps

Map visualizations require geographic boundary data in GeoJSON format. Upload one GeoJSON file per admin area level - typically for Admin Area 2 (regions) and Admin Area 3 (districts).

Each GeoJSON file should contain polygons with a property matching admin area names in your structure data. FASTR attempts to match features to admin areas during upload and reports any mismatches. Unmatched areas appear blank on maps.

:::caution[Screenshot needed]
GeoJSON manager showing uploaded map files with admin area level and upload date.
:::

If naming differs between your GeoJSON and structure data, the GeoJSON editor lets you modify feature properties to resolve matching issues.
