---
title: Structure
description: Configuration des zones administratives, des établissements et des données géographiques.
sidebar:
  order: 2
---

Dans FASTR, la structure désigne la hiérarchie organisationnelle de votre système de santé - les limites administratives qui définissent où les services sont fournis, ainsi que les établissements qui les fournissent. Configurer cela correctement est l'une des premières tâches lors de la mise en place d'une nouvelle instance, car la plupart des autres fonctionnalités en dépendent.

## Zones administratives
<!-- help#struct-admin-areas -->

Les zones administratives représentent des limites géographiques organisées de manière hiérarchique. FASTR prend en charge jusqu'à quatre niveaux, même si la plupart des pays n'en utilisent que deux ou trois. La signification exacte de chaque niveau dépend de votre pays - ce que FASTR appelle « Zone administrative 2 » peut être une région dans un pays et une province dans un autre. Vous pouvez personnaliser les libellés de chaque niveau dans les paramètres de l'instance.

Une hiérarchie typique : la Zone administrative 1 représente l'ensemble du pays, la Zone administrative 2 contient les régions ou les provinces, la Zone administrative 3 contient les districts, et la Zone administrative 4 (si elle est utilisée) contient les sous-districts. Chaque établissement est rattaché à une zone administrative au niveau le plus bas que vous utilisez, et FASTR agrège automatiquement les données vers les niveaux supérieurs.

Les zones administratives sont créées automatiquement lors de l'importation des établissements - chaque ligne d'établissement porte son chemin d'unité administrative. Elles sont également supprimées automatiquement lorsqu'aucun établissement des deux registres n'y fait référence ; vous n'avez donc pas besoin de les gérer directement.

