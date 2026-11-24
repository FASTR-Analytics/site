---
title: Utilisateurs
description: Gestion des comptes utilisateurs, des permissions et de l'accès par portée.
sidebar:
  order: 1
---

Toute personne qui utilise votre instance FASTR doit figurer sur la page **Utilisateurs**. Cette page explique comment ajouter des personnes, ce que permettent les permissions d'instance, comment limiter quelqu'un à certaines portées et comment regrouper des personnes en équipes.

## Comprendre les accès

Trois éléments distincts déterminent ce qu'une personne peut faire dans FASTR, et il est utile de bien les distinguer.

Les **permissions d'instance** contrôlent l'accès aux parties de la plateforme qui concernent tout le monde : les données, les paquets de résultats et la liste des utilisateurs. La plupart des personnes qui se contentent de créer des présentations et des rapports n'en ont besoin d'aucune.

L'**accès par portée** contrôle les données auxquelles une personne peut accéder. Par défaut, tout le monde a accès à toutes les données. Vous pouvez à la place limiter quelqu'un à une ou plusieurs portées - par exemple, une équipe régionale qui ne doit voir que sa propre région. Une personne limitée à des portées ne voit que les produits qui utilisent ces portées et ne consulte les données qu'à travers elles.

L'**accès aux produits** détermine qui peut consulter ou modifier chaque présentation, rapport ou visualisation. Il est défini par le propriétaire du produit, et non sur la page Utilisateurs - voir [Produits](/fr/user-guide/products/) dans le Guide de l'utilisateur.

Les **équipes** sont des groupes de personnes. Donnez à une équipe l'accès à un produit et tous ses membres ont cet accès, y compris les personnes qui rejoignent l'équipe plus tard. Le niveau d'accès d'une personne sur un produit est le plus élevé parmi l'accès général du produit, son propre accès individuel et les accès de ses équipes.

Les **administrateurs de l'instance** ont un accès complet à tout : toutes les permissions, toutes les données et un accès propriétaire à chaque produit.

## Ajouter des utilisateurs
<!-- help#users-add -->

Ouvrez la page **Utilisateurs** et cliquez sur **Ajouter des utilisateurs**. Saisissez une ou plusieurs adresses e-mail - vous pouvez coller une liste séparée par des virgules, des points-virgules ou des sauts de ligne - puis cliquez sur **Sauvegarder**.

Les nouveaux utilisateurs n'ont aucune permission d'instance et ont accès à toutes les données. Ils peuvent se connecter, ouvrir tout produit partagé avec tout le monde et créer leurs propres produits. Une personne qui se connecte avant d'avoir été ajoutée voit un message lui demandant d'attendre l'intervention d'un administrateur.

Pour des groupes plus importants, cliquez sur **Importation groupée** et téléversez un fichier CSV à deux colonnes : `email` et `is_global_admin` (`true` ou `false`). L'option **Remplacer tous les utilisateurs existants** supprime toutes les personnes absentes du fichier ; utilisez-la donc avec précaution.

![Page Utilisateurs](/images/users-table-fr.png)

## Permissions d'instance
<!-- help#users-instance-permissions -->

Cliquez sur la ligne d'un utilisateur pour ouvrir son profil. Si vous pouvez gérer les utilisateurs, la carte **Droits d'accès de l'utilisateur** affiche quatre cases à cocher :

- **Voir les données** - ouvrir les pages **Données** et **Résultats**, consulter le contenu des paquets de résultats et télécharger des fichiers de données
- **Configurer les données** - importer et supprimer des données, modifier les établissements, les indicateurs et les cartes, changer les paramètres de l'instance, et générer, épingler et supprimer des paquets de résultats
- **Voir les utilisateurs** - ouvrir la page **Utilisateurs**
- **Configurer les utilisateurs** - ajouter et retirer des utilisateurs, modifier leurs permissions, définir leur accès par portée et gérer les équipes

La configuration inclut la consultation : une personne disposant de **Configurer les données** peut aussi faire tout ce que permet **Voir les données**. Cliquez sur **Sauvegarder les modifications** après avoir coché les cases.

La carte **Droits d'accès à l'instance** indique si l'utilisateur est administrateur de l'instance. Seuls les administrateurs peuvent utiliser **Attribuer le rôle d'administrateur** ou **Retirer le rôle d'administrateur**. Réservez l'accès administrateur aux personnes qui assurent la maintenance de la plateforme elle-même.

Vous ne pouvez pas modifier vos propres permissions, et seul un administrateur peut modifier le compte d'un autre administrateur.

![Profil utilisateur](/images/users-profile-fr.png)

## Accès par portée
<!-- help#users-scopes -->

La carte **Portées** du profil d'un utilisateur contrôle les données auxquelles il peut accéder. Laissez **Toutes les données** coché pour un accès complet. Décochez-la pour choisir une ou plusieurs portées dans la liste ; l'utilisateur ne voit alors que les produits associés à l'une de ces portées et ne consulte les données qu'à travers elles, y compris sur la page **Explorer**.

