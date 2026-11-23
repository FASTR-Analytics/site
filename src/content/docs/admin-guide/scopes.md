---
title: Scopes
description: Defining the data windows that products and users work within.
sidebar:
  order: 8
---

A scope is a named data window. It decides which parts of a results package a product can draw on - which types of data, which admin area, which years or survey rounds, and which modules and indicators. Every slide deck, report, and visualization carries exactly one scope, and people can be limited to specific scopes so they only see what is inside them.

## When to use scopes

Scopes are useful whenever a group of products, or a group of people, should work with only part of the instance's data. A regional health office might get a scope covering just its region. A maternal health review might use a scope limited to maternal and newborn indicators. A scope covering the last three years keeps older data out of a trend analysis.

The built-in scope **All data** includes HMIS, HFA, and ICEH data and limits nothing. It can't be edited or deleted. If you don't need to restrict anything, products can simply use **All data**.

## Creating a scope
<!-- help#scopes-create -->

Anyone with access to all data can create scopes. On the **Scopes** page, click **New scope**, give it a **Label**, and then set its limits on the **HMIS**, **HFA**, and **ICEH** tabs. Each tab has its own settings:

- **Include** - untick to leave that type of data out of the scope entirely
- **Geography** - **Every area**, or one admin area at the second level (HMIS and HFA)
- **Limit years** - a range on a year slider (HMIS and ICEH)
- **Limit time points**, **Limit categories**, and **Limit service categories** - restrict HFA data to particular survey rounds or indicator groups
- **Limit modules** and **Limit indicators** - include only the modules and indicators you choose

A limit applies to a table only when the table has a matching column. Module and indicator options come from the pinned results package. Click **Save** when you're done.

![Scope editor](/images/scopes-editor-en.png)

## The scopes list

The list shows each scope's label, a summary of its HMIS, HFA, and ICEH limits, and how many products use it. Scopes labelled **Migrated** were created automatically from the data windows of projects in earlier versions of FASTR.

## Changing and deleting scopes
<!-- help#scopes-edit -->

Click a scope to edit it. Changing what a scope limits marks every visualization in the products that use it as out of date, so authors can update them to the new boundaries.

A scope can't be deleted while any product uses it - move those products to another scope first. To delete several unused scopes at once, select them and click **Delete**.

A scope that has been assigned to users limits what those users can see, so editing or deleting it needs the **Configure users** permission. This stops anyone from widening a restricted person's access by accident.

## Scopes and users

People who are limited to scopes can see the Scopes page, but only the scopes they hold, and they can't change them. To limit a person to scopes, open their profile on the **Users** page - see [Users](/admin-guide/users/).
