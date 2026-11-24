---
title: Admin guide
description: Setting up and managing your FASTR instance.
sidebar:
  order: 0
---

This guide covers administration tasks for people who manage a FASTR instance. Whether you're setting up a new instance or maintaining an existing one, you'll find instructions for importing data, producing results, controlling what people can see, and managing users.

## How an instance fits together

Understanding the flow from raw data to finished products makes every admin task easier to place.

First, **data** comes in. You import HMIS data (routine monthly reporting, from CSV files or DHIS2) and HFA data (facility assessment surveys) on the **Data** page, along with the facilities, indicators, and maps that give that data meaning.

Next, you generate a **results package** on the **Results** page. A package runs the analysis modules over a snapshot of the instance's data and stores the results. Packages don't change once generated, so a finished slide deck or report keeps showing the same numbers until someone moves it to a newer package. One package can be **pinned**; new products start on it.

Then **scopes** decide which parts of a package a product can draw on - for example, one region, a range of years, or a subset of indicators. The built-in scope **All data** limits nothing.

Finally, people build **products** - slide decks, reports, and visualizations - on the **Products** page. Each product uses one results package and one scope, and has its own owner and sharing settings.

## What administrators do

User management means adding people and deciding what they can reach. Instance permissions control who can see and change data and who can manage users. Scope access can limit a person to specific scopes, so they only see products and data inside those boundaries. Access to individual products is set by each product's owner.

Data configuration means setting up facilities, indicators, and maps, importing HMIS and HFA data, and keeping imports running. Results management means generating new packages when fresh data arrives, choosing which one is pinned, and cleaning up old ones.

## Before you start

You need an account on your organization's FASTR instance with administrator access or the relevant permissions. If you're joining an existing instance, another administrator adds you on the **Users** page. Until someone does, you will see a message saying you are not yet approved.

## Navigating the platform

The navigation rail on the left lists the main pages. What you see depends on your permissions.

- **Products** lists slide decks, reports, and visualizations in a folder tree. Everyone sees it.
- **Explore** lets anyone browse a results package's tables, charts, and maps.
- **Results** lists results packages, and is where new ones are generated. It needs the **View data** permission.
- **Scopes** lists the instance's scopes and lets you set which part of the data a product may show. Everyone sees it; people with access to all data can create and edit them.
- **Data** holds facilities, indicators, maps, imports, and instance settings. It needs **View data**.
- **Assets** holds uploaded files such as CSV files, spreadsheets, and images. Everyone sees it.
- **Users** lists everyone with access to the instance. It needs **View users**.

The header holds the **Help** menu (guided tours, help requests, feedback, and a link to this documentation), the language menu, the What's New bell, and your account menu. The **AI** button on the right edge of the screen opens the AI assistant from any page.

![Navigation rail](/images/admin-index-navigation-en.png)

## Common first steps

When setting up a new instance, you'll typically work through these tasks in order:

1. Import your HMIS facility list, which also creates the admin area hierarchy
2. Define the indicators you'll be importing
3. Import your first HMIS dataset (and HFA survey data, if you have it)
4. Generate a results package and pin it
5. Create scopes for any regions or programmes that need their own data window
6. Add users, and limit them to scopes where needed

Each of these steps has its own page in this guide.

## Getting help

If you run into issues that aren't covered here, open the **Help** menu in the header and choose **Ask for help**. Describe what you were trying to do and what went wrong - you can attach screenshots, which are particularly helpful for troubleshooting. **Guided tours** in the same menu walks you through each page of the platform.

## In this section

- [Users](/admin-guide/users/) - Adding users, permissions, and scope access
- [Structure](/admin-guide/structure/) - Facilities, admin areas, sampling weights, and maps
- [Indicators](/admin-guide/indicators/) - Defining HMIS and HFA indicators
- [Data: HMIS](/admin-guide/data-hmis/) - Importing routine health data
- [Data: HFA](/admin-guide/data-hfa/) - Importing facility assessment data
- [Results packages](/admin-guide/results-packages/) - Generating, pinning, and managing results
- [Scopes](/admin-guide/scopes/) - Defining what data products can use
- [Modules](/admin-guide/modules/) - Analytical modules
