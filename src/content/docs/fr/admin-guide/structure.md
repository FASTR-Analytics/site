---
title: Structure
description: Configuration des zones administratives, des établissements et des données géographiques.
sidebar:
  order: 2
---

Dans FASTR, la structure désigne la hiérarchie organisationnelle de votre système de santé - les limites administratives qui définissent où les services sont fournis, ainsi que les établissements qui les fournissent. Configurer cela correctement est l'une des premières tâches lors de la mise en place d'une nouvelle instance, car la plupart des autres fonctionnalités en dépendent.

## Zones administratives
<!-- help#struct-admin-areas -->

Les zones administratives représentent des limites géographiques organisées de manière hiérarchique. FASTR prend en charge jusqu'à quatre niveaux, même si la plupart des pays n'en utilisent que deux ou trois. La signification exacte de chaque niveau dépend de votre pays - ce que FASTR appelle « Zone administrative 2 » peut être une région dans un pays et une province dans un autre. Vous pouvez personnaliser les libellés de chaque niveau depuis la ligne **Libellés des zones administratives** dans la section Données.

Une hiérarchie typique : la Zone administrative 1 représente l'ensemble du pays, la Zone administrative 2 contient les régions ou les provinces, la Zone administrative 3 contient les districts, et la Zone administrative 4 (si elle est utilisée) contient les sous-districts. Chaque établissement est rattaché à une zone administrative au niveau le plus bas que vous utilisez, et FASTR agrège automatiquement les données vers les niveaux supérieurs.

Les zones administratives sont dérivées des lignes d'établissements — chaque établissement porte son chemin de zone administrative, et FASTR crée et supprime les zones administratives automatiquement au fur et à mesure des importations et des suppressions d'établissements. Vous n'avez pas besoin de les gérer directement. Le nombre de zones administratives à chaque niveau s'affiche sur les lignes des établissements SNIS et FOSA après l'importation.

![Admin Areas FR](/images/admin-areas-fr.png)

## Établissements de santé
<!-- help#struct-facilities -->

FASTR maintient deux registres d'établissements distincts : l'un pour les établissements SNIS et l'autre pour les établissements Enquêtes FOSA. Les deux registres partagent la même hiérarchie de zones administratives, mais chacun possède son propre flux d'importation, sa propre table d'enregistrements d'établissements, et sa propre configuration pour le niveau de profondeur administratif et les colonnes d'établissements.

Les établissements peuvent avoir des attributs facultatifs : type d'établissement (hôpital, centre de santé, dispensaire), catégorie de propriété (public, privé, confessionnel) et jusqu'à cinq attributs personnalisés permettant une catégorisation supplémentaire.

Ces attributs permettent la désagrégation dans les visualisations. Si vous souhaitez comparer les performances entre les établissements publics et privés, ces attributs doivent être renseignés dans vos données de structure.

![Health Facilities FR](/images/health-facilities-fr.png)

## Configuration des registres

Chaque registre (SNIS et Enquêtes FOSA) possède sa propre ligne de configuration accessible depuis la page Données. Ouvrez la ligne **Configuration SNIS** ou **Configuration Enquêtes FOSA** pour ajuster deux paramètres indépendants.

**Niveau maximal d'unité administrative** définit le nombre de niveaux administratifs utilisés par les établissements de ce registre. Les options sont 2, 3 ou 4. Toute modification de ce paramètre nécessite de supprimer au préalable tous les établissements de ce registre — le serveur l'impose pour éviter des données incohérentes.

**Colonnes des établissements** contrôle les colonnes facultatives que portent les importations d'établissements de ce registre, ainsi que le libellé affiché pour chacune. Les colonnes disponibles sont Noms des établissements, Types d'établissements, Propriété des établissements et jusqu'à cinq Champs personnalisés. Activez une colonne et saisissez éventuellement un libellé personnalisé ; laissez le libellé vide pour utiliser la valeur par défaut. Les deux enregistrements — niveau administratif et colonnes — sont indépendants, de sorte qu'une modification de colonne ne déclenche jamais la vérification de profondeur.

## Libellés des zones administratives

Les noms des niveaux de zones administratives comme « Région » ou « District » sont partagés par les deux registres. Définissez-les depuis la ligne **Libellés des zones administratives** dans la section Données. Saisissez la forme singulière du nom pour chaque niveau utilisé. Laissez un niveau vide pour utiliser la valeur par défaut. Ces libellés apparaissent partout où les données sont désagrégées par zone.

## Importer des établissements SNIS

Pour importer des établissements SNIS, accédez à la section **Données** et ouvrez la ligne **Établissements SNIS**. L'importation suit un assistant en plusieurs étapes.

