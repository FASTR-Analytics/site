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

Accédez à la section **Données** et sélectionnez **Données HFA**. La barre latérale propose deux boutons : **Démarrer une nouvelle importation** ouvre immédiatement l'assistant d'importation, et **Voir les importations** ouvre l'historique des importations sans lancer de nouvel assistant.

L'assistant d'importation collecte toutes les informations nécessaires avant d'envoyer quoi que ce soit au serveur. Abandonner l'assistant à n'importe quelle étape n'a aucun effet — rien n'est enregistré tant que vous ne cliquez pas sur **Démarrer l'importation** à la dernière étape.

### Étape 1 — Charger les fichiers

Sélectionnez ou chargez votre fichier de données CSV et votre fichier de questionnaire XLSForm. Les deux fichiers doivent être présents avant que l'assistant puisse continuer ; l'assistant analyse les en-têtes du CSV par rapport au XLSForm dès que les deux sont sélectionnés. Si les fichiers ne peuvent pas être analysés ensemble, une erreur s'affiche et vous devez vérifier que le XLSForm correspond au CSV.

### Étape 2 — Correspondances

Indiquez quelle colonne CSV contient les identifiants d'établissement et sélectionnez le point temporel auquel ces données appartiennent. Vous pouvez également ajouter des conditions de filtre de lignes facultatives. Chaque condition spécifie une colonne, un opérateur (égal à ou différent de) et une valeur. Les lignes ne satisfaisant pas toutes les conditions sont supprimées avant le traitement des doublons — par exemple, pour ne conserver que les établissements enquêtés, vous pouvez exiger qu'une colonne de consentement soit égale à 1. Les valeurs sont comparées comme du texte exact.

### Étape 3 — Doublons

Si des établissements apparaissent plusieurs fois après le filtrage, cette étape vous permet de choisir la ligne à conserver pour chacun. Un contrôle de réglage rapide permet d'appliquer « première ligne » ou « dernière ligne » à tous les doublons en une fois ; vous pouvez ensuite remplacer des établissements individuels. Les numéros de ligne comptent les lignes de données à partir de 1 dans l'ordre du fichier (en excluant l'en-tête). Si aucun doublon n'existe après le filtrage, cette étape est ignorée automatiquement.

### Étape 4 — Vérifier et lancer

Un résumé affiche le fichier de données, le fichier XLSForm, le nombre de colonnes, le point temporel, la colonne d'identifiant d'établissement, les filtres de lignes et le nombre de doublons. Lisez la notice : l'importation remplace toutes les données existantes pour le point temporel sélectionné. Cliquez sur **Démarrer l'importation** pour lancer.

Une fois lancée, l'importation s'exécute sur le serveur. Un fichier entièrement valide s'intègre automatiquement sans autre étape. Si la préparation écarte des lignes, l'importation se met en pause dans un état **à vérifier** — rien n'est fusionné tant que vous n'avez pas agi.

## Suivre les importations

Cliquez sur **Voir les importations** pour ouvrir l'historique des importations. La section **En cours** affiche toute importation en cours avec une barre de progression en direct et un pourcentage. Le tableau **Historique** liste toutes les exécutions terminées, annulées et en erreur avec leur point temporel, leur nom de fichier, les valeurs importées et leur statut. Cliquez sur une ligne de l'historique pour voir le détail complet de l'exécution, y compris les diagnostics de préparation.

### À vérifier

Lorsque la préparation écarte des lignes d'établissements, l'importation se maintient dans un état **à vérifier**. Une carte en haut de la vue des importations explique ce qui s'est passé et affiche les résultats de la préparation. Vous pouvez choisir **Intégrer malgré tout** — pour fusionner les lignes retenues — ou **Abandonner** pour annuler l'importation sans rien fusionner.

### Annuler une importation en cours

Pendant qu'une importation est en cours, un bouton **Annuler l'importation** s'affiche. L'annulation arrête l'exécution ; rien de ce qui a déjà été fusionné n'est affecté.

![Chargement des fichiers HFA](/images/hfa-upload-en.png)

![Sélection du round HFA](/images/hfa-upload-round-en.png)

## Points temporels
<!-- help#hfa-time-points -->

Les données HFA sont organisées par points temporels plutôt que par périodes continues. Avant d'importer des données, créez vos points temporels sur la page **Points temporels HFA**. Chaque point temporel possède un libellé et une période calendaire (année et mois). Les points temporels définissent les rounds nommés - comme « Round 1 » ou « Référence déc. 2024 » - qui apparaissent dans toute la plateforme.

Après l'importation, utilisez la page **Points temporels HFA** pour modifier les libellés, ajuster les dates, réorganiser, ajouter de nouveaux points temporels ou supprimer des rounds d'enquête individuels. La suppression d'un point temporel supprime toutes ses données et ses pondérations d'échantillonnage.

![Points temporels HFA](/images/hfa-timepoints-en.png)

## Détails de la validation

Des lignes peuvent être écartées au cours de la préparation pour plusieurs raisons : identifiants d'établissement manquants, identifiants d'établissement absents de votre registre, établissements en double au sein d'une même importation (gérés par la stratégie choisie à l'étape des doublons), ou lignes exclues par les conditions de filtre définies à l'étape des correspondances. Le résumé de la préparation présente chaque catégorie séparément. Si vous constatez de nombreuses entrées « Établissement introuvable », vérifiez si votre registre des établissements doit être mis à jour.

## Traitement du XLSForm

FASTR extrait la structure de l'enquête à partir de votre XLSForm afin de fournir des libellés pertinents dans toute la plateforme. Les noms de variables deviennent des identifiants techniques. Les libellés apparaissent dans les visualisations et les rapports. Les libellés des valeurs font correspondre les codes de réponse numériques à un texte descriptif.

Pour les questions « select_multiple », FASTR décompose automatiquement chaque choix en une variable binaire distincte - une question comportant cinq options devient cinq indicateurs oui/non.

Certains noms de variables sont réservés et ne peuvent pas être utilisés comme noms de variables d'enquête. Les noms réservés comprennent les fonctions et opérateurs R utilisés dans le code des indicateurs, ainsi que les colonnes générées par le script d'analyse (comme `weight`, `time_point` et les colonnes relatives aux établissements). Si votre XLSForm contient un nom de variable réservé, renommez-le avant d'importer.

## Travailler avec les données HFA

Une fois importées, les données HFA intègrent le pipeline analytique aux côtés des données HMIS. Les modules peuvent référencer des variables HFA dans leurs calculs, et les visualisations peuvent afficher les résultats de l'évaluation des établissements. Comme les données HFA représentent des rounds d'enquête distincts plutôt qu'un rapportage continu, elles servent généralement à des comparaisons transversales plutôt qu'à l'analyse de tendances temporelles.
