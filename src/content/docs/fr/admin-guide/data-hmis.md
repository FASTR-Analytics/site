---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Consulter les données

Accédez à la section **Données** et sélectionnez **Données HMIS**. La page affiche vos données en deux onglets.

### Onglet Visualisation

La zone principale affiche les données importées. Un enregistrement est une valeur rapportée par un établissement pour un mois.

Choisissez **Enregistrements** pour compter les enregistrements, ou **Prestations de services** pour additionner les valeurs rapportées. Choisissez **Carte de chaleur** ou **Graphique linéaire** pour basculer entre une carte de présence et un graphique linéaire chronologique. La carte de chaleur indique pour quels indicateurs des données existent pour chaque période — une cellule remplie signifie qu'au moins un enregistrement existe ; par mois ou par année selon le bouton **Périodes**.

Le sélecteur d'indicateurs en haut filtre à la fois le graphique linéaire et la carte de chaleur.

### Onglet Registre

L'onglet Registre affiche le registre des importations par indicateur. Chaque ligne couvre un identifiant de données sur la fenêtre de périodes du jeu de données, avec des colonnes pour l'identifiant de l'indicateur, le libellé, l'identifiant DHIS2 (pour les indicateurs de type élément DHIS2), les mois avec données, la dernière importation, les mois en échec et les valeurs ignorées. Cliquez sur une ligne pour ouvrir le détail mensuel et accéder aux actions de réimportation et de réessai.

Pour les administrateurs globaux, la barre d'en-tête affiche un bouton **Importations**, un badge **Importation en cours** lorsqu'une importation est active, et **Supprimer les données**.

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et récupérer les données depuis le système en production.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. L'intégration directe avec DHIS2 convient aux mises à jour régulières depuis un système national en production, puisque vous pouvez sélectionner des indicateurs et des périodes précis sans préparer de fichier, et planifier une importation récurrente.

## Démarrer une importation

Cliquez sur **Importations** dans la barre d'en-tête pour ouvrir la vue des importations. La vue comporte trois onglets et deux boutons, **Nouvelle importation DHIS2** et **Téléverser un fichier CSV**.

- **En cours** affiche l'importation en cours d'exécution avec sa progression et sa phase actuelle, les importations en file d'attente derrière elle, et toute importation CSV en attente de vérification. Vous pouvez annuler l'importation en cours ou retirer une importation en file d'attente.
- **À venir** liste les importations planifiées : les calendriers récurrents et les exécutions ponctuelles qui n'ont pas encore démarré. **Modifier** ouvre l'assistant pré-rempli avec les paramètres de la planification, et l'icône poubelle la supprime. Une planification refusée, manquée, ou dont la dernière exécution a échoué est mise en évidence en rouge avec l'erreur sous son statut, et un avis rouge au-dessus des onglets signale qu'une importation planifiée nécessite votre attention.
- **Historique** liste chaque exécution qui a démarré, y compris celle en cours, avec sa date de début, la personne qui l'a lancée, son origine (DHIS2 ou CSV), sa sélection, le nombre de paires récupérées et en échec pour une exécution DHIS2, son statut, et un bouton **Version** qui ouvre les informations d'importation de la version du jeu de données créée par l'exécution. Cliquez sur une ligne pour voir son détail.

Les importations s'exécutent en arrière-plan, une à la fois. Si une importation est déjà en cours, la nouvelle est mise en file d'attente et démarre lorsque la précédente se termine. Si une importation DHIS2 est en cours, la génération d'un nouveau lot de résultats incluant les données HMIS est temporairement bloquée — un message l'explique lorsque vous tentez de lancer la génération.

## Processus d'importation CSV
<!-- help#hmis-csv -->

Une importation CSV comporte quatre étapes : téléverser le fichier, associer ses colonnes aux quatre champs requis, associer les valeurs de la colonne indicateur à vos indicateurs, puis lancer.

1. **Téléversez votre fichier.** Sélectionnez un fichier CSV existant parmi les ressources de votre instance, ou téléversez-en un nouveau. FASTR lit les en-têtes de colonnes dès qu'un fichier est sélectionné.

2. **Colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : la colonne d'identifiant d'établissement, la colonne d'indicateur, la colonne de période (aaaamm) et la colonne de valeur.