**Étape 0 - Choisir la source.** Sélectionnez CSV ou DHIS2 comme méthode d'importation.

**Étape 1 - Charger le fichier (CSV) ou confirmer la connexion (DHIS2).** Pour CSV, chargez un fichier comportant une ligne par établissement. Pour DHIS2, confirmez la connexion enregistrée de l'instance.

**Étape 2 - Associer les colonnes (CSV) ou sélectionner les niveaux d'unités organisationnelles (DHIS2).** Pour CSV, activez les colonnes que vous souhaitez importer et associez chacune à une colonne de votre fichier. Seule la colonne Identifiant d'établissement est obligatoire. Les unités administratives sont tout ou rien. Les colonnes de métadonnées facultatives peuvent être activées ou désactivées indépendamment. Pour DHIS2, sélectionnez les niveaux d'unités organisationnelles à importer.

**Étape 3 - Préparer les données.** FASTR valide le fichier et charge les lignes dans une table de préparation. La progression se met à jour automatiquement.

**Étape 4 - Vérifier les valeurs (sources CSV uniquement).** Si les données préparées contiennent des colonnes dont les valeurs peuvent être réassignées avant l'importation — comme le type d'établissement ou la propriété — une étape de vérification s'affiche. Cochez les valeurs nécessitant une réassignation, sélectionnez les établissements concernés dans le tableau et utilisez le menu déroulant **Réassigner à** pour les affecter à une valeur cible. Vous pouvez également ajouter de nouvelles valeurs de catégorie en les saisissant dans le champ **Nouvelle catégorie**. Pour les imports CSV, vous pouvez afficher jusqu'à cinq colonnes supplémentaires de votre fichier à côté du tableau de réassignation. Cette étape est facultative — si rien ne nécessite de réassignation, cliquez sur **Continuer vers l'importation**. Une fois terminé, cliquez sur **Sauvegarder et continuer**.

**Étape 5 - Vérifier et intégrer.** Le résumé de la préparation indique combien d'établissements figurent dans votre fichier et combien existent déjà dans le registre. Si vous avez enregistré des réassignations de valeurs, le résumé indique combien d'établissements seront recodés par colonne. Choisissez un mode d'intégration :

- **Remplacer tous les établissements existants** — votre fichier devient le registre. Les établissements de votre fichier sont ajoutés ou mis à jour, et tout établissement absent de votre fichier est supprimé. Ce mode nécessite que les unités administratives soient associées. FASTR bloque ce mode si un jeu de données ou des pondérations référencent encore des établissements qui seraient supprimés.
- **Ajouter les nouveaux établissements et mettre à jour les existants** - ajoute les établissements dont les identifiants sont nouveaux et met à jour les existants. Ce mode nécessite également les unités administratives.
- **Mettre à jour uniquement les établissements existants** - ne met à jour que les établissements déjà présents ; l'importation est rejetée si votre fichier contient un identifiant absent du registre.

Avant de confirmer, le résumé indique combien d'établissements existants correspondent aux identifiants de votre fichier et combien sont nouveaux. Si aucun ne correspond alors que vous attendiez des mises à jour, la colonne Identifiant d'établissement est probablement mal associée.

Après une intégration réussie, si des limites de cartes GeoJSON ne correspondent plus à aucune zone administrative, le résumé affiche un avertissement. Corrigez ces incohérences dans l'éditeur GeoJSON.

![Structure Import FR](/images/structure-import-fr.png)

## Établissements Enquêtes FOSA

Les établissements Enquêtes FOSA sont créés et mis à jour par l'importation des données de chaque point temporel, et non via un assistant d'importation distinct. Ouvrez la ligne **Établissements Enquêtes FOSA** dans la section Données pour consulter et modifier la liste des établissements HFA. Un administrateur global peut cliquer sur une ligne pour modifier les unités administratives et les colonnes facultatives de l'établissement.

Le panneau de gauche explique le fonctionnement de la gestion des établissements HFA. Si des établissements existent, une section **Établissements inutilisés** apparaît avec un bouton **Supprimer** qui compte puis confirme la suppression des établissements sans données ni pondérations.

Le mot de passe DHIS2 est chiffré et stocké sur le serveur, et n'est jamais renvoyé au navigateur.

## Gérer les établissements existants

Une fois importés, les établissements apparaissent sous forme de tableau consultable affichant tous les enregistrements avec leurs rattachements aux zones administratives et leurs attributs. Pour mettre à jour les établissements SNIS - ajouter des établissements, corriger des rattachements ou actualiser des attributs - lancez un nouvel import avec le mode d'intégration approprié.

Pour supprimer tous les établissements d'un registre, ouvrez la ligne de ce registre et cliquez sur **Supprimer les établissements**. Cela supprime uniquement les établissements de ce registre ; les zones administratives encore référencées par l'autre registre sont conservées. Seuls les administrateurs globaux peuvent supprimer des établissements.

