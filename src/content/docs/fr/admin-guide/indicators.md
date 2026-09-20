---
title: Indicateurs
description: Définir et gérer les indicateurs de santé.
sidebar:
  order: 3
---

Les indicateurs sont les mesures de santé que votre instance FASTR suit - par exemple les taux de couverture vaccinale, les taux de complétude des rapports des établissements ou le nombre de consultations externes. Avant de pouvoir analyser des données, vous devez définir quels indicateurs sont pertinents et comment ils correspondent aux données brutes. Cette page traite de la configuration des indicateurs pour les sources de données HMIS et HFA.

## Indicateurs HMIS

Le dictionnaire des indicateurs HMIS est une liste plate unique. Chaque indicateur a un type qui indique ce qui le remplit : **Élément DHIS2** (un dénombrement mensuel que l'importation récupère par son identifiant DHIS2), **Téléversé** (un dénombrement mensuel rempli par importation CSV), **Somme** (le total d'indicateurs de type Élément DHIS2 ou Téléversé, additionnés par établissement et par mois), ou **Calculé** (une formule sur d'autres indicateurs et des termes de population). Les trois types de dénombrement sont ajustés par les modules de qualité des données ; un indicateur calculé est calculé à partir de la formule ensuite.

### La liste des indicateurs
<!-- help#ind-list -->

La liste affiche chaque indicateur avec son identifiant, son libellé, son type et sa définition. La colonne **Type** affiche un badge pour chaque type d'indicateur : **Élément DHIS2** est un dénombrement récupéré depuis DHIS2. **Téléversé** est un dénombrement rempli par importation CSV. **Somme** est le total d'autres dénombrements. **Calculé** est une formule. La colonne **Défini par** affiche l'identifiant DHIS2 d'un indicateur Élément DHIS2, les membres d'une Somme, ou la formule d'un indicateur Calculé. Les identifiants et libellés longs se coupent aux tirets bas pour rester lisibles sans défilement horizontal. Le nombre d'indicateurs est affiché dans l'en-tête de la liste.

### Ajouter des indicateurs depuis DHIS2
<!-- help#ind-dhis2-import -->

Cliquez sur **Ajouter depuis DHIS2** dans la barre d'outils du gestionnaire d'indicateurs pour ajouter des éléments de données de votre serveur DHIS2 à la liste, sous forme d'éléments DHIS2. FASTR utilise la connexion DHIS2 enregistrée de l'instance, définie dans la carte de connexion DHIS2 sur la page Données. Si aucune connexion enregistrée n'existe, configurez-en une d'abord.

Le formulaire vous permet de rechercher des éléments de données et des indicateurs DHIS2 par nom, code ou identifiant. Les éléments de données sont vérifiés pour leur éligibilité : ils doivent avoir une agrégation SUM, un type de valeur de dénombrement et être collectés mensuellement. Les éléments non éligibles sont affichés avec la raison pour laquelle ils ne peuvent pas être ajoutés. Les indicateurs DHIS2 (formules) sont décomposés en leurs opérandes, qui deviennent des indicateurs Élément DHIS2, et un indicateur Calculé dont la formule porte sur ces opérandes.

Après avoir sélectionné des éléments, une étape de nommage vous permet de confirmer ou de modifier l'identifiant et le libellé de chaque nouvel indicateur avant l'enregistrement. Les identifiants proposés sont générés à partir du nom DHIS2 et sont modifiables. Les éléments dont l'identifiant DHIS2 est déjà porté par un indicateur existant sont affichés comme déjà importés et ne créent rien de nouveau.

Lorsqu'un indicateur est créé via le sélecteur DHIS2, FASTR lit le nom de l'élément ou de l'opérande depuis les métadonnées DHIS2 en direct et l'enregistre comme **Nom DHIS2**. Ce nom stocké est affiché dans l'éditeur à côté de l'identifiant DHIS2, afin que vous puissiez identifier l'élément sans avoir à le rechercher dans DHIS2. Il n'est jamais modifié après la création ; si vous changez l'identifiant DHIS2, le nom stocké est effacé.

### Actualiser les noms DHIS2

Si des noms d'éléments changent dans DHIS2 au fil du temps, vous pouvez mettre à jour les noms DHIS2 stockés sans modifier aucun libellé, identifiant ou donnée. Cliquez sur le menu de débordement dans la barre d'outils du gestionnaire d'indicateurs et sélectionnez **Actualiser les noms DHIS2**. FASTR lit le nom actuel de chaque indicateur Élément DHIS2 depuis DHIS2 par son identifiant DHIS2 et le stocke comme nom DHIS2 de l'indicateur. Les éléments que DHIS2 n'a plus conservent leur nom stocké inchangé. Un résumé indique combien de noms ont été mis à jour, combien étaient déjà à jour et quels identifiants DHIS2 n'ont pas été trouvés.

### Créer et modifier des indicateurs

Cliquez sur **Créer** pour ouvrir l'éditeur d'indicateurs. L'éditeur gère les quatre types dans un seul formulaire. Choisissez d'abord le type — la section de définition change en conséquence. Vous pouvez également ouvrir l'éditeur depuis une ligne existante pour la mettre à jour.

Chaque indicateur possède un **ID de l'indicateur** (utilisé dans les formules et les importations), un **Libellé** (affiché dans les visualisations) et une case à cocher **Inclure dans l'analyse**. Lorsque inclure dans l'analyse est activé, chaque lot de résultats analyse cet indicateur. Lorsqu'il est désactivé, l'indicateur est uniquement dans le dictionnaire : ses données sont toujours importées et conservées, et il peut toujours être membre d'une somme ou utilisé dans une formule.

Les identifiants d'indicateurs peuvent être renommés. Renommer réécrit chaque formule et importation planifiée qui nomme l'indicateur ; ses données restent en place, et les lots de résultats déjà générés conservent l'ancien identifiant.

Pour un indicateur Élément DHIS2, l'éditeur affiche le **Nom DHIS2** stocké sous le champ de l'identifiant DHIS2 lorsqu'il est disponible. Ce nom est en lecture seule et reflète ce que DHIS2 appelait l'élément lors de la création de l'indicateur par le sélecteur.

### Indicateurs spéciaux

Certains identifiants d'indicateurs sont lus par leur nom par les modules d'analyse et sont toujours analysés. Ces **indicateurs spéciaux** doivent rester de type Élément DHIS2, Téléversé ou Somme — ils ne peuvent pas être des indicateurs Calculés. Un badge **Spécial** apparaît à côté de ces identifiants dans le gestionnaire et dans l'éditeur au fur et à mesure de la saisie. Cliquez sur **Indicateurs spéciaux et mots réservés** dans la barre d'outils du gestionnaire pour voir la liste complète des identifiants spéciaux, des termes de population et des mots réservés.

### Types d'indicateurs en détail

Cliquez sur **Types d'indicateurs** dans la barre d'outils du gestionnaire pour ouvrir un panneau de référence qui explique chaque type : d'où proviennent ses données, si les modules de qualité des données l'ajustent, s'il possède ses propres lignes de données et quel format il peut avoir.

Un indicateur **Élément DHIS2** conserve ses propres lignes stockées sous son identifiant DHIS2. L'identifiant DHIS2 est fixe une fois que l'indicateur a des données ; renommez l'indicateur pour changer son nom d'affichage. Une **Somme** additionne les dénombrements de ses membres par établissement et par mois ; les membres doivent être des indicateurs de type Élément DHIS2 ou Téléversé. La clé interne d'un indicateur **Téléversé** est gérée par FASTR et n'est jamais affichée — vous y associez des valeurs à l'étape Correspondance de chaque importation CSV.

### Indicateurs calculés
<!-- help#ind-calculated -->

Un indicateur **Calculé** est défini par une formule portant sur d'autres indicateurs et des termes de population. Il est calculé après l'agrégation des données : un chiffre régional ou annuel est la formule appliquée aux dénombrements déjà agrégés — pas la moyenne des résultats par établissement. Rédigez la formule avec `+`, `-`, `*`, `/` et des parenthèses. Utilisez directement les identifiants d'autres indicateurs (par exemple `anc4 / anc1`), ou référencez un terme de population (par exemple `anc4 / population_pregnancies`). Les fonctions `abs()`, `coalesce()` et `nullif()` sont disponibles. Utilisez les contrôles de palette **Insérer un indicateur** et **Insérer une population** dans l'éditeur pour insérer des identifiants correctement écrits à la position du curseur ; une légende sous la formule nomme chaque identifiant que la formule référence et indique la couverture des données de population.

Un indicateur calculé peut être formaté en nombre, en pourcentage ou en taux pour 10 000. Vous pouvez également définir une valeur cible et une règle de mise en forme conditionnelle sur un indicateur calculé.

L'éditeur valide les formules au fur et à mesure de la saisie. Si une formule ne peut pas être résolue — par exemple parce qu'elle fait référence à un identifiant inconnu, crée un cycle ou contient une erreur de syntaxe — un message d'erreur s'affiche sous le champ de formule. Si la formule est valide mais fait référence à des ingrédients qui n'ont pas encore de données, un avertissement s'affiche à la place, indiquant que l'indicateur ne peut pas être calculé tant que les données ne sont pas disponibles. Vous pouvez tout de même enregistrer dans cet état ; l'avertissement ne bloque pas l'enregistrement.

La liste des indicateurs inclut une colonne **Statut** pour les indicateurs calculés, indiquant si chacun peut actuellement être calculé. Si un ou plusieurs indicateurs calculés ne peuvent pas être calculés, une bannière d'avertissement s'affiche au-dessus de la liste.

Vous pouvez également définir une règle de mise en forme conditionnelle sur tout indicateur calculé. Lorsqu'une visualisation utilise la source de mise en forme conditionnelle **Indicateur**, chaque valeur est colorée selon la règle de son propre indicateur.

### Inclure dans l'analyse
<!-- help#ind-include -->

Chaque indicateur possède une case à cocher **Inclure dans l'analyse**. Lorsqu'elle est cochée, chaque lot de résultats analyse l'indicateur : les modules de qualité des données l'ajustent et il est disponible dans les visualisations. Lorsqu'elle est décochée, l'indicateur est uniquement dans le dictionnaire : ses données sont toujours importées et conservées, et il est toujours utilisable comme membre ou dans une expression.

### Direction et cible

Chaque indicateur possède un paramètre **Direction** (plus élevé = meilleur ou plus bas = meilleur) que la règle de mise en forme conditionnelle suit. Un indicateur Calculé possède également une valeur **Cible** facultative affichée dans ses unités d'affichage.

### Faibles dénombrements attendus

Pour les indicateurs de type Élément DHIS2, Téléversé et Somme, vous pouvez activer **Faibles dénombrements attendus**. Lorsque c'est activé, les modules d'ajustement traitent les dénombrements mensuels par établissement de cet indicateur comme étant attendus faibles.

### Trier les indicateurs

Les indicateurs peuvent être triés à l'aide du bouton **Trier**. L'ordre enregistré est celui que chaque axe d'indicateur dans chaque figure utilise pour le tri.

### Télécharger le dictionnaire des indicateurs

Cliquez sur le menu de débordement dans la barre d'outils du gestionnaire d'indicateurs et sélectionnez **Télécharger** pour exporter le dictionnaire complet des indicateurs. Le CSV inclut tous les champs : identifiant, libellé, type, identifiant DHIS2 (pour les indicateurs Élément DHIS2), nom DHIS2 (le nom de l'élément ou de l'opérande lu depuis DHIS2 lors de la création de l'indicateur, vide pour les autres types ou lorsqu'il n'est pas disponible), membres (pour les sommes), formule (pour les indicateurs calculés), indicateur inclus dans l'analyse, format, seuils, direction, cible et indicateur de faibles dénombrements attendus.

### Lancer une importation de données DHIS2 depuis le gestionnaire d'indicateurs

Avec un ou plusieurs indicateurs sélectionnés dans le tableau, l'action groupée **Importation de données HMIS** ouvre l'assistant d'importation DHIS2 pré-configuré avec ces indicateurs. Une notice dans le gestionnaire confirme que l'importation a été lancée ou planifiée, avec un lien pour la suivre sous Données HMIS, Importations.

### Rechercher des indicateurs

La recherche dans le gestionnaire d'indicateurs fait correspondre chaque mot saisi avec l'identifiant, le libellé, le nom DHIS2, le type et la définition de chaque indicateur. Il est donc possible de rechercher par nom DHIS2 d'un élément sans connaître son UID.

### Mots réservés

Lors de la création ou du renommage d'un identifiant d'indicateur, l'identifiant ne doit pas contenir de virgules, de points-virgules, de deux-points ou de crochets, et doit comporter au maximum 128 caractères. Il ne doit pas non plus être un mot réservé. Les mots réservés comprennent les identifiants d'indicateurs spéciaux (sauf si l'indicateur est de type Élément DHIS2, Téléversé ou Somme), les termes de population et les noms de fonctions de formule. Le panneau **Indicateurs spéciaux et mots réservés** dans le gestionnaire les liste tous.

## Indicateurs HFA

Les données issues de l'évaluation des établissements de santé (Health Facility Assessment) fonctionnent différemment des données HMIS. Les enquêtes HFA ont des structures de questions personnalisées qui varient d'une évaluation à l'autre, c'est pourquoi les indicateurs HFA nécessitent du code R pour extraire les valeurs à partir des données d'enquête brutes.

### Définir les indicateurs HFA

Chaque indicateur HFA possède un identifiant d'indicateur, une catégorie, une sous-catégorie, des catégories de service, un libellé court, une définition, un type de données (binaire ou numérique) et une méthode d'agrégation (somme ou moyenne). Gardez les identifiants courts et cohérents, comme `has_essential_medicines` ou `staff_trained_count`.

Les identifiants d'indicateurs doivent commencer par une lettre et ne contenir que des lettres, des chiffres et des tirets bas, avec un maximum de 64 caractères. L'application attribue automatiquement l'identifiant de chaque indicateur lors de sa création ; l'identifiant attribué est visible dans le gestionnaire et dans l'éditeur de code, mais ne peut pas être modifié après la création — d'autres indicateurs peuvent y faire référence dans leur code R, et le renommer briserait ces références.

Les identifiants d'indicateurs ne doivent pas non plus être des mots réservés. Les noms réservés comprennent les fonctions et opérateurs R utilisés dans le code des indicateurs, ainsi que les colonnes générées par le script d'analyse (comme `weight`, `time_point` et les colonnes relatives aux établissements).

Le champ **catégories de service** est facultatif et fournit une classification transversale supplémentaire, indépendante de la hiérarchie catégorie/sous-catégorie. Un indicateur peut appartenir à plusieurs catégories de service simultanément. Les catégories de service sont gérées dans leur propre onglet du gestionnaire d'indicateurs HFA et peuvent être attribuées à n'importe quel indicateur, quelle que soit sa catégorie. Lors du filtrage des visualisations ou des données du projet par catégorie de service, une correspondance est établie si l'indicateur appartient à au moins l'une des catégories sélectionnées - il n'est pas nécessaire qu'il appartienne à toutes.

![Indicateurs HFA](/images/hfa-indicators-en.png)

### Rechercher des indicateurs

Le gestionnaire d'indicateurs HFA comporte un champ de recherche dans l'en-tête du panneau des indicateurs. Saisissez du texte pour filtrer la liste des indicateurs par identifiant d'indicateur, libellé, définition, catégorie, sous-catégorie ou catégorie de service. Le compteur dans l'en-tête du panneau se met à jour pour indiquer combien d'indicateurs correspondent à votre recherche sur le total. Lorsqu'aucun indicateur ne correspond, le tableau affiche « Aucun indicateur ne correspond à votre recherche ».

### Code R pour l'extraction
<!-- help#ind-r-code -->

Chaque indicateur HFA nécessite du code R spécifiant comment extraire sa valeur à partir des données d'enquête brutes. Le code s'exécute pour chaque établissement et doit renvoyer TRUE/FALSE pour les indicateurs binaires, ou un nombre pour les indicateurs numériques.

L'éditeur de code indique quelles variables d'enquête sont disponibles dans votre jeu de données à chaque point temporel, identifiées par leur identifiant de variable. Si la structure de l'enquête a changé entre les évaluations, vous pouvez écrire un code différent pour différents points temporels. FASTR valide la syntaxe et signale les variables inconnues comme des erreurs, et avertit des problèmes potentiels comme les opérateurs `=` isolés qui pourraient être des comparaisons non intentionnelles, ou l'utilisation des opérateurs `&&` et `||` qui échouent lorsque le code s'exécute sur l'ensemble des établissements à la fois (utilisez `&` et `|` à la place). Il vérifie également si le type de résultat de votre code correspond au type déclaré de l'indicateur — par exemple, un indicateur binaire dont le code n'effectue aucune comparaison affichera un avertissement de type.

Les avertissements (affichés en orange) sont consultatifs et ne bloquent pas l'enregistrement. Les erreurs (affichées en rouge) — notamment les erreurs de syntaxe et les références à des variables absentes du jeu de données — empêchent l'indicateur d'être marqué comme prêt.

Le panneau droit de l'éditeur de code liste à la fois les variables d'enquête et les autres indicateurs ; cliquez sur n'importe quelle entrée pour insérer son identifiant dans le code à la position du curseur. Utilisez la zone de recherche pour filtrer les deux listes simultanément.

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

Le gestionnaire d'indicateurs HFA comprend un bouton **Importer les indicateurs par défaut** à côté du bouton **Importer Excel**. En cliquant dessus, l'ensemble d'indicateurs HFA FASTR standard est récupéré directement depuis le hub de ressources FASTR sur GitHub — aucune sélection de fichier n'est nécessaire. Le formulaire indique combien d'indicateurs et de catégories ont été récupérés avant que vous confirmiez l'importation. Vous choisissez les mêmes modes d'importation qu'avec un téléversement de fichier : **Ajouter aux existants** ajoute uniquement les nouveaux identifiants d'indicateurs, tandis que **Remplacer tous les existants** supprime tous les indicateurs actuels avant l'importation.

### Supprimer des indicateurs

Avant de supprimer un indicateur ou un ensemble d'indicateurs, FASTR vérifie si d'autres indicateurs font référence aux identifiants supprimés dans leur code R ou leur code de variante. Si des références sont trouvées, la boîte de dialogue de confirmation liste les indicateurs concernés et avertit que leur code échouera à la validation après la suppression.

### Assistant IA pour les indicateurs

Les administrateurs globaux peuvent ouvrir un panneau d'assistant IA directement dans le gestionnaire d'indicateurs HFA en cliquant sur le bouton **IA**. Ce bouton apparaît dans la barre supérieure du gestionnaire, ainsi que dans l'en-tête de l'éditeur de code et du formulaire de téléversement du classeur Excel lorsque le panneau n'est pas encore ouvert. L'assistant peut améliorer les libellés, organiser les indicateurs en catégories et créer de nouveaux indicateurs à partir du jeu de données d'enquête sous-jacent. Il lit et écrit les indicateurs via un ensemble d'outils dédiés - en chargeant l'état actuel avant de proposer des modifications, en validant le code R par rapport au dictionnaire de données et en affichant une boîte de dialogue de confirmation avec un diff avant d'appliquer toute modification. Lorsque l'assistant crée de nouveaux indicateurs, l'application attribue automatiquement l'identifiant de chaque indicateur et le renvoie dans le résultat. Lors de l'application de mises à jour groupées, toutes les modifications sont envoyées au serveur en une seule opération transactionnelle : soit tous les indicateurs sont mis à jour, soit aucun ne l'est, ce qui évite qu'un échec partiel ne laisse le jeu de données dans un état incohérent. L'assistant opère sur les indicateurs HFA au niveau de l'instance et est totalement isolé de l'assistant IA des projets.

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
- **Indicators** : indicatorId (laisser vide pour un nouvel indicateur ; l'application en attribue un), categoryId, subCategoryId, serviceCategoryId (séparés par `|` pour plusieurs), shortLabel, definition, type, aggregation, variantGroupId (facultatif), r_code__&lt;point temporel&gt;, r_filter_code__&lt;point temporel&gt;, r_variant_code__&lt;itemId&gt;__&lt;point temporel&gt;, …

Si les feuilles Service categories, Variant groups ou Variant items sont absentes, les indicateurs sont importés sans catégories de service ni assignation de variantes.

Les colonnes de code de variante utilisent le format `r_variant_code__<itemId>__<libellé du point temporel>`. Chaque colonne de code de variante doit référencer un identifiant d'élément de la feuille Variant items, et le libellé du point temporel doit correspondre à une colonne `r_code__` étiquetée dans le même fichier. Un indicateur avec du code de variante doit également avoir un `variantGroupId` qui correspond au groupe de l'élément.

Lors de l'importation, choisissez entre les modes **Ajouter aux existants** et **Remplacer tous les existants**. En mode **Ajouter aux existants**, les indicateurs dont les identifiants existent déjà sur la plateforme sont ignorés — seuls les nouveaux identifiants sont créés. Après l'importation, un résumé liste les indicateurs ignorés. En mode **Remplacer tous les existants**, tous les indicateurs, catégories, sous-catégories et catégories de service existants sont définitivement supprimés avant l'importation. Pour confirmer une importation en mode remplacement, vous devez saisir `yes please delete` dans le champ de confirmation avant que le bouton **Importer** devienne actif.

FASTR détecte les colonnes de points temporels intégrées dans le fichier et présente une étape de mappage où vous confirmez à quel point temporel de la plateforme chaque colonne doit être importée. Si les libellés des colonnes correspondent exactement aux points temporels de votre plateforme, le mappage est pré-rempli automatiquement. Chaque point temporel de la plateforme ne peut recevoir qu'une seule colonne du classeur — mapper deux colonnes vers le même point temporel est refusé.

## Libellés des variables XLSForm

Lorsque FASTR lit votre questionnaire XLSForm lors d'une importation HFA, il construit les libellés des variables à partir de la structure de l'enquête. Pour la plupart des variables, le libellé est simplement le texte de la question. Pour les variables contenues dans des groupes de questions matricielles (blocs ODK `begin_group` ou `begin_repeat`), FASTR qualifie le libellé avec celui du groupe immédiatement englobant, séparé par « — ». Par exemple, une question enfant libellée « Infrastructure » à l'intérieur d'un groupe libellé « Bloc B : Défis » devient « Bloc B : Défis — Infrastructure ». Cela garantit que les enfants de matrices, qui partagent souvent un texte de question identique entre plusieurs groupes, sont identifiables dans le dictionnaire de données et dans les visualisations.

Pour les questions « select_multiple », les variables binaires développées suivent le même schéma : le libellé de variable composé est joint au libellé de choix avec le même séparateur « — ».

FASTR supprime également les balises HTML et normalise les espaces dans les libellés XLSForm avant de les stocker, afin que les libellés créés avec une mise en forme à l'écran apparaissent proprement dans le dictionnaire.

## Bonnes pratiques

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux traits de soulignement.

Pour les indicateurs calculés, documentez vos choix de formules — les futurs analystes voudront comprendre ce que représente chaque terme et pourquoi des types de population spécifiques ont été choisis.