3. **Correspondance.** FASTR analyse le fichier pour en extraire chaque valeur distincte de la colonne d'indicateur et les liste avec leur nombre de lignes. Associez chaque valeur à un indicateur existant ou marquez-la comme ignorée. Une valeur est présélectionnée lorsqu'elle correspond à l'identifiant d'un indicateur ou à l'identifiant DHIS2 d'un élément DHIS2. Les valeurs ignorées sont écartées et comptabilisées lors de la préparation — ce n'est pas un problème de validation, puisque vous avez choisi de les ignorer. Deux valeurs ne peuvent pas être associées au même indicateur dans une même importation.

4. **Vérifier et lancer.** Le récapitulatif affiche le fichier, les associations de colonnes, et un résumé du nombre de valeurs associées et ignorées. Il liste également les identifiants de données sous lesquels l'importation écrira les lignes de chaque indicateur associé. Cliquez sur **Démarrer l'importation**, ou sur **Mettre en file d'attente** si une autre importation est en cours. FASTR prépare ensuite le fichier : il vérifie la période, la valeur et l'établissement de chaque ligne. Les lignes sous des valeurs ignorées sont écartées et comptabilisées. Si rien d'autre n'est écarté, les lignes préparées sont fusionnées dans le jeu de données automatiquement. Si certaines lignes sont écartées pour d'autres raisons, l'exécution se met en pause avec le statut **À vérifier**. Elle apparaît sous forme de carte dans l'onglet En cours, et vous choisissez l'une des deux actions suivantes :

- **Intégrer malgré tout** fusionne les lignes conservées et ignore les lignes écartées.
- **Abandonner** annule l'importation ; rien n'est fusionné.

Si toutes les lignes sont écartées, l'exécution se termine par une erreur au lieu de se mettre en pause.

La fusion met à jour les lignes déjà présentes pour un établissement, un indicateur et un mois, et insère les autres. Les cellules absentes du fichier conservent leur valeur précédente.

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Une importation DHIS2 récupère les valeurs rapportées par les établissements, un élément DHIS2 et un mois à la fois, directement depuis votre serveur DHIS2. Elle utilise la connexion DHIS2 enregistrée de l'instance, définie dans la ligne de connexion DHIS2 de la page Données. Cliquez sur **Nouvelle importation DHIS2** pour ouvrir l'assistant. Si aucune connexion n'est enregistrée, une alerte explique comment en définir une. L'assistant comporte quatre étapes.

1. **Indicateurs.** Sélectionnez les indicateurs à importer. La liste affiche chaque indicateur enregistré dans votre instance qui possède des éléments DHIS2 à récupérer — les indicateurs de type Téléversé ne sont pas affichés car une importation DHIS2 ne peut pas les récupérer. Sélectionnez ceux dont vous souhaitez récupérer les données. L'assistant affiche les éléments DHIS2 vers lesquels la sélection se développe et signale tout indicateur calculé sélectionné dont la formule ne se résout pas.

2. **Heure.** Exécutez l'importation **Maintenant**, **Une fois, à une heure donnée**, ou de façon **Récurrente**, dans le fuseau horaire de votre choix. Une importation récurrente s'exécute chaque jour, chaque semaine ou chaque mois. Un calendrier hebdomadaire s'exécute toutes les 1, 2 ou 4 semaines, le jour de la semaine de la date de première exécution que vous choisissez. Un calendrier mensuel s'exécute un jour de la semaine choisi du mois (le premier, le deuxième, le troisième, le quatrième ou le dernier), tous les 1 ou 3 mois.

3. **Configuration.** Pour **Maintenant** et **Une fois, à une heure donnée**, choisissez une plage de périodes fixe. Pour **Récurrente**, choisissez **Derniers N mois** (jusqu'à 24), recalculés à chaque exécution de l'importation.

4. **Vérifier et lancer.** Le récapitulatif liste la connexion, le nombre d'indicateurs, le nombre d'éléments DHIS2 vers lesquels ils se développent, et pour une exécution non récurrente le nombre de paires (élément DHIS2, mois) à récupérer. Il indique également quels indicateurs ne sont pas récupérés et pourquoi — les indicateurs de type Téléversé et les termes de population sont listés séparément avec leurs raisons. Cliquez sur **Démarrer l'importation** (ou **Mettre en file d'attente** si une autre importation est en cours) pour une exécution immédiate, sur **Planifier l'importation** pour une exécution ponctuelle ultérieure, ou sur **Enregistrer la planification** pour une importation récurrente.

