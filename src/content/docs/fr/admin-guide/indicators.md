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

Les indicateurs bruts sont les identifiants techniques issus de DHIS2. Pour les importer, cliquez sur **Importer un indicateur DHIS2**. FASTR utilise la connexion DHIS2 enregistrée de l'instance pour rechercher les éléments de données — si une connexion enregistrée existe, la recherche s'ouvre immédiatement. Sinon, vous pouvez saisir des identifiants de connexion pour cette session uniquement. Sélectionnez les éléments de données à importer et FASTR crée un indicateur brut pour chacun à partir de l'identifiant DHIS2 et du nom d'affichage. Vous pouvez également changer de connexion en cours de session à l'aide du bouton **Modifier la connexion** dans la vue de recherche.

Lors de la création d'un identifiant d'indicateur brut ou commun, l'identifiant ne doit pas contenir de virgules, de points-virgules, de deux-points ou de crochets, et doit comporter au maximum 128 caractères. Une fois créés, les identifiants d'indicateurs ne peuvent pas être modifiés — les renommer briserait les références aux données existantes.

:::caution[Capture d'écran à ajouter]
Boîte de dialogue d'import des indicateurs DHIS2 montrant les éléments de données disponibles avec des cases de sélection.
:::

### Indicateurs communs
<!-- help#ind-common -->

Les indicateurs communs sont les noms standardisés avec lesquels les analystes travaillent. Un indicateur commun comme « visites de CPN1 » peut correspondre à différents identifiants DHIS2 bruts selon les pays. Cette abstraction permet au code d'analyse et aux visualisations de référencer des noms cohérents, même lorsque les sources de données sous-jacentes changent.

Chaque indicateur commun possède un identifiant (comme `anc1_visits`), un libellé d'affichage et un type. Cliquez sur **Ajouter un indicateur commun** pour ouvrir l'éditeur, où vous configurez tout en un seul endroit.

:::caution[Capture d'écran à ajouter]
Éditeur d'indicateur commun montrant les champs d'identifiant, de libellé, le sélecteur de type et les champs de définition.
:::

### Types d'indicateurs : de base et dérivés
<!-- help#ind-calculated -->

Chaque indicateur commun possède un type, choisi dans le même éditeur. Un indicateur **de base** est défini par les indicateurs bruts qui lui sont associés, dont les valeurs sont additionnées lors de l'extraction des données. Un indicateur **dérivé** est défini par une formule sur d'autres indicateurs communs et des termes de population.

Rédigez la formule d'un indicateur dérivé avec `+`, `-`, `*`, `/` et des parenthèses. Utilisez directement les identifiants d'autres indicateurs communs (par exemple `anc4 / anc1`), ou référencez une population en écrivant `[population:id_type]` (par exemple `anc4 / [population:grossesses]`). Les fonctions `abs()`, `coalesce()` et `nullif()` sont disponibles. Utilisez les contrôles de palette **Insérer un indicateur** et **Insérer une population** dans l'éditeur pour insérer des identifiants correctement écrits à la position du curseur ; une légende sous la formule nomme chaque identifiant que la formule référence et indique la couverture des données de population.

Un indicateur de base produit toujours un compte et son format est fixé en tant que nombre. Un indicateur dérivé peut être formaté en nombre, en pourcentage ou en taux pour 10 000.

Vous pouvez également définir une règle de mise en forme conditionnelle sur n'importe quel indicateur commun. Lorsqu'une visualisation utilise la source de mise en forme conditionnelle **Indicateur**, chaque valeur est colorée selon la règle de son propre indicateur.

Les indicateurs peuvent être triés à l'aide du bouton **Trier** dans l'onglet Indicateurs communs. L'ordre enregistré est celui que chaque axe d'indicateur dans chaque figure utilise pour le tri.

:::caution[Capture d'écran à ajouter]
Éditeur d'indicateur commun montrant le sélecteur de type (De base / Dérivé), le champ de formule, la palette d'indicateurs/populations et la section affichage avec le format et la règle de mise en forme conditionnelle.
:::

### Import par lot

Pour les instances comportant de nombreux indicateurs, l'import par lot permet de téléverser un fichier CSV contenant les définitions d'indicateurs. C'est utile lors de la configuration d'une nouvelle instance ou de la migration depuis un autre système.

## Indicateurs HFA

Les données issues de l'évaluation des établissements de santé (Health Facility Assessment) fonctionnent différemment des données HMIS. Les enquêtes HFA ont des structures de questions personnalisées qui varient d'une évaluation à l'autre, c'est pourquoi les indicateurs HFA nécessitent du code R pour extraire les valeurs à partir des données d'enquête brutes.

### Définir les indicateurs HFA

Chaque indicateur HFA possède un nom de variable, une catégorie, une sous-catégorie, des catégories de service, une définition, un type de données (binaire ou numérique) et une méthode d'agrégation (somme ou moyenne). Gardez des noms de variables courts et cohérents, comme `has_essential_medicines` ou `staff_trained_count`.

Les noms de variables doivent commencer par une lettre et ne contenir que des lettres, des chiffres et des tirets bas, avec un maximum de 64 caractères. Une fois un indicateur créé, son nom de variable ne peut plus être modifié — d'autres indicateurs peuvent y faire référence dans leur code R, et le renommer briserait ces références. Choisissez les noms avec soin avant d'enregistrer.

Les noms de variables ne doivent pas non plus être des mots réservés. Les noms réservés comprennent les fonctions et opérateurs R utilisés dans le code des indicateurs, ainsi que les colonnes générées par le script d'analyse (comme `weight`, `time_point` et les colonnes relatives aux établissements). L'éditeur affiche une erreur si vous tentez de créer un indicateur avec un nom réservé.

Les noms de variables ne doivent pas non plus dupliquer un nom de variable d'enquête déjà présent dans votre jeu de données HFA. Utiliser un nom de variable d'enquête comme nom de variable d'indicateur masquerait la colonne du jeu de données dans le code R des autres indicateurs, produisant des résultats incorrects.

Le champ **catégories de service** est facultatif et fournit une classification transversale supplémentaire, indépendante de la hiérarchie catégorie/sous-catégorie. Un indicateur peut appartenir à plusieurs catégories de service simultanément. Les catégories de service sont gérées dans leur propre onglet du gestionnaire d'indicateurs HFA et peuvent être attribuées à n'importe quel indicateur, quelle que soit sa catégorie. Lors du filtrage des visualisations ou des données du projet par catégorie de service, une correspondance est établie si l'indicateur appartient à au moins l'une des catégories sélectionnées - il n'est pas nécessaire qu'il appartienne à toutes.

![Indicateurs HFA](/images/hfa-indicators-en.png)

### Rechercher des indicateurs

Le gestionnaire d'indicateurs HFA comporte un champ de recherche dans l'en-tête du panneau des indicateurs. Saisissez du texte pour filtrer la liste des indicateurs par nom de variable, libellé, définition, catégorie, sous-catégorie ou catégorie de service. Le compteur dans l'en-tête du panneau se met à jour pour indiquer combien d'indicateurs correspondent à votre recherche sur le total. Lorsqu'aucun indicateur ne correspond, le tableau affiche « Aucun indicateur ne correspond à votre recherche ».

### Code R pour l'extraction
<!-- help#ind-r-code -->

Chaque indicateur HFA nécessite du code R spécifiant comment extraire sa valeur à partir des données d'enquête brutes. Le code s'exécute pour chaque établissement et doit renvoyer TRUE/FALSE pour les indicateurs binaires, ou un nombre pour les indicateurs numériques.

L'éditeur de code indique quelles variables sont disponibles dans votre jeu de données à chaque point temporel. Si la structure de l'enquête a changé entre les évaluations, vous pouvez écrire un code différent pour différents points temporels. FASTR valide la syntaxe et signale les variables inconnues comme des erreurs, et avertit des problèmes potentiels comme les opérateurs `=` isolés qui pourraient être des comparaisons non intentionnelles, ou l'utilisation des opérateurs `&&` et `||` qui échouent lorsque le code s'exécute sur l'ensemble des établissements à la fois (utilisez `&` et `|` à la place). Il vérifie également si le type de résultat de votre code correspond au type déclaré de l'indicateur — par exemple, un indicateur binaire dont le code n'effectue aucune comparaison affichera un avertissement de type.

Les avertissements (affichés en orange) sont consultatifs et ne bloquent pas l'enregistrement. Les erreurs (affichées en rouge) — notamment les erreurs de syntaxe et les références à des variables absentes du jeu de données — empêchent l'indicateur d'être marqué comme prêt.

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

Les administrateurs globaux peuvent ouvrir un panneau d'assistant IA directement dans le gestionnaire d'indicateurs HFA en cliquant sur le bouton **IA**. Ce bouton apparaît dans la barre supérieure du gestionnaire, ainsi que dans l'en-tête de l'éditeur de code et du formulaire de téléversement du classeur Excel lorsque le panneau n'est pas encore ouvert. L'assistant peut améliorer les libellés, organiser les indicateurs en catégories et créer de nouveaux indicateurs à partir du jeu de données d'enquête sous-jacent. Il lit et écrit les indicateurs via un ensemble d'outils dédiés - en chargeant l'état actuel avant de proposer des modifications, en validant le code R par rapport au dictionnaire de données et en affichant une boîte de dialogue de confirmation avec un diff avant d'appliquer toute modification. Lors de l'application de mises à jour groupées, toutes les modifications sont envoyées au serveur en une seule opération transactionnelle : soit tous les indicateurs sont mis à jour, soit aucun ne l'est, ce qui évite qu'un échec partiel ne laisse le jeu de données dans un état incohérent. L'assistant opère sur les indicateurs HFA au niveau de l'instance et est totalement isolé de l'assistant IA des projets.

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

Lors de l'importation, choisissez entre les modes **Ajouter aux existants** et **Remplacer tous les existants**. En mode **Ajouter aux existants**, les indicateurs dont les noms de variables existent déjà sur la plateforme sont ignorés — seuls les nouveaux noms de variables sont créés. Après l'importation, un résumé liste les indicateurs ignorés. En mode **Remplacer tous les existants**, tous les indicateurs, catégories, sous-catégories et catégories de service existants sont définitivement supprimés avant l'importation. Pour confirmer une importation en mode remplacement, vous devez saisir `yes please delete` dans le champ de confirmation avant que le bouton **Importer** devienne actif.

FASTR détecte les colonnes de points temporels intégrées dans le fichier et présente une étape de mappage où vous confirmez à quel point temporel de la plateforme chaque colonne doit être importée. Si les libellés des colonnes correspondent exactement aux points temporels de votre plateforme, le mappage est pré-rempli automatiquement. Chaque point temporel de la plateforme ne peut recevoir qu'une seule colonne du classeur — mapper deux colonnes vers le même point temporel est refusé.

## Libellés des variables XLSForm

Lorsque FASTR lit votre questionnaire XLSForm lors d'une importation HFA, il construit les libellés des variables à partir de la structure de l'enquête. Pour la plupart des variables, le libellé est simplement le texte de la question. Pour les variables contenues dans des groupes de questions matricielles (blocs ODK `begin_group` ou `begin_repeat`), FASTR qualifie le libellé avec celui du groupe immédiatement englobant, séparé par « — ». Par exemple, une question enfant libellée « Infrastructure » à l'intérieur d'un groupe libellé « Bloc B : Défis » devient « Bloc B : Défis — Infrastructure ». Cela garantit que les enfants de matrices, qui partagent souvent un texte de question identique entre plusieurs groupes, sont identifiables dans le dictionnaire de données et dans les visualisations.

Pour les questions « select_multiple », les variables binaires développées suivent le même schéma : le libellé de variable composé est joint au libellé de choix avec le même séparateur « — ».

FASTR supprime également les balises HTML et normalise les espaces dans les libellés XLSForm avant de les stocker, afin que les libellés créés avec une mise en forme à l'écran apparaissent proprement dans le dictionnaire.

## Bonnes pratiques

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux traits de soulignement.

Maintenez à jour les correspondances des indicateurs communs lorsque les configurations DHIS2 changent. Pour les indicateurs dérivés, documentez vos choix de formules — les futurs analystes voudront comprendre ce que représente chaque terme et pourquoi des types de population spécifiques ont été choisis.
