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

Pour définir l'ordre de la liste utilisé par chaque axe d'indicateurs dans chaque figure, cliquez sur **Trier**.

Pour télécharger le dictionnaire au format CSV, cliquez sur **Télécharger**. Le fichier contient des colonnes pour l'identifiant, le libellé, le type, l'identifiant DHIS2, les membres, la formule, l'indicateur d'inclusion dans l'analyse, le format, les seuils, la direction, la cible et l'indicateur de faibles dénombrements attendus.

Pour voir ce qu'implique chaque type, cliquez sur **Types d'indicateurs** dans la barre d'en-tête. Pour voir les identifiants d'indicateurs spéciaux, les termes de population et les mots réservés, cliquez sur **Indicateurs spéciaux et mots réservés**.

Les administrateurs globaux peuvent sélectionner des lignes dans la liste et utiliser l'action groupée **Supprimer** pour retirer les indicateurs sélectionnés, sous réserve des vérifications de dépendances habituelles. Les actions groupées **Inclure dans l'analyse** et **Exclure de l'analyse** basculent l'indicateur sur les lignes sélectionnées. L'action groupée **Importation de données DHIS2** ouvre l'assistant d'importation DHIS2 présélectionné avec les indicateurs choisis.

#### Types d'indicateurs

- **Élément DHIS2** — un dénombrement mensuel récupéré de DHIS2 par un UID d'élément de données ou un opérande UID.COC. Ses lignes sont stockées sous cet identifiant DHIS2.
- **Téléversé** — un dénombrement mensuel rempli par importation CSV. FASTR lui attribue un identifiant interne ; l'étape Correspondance de chaque importation CSV pointe les valeurs du fichier vers lui. Les indicateurs de type Téléversé ne sont pas récupérés par les importations DHIS2.
- **Somme** — le total de ses indicateurs membres (Éléments DHIS2 ou Téléversés), additionnés par établissement et par mois. Une somme ne peut pas contenir une autre somme.
- **Calculé** — une formule portant sur d'autres indicateurs et des termes de population, calculée après l'ajustement et l'agrégation des données. Il n'a pas de lignes propres.

Les trois types de dénombrement sont ajustés par les modules de qualité des données. Un indicateur calculé ne l'est pas.

#### Indicateurs calculés
<!-- help#ind-calculated -->

Un indicateur calculé est défini par une formule portant sur d'autres indicateurs, par exemple `anc4 / anc1` pour un taux de couverture. Il est calculé après l'agrégation des données : un chiffre régional ou annuel est donc la formule appliquée aux valeurs additionnées, et non une moyenne de ratios.

Une formule peut utiliser `+`, `-`, `*`, `/`, des parenthèses et des nombres, ainsi que les fonctions `abs()` (valeur absolue), `coalesce()` (la première valeur non vide) et `nullif()` (vide lorsque les deux valeurs sont égales). Une formule peut faire référence à un autre indicateur calculé, dont la définition est insérée à la place de son identifiant.

Une formule peut aussi utiliser un terme de population, par exemple `population_pregnancies`. Les populations proviennent de la page Population de l'instance (Données → Population) : des effectifs annuels de population par unité administrative et par type de population, téléversés sous forme de CSV.

Pour un indicateur calculé, vous définissez également le format d'affichage (nombre, pourcentage ou taux pour 10 000), une valeur cible facultative, et si vous le souhaitez une règle de mise en forme conditionnelle pour le codage couleur. Le champ **direction** (plus élevé = meilleur ou plus bas = meilleur) s'applique à chaque type d'indicateur et est utilisé par la règle de mise en forme conditionnelle.

La colonne **Statut** de la liste indique si chaque indicateur calculé peut être évalué. Un indicateur calculé ne peut pas être évalué si les indicateurs qu'il utilise n'ont pas de données. Un avertissement au-dessus de la liste le signale dès que l'un d'eux ne peut pas être évalué.

#### Inclure dans l'analyse
<!-- help#ind-include -->

Chaque indicateur possède une case à cocher **Inclure dans l'analyse**. Lorsqu'elle est cochée, chaque paquet de résultats analyse l'indicateur : les modules de qualité des données l'ajustent et il est disponible dans les visualisations. Lorsqu'elle est décochée, l'indicateur est uniquement dans le dictionnaire — ses données sont toujours importées et stockées, et il peut toujours être utilisé comme membre ou dans une expression, mais il n'est ni ajusté ni inclus dans l'ensemble analysé. Activez ou désactivez cette option dans l'éditeur d'indicateurs ou via les actions groupées. Les indicateurs spéciaux sont toujours analysés, quelle que soit cette option. Un indicateur calculé qui ne peut pas être évalué est signalé dans la colonne **Statut**.

