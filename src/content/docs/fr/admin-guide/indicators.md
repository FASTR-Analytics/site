---
title: Indicateurs
description: Définir et gérer les indicateurs de santé.
sidebar:
  order: 3
---

Les indicateurs sont les mesures de santé que votre instance FASTR suit - par exemple les taux de couverture vaccinale, les taux de complétude des rapports des établissements ou le nombre de consultations externes. Avant de pouvoir analyser des données, vous devez définir quels indicateurs sont pertinents et d'où proviennent leurs données. Cette page traite de la configuration des indicateurs pour les données HMIS et HFA.

## Indicateurs HMIS

Les indicateurs HMIS forment un dictionnaire unique. Chaque indicateur possède un type qui indique ce qui l'alimente : un **élément DHIS2** est un dénombrement mensuel que l'importation DHIS2 récupère par son identifiant DHIS2, un indicateur **Téléversé** est un dénombrement mensuel rempli par importation CSV, une **Somme** est le total des indicateurs de type Élément DHIS2 ou Téléversé, additionnés par établissement et par mois, et un indicateur **Calculé** est une formule portant sur d'autres indicateurs et des termes de population. Les trois types de dénombrement sont ajustés par les modules de qualité des données ; un indicateur calculé est calculé à partir de la formule après l'ajustement et l'agrégation des données.

La liste des indicateurs affiche chaque indicateur avec son identifiant, son libellé, son type et ce qui le définit. Un badge **Spécial** marque les indicateurs que les modules d'analyse lisent par leur nom comme des dénombrements - ceux-ci sont toujours analysés et ne peuvent être qu'un Élément DHIS2, Téléversé ou une Somme.

### Gérer les indicateurs
<!-- help#ind-list -->

Pour créer un indicateur, cliquez sur **Créer**. Donnez-lui un identifiant et un libellé, puis choisissez son type. Le type détermine les champs de définition qui s'affichent.

Pour définir l'ordre de la liste utilisé par chaque axe d'indicateurs dans chaque visualisation, cliquez sur **Trier**.

Pour voir ce qu'implique chaque type, cliquez sur **Types d'indicateurs** dans la barre d'en-tête. Pour voir les identifiants d'indicateurs spéciaux, les termes de population et les mots réservés, cliquez sur **Indicateurs spéciaux et mots réservés**.

Les administrateurs globaux peuvent sélectionner des lignes dans la liste et utiliser l'action groupée **Supprimer** pour retirer les indicateurs sélectionnés, sous réserve des vérifications de dépendances habituelles. Les indicateurs individuels peuvent également être supprimés depuis l'éditeur d'indicateurs à l'aide du bouton **Supprimer** dans le pied de page. Les actions groupées **Inclure dans l'analyse** et **Exclure de l'analyse** basculent l'indicateur sur les lignes sélectionnées. L'action groupée **Importation de données DHIS2** ouvre l'assistant d'importation DHIS2 présélectionné avec les indicateurs choisis.

Depuis le menu de débordement de la barre d'outils, les administrateurs globaux ont également accès à deux actions de maintenance occasionnelles : **Télécharger** exporte le dictionnaire d'indicateurs au format CSV et **Actualiser les noms DHIS2** lit le nom actuel de chaque indicateur élément DHIS2 depuis DHIS2 et le stocke avec l'indicateur. Après l'actualisation, le résultat indique combien de noms ont été actualisés, combien étaient déjà à jour, quels indicateurs pointent vers des formules DHIS2 plutôt que vers des éléments de données, et quels identifiants n'ont pas été trouvés dans DHIS2. Si des indicateurs pointent vers des formules DHIS2 ou des identifiants introuvables, contactez l'équipe FASTR pour exécuter la réparation des identifiants DHIS2, qui corrige les identifiants tout en conservant les données déjà importées.

#### Types d'indicateurs

- **Élément DHIS2** — un dénombrement mensuel récupéré de DHIS2 par un UID d'élément de données ou un opérande UID.COC. Lors de l'ajout d'un indicateur élément DHIS2, FASTR lit et stocke le nom actuel de l'élément depuis DHIS2 comme **nom DHIS2**. Le nom DHIS2 n'est pas le libellé de l'indicateur et n'est pas utilisé dans l'analyse.
- **Téléversé** — un dénombrement mensuel rempli par importation CSV. FASTR lui attribue un identifiant interne. Les indicateurs de type Téléversé ne sont pas récupérés par les importations DHIS2.
- **Somme** — le total de ses indicateurs membres, additionnés par établissement et par mois. Une somme ne peut pas contenir une autre somme.
- **Calculé** — une formule portant sur d'autres indicateurs et des termes de population, calculée après l'ajustement et l'agrégation des données. Il n'a pas de lignes propres.

Les trois types de dénombrement sont ajustés par les modules de qualité des données. Un indicateur calculé ne l'est pas.

#### Indicateurs calculés
<!-- help#ind-calculated -->

