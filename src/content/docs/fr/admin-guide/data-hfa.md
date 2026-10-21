---
title: "Données : HFA"
description: Importation et gestion des données d'enquête d'évaluation des établissements.
sidebar:
  order: 5
---

Les données d'évaluation des établissements de santé (HFA) capturent des instantanés ponctuels des caractéristiques d'un établissement - infrastructures, équipements, personnel et disponibilité des services. Contrairement aux données HMIS qui proviennent en continu du rapportage de routine, les données HFA sont issues d'enquêtes périodiques réalisées à des « points temporels » précis (comme « Round 1 » ou « Référence décembre 2024 »). Cette structure fondée sur les enquêtes détermine la façon dont vous importez et gérez les données HFA dans FASTR.

## Ce que contiennent les données HFA

Les enquêtes HFA recueillent des informations sur les établissements qui ne sont pas saisies par le rapportage de routine : disponibilité des équipements essentiels, niveaux de stock de médicaments, présence de personnel formé et infrastructures telles que l'eau et l'électricité. Ces données complètent le HMIS en fournissant un contexte sur la capacité des établissements - ce qui aide à comprendre pourquoi certains établissements obtiennent des résultats différents des autres.

## La liste des établissements HFA

Les établissements HFA sont créés et mis à jour par l'importation des données de chaque point temporel. Contrairement aux établissements SNIS, ils ne sont pas importés via un assistant d'importation distinct. Ouvrez la ligne **Établissements Enquêtes FOSA** dans la section Données pour consulter et modifier la liste des établissements HFA. Un administrateur global peut cliquer sur une ligne pour modifier les unités administratives et les colonnes facultatives de l'établissement — toute valeur modifiée devient une valeur définie par l'utilisateur, de sorte que les importations ultérieures la conservent par défaut.

Le panneau de gauche propose une section **Établissements inutilisés** qui apparaît lorsque des établissements existent. Un bouton **Supprimer** compte puis confirme la suppression des établissements qui n'ont ni données ni pondérations. Les unités administratives laissées sans établissement sont également supprimées.

## Fichiers requis
<!-- help#hfa-required-files -->

Chaque importation HFA nécessite deux fichiers :

- **Fichier de données CSV** - une ligne par établissement avec une colonne pour chaque question de l'enquête. Le fichier doit contenir une colonne d'identifiant d'établissement.
- **Fichier de questionnaire XLSForm** - définit la structure de l'enquête selon le standard XLSForm. FASTR le lit pour en extraire les identifiants de questions, les libellés des questions et les libellés des valeurs.

## Déroulement de l'importation
<!-- help#hfa-import -->

Accédez à la section **Données** et sélectionnez **Données HFA**. La barre latérale propose un bouton **Importations** qui ouvre l'historique des importations et permet de démarrer une nouvelle importation depuis cette surface.

L'assistant d'importation collecte toutes les informations nécessaires avant d'envoyer quoi que ce soit au serveur. Abandonner l'assistant à n'importe quelle étape n'a aucun effet — rien n'est enregistré tant que vous ne cliquez pas sur **Démarrer l'importation** à la dernière étape.

### Étape 1 — Charger les fichiers

Sélectionnez ou chargez votre fichier de données CSV et votre fichier de questionnaire XLSForm. Les deux fichiers doivent être présents avant que l'assistant puisse continuer ; il analyse les en-têtes du CSV par rapport au XLSForm dès que les deux sont sélectionnés. Si les fichiers ne peuvent pas être analysés ensemble, une erreur s'affiche. FASTR pré-remplit la colonne d'identifiant d'établissement à partir du choix de la dernière importation et des noms de colonnes standard du questionnaire.

### Étape 2 — Correspondances

Indiquez quelle colonne CSV contient les identifiants d'établissement, sélectionnez le point temporel auquel ces données appartiennent et ajoutez des conditions de filtre de lignes facultatives. Chaque condition spécifie une colonne, un opérateur (égal à ou différent de) et une valeur. Les lignes ne satisfaisant pas toutes les conditions sont supprimées avant le traitement des doublons.