### Ajouter des indicateurs depuis DHIS2
<!-- help#ind-dhis2-import -->

Cliquez sur **Ajouter depuis DHIS2** pour ajouter des éléments de données ou des indicateurs DHIS2 depuis votre serveur. FASTR utilise la connexion DHIS2 enregistrée de l'instance, définie dans la carte de connexion DHIS2 de la page Données ; si aucune n'est enregistrée, une alerte explique comment en définir une.

Le formulaire comporte deux phases. Dans la phase **Sélectionner**, recherchez par nom, code ou identifiant. Les résultats affichent à la fois les éléments de données et les indicateurs DHIS2. Un élément de données peut être ajouté tel quel ou développé pour sélectionner des combinaisons d'options de catégorie individuelles (opérandes). Un indicateur DHIS2 est décomposé en ses opérandes et un indicateur calculé dont la formule porte sur les indicateurs que ces opérandes deviennent ; le formulaire affiche la formule et signale tout opérande qui ne peut pas être ajouté. Sélectionnez les éléments souhaités et cliquez sur **Suivant : nommer les indicateurs**.

Dans la phase **Nommer**, chaque élément de données ou opérande devient un nouvel indicateur élément DHIS2. Le formulaire propose un identifiant généré à partir du nom de l'élément ; modifiez-le en ligne. Chaque indicateur DHIS2 devient un indicateur calculé dont vous définissez également l'identifiant ici. Un élément dont l'identifiant DHIS2 est déjà porté par un indicateur existant apparaît comme déjà ajouté et ne crée rien de nouveau. Cliquez sur **Enregistrer** pour créer les indicateurs en une seule transaction.

Ajouter des indicateurs depuis DHIS2 ne fait que les enregistrer dans le dictionnaire. Pour récupérer leurs données, lancez une importation DHIS2 depuis la vue Importations (voir Données : HMIS).

## Indicateurs HFA

Les données issues de l'évaluation des établissements de santé fonctionnent différemment des données HMIS. Les enquêtes HFA ont des structures de questions personnalisées qui varient d'une évaluation à l'autre, c'est pourquoi les indicateurs HFA nécessitent du code R pour extraire les valeurs à partir des données d'enquête brutes.

### Définir les indicateurs HFA

Chaque indicateur HFA possède un nom de variable, une catégorie, une sous-catégorie, des catégories de service, un libellé court, une définition, un type de données (binaire ou numérique) et une méthode d'agrégation (somme ou moyenne). Le nom de variable est défini lors de la création de l'indicateur et sert d'identifiant technique dans toute la plateforme — dans le code R, dans le dictionnaire de données et lorsque d'autres indicateurs y font référence.

Les noms de variables doivent commencer par une lettre et ne contenir que des lettres, des chiffres et des tirets bas, avec un maximum de 64 caractères. Contrairement à l'ancien système d'identifiants, les noms de variables sont définis par vous lors de la création et ne peuvent pas être modifiés après création — d'autres indicateurs peuvent y faire référence dans leur code R, et les renommer briserait ces références.

Les noms de variables ne doivent pas non plus être des mots réservés. Les noms réservés comprennent les fonctions et opérateurs R utilisés dans le code des indicateurs, ainsi que les colonnes générées par le script d'analyse (comme `weight`, `time_point` et les colonnes relatives aux établissements). Un nom de variable qui correspond à un nom de variable d'enquête est également refusé, car l'utiliser occulterait la colonne du jeu de données dans le code des autres indicateurs.

Le champ **catégories de service** est facultatif et fournit une classification transversale supplémentaire, indépendante de la hiérarchie catégorie/sous-catégorie. Un indicateur peut appartenir à plusieurs catégories de service simultanément. Les catégories de service sont gérées dans leur propre onglet du gestionnaire d'indicateurs HFA et peuvent être attribuées à n'importe quel indicateur, quelle que soit sa catégorie. Lors du filtrage des visualisations ou des données du projet par catégorie de service, une correspondance est établie si l'indicateur appartient à au moins l'une des catégories sélectionnées - il n'est pas nécessaire qu'il appartienne à toutes.

![HFA Indicators](/images/hfa-indicators-en.png)

### Rechercher des indicateurs

Le gestionnaire d'indicateurs HFA comporte un champ de recherche dans l'en-tête du panneau des indicateurs. Saisissez du texte pour filtrer la liste des indicateurs par nom de variable, libellé, définition, catégorie, sous-catégorie ou catégorie de service. Le compteur dans l'en-tête du panneau se met à jour pour indiquer combien d'indicateurs correspondent à votre recherche sur le total. Lorsqu'aucun indicateur ne correspond, le tableau affiche « Aucun indicateur ne correspond à votre recherche ».

