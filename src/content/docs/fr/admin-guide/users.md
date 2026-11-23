---
title: Utilisateurs
description: Gestion des comptes utilisateurs, des permissions et de l'accès par portée.
sidebar:
  order: 1
---

Toute personne qui utilise votre instance FASTR doit figurer sur la page **Utilisateurs**. Cette page explique comment ajouter des personnes, ce que permettent les permissions d'instance et comment limiter quelqu'un à certaines portées.

## Comprendre les accès

Trois éléments distincts déterminent ce qu'une personne peut faire dans FASTR, et il est utile de bien les distinguer.

Les **permissions d'instance** contrôlent l'accès aux parties de la plateforme qui concernent tout le monde : les données, les paquets de résultats et la liste des utilisateurs. La plupart des personnes qui se contentent de créer des présentations et des rapports n'en ont besoin d'aucune.

L'**accès par portée** contrôle les données auxquelles une personne peut accéder. Par défaut, tout le monde a accès à toutes les données. Vous pouvez à la place limiter quelqu'un à une ou plusieurs portées - par exemple, une équipe régionale qui ne doit voir que sa propre région. Une personne limitée à des portées ne voit que les produits qui utilisent ces portées et ne consulte les données qu'à travers elles.

L'**accès aux produits** détermine qui peut consulter ou modifier chaque présentation, rapport ou visualisation. Il est défini par le propriétaire du produit, et non sur la page Utilisateurs - voir [Produits](/fr/user-guide/products/) dans le Guide de l'utilisateur.

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
- **Configurer les utilisateurs** - ajouter et retirer des utilisateurs, modifier leurs permissions et définir leur accès par portée

La configuration inclut la consultation : une personne disposant de **Configurer les données** peut aussi faire tout ce que permet **Voir les données**. Cliquez sur **Sauvegarder les modifications** après avoir coché les cases.

La carte **Droits d'accès à l'instance** indique si l'utilisateur est administrateur de l'instance. Seuls les administrateurs peuvent utiliser **Attribuer le rôle d'administrateur** ou **Retirer le rôle d'administrateur**. Réservez l'accès administrateur aux personnes qui assurent la maintenance de la plateforme elle-même.

Vous ne pouvez pas modifier vos propres permissions, et seul un administrateur peut modifier le compte d'un autre administrateur.

![Profil utilisateur](/images/users-profile-fr.png)

## Accès par portée
<!-- help#users-scopes -->

La carte **Portées** du profil d'un utilisateur contrôle les données auxquelles il peut accéder. Laissez **Toutes les données** coché pour un accès complet. Décochez-la pour choisir une ou plusieurs portées dans la liste ; l'utilisateur ne voit alors que les produits associés à l'une de ces portées et ne consulte les données qu'à travers elles, y compris sur la page **Explorer**.

Limiter quelqu'un à des portées lui retire également ses permissions d'instance, quel que soit l'état des cases à cocher. Il ne peut pas ouvrir les pages Données, Résultats ou Utilisateurs, ni créer ou modifier des portées. Si vous décochez **Toutes les données** sans choisir de portée, l'utilisateur ne voit aucun produit.

Les portées elles-mêmes sont définies sur la page **Portées** - voir [Portées](/fr/admin-guide/scopes/).

## Opérations groupées

Cochez plusieurs utilisateurs dans le tableau pour agir sur tous à la fois :

- **Attribuer le rôle d'administrateur** / **Retirer le rôle d'administrateur** - modifier le statut d'administrateur (administrateurs uniquement)
- **Modifier les droits d'accès** - définir les quatre permissions ; chaque case alterne entre inchangé, activé et désactivé
- **Modifier les portées** - remplacer en une seule étape l'accès par portée des utilisateurs sélectionnés
- **Télécharger les utilisateurs** - exporter les utilisateurs sélectionnés dans un fichier CSV
- **Supprimer** - supprimer les comptes sélectionnés

**Télécharger**, dans la barre d'outils, exporte l'ensemble de la liste affichée.

## Noms, adresses e-mail et organisation

Chaque personne gère ses propres informations depuis son profil : cliquez sur l'icône de compte dans l'en-tête et choisissez **Votre profil**. Elle peut y indiquer son **Organisation** et utiliser **Changer d'e-mail** pour transférer son compte vers une nouvelle adresse. La nouvelle adresse est confirmée par un code, et le changement s'applique sur toutes les instances FASTR que la personne utilise, en conservant ses accès et son historique.

Les administrateurs peuvent corriger le nom d'une autre personne : ouvrez son profil depuis la page **Utilisateurs** et cliquez sur **Modifier le nom** dans la carte **Identifiants**. Le nouveau nom s'applique sur toutes les instances FASTR.

## Retirer des utilisateurs

Pour retirer un seul utilisateur, ouvrez son profil et cliquez sur **Supprimer cet utilisateur**. Pour plusieurs utilisateurs, sélectionnez-les et utilisez **Supprimer**. Le retrait prend effet immédiatement - la personne ne peut plus ouvrir l'instance.

Les produits dont la personne était propriétaire restent en place mais n'ont plus de propriétaire. Les administrateurs peuvent toujours les gérer et désigner un nouveau propriétaire depuis **Gérer l'accès…**.
