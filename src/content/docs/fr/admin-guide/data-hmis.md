---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et importer les données via le système d'exécutions d'importation DHIS2, qui récupère les données par indicateur et par mois et les intègre de manière incrémentielle.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. Le système d'importation DHIS2 convient aux mises à jour régulières depuis un système national en production. Il prend en charge les exécutions immédiates, les exécutions planifiées ponctuelles et les importations planifiées récurrentes.

## Démarrer une importation

Accédez à la section **Données** et sélectionnez **Données SNIS**. Si vous disposez des permissions d'administration, un panneau **Importations** s'affiche sur la droite.

## Processus d'importation CSV
<!-- help#hmis-csv -->

Cliquez sur **Téléverser un fichier CSV** pour démarrer une importation CSV. Vous suivrez quatre étapes.

1. **Téléversez votre fichier.** Sélectionnez un fichier CSV existant parmi les ressources de votre instance, ou téléversez-en un nouveau.

2. **Faites correspondre les colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : facility_id, raw_indicator_id, period_id (format YYYYMM) et count. L'interface affiche toutes les colonnes disponibles afin que vous puissiez établir les correspondances correctement, même si votre source utilise des conventions de nommage différentes.

3. **Préparez les données.** Cliquez sur **Démarrer la préparation** pour valider et préparer vos données. Le système vérifie chaque ligne par rapport à vos correspondances d'indicateurs et à votre registre d'établissements. La progression se met à jour automatiquement.

4. **Vérifiez et intégrez.** Examinez le résumé de la préparation - nombre total d'enregistrements, problèmes de validation, lignes écartées. Si les résultats vous paraissent corrects, cliquez sur **Intégrer et finaliser** pour terminer l'importation.