### Code R pour l'extraction
<!-- help#ind-r-code -->

Chaque indicateur HFA nécessite du code R spécifiant comment extraire sa valeur à partir des données d'enquête brutes. Le code s'exécute pour chaque établissement et doit renvoyer TRUE/FALSE pour les indicateurs binaires, ou un nombre pour les indicateurs numériques.

L'éditeur de code indique quelles variables d'enquête sont disponibles dans votre jeu de données à chaque point temporel, identifiées par leur nom de variable. Si la structure de l'enquête a changé entre les évaluations, vous pouvez écrire un code différent pour différents points temporels. FASTR valide la syntaxe et signale les variables inconnues comme des erreurs, et avertit des problèmes potentiels comme les opérateurs `=` isolés qui pourraient être des comparaisons non intentionnelles, ou l'utilisation des opérateurs `&&` et `||` qui échouent lorsque le code s'exécute sur l'ensemble des établissements à la fois (utilisez `&` et `|` à la place). Il vérifie également si le type de résultat de votre code correspond au type déclaré de l'indicateur — par exemple, un indicateur binaire dont le code n'effectue aucune comparaison affichera un avertissement de type.

Les avertissements (affichés en orange) sont consultatifs et ne bloquent pas l'enregistrement. Les erreurs (affichées en rouge) — notamment les erreurs de syntaxe et les références à des variables absentes du jeu de données — empêchent l'indicateur d'être marqué comme prêt.

Le panneau droit de l'éditeur de code liste les variables d'enquête ; cliquez sur n'importe quelle entrée pour insérer son nom dans le code à la position du curseur. Utilisez la zone de recherche pour filtrer la liste.

![Code R d'un indicateur HFA](/images/hfa-code-en.png)

### Code filtre

Chaque entrée de code par point temporel prend également en charge un champ de code filtre facultatif. Le code filtre restreint les établissements qui contribuent à la valeur de l'indicateur — seuls les établissements pour lesquels l'expression de filtre s'évalue à TRUE sont inclus. Si vous saisissez un code filtre pour un point temporel, vous devez également fournir un code R pour ce même point temporel ; un filtre sans code R n'est pas valide et bloque l'enregistrement.

### Groupes de variantes et code par élément

Un indicateur peut être associé à un **groupe de variantes**, qui définit un ensemble d'options de réponse (éléments) selon lesquelles l'indicateur peut être désagrégé. Lorsqu'un groupe de variantes est assigné, l'éditeur de code affiche une section de numérateur par élément sous le code principal pour chaque point temporel. Chaque élément possède son propre extrait de code R qui partage le code filtre du point temporel. Utilisez cette fonctionnalité lorsque le même indicateur nécessite une logique de numérateur distincte pour chaque option de réponse — par exemple, des calculs séparés pour chaque catégorie de propriété.

Les groupes de variantes et leurs éléments sont gérés depuis l'onglet **Groupes de variantes** du gestionnaire d'indicateurs HFA. Chaque élément possède un identifiant court (lettres minuscules, chiffres et tirets bas, commençant par une lettre, maximum 64 caractères) et un libellé d'affichage. Les éléments sont ordonnés au sein de leur groupe et peuvent être réorganisés par glisser-déposer.

Pour assigner un groupe de variantes à un indicateur, ouvrez l'éditeur de code de l'indicateur et sélectionnez le groupe dans le menu déroulant **Groupe de variantes**. Si l'indicateur possède déjà un code par élément pour un groupe différent et que vous changez de groupe, FASTR demande une confirmation avant d'effacer le code de l'ancien groupe.

### Cohérence du code

Lorsqu'un indicateur s'applique à plusieurs points temporels, FASTR vérifie si le code d'extraction est cohérent. Un code incohérent peut être intentionnel (les questions de l'enquête changent d'un cycle à l'autre), mais il mérite d'être examiné. Utilisez **Tout revalider** après avoir effectué des modifications afin d'actualiser la validation de tous les indicateurs.

La liste des indicateurs affiche un résumé de l'état du code : **prêt** (aucune erreur ni avertissement), **avertissement** (problèmes consultatifs uniquement) et **erreur** (erreurs de syntaxe ou de variables inconnues). Les boutons **Tout revalider**, **Vérifier les variables inutilisées**, **Télécharger Excel** et **Importer Excel** sont désactivés lorsqu'aucun point temporel HFA n'a encore été défini, car ces actions dépendent du dictionnaire de données de l'enquête. Ajoutez un point temporel depuis **Enquêtes FOSA → Points temporels** pour les activer.

