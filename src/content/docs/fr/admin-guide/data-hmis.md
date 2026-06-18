---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et extraire les données depuis le système en production.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. L'intégration directe avec DHIS2 convient aux mises à jour régulières depuis un système national en production, puisque vous pouvez sélectionner des indicateurs et des périodes spécifiques sans préparation manuelle de fichiers.

## Démarrer une importation

Accédez à la section **Données** et sélectionnez **Données SNIS**. Si vous disposez des permissions d'administration, un panneau **Importations** s'affiche sur la droite. Cliquez sur **Démarrer une nouvelle importation** et choisissez le type de source : fichier CSV ou DHIS2.

:::caution[Capture d'écran à ajouter]
Vue des données SNIS montrant le panneau Importations avec le bouton Démarrer une nouvelle importation.
:::

## Processus d'importation CSV
<!-- help#hmis-csv -->

Lors d'une importation à partir d'un fichier CSV, vous suivez quatre étapes.

1. **Téléversez votre fichier.** Sélectionnez un fichier CSV existant parmi les ressources de votre instance, ou téléversez-en un nouveau.

2. **Faites correspondre les colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : facility_id, raw_indicator_id, period_id (format YYYYMM) et count. L'interface affiche toutes les colonnes disponibles afin que vous puissiez établir les correspondances correctement, même si votre source utilise des conventions de nommage différentes.

3. **Préparez les données.** Cliquez sur **Démarrer la préparation** pour valider et préparer vos données. Le système vérifie chaque ligne par rapport à vos correspondances d'indicateurs et à votre registre d'établissements. La progression se met à jour automatiquement.

4. **Vérifiez et intégrez.** Examinez le résumé de la préparation - nombre total d'enregistrements, problèmes de validation, lignes écartées. Si les résultats vous paraissent corrects, cliquez sur **Intégrer et finaliser** pour terminer l'importation.

:::caution[Capture d'écran à ajouter]
Interface de correspondance des colonnes montrant les quatre champs requis avec des sélecteurs déroulants.
:::

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

1. **Connectez-vous à DHIS2.** Saisissez l'URL de votre serveur et vos identifiants. FASTR valide la connexion avant de poursuivre.

2. **Sélectionnez les indicateurs et les périodes.** Choisissez les indicateurs à récupérer dans un tableau présentant tous les indicateurs configurés dans votre instance, puis sélectionnez une plage de dates. Vous pouvez décider de la manière de gérer les échecs - tout interrompre si une combinaison échoue, ou poursuivre avec ce qui a réussi.

3. **Récupérez les données.** Cliquez sur **Démarrer la récupération depuis DHIS2** pour récupérer les données sélectionnées.

4. **Vérifiez et intégrez.** Comme pour les importations CSV - examinez les résultats et cliquez sur **Intégrer et finaliser**.

:::caution[Capture d'écran à ajouter]
Interface de sélection DHIS2 montrant le tableau des indicateurs avec des cases à cocher et le sélecteur de plage de périodes.
:::

## Validation et gestion des erreurs
<!-- help#hmis-validation -->

Le processus de préparation détecte plusieurs types de problèmes : champs requis manquants, valeurs numériques invalides, établissements absents de votre registre et indicateurs sans correspondance. Pour chaque catégorie, le résumé indique combien de lignes ont été affectées et fournit des exemples d'entrées. Si trop de lignes sont écartées, envisagez de corriger les données sources ou de mettre à jour la configuration de l'instance avant de relancer l'importation.

## Gérer l'historique des importations

Chaque importation réussie crée une nouvelle version du jeu de données. Cliquez sur **Voir les importations précédentes** pour consulter toutes les versions avec leurs dates et le nombre de lignes. Vous pouvez également supprimer des données si nécessaire - cette action est irréversible et réservée aux administrateurs globaux.

## Supprimer des données ICEH

Le jeu de données ICEH propose deux options de suppression. Pour supprimer toutes les données ICEH, cochez **Supprimer TOUTES les données ICEH**, saisissez `yes please delete` dans le champ de confirmation, puis cliquez sur **Supprimer**. Pour supprimer uniquement certains indicateurs tout en conservant les autres, décochez **Supprimer TOUTES les données ICEH**, sélectionnez les indicateurs à supprimer dans la liste, puis cliquez sur **Supprimer**. Seuls les indicateurs sélectionnés sont supprimés ; tous les autres sont conservés.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour tous les projets de votre instance. Les projets peuvent ajuster leur fenêtre de données pour inclure les nouvelles périodes, et les modules prendront en compte les données fraîches lors de leur prochaine exécution.
