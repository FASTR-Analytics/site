---
title: Guide de l'administrateur
description: Configuration et gestion de votre instance FASTR.
sidebar:
  order: 0
---

Ce guide couvre les tâches d'administration destinées aux gestionnaires d'instances FASTR. Que vous mettiez en place une nouvelle instance ou que vous en mainteniez une existante, vous y trouverez des instructions étape par étape pour configurer les utilisateurs, importer les données et gérer les projets.

## Ce que font les administrateurs

En tant qu'administrateur d'instance, vous êtes responsable des fondations sur lesquelles s'appuient les analystes et les gestionnaires de programmes. Votre travail se répartit en plusieurs catégories - gestion des utilisateurs, configuration des données et supervision des projets - chacune comportant son propre ensemble de tâches et de considérations.

La gestion des utilisateurs consiste à ajouter des personnes à la plateforme et à décider de ce à quoi elles peuvent accéder. Vous créez des comptes, attribuez des permissions au niveau de l'instance comme du projet, et supprimez occasionnellement les utilisateurs qui n'ont plus besoin d'accès. Bien régler les permissions est important, car cela affecte à la fois la sécurité et la facilité d'utilisation - trop restrictives, et les personnes ne peuvent pas faire leur travail ; trop permissives, et des données sensibles ou des paramètres pourraient être modifiés accidentellement.

La configuration des données consiste à mettre en place les éléments structurels qui définissent votre instance - zones administratives, établissements et indicateurs - puis à importer les données concrètes sur lesquelles les analystes travailleront. Cela inclut à la fois les données HMIS (rapports mensuels de routine) et les données HFA (évaluations des établissements). La structure que vous définissez ici détermine la manière dont les données peuvent être filtrées et désagrégées à travers toute la plateforme.

La supervision des projets consiste à créer des espaces de travail d'analyse, à configurer leurs fenêtres de données, à installer des modules analytiques et à gérer qui peut accéder à chaque projet. C'est dans les projets que se déroule le travail d'analyse ; vous voudrez donc les organiser avec soin et veiller à ce que chacun dispose de la bonne combinaison d'accès aux données et de permissions utilisateur.

## Avant de commencer

Vous avez besoin d'un accès administrateur à l'instance FASTR de votre organisation. Si vous mettez en place une nouvelle instance, vous devriez avoir reçu des identifiants de connexion de la part de l'équipe FASTR. Si vous rejoignez une instance existante, un autre administrateur doit vous ajouter et vous accorder les permissions d'administration.

Si vous n'avez pas encore d'accès, contactez l'administrateur FASTR de votre organisation ou écrivez à l'équipe FASTR pour demander une instance.

## Naviguer dans l'interface d'administration

La barre de navigation principale, en haut de l'écran, affiche des onglets correspondant aux différentes zones que vous pouvez gérer. Ce que vous voyez dépend de vos permissions - les administrateurs d'instance voient tous les onglets, tandis que les utilisateurs disposant de permissions partielles ne voient que les zones auxquelles ils peuvent accéder.

![Top Nav Demo](/images/topnav-demo-en.png)

L'onglet **Projets** répertorie tous les projets de votre instance et vous permet d'en créer de nouveaux. **Données** est l'endroit où vous configurez la structure (zones administratives, établissements) et importez les jeux de données. **Ressources** contient les fichiers téléversés, comme les modèles CSV et les cartes GeoJSON - tous les utilisateurs peuvent consulter et téléverser des ressources. **Utilisateurs** affiche toutes les personnes ayant accès à l'instance ainsi que leurs permissions. **Paramètres** regroupe les options de configuration à l'échelle de l'instance, comme le nom de l'instance et les préférences de langue.

## Premières étapes courantes

Lors de la mise en place d'une nouvelle instance, vous travaillerez généralement ces tâches dans l'ordre suivant :

1. Définir votre structure administrative - la hiérarchie géographique des régions, des districts et des unités plus petites
2. Importer votre liste d'établissements avec leurs types et leurs affectations géographiques
3. Définir les indicateurs des données que vous allez importer
4. Téléverser votre premier jeu de données HMIS pour tester la configuration
5. Créer un projet et configurer sa fenêtre de données
6. Ajouter des utilisateurs et les affecter à des projets

Chacune de ces étapes dispose de sa propre page dans ce guide, avec des instructions détaillées.

## Obtenir de l'aide

Si vous rencontrez des problèmes qui ne sont pas couverts par cette documentation, cliquez sur l'icône d'aide dans la barre de navigation supérieure pour soumettre une demande d'assistance. Donnez autant de détails que possible sur ce que vous tentiez de faire et sur ce qui n'a pas fonctionné - les captures d'écran sont particulièrement utiles pour le dépannage.

## Dans cette section

- [Utilisateurs](/admin-guide/users/) - Gestion des comptes utilisateurs et des permissions
- [Structure](/admin-guide/structure/) - Zones administratives, établissements et cartes GeoJSON
- [Indicateurs](/admin-guide/indicators/) - Définition des indicateurs HMIS et HFA
- [Données : HMIS](/admin-guide/data-hmis/) - Importation des données de santé de routine
- [Données : HFA](/admin-guide/data-hfa/) - Importation des données d'évaluation des établissements
- [Projets](/admin-guide/projects/) - Création et configuration des projets d'analyse
- [Modules](/admin-guide/modules/) - Installation et gestion des modules analytiques
