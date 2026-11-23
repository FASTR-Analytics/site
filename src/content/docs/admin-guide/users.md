---
title: Users
description: Managing user accounts, permissions, and scope access.
sidebar:
  order: 1
---

Every person who uses your FASTR instance needs to be listed on the **Users** page. This page covers how to add people, what the instance permissions allow, and how to limit someone to specific scopes.

## Understanding access

Three separate things decide what a person can do in FASTR, and it helps to keep them apart.

**Instance permissions** control access to the parts of the platform that affect everyone: the data, the results packages, and the user list. Most people who only build slide decks and reports need none of them.

**Scope access** controls which data a person can reach. By default everyone has access to all data. You can instead limit someone to one or more scopes - for example, a regional team that should only see its own region. A person limited to scopes sees only products that use those scopes, and reads data only through them.

**Product access** controls who can view or edit each slide deck, report, or visualization. It is set by the product's owner, not on the Users page - see [Products](/user-guide/products/) in the User guide.

**Instance administrators** have full access to everything: every permission, all data, and owner access to every product.

## Adding users
<!-- help#users-add -->

Open the **Users** page and click **Add users**. Enter one or more email addresses - you can paste a list separated by commas, semicolons, or line breaks - and click **Save**.

New users have no instance permissions and access to all data. They can sign in, open any product that is shared with everyone, and create their own products. Someone who signs in before they've been added sees a message asking them to wait for an administrator.

For larger groups, click **Batch import** and upload a CSV file with two columns: `email` and `is_global_admin` (`true` or `false`). The **Replace all existing users** option removes everyone not in the file, so use it with care.

![Users page](/images/users-table-en.png)

## Instance permissions
<!-- help#users-instance-permissions -->

Click a user's row to open their profile. If you can manage users, the **User Permissions** card shows four checkboxes:

- **View data** - open the **Data** and **Results** pages, look inside results packages, and download data files
- **Configure data** - import and delete data, edit facilities, indicators, and maps, change instance settings, and generate, pin, and delete results packages
- **View users** - open the **Users** page
- **Configure users** - add and remove users, change their permissions, and set their scope access

Configure includes view: someone with **Configure data** can also do everything **View data** allows. Click **Save changes** after ticking boxes.

The **Instance permissions** card shows whether the user is an instance administrator. Only administrators can use **Make admin** or **Make non-admin**. Reserve administrator access for people who maintain the platform itself.

You cannot change your own permissions, and only an administrator can change another administrator's account.

![User profile](/images/users-profile-en.png)

## Scope access
<!-- help#users-scopes -->

The **Scopes** card on a user's profile controls which data they can reach. Leave **All data** ticked for full access. Untick it to choose one or more scopes from the list; the user then sees only products that carry one of those scopes, and reads data only through them, including on the **Explore** page.

Limiting someone to scopes also removes their instance permissions, whatever the checkboxes say. They can't open the Data, Results, or Users pages, and they can't create or change scopes. If you untick **All data** and choose no scopes, the user sees no products at all.

The scopes themselves are defined on the **Scopes** page - see [Scopes](/admin-guide/scopes/).

## Bulk operations

Tick several users in the table to act on all of them at once:

- **Make admin** / **Make non-admin** - change administrator status (administrators only)
- **Edit permissions** - set the four permissions; each box cycles between unchanged, on, and off
- **Edit scopes** - replace the selected users' scope access in one step
- **Download users** - export the selected users as a CSV file
- **Remove** - delete the selected accounts

**Download** in the toolbar exports the whole visible list.

## Names, email addresses, and organisation

People manage their own details from their profile: click the account icon in the header and choose **Your profile**. There they can set their **Organisation** and use **Change email** to move their account to a new address. The new address is confirmed with a code, and the change applies on every FASTR instance the person uses, keeping their access and history.

Administrators can correct another person's name: open the user's profile on the **Users** page and click **Edit name** in the **Login details** card. The new name applies on every FASTR instance.

## Removing users

To remove a single user, open their profile and click **Remove this user**. For several users, select them and use **Remove**. Removal takes effect immediately - the person can no longer open the instance.

Products the person owned stay in place but no longer have an owner. Administrators can still manage them and can set a new owner from **Manage access…**.