Un indicateur calculé est défini par une formule portant sur d'autres indicateurs, par exemple `anc4 / anc1` pour un taux de couverture. Il est calculé après l'agrégation des données : un chiffre régional ou annuel est donc la formule appliquée aux valeurs additionnées, et non une moyenne de ratios.

Une formule peut utiliser `+`, `-`, `*`, `/`, des parenthèses et des nombres, ainsi que les fonctions `abs()` (valeur absolue), `coalesce()` (la première valeur non vide) et `nullif()` (vide lorsque les deux valeurs sont égales). Une formule peut faire référence à un autre indicateur calculé, dont la définition est insérée à la place de son identifiant.

Une formule peut aussi utiliser un terme de population, par exemple `population_pregnancies`. Les populations proviennent de la page Population de l'instance.

Pour un indicateur calculé, vous définissez également le format d'affichage (nombre, pourcentage ou taux pour 10 000), une valeur cible facultative, et si vous le souhaitez une règle de mise en forme conditionnelle. Le champ **direction** s'applique à chaque type d'indicateur.

La colonne **Statut** de la liste indique si chaque indicateur calculé peut être évalué.

#### Inclure dans l'analyse
<!-- help#ind-include -->

Chaque indicateur possède une case à cocher **Inclure dans l'analyse**. Lorsqu'elle est cochée, chaque paquet de résultats analyse l'indicateur. Lorsqu'elle est décochée, l'indicateur est uniquement dans le dictionnaire. Les indicateurs spéciaux sont toujours analysés, quelle que soit cette option.

### Ajouter des indicateurs depuis DHIS2
<!-- help#ind-dhis2-import -->

Cliquez sur **Ajouter depuis DHIS2** pour ajouter des éléments de données ou des indicateurs DHIS2 depuis votre serveur. FASTR utilise la connexion DHIS2 enregistrée de l'instance ; si aucune n'est enregistrée, une alerte explique comment en définir une.

Le formulaire comporte deux phases. Dans la phase **Sélectionner**, recherchez par nom, code ou identifiant. Dans la phase **Nommer**, chaque élément de données ou opérande devient un nouvel indicateur élément DHIS2. Cliquez sur **Enregistrer** pour créer les indicateurs en une seule transaction.

Ajouter des indicateurs depuis DHIS2 ne fait que les enregistrer dans le dictionnaire. Pour récupérer leurs données, lancez une importation DHIS2 depuis la vue Importations.

## Indicateurs HFA

Les données issues de l'évaluation des établissements de santé fonctionnent différemment des données HMIS. Les enquêtes HFA ont des structures de questions personnalisées qui varient d'une évaluation à l'autre, c'est pourquoi les indicateurs HFA nécessitent du code R pour extraire les valeurs à partir des données d'enquête brutes.

### Définir les indicateurs HFA

Chaque indicateur HFA possède un identifiant d'indicateur attribué par la plateforme, une catégorie, une sous-catégorie, des catégories de service, un libellé court, une définition, un type de données (binaire ou numérique) et une méthode d'agrégation (somme ou moyenne).

Le champ **catégories de service** est facultatif et fournit une classification transversale supplémentaire, indépendante de la hiérarchie catégorie/sous-catégorie. Un indicateur peut appartenir à plusieurs catégories de service simultanément.

![HFA Indicators](/images/hfa-indicators-en.png)

### Rechercher des indicateurs

Le gestionnaire d'indicateurs HFA comporte une zone de recherche dans la barre d'outils. Saisissez du texte pour filtrer la liste par libellé, définition, catégorie, sous-catégorie ou catégorie de service. Le tableau prend également en charge des filtres de colonnes.

### Code R pour l'extraction
<!-- help#ind-r-code -->

Chaque indicateur HFA nécessite du code R spécifiant comment extraire sa valeur à partir des données d'enquête brutes. Le code s'exécute pour chaque établissement et doit renvoyer TRUE/FALSE pour les indicateurs binaires, ou un nombre pour les indicateurs numériques.

L'éditeur de code indique quelles variables d'enquête sont disponibles dans votre jeu de données à chaque point temporel. FASTR valide la syntaxe et signale les variables inconnues comme des erreurs, et avertit des problèmes potentiels. Il vérifie également si le type de résultat de votre code correspond au type déclaré de l'indicateur.

Les avertissements (affichés en orange) sont consultatifs et ne bloquent pas l'enregistrement. Les erreurs (affichées en rouge) bloquent l'indicateur.

Le panneau droit de l'éditeur de code liste les variables d'enquête et les autres indicateurs ; cliquez sur n'importe quelle entrée pour insérer son identifiant dans le code à la position du curseur.