### Importer les indicateurs par défaut

Le gestionnaire d'indicateurs HFA comprend un bouton **Importer les indicateurs par défaut** à côté du bouton **Importer Excel**. En cliquant dessus, l'ensemble d'indicateurs HFA FASTR standard est récupéré directement depuis le hub de ressources FASTR sur GitHub — aucune sélection de fichier n'est nécessaire. Le formulaire indique combien d'indicateurs et de catégories ont été récupérés avant que vous confirmiez l'importation. Vous choisissez les mêmes modes d'importation qu'avec un téléversement de fichier : **Ajouter aux existants** ajoute uniquement les nouveaux noms de variables, tandis que **Remplacer tous les existants** supprime tous les indicateurs actuels avant l'importation.

### Supprimer des indicateurs

Avant de supprimer un indicateur ou un ensemble d'indicateurs, FASTR vérifie si d'autres indicateurs font référence aux noms de variables supprimés dans leur code R ou leur code de variante. Si des références sont trouvées, la boîte de dialogue de confirmation liste les indicateurs concernés et avertit que leur code échouera à la validation après la suppression.

### Assistant IA pour les indicateurs

Les administrateurs globaux peuvent ouvrir un panneau d'assistant IA directement dans le gestionnaire d'indicateurs HFA en cliquant sur le bouton **IA**. Ce bouton apparaît dans la barre supérieure du gestionnaire, ainsi que dans l'en-tête de l'éditeur de code et du formulaire de téléversement du classeur Excel lorsque le panneau n'est pas encore ouvert. L'assistant peut améliorer les libellés, organiser les indicateurs en catégories et créer de nouveaux indicateurs à partir du jeu de données d'enquête sous-jacent. Il lit et écrit les indicateurs via un ensemble d'outils dédiés - en chargeant l'état actuel avant de proposer des modifications, en validant le code R par rapport au dictionnaire de données et en affichant une boîte de dialogue de confirmation avec un diff avant d'appliquer toute modification. Lorsque l'assistant crée de nouveaux indicateurs, vous fournissez le nom de variable de chaque indicateur ; l'application vérifie qu'il n'existe pas déjà et qu'il respecte les règles de nommage. Lors de l'application de mises à jour groupées, toutes les modifications sont envoyées au serveur en une seule opération transactionnelle : soit tous les indicateurs sont mis à jour, soit aucun ne l'est, ce qui évite qu'un échec partiel ne laisse le jeu de données dans un état incohérent. L'assistant opère sur les indicateurs HFA au niveau de l'instance et est totalement isolé de l'assistant IA des produits.

### Gérer les catégories de service

Les catégories de service sont créées et gérées depuis l'onglet **Catégories de service** du gestionnaire d'indicateurs HFA. Cliquez sur **Ajouter** pour créer une nouvelle catégorie de service - vous fournissez un libellé et FASTR génère automatiquement un identifiant, que vous pouvez modifier. Vous pouvez réorganiser les catégories de service par glisser-déposer, et les modifier ou les supprimer individuellement. La suppression d'une catégorie de service la retire de tous les indicateurs qui lui sont actuellement associés. Les identifiants de catégorie de service ne peuvent pas contenir le caractère pipe (`|`).

### Gérer les groupes de variantes

Les groupes de variantes sont créés et gérés depuis l'onglet **Groupes de variantes** du gestionnaire d'indicateurs HFA. L'onglet affiche une disposition en deux panneaux : les groupes à gauche et les éléments du groupe sélectionné à droite.

Cliquez sur **Ajouter** dans le panneau des groupes pour créer un nouveau groupe — fournissez un libellé et FASTR en dérive automatiquement un identifiant. Vous pouvez réorganiser les groupes par glisser-déposer. Cliquez sur l'icône crayon pour modifier le libellé d'un groupe, ou sur l'icône poubelle pour le supprimer. La suppression est refusée tant qu'un indicateur est encore assigné au groupe.

Sélectionnez un groupe pour gérer ses éléments dans le panneau de droite. Cliquez sur **Ajouter** pour créer un nouvel élément — fournissez un libellé et FASTR en dérive un identifiant, que vous pouvez modifier avant d'enregistrer. Les identifiants d'éléments doivent commencer par une lettre minuscule et ne contenir que des lettres minuscules, des chiffres et des tirets bas (maximum 64 caractères). Vous pouvez réorganiser les éléments au sein d'un groupe par glisser-déposer. Modifiez ou supprimez les éléments individuels à l'aide des icônes sur chaque ligne ; la suppression d'un élément retire tout code par élément qui lui est associé.

