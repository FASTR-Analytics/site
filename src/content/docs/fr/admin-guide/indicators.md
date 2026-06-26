---
title: Indicateurs
description: Définir et gérer les indicateurs de santé.
sidebar:
  order: 3
---

Les indicateurs sont les mesures de santé que votre instance FASTR suit - par exemple les taux de couverture vaccinale, les taux de complétude des rapports des établissements ou le nombre de consultations externes. Avant de pouvoir analyser des données, vous devez définir quels indicateurs sont pertinents et comment ils correspondent aux données brutes. Cette page traite de la configuration des indicateurs pour les sources de données HMIS et HFA.

## Indicateurs HMIS

Les données HMIS proviennent généralement de DHIS2, où les éléments de données portent des identifiants techniques comme `qHJdhOrhklI` qui ne signifient rien pour les analystes. FASTR utilise un système à deux niveaux : les indicateurs bruts (identifiants DHIS2) et les indicateurs communs (noms lisibles).

### Indicateurs DHIS2 bruts

Les indicateurs bruts sont les identifiants techniques issus de DHIS2. Pour les importer, cliquez sur **Importer un indicateur DHIS2**, saisissez vos identifiants de connexion et sélectionnez les éléments de données à importer. FASTR crée un indicateur brut pour chacun d'eux à partir de l'identifiant DHIS2 et du nom d'affichage.