### Étape 3 — Établissements

Choisissez les colonnes CSV qui portent les unités administratives et les attributs facultatifs de l'établissement, comme le type ou la propriété. FASTR pré-remplit ces menus déroulants à partir des choix de la dernière importation et, si une colonne correspond à un nom de questionnaire standard, par le nom de la colonne. Une colonne de correction, lorsqu'une cellule est remplie, remplace la valeur de la colonne principale pour cette ligne.

Pour chaque colonne associée, FASTR affiche un aperçu : le nombre de valeurs distinctes, le nombre de valeurs vides et les valeurs les plus fréquentes. Il affiche également les valeurs absentes de la liste des établissements HFA (pour les établissements déjà dans le registre) et les codes XLSForm qui n'ont pas pu être résolus en libellé.

Le premier niveau d'unité administrative est saisi comme valeur texte (le nom du pays) plutôt qu'associé à une colonne. Les niveaux 2 et supérieurs sont associés à des colonnes CSV. Vous devez associer tous les niveaux ou aucun ; si la liste des établissements HFA est vide, chaque établissement du fichier est nouveau et tous les niveaux sont requis.

### Étape 4 — Doublons

Cette étape affiche les établissements qui apparaissent plusieurs fois après le filtrage et vous permet de choisir la ligne à conserver pour chacun. Lorsqu'il n'y a aucun doublon, un message le confirme.

### Étape 5 — Modifications

Cette étape affiche chaque établissement que l'importation modifierait dans la liste des établissements HFA : les nouveaux établissements qui seraient ajoutés et les établissements existants dont les unités administratives ou les colonnes facultatives diffèrent de celles du fichier. Pour chaque type de modification, vous décidez de **Conserver** la valeur actuelle dans la liste ou de **Prendre** la valeur du fichier. Une valeur définie par un utilisateur ou par un point temporel ultérieur est conservée par défaut ; une valeur de ce point temporel ou d'un point antérieur cède la place au fichier par défaut.

Cliquez sur une ligne de groupe de modifications pour la développer et décider des établissements un par un. Utilisez **Tout conserver** et **Tout prendre** pour régler l'ensemble du groupe en une fois.

L'étape montre également l'impact sur les unités administratives : les zones qui seraient perdues et les périmètres et cartes qui les nomment, ainsi que les nouveaux chemins d'unités administratives que l'importation introduirait.

Si aucun des identifiants d'établissement du fichier ne correspond à la liste existante alors que vous vous attendiez à mettre à jour des établissements existants, un avertissement s'affiche. Vous devez confirmer que les établissements sont réellement nouveaux avant de continuer.

Pour les nouveaux établissements et les modifications que vous prenez, vous pouvez réassigner les valeurs établissement par établissement dans la section **Réassigner des valeurs**. Cochez les valeurs qui nécessitent une réassignation et, pour chaque établissement concerné, choisissez une valeur cible dans le menu déroulant. Des colonnes supplémentaires de votre fichier peuvent être affichées à côté du tableau pour aider à identifier les établissements.

### Étape 6 — Vérifier et lancer

Un résumé affiche tous les choix : le fichier de données, le fichier XLSForm, la colonne d'identifiant d'établissement, le point temporel, les filtres de lignes, les colonnes d'établissements associées, le nombre de nouveaux établissements, les modifications prises par colonne et les réassignations de valeurs. Lisez la notice : l'importation remplace toutes les données existantes du point temporel sélectionné et écrit les nouveaux établissements et les modifications prises dans la liste des établissements HFA. Cliquez sur **Démarrer l'importation** pour lancer.

Un fichier dans lequel chaque ligne a un identifiant d'établissement et chaque nouvel établissement a des unités administratives complètes s'intègre automatiquement. Dans le cas contraire, l'importation se met en pause dans un état **à vérifier** avant qu'aucune écriture n'ait lieu.