### Téléversement de classeur Excel

Les indicateurs HFA prennent en charge la création par lot via un classeur Excel. Téléversez un classeur Excel (.xlsx) comportant ces feuilles :

- **Categories** : id, label
- **Sub-categories** : id, categoryId, label
- **Service categories** : id, label (facultatif)
- **Variant groups** : id, label (facultatif)
- **Variant items** : id, groupId, label (facultatif)
- **Indicators** : varName, categoryId, subCategoryId, serviceCategoryId (séparés par `|` pour plusieurs), shortLabel, definition, type, aggregation, variantGroupId (facultatif), r_code__&lt;point temporel&gt;, r_filter_code__&lt;point temporel&gt;, r_variant_code__&lt;itemId&gt;__&lt;point temporel&gt;, …

Si les feuilles Service categories, Variant groups ou Variant items sont absentes, les indicateurs sont importés sans catégories de service ni assignation de variantes.

Les colonnes de code de variante utilisent le format `r_variant_code__<itemId>__<libellé du point temporel>`. Chaque colonne de code de variante doit référencer un identifiant d'élément de la feuille Variant items, et le libellé du point temporel doit correspondre à une colonne `r_code__` étiquetée dans le même fichier. Un indicateur avec du code de variante doit également avoir un `variantGroupId` qui correspond au groupe de l'élément.

Lors de l'importation, choisissez entre les modes **Ajouter aux existants** et **Remplacer tous les existants**. En mode **Ajouter aux existants**, les indicateurs dont les noms de variables existent déjà sur la plateforme sont ignorés — seuls les nouveaux noms sont créés. Après l'importation, un résumé liste les indicateurs ignorés. En mode **Remplacer tous les existants**, tous les indicateurs, catégories, sous-catégories et catégories de service existants sont définitivement supprimés avant l'importation. Pour confirmer une importation en mode remplacement, vous devez saisir `yes please delete` dans le champ de confirmation avant que le bouton **Importer** devienne actif.

FASTR détecte les colonnes de points temporels intégrées dans le fichier et présente une étape de mappage où vous confirmez à quel point temporel de la plateforme chaque colonne doit être importée. Si les libellés des colonnes correspondent exactement aux points temporels de votre plateforme, le mappage est pré-rempli automatiquement. Chaque point temporel de la plateforme ne peut recevoir qu'une seule colonne du classeur — mapper deux colonnes vers le même point temporel est refusé.

## Libellés des variables XLSForm

Lorsque FASTR lit votre questionnaire XLSForm lors d'une importation HFA, il construit les libellés des variables à partir de la structure de l'enquête. Pour la plupart des variables, le libellé est simplement le texte de la question. Pour les variables contenues dans des groupes de questions matricielles (blocs ODK `begin_group` ou `begin_repeat`), FASTR qualifie le libellé avec celui du groupe immédiatement englobant, séparé par « — ». Par exemple, une question enfant libellée « Infrastructure » à l'intérieur d'un groupe libellé « Bloc B : Défis » devient « Bloc B : Défis — Infrastructure ». Cela garantit que les enfants de matrices, qui partagent souvent un texte de question identique entre plusieurs groupes, sont identifiables dans le dictionnaire de données et dans les visualisations.

Pour les questions « select_multiple », les variables binaires développées suivent le même schéma : le libellé de variable composé est joint au libellé de choix avec le même séparateur « — ».

FASTR supprime également les balises HTML et normalise les espaces dans les libellés XLSForm avant de les stocker, afin que les libellés créés avec une mise en forme à l'écran apparaissent proprement dans le dictionnaire.

## Bonnes pratiques

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux tirets bas. Un identifiant peut être renommé plus tard ; le renommage réécrit chaque formule et importation planifiée qui y fait référence, tandis que les données restent en place.

Pour les indicateurs HFA, choisissez soigneusement les noms de variables avant de les créer, car ils ne peuvent pas être modifiés après création. Des noms courts et descriptifs comme `has_essential_medicines` ou `staff_trained_count` fonctionnent bien.

Vérifiez les identifiants DHIS2 dans la liste lorsque des éléments de données sont modifiés ou remplacés sur le serveur DHIS2. Un élément de données remplacé a un nouvel UID DHIS2 : créez un nouvel indicateur élément DHIS2 pour lui. Pour les indicateurs calculés, documentez vos choix de seuils - les futurs analystes voudront comprendre le raisonnement derrière les valeurs limites.