:::caution[Capture d'écran à ajouter]
Boîte de dialogue d'import des indicateurs DHIS2 montrant les éléments de données disponibles avec des cases de sélection.
:::

### Indicateurs communs
<!-- help#ind-common -->

Les indicateurs communs sont les noms standardisés avec lesquels les analystes travaillent. Un indicateur commun comme « visites de CPN1 » peut correspondre à différents identifiants DHIS2 bruts selon les pays. Cette abstraction permet au code d'analyse et aux visualisations de référencer des noms cohérents, même lorsque les sources de données sous-jacentes changent.

Chaque indicateur commun possède un identifiant (comme `anc1_visits`), un libellé d'affichage et des correspondances vers un ou plusieurs indicateurs bruts. Lorsque plusieurs indicateurs bruts correspondent au même indicateur commun, leurs valeurs sont additionnées.

:::caution[Capture d'écran à ajouter]
Éditeur d'indicateur commun montrant les champs d'identifiant, de libellé et de correspondance avec les indicateurs bruts.
:::

### Indicateurs calculés
<!-- help#ind-calculated -->

Les mesures dérivées qui combinent plusieurs indicateurs - comme les taux de couverture - utilisent des indicateurs calculés. Chacun spécifie un numérateur (quel indicateur commun), un dénominateur (un autre indicateur, une estimation de population, ou rien pour les comptages bruts) et des règles de formatage.

Vous définissez également des seuils pour le codage couleur : le seuil vert pour une bonne performance, le jaune pour une performance acceptable. Par exemple, un indicateur de couverture avec le vert à 80 et le jaune à 70 s'affiche en vert au-dessus de 80 %, en jaune entre 70 et 80 %, et en rouge en dessous de 70 %.

:::caution[Capture d'écran à ajouter]
Éditeur d'indicateur calculé montrant la sélection du numérateur et du dénominateur ainsi que la configuration des seuils.
:::

### Import par lot

Pour les instances comportant de nombreux indicateurs, l'import par lot permet de téléverser un fichier CSV contenant les définitions d'indicateurs. C'est utile lors de la configuration d'une nouvelle instance ou de la migration depuis un autre système.

## Indicateurs HFA

Les données issues de l'évaluation des établissements de santé (Health Facility Assessment) fonctionnent différemment des données HMIS. Les enquêtes HFA ont des structures de questions personnalisées qui varient d'une évaluation à l'autre, c'est pourquoi les indicateurs HFA nécessitent du code R pour extraire les valeurs à partir des données d'enquête brutes.

### Définir les indicateurs HFA

Chaque indicateur HFA possède un nom de variable, une catégorie, une sous-catégorie, des catégories de service, une définition, un type de données (binaire ou numérique) et une méthode d'agrégation (somme ou moyenne). Gardez des noms de variables courts et cohérents, comme `has_essential_medicines` ou `staff_trained_count`.

Le champ **catégories de service** est facultatif et fournit une classification transversale supplémentaire, indépendante de la hiérarchie catégorie/sous-catégorie. Un indicateur peut appartenir à plusieurs catégories de service simultanément. Les catégories de service sont gérées dans leur propre onglet du gestionnaire d'indicateurs HFA et peuvent être attribuées à n'importe quel indicateur, quelle que soit sa catégorie.

:::caution[Capture d'écran à ajouter]
Liste des indicateurs HFA montrant les colonnes catégorie, nom de variable, définition et état de validation.
:::

### Code R pour l'extraction
<!-- help#ind-r-code -->

Chaque indicateur HFA nécessite du code R spécifiant comment extraire sa valeur à partir des données d'enquête brutes. Le code s'exécute pour chaque établissement et doit renvoyer TRUE/FALSE pour les indicateurs binaires, ou un nombre pour les indicateurs numériques.

L'éditeur de code indique quelles variables sont disponibles dans votre jeu de données à chaque point temporel. Si la structure de l'enquête a changé entre les évaluations, vous pouvez écrire un code différent pour différents points temporels. FASTR valide la syntaxe et signale les variables manquantes. Il vérifie également si le type de résultat de votre code correspond au type déclaré de l'indicateur — par exemple, un indicateur binaire dont le code n'effectue aucune comparaison affichera un avertissement de type.

:::caution[Capture d'écran à ajouter]
Éditeur de code d'indicateur HFA montrant le code R, les variables disponibles et les résultats de validation.
:::

### Cohérence du code

Lorsqu'un indicateur s'applique à plusieurs points temporels, FASTR vérifie si le code d'extraction est cohérent. Un code incohérent peut être intentionnel (les questions de l'enquête changent d'un cycle à l'autre), mais il mérite d'être examiné. Utilisez **Tout revalider** après avoir effectué des modifications afin d'actualiser la validation de tous les indicateurs.

### Assistant IA pour les indicateurs

Les administrateurs globaux peuvent ouvrir un panneau d'assistant IA directement dans le gestionnaire d'indicateurs HFA en cliquant sur le bouton **IA** dans la barre supérieure. L'assistant peut améliorer les libellés, organiser les indicateurs en catégories et créer de nouveaux indicateurs à partir du jeu de données d'enquête sous-jacent. Il lit et écrit les indicateurs via un ensemble d'outils dédiés - en chargeant l'état actuel avant de proposer des modifications, en validant le code R par rapport au dictionnaire de données et en affichant une boîte de dialogue de confirmation avec un diff avant d'appliquer toute modification. L'assistant opère sur les indicateurs HFA au niveau de l'instance et est totalement isolé de l'assistant IA des projets.

### Gérer les catégories de service

Les catégories de service sont créées et gérées depuis l'onglet **Catégories de service** du gestionnaire d'indicateurs HFA. Cliquez sur **Ajouter** pour créer une nouvelle catégorie de service - vous fournissez un libellé et FASTR génère automatiquement un identifiant, que vous pouvez modifier. Vous pouvez réorganiser les catégories de service par glisser-déposer, et les modifier ou les supprimer individuellement. La suppression d'une catégorie de service la retire de tous les indicateurs qui lui sont actuellement associés. Les identifiants de catégorie de service ne peuvent pas contenir le caractère pipe (`|`).

### Téléversement de classeur Excel

Les indicateurs HFA prennent en charge la création par lot via un classeur Excel. Téléversez un classeur Excel (.xlsx) comportant trois feuilles :

- **Categories** : id, label
- **Sub-categories** : id, categoryId, label
- **Service categories** : id, label (facultatif)
- **Indicators** : varName, categoryId, subCategoryId, serviceCategoryId (séparés par `|` pour plusieurs), shortLabel, definition, type, aggregation, r_code__&lt;point temporel&gt;, r_filter_code__&lt;point temporel&gt;, …

Si la feuille Service categories est absente, les indicateurs sont importés sans catégorie de service.

Lors de l'importation, choisissez entre les modes **Ajouter aux existants** et **Remplacer tous les existants**. FASTR détecte les colonnes de points temporels intégrées dans le fichier et présente une étape de mappage où vous confirmez à quel point temporel de la plateforme chaque colonne doit être importée. Si les libellés des colonnes correspondent exactement aux points temporels de votre plateforme, le mappage est pré-rempli automatiquement.

## Bonnes pratiques

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux traits de soulignement.

Maintenez à jour les correspondances des indicateurs communs lorsque les configurations DHIS2 changent. Pour les indicateurs calculés, documentez vos choix de seuils - les futurs analystes voudront comprendre le raisonnement derrière les valeurs limites.
