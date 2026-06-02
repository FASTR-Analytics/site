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

:::caution[Capture d'écran à ajouter]
Paramètres de l'instance montrant la configuration des libellés des niveaux de zones administratives.
:::

## Établissements de santé
<!-- help#struct-facilities -->

Les établissements sont les points de prestation de services de santé où les données sont collectées. Chaque établissement appartient à une zone administrative et peut comporter des attributs facultatifs : type d'établissement (hôpital, centre de santé, dispensaire), catégorie de propriété (public, privé, confessionnel) et jusqu'à cinq attributs personnalisés permettant une catégorisation supplémentaire.

Ces attributs permettent la désagrégation dans les visualisations. Si vous souhaitez comparer les performances entre les établissements publics et privés, ces attributs doivent être renseignés dans vos données de structure.

:::caution[Capture d'écran à ajouter]
Configuration des colonnes d'établissements dans les paramètres de l'instance, montrant le type, la propriété et les champs personnalisés.
:::

## Importer des données de structure

Les données de structure peuvent provenir d'un fichier CSV ou directement d'un système DHIS2.

### Import CSV

L'import CSV suit un assistant en plusieurs étapes. Chargez un fichier CSV comportant une ligne par établissement, avec des colonnes pour l'identifiant de l'établissement, la hiérarchie des zones administratives (une colonne par niveau) et les attributs facultatifs. Après le chargement, faites correspondre les colonnes de votre CSV aux champs attendus par FASTR.

FASTR valide ensuite les données et affiche un aperçu de préparation - combien de zones administratives et d'établissements seront créés à chaque niveau, ainsi que tout avertissement de validation. Examinez cet aperçu avant de poursuivre.

:::caution[Capture d'écran à ajouter]
Étape 4 de l'assistant d'import de structure montrant les résultats de préparation avec le nombre de zones administratives et d'établissements.
:::

La dernière étape vous demande de choisir une stratégie d'intégration :

- **Ajouter les nouveaux et mettre à jour les existants** - l'option par défaut, qui convient à la plupart des cas
- **Tout remplacer** - supprime d'abord les données existantes, utile pour repartir de zéro
- **Ajouter uniquement les nouveaux** - ignore les enregistrements qui existent déjà
- **Mettre à jour les colonnes sélectionnées** - ne modifie que des attributs spécifiques des établissements existants

### Import DHIS2

Si votre pays utilise DHIS2, vous pouvez récupérer directement les données des unités organisationnelles. Connectez-vous avec vos identifiants DHIS2, puis sélectionnez les niveaux d'unités organisationnelles à importer. FASTR fait correspondre les niveaux DHIS2 aux niveaux de zones administratives. Cela permet de maintenir votre structure alignée sur votre système national HMIS.

## Gérer la structure existante

Une fois importée, la structure apparaît sous forme de tableau consultable affichant tous les établissements avec leurs rattachements aux zones administratives et leurs attributs. Pour la mettre à jour - ajouter des établissements, corriger des rattachements ou actualiser des attributs - lancez un nouvel import avec la stratégie d'intégration appropriée.

L'option « Effacer les zones administratives et les établissements » supprime tout. Utilisez-la avec prudence, car elle affecte les modules et les visualisations qui font référence à l'ancienne structure.

:::caution[Capture d'écran à ajouter]
Vue de gestion de la structure montrant le tableau des établissements avec les colonnes de zones administratives.
:::

## GeoJSON pour les cartes
<!-- help#struct-geojson -->

Les visualisations cartographiques nécessitent des données de limites géographiques au format GeoJSON. Chargez un fichier GeoJSON par niveau de zone administrative - généralement pour la Zone administrative 2 (régions) et la Zone administrative 3 (districts).

Chaque fichier GeoJSON doit contenir des polygones avec une propriété correspondant aux noms des zones administratives de vos données de structure. FASTR tente de faire correspondre les entités aux zones administratives lors du chargement et signale toute incohérence. Les zones non appariées apparaissent vides sur les cartes.

:::caution[Capture d'écran à ajouter]
Gestionnaire GeoJSON montrant les fichiers cartographiques chargés avec le niveau de zone administrative et la date de chargement.
:::

Si la nomenclature diffère entre votre GeoJSON et vos données de structure, l'éditeur GeoJSON vous permet de modifier les propriétés des entités pour résoudre les problèmes de correspondance.