:::caution[Capture d'écran à ajouter]
Interface de correspondance des colonnes montrant les quatre champs requis avec des sélecteurs déroulants.
:::

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Cliquez sur **Importer depuis DHIS2** pour ouvrir la vue des importations DHIS2. Cette vue comporte trois onglets : **En cours**, **À venir** et **Historique**.

### Lancer une importation

Cliquez sur **Nouvelle importation** pour ouvrir l'assistant d'importation. L'assistant vous guide à travers cinq étapes selon vos choix.

1. **Identifiants.** Choisissez d'utiliser une connexion DHIS2 enregistrée ou de saisir des identifiants de connexion pour cette seule exécution. Si une connexion enregistrée existe, elle est affichée avec l'URL et l'utilisateur qui l'a enregistrée. Vous pouvez la remplacer ou la supprimer ici. Saisir des identifiants sans les enregistrer signifie qu'ils sont utilisés uniquement pour cette exécution et ne sont pas conservés.

2. **Indicateurs.** Sélectionnez les indicateurs bruts à importer dans le tableau de tous les indicateurs configurés dans votre instance.

3. **Heure.** Choisissez quand l'importation s'exécute : **Maintenant** la démarre immédiatement (ou la met en file d'attente si une autre importation est active), **Une fois, à une heure donnée** planifie une exécution ponctuelle à une date et une heure précises dans un fuseau horaire choisi, ou **Récurrente** configure un calendrier hebdomadaire ou bihebdomadaire un jour et une heure choisis dans un fuseau horaire choisi.

4. **Configuration.** Pour les exécutions immédiates ou ponctuelles, sélectionnez la plage de périodes à importer. Pour les exécutions récurrentes, définissez le nombre de mois en arrière à partir du mois en cours à inclure à chaque déclenchement.

5. **Vérifier et lancer.** Un résumé affiche la connexion, le nombre d'indicateurs, le calendrier et le nombre total de paires indicateur-mois. Si une autre importation est en cours, le lancement met la nouvelle importation en file d'attente pour qu'elle démarre automatiquement à la fin de l'exécution en cours.

### Fonctionnement des importations DHIS2

Chaque exécution d'importation récupère les données par paire (indicateur, mois). Pour chaque paire, le système supprime les lignes existantes pour cet indicateur et ce mois au sein des établissements interrogés, puis insère les nouvelles valeurs récupérées. Cette approche de suppression ciblée puis insertion garantit que les valeurs que DHIS2 ne renvoie plus sont correctement retirées plutôt que laissées en place.

Les paires terminées sont enregistrées au fur et à mesure. Si une exécution est annulée ou rencontre une erreur, les paires déjà terminées sont conservées. Les résultats par indicateur sont visibles dans la vue **État des importations par indicateur**.

### Onglet En cours

L'onglet En cours affiche l'importation en cours (le cas échéant) avec une barre de progression en direct, le pourcentage, le nombre de paires et la phase (classification, récupération ou finalisation). Il liste également les importations en file d'attente. Vous pouvez annuler une importation en cours ou supprimer une importation en attente. Lorsqu'aucune importation n'est en cours, l'onglet affiche la prochaine importation planifiée si elle existe, et un bouton **Nouvelle importation**.

### Onglet À venir

L'onglet À venir liste les importations planifiées - aussi bien les calendriers récurrents que les exécutions ponctuelles en attente. Pour chaque planification, vous pouvez cliquer sur **Modifier** pour ouvrir l'assistant pré-rempli avec ses paramètres, ou sur **Supprimer** pour la retirer. Un calendrier récurrent qui a été refusé, manqué, ou dont la dernière exécution a échoué est mis en évidence en rouge, avec le détail de l'erreur affiché sous le statut.

### Onglet Historique

L'onglet Historique affiche toutes les exécutions terminées, annulées et en erreur avec leur heure de démarrage, qui les a déclenchées, la sélection (indicateurs et plage de périodes), le nombre de paires par résultat et le statut final. Les comptages de paires en échec sont mis en évidence en rouge. Cliquez sur une ligne pour ouvrir la vue de détail de l'exécution, qui affiche le résumé complet, les indicateurs introuvables dans DHIS2, les échecs de récupération par paire avec le type et le détail de l'erreur, et les divergences de vérification d'ombre. Depuis la vue de détail, cliquez sur **Réessayer les paires en échec** pour ouvrir l'assistant pré-configuré pour réimporter exactement les paires en échec.

### Gérer la connexion DHIS2

Cliquez sur **Gérer la connexion** dans la vue des importations DHIS2, ou sur **Identifiants DHIS2** dans l'en-tête de la section Données, pour ouvrir une boîte de dialogue permettant de mettre à jour ou de supprimer les identifiants DHIS2 enregistrés. Les identifiants sont chiffrés sur le serveur. Une fois enregistré, le mot de passe n'est pas renvoyé au navigateur. La connexion enregistrée est partagée par tous les flux DHIS2 de l'instance — les mêmes identifiants sont utilisés par le gestionnaire d'indicateurs, l'assistant GeoJSON et l'importation de structure.

### Planification et protection des exécutions sans surveillance

Les importations planifiées et en file d'attente utilisent toujours la connexion enregistrée. Pour créer une importation planifiée ou mettre une importation en file d'attente, des identifiants enregistrés doivent exister. De plus, la planification n'est débloquée qu'après qu'une importation contre l'URL DHIS2 enregistrée a réussi une vérification d'ombre - un contrôle croisé confirmant que les données récupérées via la route directe correspondent au moteur analytics. Exécutez d'abord une importation immédiate, puis revenez pour configurer un calendrier.

### État des importations par indicateur
<!-- help#hmis-import-ledger -->

Cliquez sur **État des importations par indicateur** pour consulter le registre des importations - un tableau montrant le dernier état d'importation pour chaque paire (indicateur, mois) ayant été importée. Pour chaque indicateur, il affiche le nombre de mois avec données, la date de la dernière importation, la source (DHIS2 ou CSV) et le nombre de mois en échec. Cliquez sur une ligne d'indicateur pour voir le détail mois par mois, incluant le nombre d'enregistrements, les comptes de prestations de services, les messages d'erreur et la classification des erreurs (erreur de configuration ou erreur serveur).

Si des paires ont échoué, un bouton **Réessayer les paires en échec** apparaît. En cliquant dessus, l'assistant s'ouvre pré-configuré pour réimporter exactement les paires en échec.

Depuis la vue de détail par indicateur, un bouton **Réimporter cet indicateur** ouvre l'assistant pour réimporter tous les mois de la fenêtre courante pour cet indicateur.

## Validation et gestion des erreurs
<!-- hmis-validation -->

Le processus de préparation CSV détecte plusieurs types de problèmes : champs requis manquants, valeurs numériques invalides, établissements absents de votre registre et indicateurs sans correspondance. Pour chaque catégorie, le résumé indique combien de lignes ont été affectées et fournit des exemples d'entrées. Si trop de lignes sont écartées, envisagez de corriger les données sources ou de mettre à jour la configuration de l'instance avant de relancer l'importation.

Pour les importations DHIS2, les erreurs par paire sont enregistrées dans le registre des importations avec une classification. Les erreurs de configuration (par exemple un identifiant d'indicateur introuvable dans DHIS2) sont marquées comme permanentes et échoueront à nouveau jusqu'à ce que la configuration soit corrigée. Les erreurs serveur (comme les délais d'attente) sont marquées comme transitoires et peuvent réussir lors d'une nouvelle tentative ultérieure.

## Gérer l'historique des importations

Chaque importation réussie crée une nouvelle version du jeu de données. Cliquez sur **Voir les importations précédentes** pour consulter toutes les versions avec leurs dates et le nombre de lignes. Vous pouvez également supprimer des données si nécessaire - cette action est irréversible et réservée aux administrateurs globaux.

## Supprimer des données ICEH

Le jeu de données ICEH propose deux options de suppression. Pour supprimer toutes les données ICEH, cochez **Supprimer TOUTES les données ICEH**, saisissez `yes please delete` dans le champ de confirmation, puis cliquez sur **Supprimer**. Pour supprimer uniquement certains indicateurs tout en conservant les autres, décochez **Supprimer TOUTES les données ICEH**, sélectionnez les indicateurs à supprimer dans la liste, puis cliquez sur **Supprimer**. Seuls les indicateurs sélectionnés sont supprimés ; tous les autres sont conservés.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour tous les projets de votre instance. Les projets peuvent ajuster leur fenêtre de données pour inclure les nouvelles périodes, et les modules prendront en compte les données fraîches lors de leur prochaine exécution.
