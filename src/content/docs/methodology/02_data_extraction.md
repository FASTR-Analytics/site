---
title: "Data extraction"
---

> **Note:** Content in this section draws on existing FASTR presentation materials and is subject to revision.

## Overview

This section describes the rationale, requirements, and recommended practices for extracting routine service delivery data from DHIS2 for use in the FASTR analytical pipeline.

### Why extract data from DHIS2?

**Data quality adjustment**

The FASTR approach prioritizes systematic data quality adjustment to enable more rigorous use of routine DHIS2 data and to generate analytically robust, policy-relevant estimates. The methodology includes standardized procedures to:

- Identify and adjust for outliers  
- Adjust for incomplete reporting  
- Apply consistent data quality metrics across indicators and facilities  

These procedures require data processing and statistical operations that cannot be implemented within DHIS2’s native analytics environment.

**Analysis complexity**

FASTR applies analytical methods—most notably regression-based techniques—that extend beyond the descriptive trend analysis available in DHIS2. While DHIS2 supports visualization of raw service delivery trends, FASTR enables additional analytical capabilities, including:

- Identification of statistically significant increases or decreases in service volumes  
- Adjustment for data quality limitations  
- Explicit accounting for expected seasonal variation  
- Comparison of service delivery across key periods, such as before and after policy reforms, shocks, or disruptions  

The choice between relying solely on DHIS2 analytics and applying the FASTR approach should be guided by the intended analytical purpose. FASTR is designed for analyses that require greater statistical rigor, comparability over time, and consistency across geographic levels.

!!! warning "Extract counts, not percentages"

    The FASTR pipeline requires **raw service counts** — the actual number of events reported by each facility each month (e.g., *"152 children received Penta1 at this facility in March 2024"*). It does **not** accept percentages, proportions, rates, or pre-calculated coverage figures.

    **Why this matters:**

    - **Outlier detection works on magnitude.** A facility reporting 850 ANC1 visits when its usual range is 100–200 is obviously an outlier. The same facility reporting *"92% coverage"* tells us nothing — the percentage is bounded by 100, hides the underlying volume, and erases the signal we use to flag reporting errors.
    - **Counts can be added across facilities; percentages cannot.** To get a regional or national total, the platform sums facility counts. Averaging percentages across facilities of different sizes gives the wrong answer (a 100-bed hospital and a 5-bed health post would weigh equally).
    - **The platform builds the denominator itself.** Module 5 derives the target population (pregnant women, infants, etc.) from HMIS data, surveys, and UN projections. Module 6 then calculates coverage as `count ÷ denominator`. If you feed in a coverage % directly, there is no count to divide and no comparison to make.
    - **Adjustment imputes counts.** Modules 1 and 2 detect outliers using statistical thresholds on raw values and fill missing months using rolling averages of past counts. Both methods are statistically meaningless on percentages.

    **What to extract:** the numerator only — number of services delivered, doses given, visits recorded, deaths registered, etc. The platform handles aggregation, adjustment, and coverage calculation.

    **Common pitfalls to avoid:**

    - DHIS2 *"data elements"* that store coverage % directly (e.g. `ANC1 coverage rate`) — extract the underlying count instead (e.g. `ANC1 visits — first contact`).
    - Indicators pre-aggregated by month or quarter at the district level — extract facility-month rows instead.
    - Computed indicators like *"% of fully immunized children"* — feed in the underlying components separately (BCG, Penta1, Measles1, etc.).

### What format and granularity is required?

Data should be extracted for each **indicator of interest**, at **facility level**, and at a **monthly** time step for the **period of analysis**.

- Data must be stored in **long format**, with one row per observation  
- Data should be saved in **.csv format**  
- Data may be stored in a single file or split across multiple files, which can be combined during upload to the analysis platform  

**Why monthly facility-level data?**

Using the most granular data available enables more precise assessment of reporting patterns and data quality issues. Monthly, facility-level data allow for robust adjustment of reporting completeness, identification of facility-specific anomalies, and estimation of trends over time while accounting for seasonal variation. This level of granularity supports full implementation of the FASTR methodology.

### Key variables

The extracted dataset should include the following minimum set of variables:

| Element | Description |
|--------|-------------|
| Org units | Organizational unit identifier |
| Period | Time period of the observation |
| Indicator name | Name of the indicator |
| Total / count | Aggregated indicator value |

**Organisational unit terms**

| Term | Description |
|------|-------------|
| `orgunitlevel1` | Highest administrative level (e.g., country) |
| `orgunitlevel2` | Intermediate administrative level (e.g., state or province) |
| `orgunitlevel3` | District or equivalent |
| `orgunitlevel4` | Sub-district or health facility |
| `orgunitlevel5` | Unit or department within a facility |
| `organisationunitid` | Unique DHIS2 identifier for the organizational unit |
| `organisationunitname` | Name of the organizational unit |
| `organisationunitcode` | Standardized organizational unit code |
| `organisationunitdescription` | Description of the organizational unit |

**Period terms**

| Term | Description |
|------|-------------|
| `periodid` | Unique identifier for the reporting period |
| `periodname` | Human-readable period label (e.g., January 2024, Q1 2024) |
| `periodcode` | Standardized period code (e.g., 202401) |
| `perioddescription` | Description including period start and end dates |

**Data element terms**

| Term | Description |
|------|-------------|
| `dataid` | Unique identifier for the data element |
| `dataname` | Name of the data element |
| `datacode` | Standardized data element code |
| `datadescription` | Description of the data element |

**Other terms**

| Term | Description |
|------|-------------|
| `total` | Aggregated value for the data element by organizational unit and period |
| `date_downloaded` | Date of data extraction, for audit and version control |

### How much data?

**Initial FASTR analysis**

For initial implementation, it is generally recommended to extract approximately **five years of historical data**. The appropriate time window should be determined based on:

- Data availability and completeness  
- Consistency of indicator definitions over time  
- Characteristics of the national routine data system  

A multi-year time series improves the reliability of trend estimation and seasonal adjustment.

**Routine update to FASTR analysis**

For routine updates (e.g., quarterly implementation):

- Begin with the existing FASTR database and extract data for the most recent months not yet included (typically a **three-month period**)  
- Re-extract the **three preceding months** to account for late reporting or revisions to recent data  
- If substantial revisions to historical data are suspected, consider re-extracting a longer historical period  

### Tools for data extraction

*Full documentation content to be developed.*

This section will cover:
- DHIS2 data export options  
- API-based extraction methods  
- Data transformation requirements  
- Quality assurance checks on extracted data  

---

<!--
////////////////////////////////////////////////////////////////////
//                                                                //
//   _____ _     _____ ____  _____    ____ ___  _   _ _____ _   _ //
//  / ____| |   |_   _|  _ \| ____|  / ___/ _ \| \ | |_   _| \ | |//
//  | (___ | |     | | | | | | |__   | |  | | | |  \| | | | |  \| |//
//   \___ \| |     | | | | | |  __|  | |  | | | | . ` | | | | . ` |//
//   ____) | |___ _| |_| |_| | |____ | |__| |_| | |\  | | | | |\  |//
//  |_____/|_____|_____|____/|______| \____\___/|_| \_| |_| |_| \_|//
//                                                                //
//            Edit workshop slides below this line                //
//                                                                //
////////////////////////////////////////////////////////////////////
-->















---

**Contact**: <fastr@worldbank.org>
