---
title: Products
description: Creating, organizing, and sharing slide decks, reports, and visualizations.
sidebar:
  order: 1
---

Everything you make in FASTR is a **product**. There are three kinds: a **slide deck** for presenting, a **report** for long-form writing, and a **visualization** - a single saved chart, map, or table. All three live together on the **Products** page, the first page you see when you sign in.

## How products get their data
<!-- help#products-data -->

Every product draws its numbers from one **results package** and one **scope**. A results package is a fixed set of analysis results that your administrator generated from the instance's data at a point in time. A scope is a named data window - it sets which data, admin areas, years, and indicators the product can use. The built-in scope **All data** has no limits.

Because a product is tied to one package, its numbers don't change when new data is imported. They change only when someone moves the product to a newer package. This keeps a finished deck or report stable until you decide to update it.

The package and scope appear together as a small label in the editor header, for example "October 2026 · Northern region". If you can edit the product, click that label (or choose **Results package and scope…** from the product's menu) to switch to another package or scope. Visualizations built under the old pair then show as out of date until you update them.

## Creating a product
<!-- help#products-create -->

Click **New** at the top of the Products page and choose **New deck**, **New report**, or **New visualization**.

For a deck or report, a dialog asks for:

1. A **Name** for the product.
2. A **Folder** to put it in. **General** holds products that aren't in any folder.
3. A **Results package**. The package your administrator pinned is selected for you.
4. A **Scope**. **All data** is selected unless you are limited to specific scopes.

Click **Create** and the editor opens straight away. For a visualization, you choose the package and scope, click **Next**, and then pick a metric - see [Visualizations](/user-guide/visualizations/).

If the New options are greyed out, the instance doesn't yet have a results package or a scope. An administrator needs to create them first.

![New menu on the Products page](/images/products-new-menu-en.png)

## Finding your way around

The Products page shows a folder tree. Click a folder to open or close it, and click a product to open its editor. The columns show each product's **Type**, **Package**, **Scope**, and when it was **Last updated**. Click the **Name** or **Last updated** header to sort, and click again to reverse the order.

Type at least three letters in the search box to find products by name. Matching products stay in their place in the tree, and the folders above them open so you can see where they live.

Each row also shows your access to that product - **Owner**, **Editor**, or **Viewer** - unless you are an administrator, and a lock icon if the product is restricted to specific people.

## Selecting products in bulk

Click **Select** in the toolbar to enter select mode. In this mode, clicking a product row toggles its checkbox instead of opening the editor. Once you have a selection, the bar below the toolbar shows how many products are selected and offers two actions:

- **Move** - move the selected products you can edit to a different folder
- **Delete** - delete the selected products you own

If your selection includes products you cannot move or delete, the bar tells you how many will be acted on and how many will be skipped. Click **Clear selection** to deselect everything, or click **Select** again to leave select mode.

## Organizing with folders
<!-- help#products-folders -->

Folders keep a busy instance manageable. You might group products by programme area, by audience, or by reporting round. To create one, choose **New folder** from the **New** menu, give it a name and a colour, and click **Save**.

To move a product or folder, drag it onto another folder, or open its menu (the **⋮** button or right-click) and use **Move into**, **Move to General**, or **Move to folder…**. A folder's menu also has **Rename / change colour…** and **Delete folder**.

Deleting a folder never deletes what is inside it. Its contents move up one level, and the confirmation tells you where they will go.

Only users with access to all data can create, move, or delete folders. If you are limited to specific scopes, you see only the folders that contain products you can open.

## Product actions

Open a product's menu with the **⋮** button or by right-clicking its row. What you see depends on your access:

- **Duplicate** makes your own copy of the product, named "(copy)", in the same folder. Anyone who can view a product can duplicate it. You can keep the original's scope or choose a different one.
- **Settings** changes the product's name and folder.
- **Results package and scope…** switches the data the product uses.
- **Manage access…** controls who can view and edit it.
- **Delete** removes the product permanently. Only the owner and administrators can delete, and there is no undo.

## Sharing and access
<!-- help#products-access -->

Every product has an owner - usually the person who created it - and a list of people and teams who can view or edit it. New products start **Restricted**, so only you and administrators can open them until you share them.

To share, choose **Manage access…** from the product's menu or from the **File** menu inside the editor. The dialog has two parts:

- **General access** sets a baseline for everyone in the instance: **Restricted**, **Anyone in this instance can view**, or **Anyone in this instance can edit**.
- **People and teams with access** lists individuals and teams. Click **Add a person or team…** to add someone, then choose **Can view** or **Can edit** for them. A person or team can be given more access than the general setting, never less.

To add a team, search for its name in the same box. Every current and future member of that team holds the access level you set for as long as they are in the team. The dialog shows each team's size and how many members lack the product's scope. A person's effective level is the highest of any row that applies to them.

Click **Save** to apply your changes. The owner can also use **Transfer ownership…** to hand the product to someone else; the previous owner keeps edit access.

The three access levels work like this:

- **Viewers** can open the product read-only, present it, download it, email it, and make their own copy.
- **Editors** can also change the content, rename and move it, change its package and scope, restore earlier versions, and manage access.
- **Owners** can also delete the product and transfer ownership. Administrators have owner access to every product.

People who are limited to specific scopes can only open products whose scope they hold. If you add such a person or a team that includes such a person, the dialog warns that some members have no access to this product's scope.

![Manage access dialog](/images/products-manage-access-en.png)

## Working together
<!-- help#products-collab -->

Several people can edit the same deck, report, or visualization at the same time. Avatars in the editor header show who else is there, and you can see their cursors and the parts they are working on. Changes save automatically as you work - there is no Save button. A status label in the header shows **Live** when everything is saved.

Undo only undoes your own changes, never a colleague's. If you lose your connection, a banner tells you FASTR is reconnecting; keep the page open until it says you are live again.

## Version history
<!-- help#products-history -->

FASTR saves versions automatically while people edit. Click **History** in the editor header to see them, grouped by day, with the people who contributed to each one. Select a version to see what changed in that session - for a deck, new, edited, and removed slides are badged so you can spot them quickly.

Editors can click **Restore** to return the product to an earlier version. Your current content is saved as a version first, so nothing is lost. Anyone who can view the product can use **Restore as copy** to make a separate product from an old version instead.

![Version history](/images/products-version-history-en.png)