Limiter quelqu'un à des portées lui retire également ses permissions d'instance, quel que soit l'état des cases à cocher. Il ne peut pas ouvrir les pages Données, Résultats ou Utilisateurs, ni créer ou modifier des portées. Si vous décochez **Toutes les données** sans choisir de portée, l'utilisateur ne voit aucun produit.

Les portées elles-mêmes sont définies sur la page **Portées** - voir [Portées](/fr/admin-guide/scopes/).

## Équipes
<!-- help#users-teams -->

Les équipes vous permettent de partager un produit avec un groupe de personnes en une seule fois. Cliquez sur **Équipes** sur la page Utilisateurs pour ouvrir l'éditeur d'équipes. Seuls les titulaires de la permission **Configurer les utilisateurs** peuvent l'ouvrir.

L'éditeur d'équipes affiche vos équipes à gauche et les détails de l'équipe sélectionnée à droite. Chaque équipe a un nom, une description facultative et une liste de membres. Pour créer une équipe, cliquez sur **Nouvelle équipe**, saisissez un nom et une description, ajoutez des membres via la zone de recherche, puis cliquez sur **Sauvegarder**.

Les membres peuvent être ajoutés ou retirés à tout moment. Lorsque vous ajoutez des personnes à une équipe qui a déjà accès à des produits, une confirmation vous indique combien de produits elles vont obtenir. Lorsque vous retirez quelqu'un, il perd l'accès que l'équipe lui donnait dès l'enregistrement, même s'il a ce produit ouvert.

Pour donner à une équipe l'accès à un produit, ouvrez la boîte de dialogue **Gérer l'accès…** du produit - la même boîte que pour les personnes individuelles. La zone de recherche trouve à la fois des personnes et des équipes. Définissez le niveau de l'équipe sur **Peut consulter** ou **Peut modifier**. Chaque membre actuel et futur de l'équipe détient ce niveau tant qu'il fait partie de l'équipe.

Le niveau effectif d'une personne sur un produit est le plus élevé parmi l'accès général du produit, son propre accès individuel et les accès de toutes ses équipes. La boîte de dialogue **Gérer l'accès** indique, à côté de l'accès individuel de chaque personne, quelle équipe relève son niveau lorsqu'un accès d'équipe est supérieur.

Pour voir les produits auxquels une équipe peut accéder, sélectionnez l'équipe dans l'éditeur d'équipes ; la carte **Produits accessibles à cette équipe** les liste. Pour voir les équipes d'un utilisateur, ouvrez son profil sur la page Utilisateurs ; la carte **Équipes** les liste avec les accès que chaque équipe lui donne. Les utilisateurs peuvent aussi voir leurs propres équipes dans **Votre profil**.

Supprimer une équipe retire l'accès qu'elle donnait à tous ses membres sur tous les produits. La confirmation indique combien de membres et de produits sont concernés.

Un gestionnaire des utilisateurs ne peut pas s'ajouter lui-même à une équipe ; demandez à un autre gestionnaire des utilisateurs ou à un administrateur de le faire.

## Opérations groupées

Cochez plusieurs utilisateurs dans le tableau pour agir sur tous à la fois :

- **Attribuer le rôle d'administrateur** / **Retirer le rôle d'administrateur** - modifier le statut d'administrateur (administrateurs uniquement)
- **Modifier les droits d'accès** - définir les quatre permissions ; chaque case alterne entre inchangé, activé et désactivé
- **Modifier les portées** - remplacer en une seule étape l'accès par portée des utilisateurs sélectionnés
- **Ajouter à une équipe** - ajouter les utilisateurs sélectionnés à une équipe de votre choix
- **Télécharger les utilisateurs** - exporter les utilisateurs sélectionnés dans un fichier CSV (inclut une colonne Équipes)
- **Supprimer** - supprimer les comptes sélectionnés

**Télécharger**, dans la barre d'outils, exporte l'ensemble de la liste affichée, avec les équipes de chaque utilisateur.

## Noms, adresses e-mail et organisation

Chaque personne gère ses propres informations depuis son profil : cliquez sur l'icône de compte dans l'en-tête et choisissez **Votre profil**. Elle peut y indiquer son **Organisation** et utiliser **Changer d'e-mail** pour transférer son compte vers une nouvelle adresse. La nouvelle adresse est confirmée par un code, et le changement s'applique sur toutes les instances FASTR que la personne utilise, en conservant ses accès et son historique. Le profil affiche également les équipes auxquelles la personne appartient.

Les administrateurs peuvent corriger le nom d'une autre personne : ouvrez son profil depuis la page **Utilisateurs** et cliquez sur **Modifier le nom** dans la carte **Identifiants**. Le nouveau nom s'applique sur toutes les instances FASTR.

## Retirer des utilisateurs

Pour retirer un seul utilisateur, ouvrez son profil et cliquez sur **Supprimer cet utilisateur**. Pour plusieurs utilisateurs, sélectionnez-les et utilisez **Supprimer**. Le retrait prend effet immédiatement - la personne ne peut plus ouvrir l'instance.

Les produits dont la personne était propriétaire restent en place mais n'ont plus de propriétaire. Les administrateurs peuvent toujours les gérer et désigner un nouveau propriétaire depuis **Gérer l'accès…**.