:::caution[Capture d'écran à ajouter]
Paramètres de l'instance montrant la configuration des libellés des niveaux de zones administratives.
:::

## Établissements de santé
<!-- help#struct-facilities -->

FASTR maintient deux registres d'établissements distincts : l'un pour les établissements SNIS et l'autre pour les établissements Enquêtes FOSA. Les deux registres partagent la même hiérarchie de zones administratives, mais chacun possède son propre flux d'importation et sa propre table d'enregistrements d'établissements.

Les établissements peuvent avoir des attributs facultatifs : type d'établissement (hôpital, centre de santé, dispensaire), catégorie de propriété (public, privé, confessionnel) et jusqu'à cinq attributs personnalisés permettant une catégorisation supplémentaire.

Ces attributs permettent la désagrégation dans les visualisations. Si vous souhaitez comparer les performances entre les établissements publics et privés, ces attributs doivent être renseignés dans vos données de structure.

:::caution[Capture d'écran à ajouter]
Configuration des colonnes d'établissements dans les paramètres de l'instance, montrant le type, la propriété et les champs personnalisés.
:::

## Importer des établissements

Pour importer des établissements, accédez à la section **Données** et ouvrez la carte **Établissements SNIS** ou la carte **Établissements Enquêtes FOSA** selon le registre que vous souhaitez mettre à jour. Chaque registre dispose de son propre assistant d'importation. Les importations de chaque registre sont indépendantes : vous pouvez lancer simultanément une importation SNIS et une importation FOSA.

### Import CSV

L'import CSV suit un assistant en plusieurs étapes.

**Étape 0 - Choisir la source.** Sélectionnez CSV comme méthode d'importation.

**Étape 1 - Charger le fichier.** Chargez un fichier CSV comportant une ligne par établissement.

**Étape 2 - Associer les colonnes.** Activez les colonnes que vous souhaitez importer et associez chacune à une colonne de votre fichier. Seule la colonne Identifiant d'établissement est obligatoire. Les unités administratives sont tout ou rien : soit vous associez tous les niveaux, soit aucun. Les colonnes de métadonnées facultatives (nom, type, propriété, champs personnalisés) peuvent chacune être activées ou désactivées indépendamment. Si vous ne faites que mettre à jour des métadonnées sans modifier la localisation géographique des établissements, vous pouvez laisser les unités administratives désactivées.

**Étape 3 - Préparer les données.** FASTR valide le fichier et charge les lignes dans une table de préparation. La progression se met à jour automatiquement.

**Étape 4 - Vérifier et intégrer.** Le résumé de la préparation indique combien d'établissements figurent dans votre fichier et combien existent déjà dans le registre. Choisissez un mode d'intégration :

- **Remplacer tous les établissements existants** - supprime tous les établissements actuellement dans ce registre, puis ajoute tous les établissements de votre fichier. Ce mode nécessite que les unités administratives soient associées. FASTR bloque ce mode si un jeu de données ou des pondérations d'échantillonnage référencent encore les établissements existants.
- **Ajouter les nouveaux établissements et mettre à jour les existants** - ajoute les établissements dont les identifiants sont nouveaux et met à jour les existants avec les colonnes que vous avez associées. Ce mode nécessite également les unités administratives.
- **Mettre à jour uniquement les établissements existants** - ne met à jour que les établissements déjà présents dans le registre ; l'importation est rejetée si votre fichier contient un identifiant absent du registre.

Avant de confirmer, le résumé indique combien d'établissements existants correspondent aux identifiants de votre fichier et combien sont nouveaux. Si aucun ne correspond alors que vous attendiez des mises à jour, la colonne Identifiant d'établissement est probablement mal associée, ou vous importez dans le mauvais registre (SNIS ou FOSA).

:::caution[Capture d'écran à ajouter]
Étape 4 de l'assistant d'import de structure montrant les résultats de préparation avec le nombre de zones administratives et d'établissements.
:::

### Import DHIS2

L'import DHIS2 est disponible pour les établissements SNIS. Connectez-vous avec vos identifiants DHIS2, puis sélectionnez les niveaux d'unités organisationnelles à importer. FASTR fait correspondre les niveaux DHIS2 aux niveaux de zones administratives. Les établissements Enquêtes FOSA ne peuvent être importés qu'à partir d'un fichier CSV.

## Gérer les établissements existants

Une fois importés, les établissements apparaissent sous forme de tableau consultable affichant tous les enregistrements avec leurs rattachements aux zones administratives et leurs attributs. Pour les mettre à jour - ajouter des établissements, corriger des rattachements ou actualiser des attributs - lancez un nouvel import avec le mode d'intégration approprié.

Pour supprimer tous les établissements d'un registre, ouvrez la carte de ce registre et cliquez sur **Supprimer les établissements**. Cela supprime uniquement les établissements de ce registre ; les zones administratives partagées avec l'autre registre sont conservées. Seuls les administrateurs globaux peuvent supprimer des établissements.

Pour supprimer simultanément toutes les zones administratives et tous les établissements des deux registres, ouvrez la carte **Zones administratives** et cliquez sur **Supprimer toutes les unités administratives et tous les établissements**. Utilisez cette option avec prudence, car elle affecte les modules et les visualisations qui font référence à l'ancienne structure.

:::caution[Capture d'écran à ajouter]
Vue de gestion de la structure montrant le tableau des établissements avec les colonnes de zones administratives.
:::

## Pondérations d'échantillonnage des établissements HFA

Pour les analyses HFA nécessitant des estimations pondérées, vous pouvez téléverser des pondérations d'échantillonnage par établissement. Accédez à la section **Données** et cliquez sur la carte **Pondérations d'échantillonnage** pour ouvrir le gestionnaire de pondérations. Seuls les administrateurs globaux peuvent importer ou supprimer des pondérations ; tous les utilisateurs disposant d'un accès aux données peuvent consulter le tableau des pondérations.

Préparez un fichier CSV avec une colonne d'identifiant d'établissement et une colonne de pondération. Chaque importation couvre un point temporel. Pour téléverser les pondérations, sélectionnez ou chargez votre CSV, puis associez la colonne d'identifiant d'établissement, la colonne de pondération et le point temporel cible. Une cellule de pondération vide signifie que l'établissement n'est pas dans l'échantillon de ce tour et sera ignorée. Une importation réussie indique combien de pondérations ont été importées, combien de cellules vides ont été ignorées et quel point temporel a été couvert. Un nouveau téléversement met à jour les pondérations existantes pour le même établissement et le même point temporel.

Le gestionnaire de pondérations affiche un résumé de couverture indiquant, pour chaque point temporel, combien d'établissements disposant de données ont une pondération correspondante. Un avertissement met en évidence les points temporels où certains établissements ont des données mais aucune pondération - ces établissements compteront avec une pondération de 1 lorsque l'analyse pondérée sera activée. Vous pouvez télécharger les pondérations actuelles au format CSV et les réimporter après modification.

Pour supprimer toutes les pondérations d'échantillonnage, cliquez sur **Supprimer toutes les pondérations**. Cela n'affecte ni les enregistrements d'établissements ni les données HFA.

## GeoJSON pour les cartes
<!-- help#struct-geojson -->

Les visualisations cartographiques nécessitent des données de limites géographiques au format GeoJSON. Chargez un fichier GeoJSON par niveau de zone administrative - généralement pour la Zone administrative 2 (régions) et la Zone administrative 3 (districts).

Chaque fichier GeoJSON doit contenir des polygones avec une propriété correspondant aux noms des zones administratives de vos données de structure. FASTR tente de faire correspondre les entités aux zones administratives lors du chargement et signale toute incohérence. Les zones non appariées apparaissent vides sur les cartes.

:::caution[Capture d'écran à ajouter]
Gestionnaire GeoJSON montrant les fichiers cartographiques chargés avec le niveau de zone administrative et la date de chargement.
:::

Si la nomenclature diffère entre votre GeoJSON et vos données de structure, l'éditeur GeoJSON vous permet de modifier les propriétés des entités pour résoudre les problèmes de correspondance.