## Suivre les importations

Cliquez sur **Importations** pour ouvrir l'historique des importations. La section **En cours** affiche toute importation en cours avec une barre de progression en direct et un pourcentage. Le tableau **Historique** liste toutes les exécutions terminées, annulées et en erreur avec leur point temporel, leur nom de fichier, les valeurs importées et leur statut. Cliquez sur une ligne de l'historique pour voir le détail complet de l'exécution, y compris les diagnostics de préparation.

### À vérifier

Lorsque certaines lignes n'ont pas d'identifiant d'établissement ou que de nouveaux établissements n'ont pas d'unités administratives complètes, l'importation se maintient dans un état **à vérifier** avant qu'aucune fusion n'ait lieu. Une carte en haut de la vue des importations explique ce qui s'est passé. Vous pouvez choisir **Intégrer malgré tout** — ce qui exclut ces lignes et ces établissements — ou **Abandonner** pour annuler l'importation sans rien écrire.

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

Des lignes peuvent être écartées lors de la préparation pour plusieurs raisons : identifiants d'établissement manquants ou lignes exclues par les conditions de filtre. Le résumé de la préparation présente chaque catégorie séparément et inclut une section établissements indiquant combien sont déjà dans le registre, combien sont nouveaux, combien sont dans le registre mais absents de ce fichier, et les éventuels nouveaux établissements sans unités administratives complètes. Il indique également combien de questions XLSForm n'avaient pas de colonne CSV correspondante et vice versa.

Si aucune colonne CSV ne correspond à une question de type préparable dans le XLSForm, l'importation s'arrête immédiatement avec une erreur.

## Traitement du XLSForm

FASTR extrait la structure de l'enquête à partir de votre XLSForm afin de fournir des libellés pertinents dans toute la plateforme. Les identifiants de questions deviennent des identifiants techniques utilisés dans le code R et le dictionnaire de données. Les libellés apparaissent dans les visualisations et les rapports. Les libellés des valeurs font correspondre les codes de réponse numériques à un texte descriptif.

FASTR fait correspondre les en-têtes de colonnes CSV aux identifiants de questions XLSForm sans tenir compte de la casse. Un chemin de groupe ODK comme `section_a/SERV_08B` est mis en correspondance sur son dernier segment. Si deux colonnes CSV correspondent à la même question, l'importation s'arrête avec une erreur.

Pour les questions « select_multiple », FASTR décompose automatiquement chaque choix en une variable binaire distincte.

Certains identifiants de questions sont réservés et ne peuvent pas être utilisés. Si votre XLSForm contient un identifiant réservé, renommez la question et sa colonne avant d'importer.

## Pondérations d'échantillonnage des établissements HFA

Pour les analyses HFA nécessitant des estimations pondérées, vous pouvez téléverser des pondérations d'échantillonnage par établissement. Accédez à la section **Données** et cliquez sur la ligne **Pondérations d'échantillonnage**. Préparez un fichier CSV avec une colonne d'identifiant d'établissement, une colonne de pondération et, facultativement, une colonne de strate d'échantillonnage. Chaque importation couvre un point temporel. Importez d'abord les données du point temporel : l'importation des données crée les établissements HFA, et une pondération pour un établissement absent de la liste est ignorée.

Une importation réussie indique combien de pondérations ont été importées, le nombre de strates si une colonne de strate a été associée, combien de pondérations n'avaient pas de strate, et les identifiants d'établissements dont les pondérations ont été ignorées parce que l'établissement est absent de la liste HFA.

## Travailler avec les données HFA

Une fois importées, les données HFA intègrent le pipeline analytique aux côtés des données HMIS. Les modules peuvent référencer des variables HFA dans leurs calculs, et les visualisations peuvent afficher les résultats de l'évaluation des établissements. Comme les données HFA représentent des rounds d'enquête distincts plutôt qu'un rapportage continu, elles servent généralement à des comparaisons transversales plutôt qu'à l'analyse de tendances temporelles.