![Managing Existing Facilities FR](/images/managing-existing-facilities-fr.png)

## Pondérations d'échantillonnage des établissements HFA

Pour les analyses HFA nécessitant des estimations pondérées, vous pouvez téléverser des pondérations d'échantillonnage par établissement. Accédez à la section **Données** et cliquez sur la ligne **Pondérations d'échantillonnage** pour ouvrir le gestionnaire de pondérations. Seuls les administrateurs globaux peuvent importer ou supprimer des pondérations ; tous les utilisateurs disposant d'un accès aux données peuvent consulter le tableau et télécharger les pondérations actuelles au format CSV.

Préparez un fichier CSV avec une colonne d'identifiant d'établissement, une colonne de pondération et, facultativement, une colonne de strate d'échantillonnage. Chaque importation couvre un point temporel. Importez d'abord les données du point temporel : l'importation des données crée les établissements HFA, et une pondération pour un établissement absent de la liste est ignorée. Une cellule de pondération vide signifie que l'établissement n'est pas dans l'échantillon de ce round et sera ignorée.

Une importation réussie indique combien de pondérations ont été importées, le nombre de strates si une colonne de strate a été associée, combien de pondérations n'avaient pas de strate et les identifiants d'établissements dont les pondérations ont été ignorées.

Le gestionnaire de pondérations affiche un résumé de couverture indiquant, pour chaque point temporel, combien d'établissements disposant de données ont une pondération correspondante. Un avertissement met en évidence les points temporels où certains établissements ont des données mais aucune pondération.

Pour supprimer toutes les pondérations d'échantillonnage, cliquez sur **Supprimer toutes les pondérations**. Cela n'affecte ni les enregistrements d'établissements ni les données HFA.

## GeoJSON pour les cartes
<!-- help#struct-geojson -->

Les visualisations cartographiques nécessitent des données de limites géographiques au format GeoJSON. FASTR maintient des cartes GeoJSON distinctes pour le registre SNIS et le registre Enquêtes FOSA. Chargez un fichier GeoJSON par niveau de zone administrative pour chaque registre — généralement pour la Zone administrative 2 (régions) et la Zone administrative 3 (districts). Ouvrez la ligne **Cartes GeoJSON** du registre concerné depuis la page Données.

Chaque fichier GeoJSON doit contenir des polygones avec une propriété correspondant aux noms des zones administratives de vos données de structure. FASTR tente de faire correspondre les entités aux zones administratives lors du chargement et signale toute incohérence. Les zones non appariées apparaissent vides sur les cartes. Les entités sans géométrie sont automatiquement ignorées lors de l'analyse et du chargement.

Lorsque vous supprimez un niveau GeoJSON, le cache cartographique de ce niveau est automatiquement vidé, de sorte que les données de limites périmées n'apparaissent plus dans les visualisations cartographiques.

![GeoJSON FR](/images/geojson-fr.png)

Si la nomenclature diffère entre votre GeoJSON et vos données de structure, l'éditeur GeoJSON vous permet de modifier les propriétés des entités pour résoudre les problèmes de correspondance. Vous pouvez également désassocier explicitement une entité en définissant son identifiant de zone sur vide — cela retire une entité précédemment associée des visualisations cartographiques sans avoir besoin de recharger le fichier.

Les entités non mappées dans l'assistant de chargement sont conservées dans le fichier et peuvent être mappées ultérieurement à l'aide de l'éditeur GeoJSON.

### Charger une carte GeoJSON depuis DHIS2

Si vos limites géographiques sont stockées dans DHIS2, l'assistant de chargement GeoJSON peut aussi les récupérer directement depuis votre serveur DHIS2. FASTR utilise la connexion DHIS2 enregistrée de l'instance. Après avoir sélectionné le niveau DHIS2 souhaité, FASTR récupère des métadonnées légères d'unités organisationnelles (noms et codes) pour vous permettre de construire la correspondance sans télécharger l'ensemble des polygones. La géométrie complète n'est téléchargée que lorsque vous confirmez et enregistrez, ce qui peut prendre plusieurs minutes pour les pays de grande taille.

Après l'enregistrement, FASTR indique combien de limites ont été stockées, combien ont été associées à une zone administrative et combien sont restées sans correspondance (affichées comme un comptage d'avertissement). Les limites sans correspondance peuvent être mappées ultérieurement via **Modifier les associations**.

Si la propriété de correspondance que vous avez sélectionnée n'est pas présente dans les entités GeoJSON de DHIS2, FASTR rejette l'enregistrement et affiche une erreur plutôt que de stocker une carte vide.