![Code R d'un indicateur HFA](/images/hfa-code-en.png)

### Code filtre

Chaque entrée de code par point temporel prend également en charge un champ de code filtre facultatif. Le code filtre restreint les établissements qui contribuent à la valeur de l'indicateur. Si vous saisissez un code filtre pour un point temporel, vous devez également fournir un code R pour ce même point temporel.

### Groupes de variantes et code par élément

Un indicateur peut être associé à un **groupe de variantes**, qui définit un ensemble d'options de réponse selon lesquelles l'indicateur peut être désagrégé. Les groupes de variantes et leurs éléments sont gérés depuis l'onglet **Groupes de variantes** du gestionnaire d'indicateurs HFA.

### Cohérence du code

Lorsqu'un indicateur s'applique à plusieurs points temporels, FASTR vérifie si le code d'extraction est cohérent. Utilisez **Tout revalider** après avoir effectué des modifications.

### Importer les indicateurs par défaut

Le gestionnaire d'indicateurs HFA comprend un bouton **Importer les indicateurs par défaut** qui récupère l'ensemble d'indicateurs HFA FASTR standard directement depuis GitHub. Vous choisissez entre **Ajouter aux existants** et **Remplacer tous les existants**.

### Supprimer des indicateurs

Avant de supprimer un indicateur ou un ensemble d'indicateurs, FASTR vérifie si d'autres indicateurs font référence aux identifiants supprimés dans leur code R ou leur code de variante. Si des références sont trouvées, la boîte de dialogue de confirmation liste les indicateurs concernés et avertit que leur code échouera à la validation après la suppression. Vous pouvez supprimer un indicateur individuel depuis son éditeur de code à l'aide du bouton **Supprimer** dans l'en-tête, ou depuis la boîte de dialogue de modification via le bouton **Supprimer** dans le pied de page. Plusieurs indicateurs peuvent être supprimés simultanément à l'aide de l'action groupée dans la liste des indicateurs.

### Assistant IA pour les indicateurs

L'assistant IA dans le gestionnaire d'indicateurs HFA peut améliorer les libellés, organiser les indicateurs en catégories et créer de nouveaux indicateurs à partir du jeu de données d'enquête. Il lit et écrit les indicateurs via un ensemble d'outils dédiés, en affichant une boîte de dialogue de confirmation avant d'appliquer toute modification. Lors de l'application de mises à jour groupées, toutes les modifications sont envoyées au serveur en une seule opération transactionnelle.

L'éditeur de code possède également ses propres outils IA. Lorsque vous ouvrez l'éditeur de code d'un indicateur, l'assistant peut lire le brouillon actuel de l'éditeur et y appliquer des modifications — libellés, type et agrégation, assignations de catégories, et modifications de code par round — comme si vous les aviez effectuées vous-même. Les modifications s'appliquent dans le brouillon de l'éditeur sans être enregistrées : vous les conservez avec **Enregistrer** ou les annulez avec **Annuler**.

### Variables inutilisées

Cliquez sur **Vérifier les variables inutilisées** depuis le menu de débordement pour ouvrir une fenêtre listant les variables d'enquête qu'aucun indicateur ne référence actuellement, regroupées par point temporel.

### Gérer les catégories de service

Les catégories de service sont créées et gérées depuis l'onglet **Catégories de service** du gestionnaire d'indicateurs HFA. Les identifiants de catégorie de service ne peuvent pas contenir le caractère pipe (`|`).

### Gérer les groupes de variantes

Les groupes de variantes sont créés et gérés depuis l'onglet **Groupes de variantes** du gestionnaire d'indicateurs HFA. L'onglet affiche une disposition en deux panneaux : les groupes à gauche et les éléments du groupe sélectionné à droite.

### Téléversement de classeur Excel

Les indicateurs HFA prennent en charge la création par lot via un classeur Excel. Téléversez un classeur Excel (.xlsx) avec les feuilles requises : **Categories**, **Sub-categories**, **Service categories** (facultatif), **Variant groups** (facultatif), **Variant items** (facultatif) et **Indicators**.

Lors de l'importation, choisissez entre les modes **Ajouter aux existants** et **Remplacer tous les existants**.

## Libellés des variables XLSForm

Lorsque FASTR lit votre questionnaire XLSForm lors d'une importation HFA, il construit les libellés des variables à partir de la structure de l'enquête. Pour les variables contenues dans des groupes de questions matricielles, FASTR qualifie le libellé avec celui du groupe immédiatement englobant, séparé par « — ».

FASTR supprime également les balises HTML et normalise les espaces dans les libellés XLSForm avant de les stocker.

## Bonnes pratiques

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux tirets bas.

Vérifiez les identifiants DHIS2 dans la liste lorsque des éléments de données sont modifiés ou remplacés sur le serveur DHIS2. Utilisez **Actualiser les noms DHIS2** régulièrement pour maintenir les noms DHIS2 stockés à jour. Si l'actualisation révèle des indicateurs pointant vers des formules DHIS2 ou des identifiants introuvables, contactez l'équipe FASTR pour exécuter la réparation des identifiants DHIS2. La réparation corrige les identifiants DHIS2 sous-jacents — y compris les identifiants pointant vers des formules DHIS2 plutôt que vers des éléments de données, les identifiants ne correspondant à rien dans DHIS2, et les cas où un opérande UID.COC avec une combo de catégorie par défaut duplique l'élément nu — tout en conservant les données déjà importées. Après la réparation, une importation DHIS2 de suivi récupère à nouveau les données pour les indicateurs concernés.