Chaque paire (élément DHIS2, mois) est récupérée et fusionnée séparément. Pour une paire récupérée avec succès, FASTR supprime les lignes existantes pour exactement les établissements interrogés, puis insère les valeurs renvoyées par DHIS2. Une paire en échec ne touche pas aux données existantes, et une exécution interrompue conserve chaque paire déjà fusionnée.

FASTR récupère chaque indicateur élément DHIS2 et chaque opérande via l'API dataValueSets, qui renvoie les valeurs rapportées directement par les établissements. Il s'agit de la seule voie de récupération utilisée par l'importateur.

Un identifiant DHIS2 qui ne correspond à rien dans DHIS2 provoque l'échec de chaque mois sélectionné des indicateurs qui le portent, sans récupération, et échouera à chaque exécution jusqu'à ce que l'identifiant soit corrigé ou que l'indicateur soit supprimé. Un identifiant DHIS2 correspondant à un indicateur DHIS2 (formule) plutôt qu'à un élément de données provoque également des échecs — le détail de l'exécution l'explique et suggère de recréer l'indicateur via **Ajouter depuis DHIS2**, qui décompose la formule en ses éléments de données.

Les valeurs d'établissements qui ne sont pas des entiers non négatifs sont ignorées plutôt que de faire échouer toute la paire. Le détail de l'exécution affiche un comptage des valeurs ignorées par paire, et l'onglet Registre les accumule par indicateur.

## Validation et gestion des erreurs
<!-- help#hmis-validation -->

Pour une importation CSV, les résultats de la préparation listent chaque problème par catégorie, avec un nombre et des exemples de lignes. Les catégories sont : lignes avec des champs requis manquants, lignes avec des valeurs invalides, établissements absents de votre liste d'établissements et périodes invalides. Les lignes sous des valeurs d'indicateurs ignorées sont également comptabilisées séparément et ne sont pas traitées comme des erreurs. Corrigez le fichier ou mettez à jour votre correspondance d'indicateurs avant de relancer l'importation.

Pour une importation DHIS2, le détail de l'exécution affiche le résumé, les identifiants DHIS2 introuvables dans DHIS2, les identifiants DHIS2 qui se sont avérés être des indicateurs de formule plutôt que des éléments de données, un comptage des valeurs d'établissements ignorées, et chaque paire (élément DHIS2, mois) en échec avec son erreur. Chaque erreur est classée **Configuration** (un identifiant inconnu ou un autre refus de DHIS2), qui échouera à nouveau tant que la liste des indicateurs n'est pas corrigée, ou **Serveur** (un délai d'attente dépassé ou une erreur du serveur), qui peut réussir lors d'une nouvelle tentative. Lorsqu'un mois est en échec, **Réessayer les paires en échec** dans la vue de détail mensuel ouvre l'assistant avec toutes les paires en échec sélectionnées.

## Gérer l'historique des importations

Chaque importation qui fusionne des données crée une nouvelle version du jeu de données. L'onglet **Historique** de la vue des importations liste chaque exécution, et le bouton **Version** d'une exécution ouvre les informations d'importation de sa version, avec le nombre de lignes insérées, mises à jour ou supprimées. Pour voir l'état d'importation de chaque indicateur mois par mois, et pour réimporter un indicateur, utilisez l'onglet **Registre** de la page Données HMIS.

Pour supprimer des données, cliquez sur **Supprimer les données** dans la barre d'en-tête, choisissez tous les indicateurs ou une sélection et la plage de périodes, puis saisissez `yes please delete` pour confirmer. Seul un administrateur global peut supprimer des données. La suppression est irréversible et est refusée tant qu'une importation est en cours.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour la génération d'un lot de résultats. Générez un nouveau lot de résultats depuis la page **Lots de résultats** de l'instance pour inclure les données fraîches dans vos projets.
