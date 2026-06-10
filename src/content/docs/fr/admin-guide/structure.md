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

Pour importer des établissements, accédez à la section **Données** et ouvrez la carte **Établissements SNIS** ou la carte **Établissements Enquêtes FOSA** selon le registre que vous souhaitez mettre à jour. Chaque registre dispose de son propre assistant d'importation.

Une seule importation d'établissements peut être en cours à la fois, tous registres confondus. Si une importation est déjà en cours pour un registre, terminez-la ou annulez-la avant d'en démarrer une pour l'autre.

### Import CSV

L'import CSV suit un assistant en plusieurs étapes. Chargez un fichier CSV comportant une ligne par établissement, avec des colonnes pour l'identifiant de l'établissement, la hiérarchie des zones administratives (une colonne par niveau) et les attributs facultatifs. Après le chargement, faites correspondre les colonnes de votre CSV aux champs attendus par FASTR.

FASTR valide ensuite les données et affiche un aperçu de préparation - combien de zones administratives et d'établissements seront créés à chaque niveau, ainsi que tout avertissement de validation. Examinez cet aperçu avant de poursuivre.

:::caution[Capture d'écran à ajouter]
Étape 4 de l'assistant d'import de structure montrant les résultats de préparation avec le nombre de zones administratives et d'établissements.
:::

La dernière étape vous demande de choisir une stratégie d'intégration :

- **Ajouter les nouveaux et mettre à jour les existants** - l'option par défaut, qui convient à la plupart des cas
- **Tout remplacer** - supprime d'abord tous les établissements existants de ce registre, utile pour repartir de zéro
- **Ajouter uniquement les nouveaux** - ignore les enregistrements qui existent déjà
- **Mettre à jour les colonnes sélectionnées** - ne modifie que des attributs spécifiques des établissements existants

### Import DHIS2

L'import DHIS2 est disponible pour les établissements SNIS. Connectez-vous avec vos identifiants DHIS2, puis sélectionnez les niveaux d'unités organisationnelles à importer. FASTR fait correspondre les niveaux DHIS2 aux niveaux de zones administratives. Les établissements Enquêtes FOSA ne peuvent être importés qu'à partir d'un fichier CSV.

## Gérer les établissements existants

Une fois importés, les établissements apparaissent sous forme de tableau consultable affichant tous les enregistrements avec leurs rattachements aux zones administratives et leurs attributs. Pour les mettre à jour - ajouter des établissements, corriger des rattachements ou actualiser des attributs - lancez un nouvel import avec la stratégie d'intégration appropriée.

Pour supprimer tous les établissements d'un registre, ouvrez la carte de ce registre et cliquez sur **Supprimer ces établissements**. Cela supprime uniquement les établissements de ce registre ; les zones administratives partagées avec l'autre registre sont conservées. Seuls les administrateurs globaux peuvent supprimer des établissements, et la suppression est bloquée si le registre est référencé par un jeu de données existant.

Pour supprimer simultanément toutes les zones administratives et tous les établissements des deux registres, ouvrez la carte **Zones administratives** et cliquez sur **Supprimer toutes les unités administratives et tous les établissements**. Utilisez cette option avec prudence, car elle affecte les modules et les visualisations qui font référence à l'ancienne structure.

:::caution[Capture d'écran à ajouter]
Vue de gestion de la structure montrant le tableau des établissements avec les colonnes de zones administratives.
:::

## Pondérations d'échantillonnage des établissements HFA

Pour les analyses HFA nécessitant des estimations pondérées, vous pouvez téléverser des pondérations d'échantillonnage par établissement. La section des pondérations apparaît sous **Supprimer ces établissements** dans la carte Établissements Enquêtes FOSA.

Préparez un fichier CSV comportant trois colonnes : `facility_id`, `time_point` et `weight`. Chaque ligne indique la pondération d'échantillonnage d'un établissement à un point temporel donné. Les identifiants d'établissement doivent correspondre à ceux de votre registre d'établissements HFA, et les points temporels doivent correspondre aux libellés déjà créés par une importation de données HFA.

Pour téléverser les pondérations, sélectionnez ou chargez votre CSV à l'aide du sélecteur de fichier, puis cliquez sur **Importer les pondérations**. FASTR valide chaque ligne - les lignes comportant des valeurs manquantes, des identifiants d'établissement non reconnus, des points temporels non reconnus ou des paires établissement/point temporel en double sont rejetées avec un message d'erreur listant les premiers cas problématiques. Une importation réussie indique combien de lignes de pondérations ont été importées et quels points temporels ont été couverts. Un nouveau téléversement met à jour les pondérations existantes pour les mêmes paires établissement/point temporel.

Pour supprimer toutes les pondérations d'échantillonnage, cliquez sur **Supprimer toutes les pondérations**. Cela n'affecte ni les enregistrements d'établissements ni les données HFA. Les pondérations d'échantillonnage sont préservées automatiquement lorsque vous réimportez la liste des établissements avec la stratégie **Tout remplacer** - les pondérations des établissements qui survivent à la réimportation sont restaurées.

## GeoJSON pour les cartes
<!-- help#struct-geojson -->

Les visualisations cartographiques nécessitent des données de limites géographiques au format GeoJSON. Chargez un fichier GeoJSON par niveau de zone administrative - généralement pour la Zone administrative 2 (régions) et la Zone administrative 3 (districts).

Chaque fichier GeoJSON doit contenir des polygones avec une propriété correspondant aux noms des zones administratives de vos données de structure. FASTR tente de faire correspondre les entités aux zones administratives lors du chargement et signale toute incohérence. Les zones non appariées apparaissent vides sur les cartes.

:::caution[Capture d'écran à ajouter]
Gestionnaire GeoJSON montrant les fichiers cartographiques chargés avec le niveau de zone administrative et la date de chargement.
:::

Si la nomenclature diffère entre votre GeoJSON et vos données de structure, l'éditeur GeoJSON vous permet de modifier les propriétés des entités pour résoudre les problèmes de correspondance.
