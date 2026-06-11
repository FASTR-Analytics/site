---
title: "Données : HFA"
description: Importation et gestion des données d'enquête d'évaluation des établissements.
sidebar:
  order: 5
---

Les données d'évaluation des établissements de santé (HFA) capturent des instantanés ponctuels des caractéristiques d'un établissement - infrastructures, équipements, personnel et disponibilité des services. Contrairement aux données HMIS qui proviennent en continu du rapportage de routine, les données HFA sont issues d'enquêtes périodiques réalisées à des « points temporels » précis (comme « Round 1 » ou « Référence décembre 2024 »). Cette structure fondée sur les enquêtes détermine la façon dont vous importez et gérez les données HFA dans FASTR.

## Ce que contiennent les données HFA

Les enquêtes HFA recueillent des informations sur les établissements qui ne sont pas saisies par le rapportage de routine : disponibilité des équipements essentiels, niveaux de stock de médicaments, présence de personnel formé et infrastructures telles que l'eau et l'électricité. Ces données complètent le HMIS en fournissant un contexte sur la capacité des établissements - ce qui aide à comprendre pourquoi certains établissements obtiennent des résultats différents des autres.

## Fichiers requis
<!-- help#hfa-required-files -->

Chaque importation HFA nécessite deux fichiers :

- **Fichier de données CSV** - une ligne par établissement avec une colonne pour chaque question de l'enquête. La première colonne doit contenir les identifiants d'établissement correspondant à votre registre.
- **Fichier de questionnaire XLSForm** - définit la structure de l'enquête selon le standard XLSForm. FASTR le lit pour en extraire les noms de variables, les libellés des questions et les libellés des valeurs.

## Déroulement de l'importation
<!-- help#hfa-import -->

Accédez à la section **Données** et sélectionnez **Données HFA**. Cliquez sur **Démarrer une nouvelle importation** pour lancer un processus en quatre étapes.

1. **Charger les fichiers.** Sélectionnez ou chargez à la fois votre fichier de données CSV et votre fichier de questionnaire XLSForm.

2. **Configurer la correspondance.** Indiquez quelle colonne CSV contient les identifiants d'établissement. Sélectionnez ensuite le point temporel auquel ces données appartiennent dans la liste des points temporels définis dans votre instance.

3. **Préparer les données.** Cliquez sur **Démarrer la préparation** pour valider les identifiants d'établissement, faire correspondre les colonnes aux définitions du XLSForm et décomposer les questions « à choix multiples » en variables individuelles.

4. **Vérifier et intégrer.** Le résumé affiche les lignes valides, les lignes écartées (en raison d'identifiants d'établissement manquants ou invalides) et les statistiques du dictionnaire de données. Cliquez sur **Intégrer et finaliser** pour terminer.

:::caution[Capture d'écran à ajouter]
Étape 1 de l'importation HFA montrant les deux zones de chargement de fichiers pour le CSV et le XLSForm.
:::

:::caution[Capture d'écran à ajouter]
Résultats de la préparation HFA montrant les statistiques de lignes et les décomptes du dictionnaire de données.
:::

## Points temporels
<!-- help#hfa-time-points -->

Les données HFA sont organisées par points temporels plutôt que par périodes continues. Avant d'importer des données, créez vos points temporels sur la page **Points temporels HFA**. Chaque point temporel possède un libellé et une période calendaire (année et mois). Les points temporels définissent les rounds nommés - comme « Round 1 » ou « Référence déc. 2024 » - qui apparaissent dans toute la plateforme.

Après l'importation, utilisez la page **Points temporels HFA** pour modifier les libellés, ajuster les dates, réorganiser, ajouter de nouveaux points temporels ou supprimer des rounds d'enquête individuels. La suppression d'un point temporel supprime toutes ses données et ses pondérations d'échantillonnage.

:::caution[Capture d'écran à ajouter]
Interface de gestion des points temporels montrant la liste des rounds importés avec les commandes de modification et de réorganisation.
:::

## Détails de la validation

Des lignes peuvent être écartées au cours de la préparation pour plusieurs raisons : identifiants d'établissement manquants, identifiants d'établissement absents de votre registre, ou établissements en double au sein d'une même importation. Le résumé de la préparation présente chaque catégorie séparément. Si vous constatez de nombreuses entrées « Établissement introuvable », vérifiez si votre registre des établissements doit être mis à jour.

## Traitement du XLSForm

FASTR extrait la structure de l'enquête à partir de votre XLSForm afin de fournir des libellés pertinents dans toute la plateforme. Les noms de variables deviennent des identifiants techniques. Les libellés apparaissent dans les visualisations et les rapports. Les libellés des valeurs font correspondre les codes de réponse numériques à un texte descriptif.

Pour les questions « select_multiple », FASTR décompose automatiquement chaque choix en une variable binaire distincte - une question comportant cinq options devient cinq indicateurs oui/non.

Le nom de variable `weight` est réservé aux pondérations d'échantillonnage des établissements et ne peut pas être utilisé comme nom de variable d'enquête. Si votre XLSForm contient une variable nommée `weight`, renommez-la avant d'importer.

## Travailler avec les données HFA

Une fois importées, les données HFA intègrent le pipeline analytique aux côtés des données HMIS. Les modules peuvent référencer des variables HFA dans leurs calculs, et les visualisations peuvent afficher les résultats de l'évaluation des établissements. Comme les données HFA représentent des rounds d'enquête distincts plutôt qu'un rapportage continu, elles servent généralement à des comparaisons transversales plutôt qu'à l'analyse de tendances temporelles.
