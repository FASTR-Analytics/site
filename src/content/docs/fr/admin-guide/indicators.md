---
title: Indicateurs
description: Définir et gérer les indicateurs de santé.
sidebar:
  order: 3
---

Les indicateurs sont les mesures de santé que votre instance FASTR suit - par exemple les taux de couverture vaccinale, les taux de complétude des rapports des établissements ou le nombre de consultations externes. Avant de pouvoir analyser des données, vous devez définir quels indicateurs sont pertinents et d'où proviennent leurs données. Cette page traite de la configuration des indicateurs pour les données HMIS et HFA.

## Indicateurs HMIS

Chaque indicateur HMIS est une ligne de la liste des indicateurs. Il n'existe pas de liste séparée d'identifiants DHIS2. Un élément de données DHIS2 est un indicateur qui porte un identifiant DHIS2. Une valeur de la colonne indicateur d'un fichier CSV téléversé est un indicateur qui porte cette valeur comme identifiant du fichier. Un total ou un taux est un indicateur construit à partir d'autres indicateurs.

Les lignes de données sont conservées sous l'identifiant DHIS2 ou l'identifiant du fichier, jamais sous l'identifiant de l'indicateur lui-même. L'identifiant et le libellé de l'indicateur sont des noms que vous donnez aux données, et vous pouvez les changer à tout moment sans déplacer une seule ligne. L'identifiant DHIS2 ou l'identifiant du fichier, en revanche, est fixe une fois que des données ont été importées sous lui.

### La liste des indicateurs
<!-- help#ind-list -->

La liste affiche chaque indicateur avec son identifiant, son libellé, son type et sa définition. La colonne **Type** prend quatre valeurs :

- **Élément DHIS2** est un comptage récupéré depuis DHIS2. La colonne **Défini par** affiche l'identifiant DHIS2 de l'élément de données (ou de l'opérande, un élément de données restreint à une combinaison d'options de catégorie, écrit `UID.COC`) que l'importation récupère pour alimenter cet indicateur.
- **Téléversé** est un comptage rempli par téléversement CSV. La colonne **Défini par** affiche son identifiant du fichier, la valeur écrite dans la colonne indicateur du fichier. Elle est vide tant qu'aucun fichier n'a été attribué à l'indicateur.
- **Somme** est le total d'autres indicateurs. La colonne **Défini par** liste ses membres. Les membres sont des éléments DHIS2 ou des indicateurs téléversés ; une somme ne peut pas contenir une somme. Les comptages des membres sont additionnés par établissement et par mois, et le résultat passe par le même ajustement de qualité des données que tout autre comptage.
- **Dérivé** est une formule portant sur d'autres indicateurs et des populations, évaluée après l'ajustement et l'agrégation des données. La colonne **Défini par** affiche la formule.

Deux autres colonnes découlent du type. **Passe par les modules d'analyse** est cochée pour un élément DHIS2, un indicateur téléversé et une somme : ce sont les comptages que les modules de qualité des données ajustent. **Dénombrement brut** est cochée pour un élément DHIS2 et un indicateur téléversé : ce sont les deux types qui possèdent leurs propres lignes de données.

Chaque indicateur possède un identifiant (comme `anc1`), un libellé et une case à cocher **Inclure dans l'analyse**. Certains identifiants portent la mention **Spécial** : les modules d'analyse les lisent par leur nom, ils sont donc toujours analysés et ne peuvent pas être des indicateurs dérivés.

Pour créer un indicateur à la main, cliquez sur **Créer un indicateur**, choisissez le type et remplissez la définition. Un élément DHIS2 possède un champ **Identifiant DHIS2**, obligatoire. Un indicateur téléversé possède un champ **Identifiant du fichier**, que vous pouvez laisser vide : l'étape de vérification de l'importation CSV le remplit lorsque vous attribuez une valeur inconnue à cet indicateur. Une somme possède un sélecteur de membres. Un indicateur dérivé possède un champ de formule. Un identifiant d'indicateur ne peut pas contenir de virgules, de points-virgules, de deux-points ni de crochets, et doit comporter au maximum 128 caractères. Les identifiants de population et les noms de fonctions ne peuvent pas servir d'identifiants d'indicateurs, et un identifiant spécial ne peut être donné qu'à un élément DHIS2, un indicateur téléversé ou une somme.

Pour renommer un indicateur, ouvrez-le et changez son identifiant. Renommer réécrit chaque formule et chaque importation planifiée qui nomme l'indicateur. Ses données restent en place, et les paquets de résultats déjà générés conservent l'ancien identifiant. Un identifiant spécial peut aussi être renommé, mais les modules d'analyse ne le trouvent alors plus, jusqu'à ce qu'un comptage porte à nouveau cet identifiant. Le nouvel identifiant est refusé si un autre indicateur le porte déjà, ou s'il s'agit d'un mot réservé.

L'identifiant DHIS2 ou l'identifiant du fichier ne peut être ni modifié ni effacé tant que l'indicateur possède des données. Pour donner un autre nom aux données, renommez plutôt l'indicateur. Vous pouvez faire passer un indicateur d'élément DHIS2 à téléversé et inversement à tout moment ; le passage à élément DHIS2 exige un identifiant DHIS2 au format de DHIS2. Faire passer un élément DHIS2 ou un indicateur téléversé à une somme ou à un indicateur dérivé est refusé tant qu'il possède des données ou tant qu'une somme le compte parmi ses membres.

La suppression d'un indicateur est refusée tant qu'il possède des données, tant qu'une somme le compte parmi ses membres, ou tant que la formule d'un autre indicateur en a besoin.

:::caution[Capture d'écran à ajouter]
La liste des indicateurs montrant les colonnes Type, Défini par, Inclure dans l'analyse et Statut.
:::

### Importer depuis DHIS2
<!-- help#ind-dhis2-import -->

Cliquez sur **Importer depuis DHIS2** pour ajouter des éléments de données depuis votre serveur DHIS2. FASTR utilise la connexion enregistrée de l'instance ; **Modifier la connexion** permet d'en utiliser une autre. Recherchez par nom, code ou identifiant. Les résultats listent des éléments de données et des indicateurs DHIS2, et chaque ligne indique si l'élément peut être importé. Un élément de données ne peut être importé que si DHIS2 le décrit comme un comptage mensuel additif : type d'agrégation somme, type de valeur numérique et au moins un ensemble de données mensuel. Tout le reste est refusé, avec la raison affichée.

Ajoutez les éléments voulus, puis cliquez sur **Suivant : nommer les indicateurs**. L'étape de nommage affiche chaque élément avec un identifiant proposé d'après son nom DHIS2, que vous pouvez modifier avant d'enregistrer ; vous pourrez aussi renommer l'indicateur plus tard. Saisir l'identifiant d'un indicateur téléversé existant sans identifiant du fichier attribue l'identifiant DHIS2 à cet indicateur au lieu d'en créer un nouveau, et l'indicateur devient un élément DHIS2. C'est ainsi qu'un indicateur spécial comme `anc1`, présent dans chaque nouvelle instance, devient un élément DHIS2. Tout autre identifiant existant est refusé. Un élément dont l'identifiant DHIS2 figure déjà dans la liste est affiché comme déjà importé et ne crée rien.

Un indicateur DHIS2 (une formule dans DHIS2, comme un taux de couverture) n'est jamais importé sous forme de valeurs. FASTR lit son numérateur et son dénominateur, importe chaque élément de données qu'ils utilisent comme un indicateur à part entière, et crée un indicateur dérivé avec la formule `(numérateur) / (dénominateur)` sur ces indicateurs. Une formule DHIS2 que FASTR ne peut pas exprimer, par exemple une formule qui utilise des indicateurs de programme, des groupes d'unités d'organisation ou des fonctions, est refusée, et le message nomme la partie de la formule qui l'a bloquée.

Importer un élément ne fait que l'ajouter à la liste. Pour récupérer ses données, lancez une importation HMIS (voir Données HMIS).

:::caution[Capture d'écran à ajouter]
L'étape de nommage montrant les identifiants proposés pour deux éléments de données et l'aperçu de la formule d'un indicateur DHIS2 décomposé.
:::

### Sommes

Une somme additionne les comptages de ses membres par établissement et par mois. Utilisez-la lorsque le même service est rapporté sous plusieurs éléments de données, par exemple un vaccin enregistré sous un élément pour les séances fixes et un autre pour les séances avancées. Créez-la avec **Créer un indicateur**, choisissez le type **Somme** et sélectionnez les membres parmi les éléments DHIS2 et les indicateurs téléversés de la liste. Une somme a besoin d'au moins un membre.

### Indicateurs dérivés
<!-- help#ind-derived -->

Un indicateur dérivé est défini par une formule portant sur d'autres indicateurs, par exemple `anc4 / anc1` pour un taux de couverture. Il est calculé après l'agrégation des données : un chiffre régional ou annuel est donc la formule appliquée aux valeurs additionnées, et non une moyenne de ratios.

Une formule peut utiliser `+`, `-`, `*`, `/`, des parenthèses et des nombres, ainsi que les fonctions `abs()` (valeur absolue), `coalesce()` (la première valeur non vide) et `nullif()` (vide lorsque les deux valeurs sont égales). Elle ne se limite pas à un numérateur et un dénominateur : `(anc1 - anc4) / anc1` est une définition valide, tout comme n'importe quelle combinaison de trois indicateurs ou plus. Une formule peut faire référence à une somme ou à un autre indicateur dérivé, dont la définition est insérée à la place de son identifiant.

Une formule peut aussi diviser par une population, écrite avec l'identifiant du type de population, par exemple `anc4 / population_pregnancies`. Les populations proviennent de la page Population de l'instance (Données → Population) : des effectifs annuels de population par unité administrative et par type de population, téléversés sous forme de CSV. Une valeur divisée par une population est annualisée, de sorte qu'une valeur mensuelle se lit comme un taux annuel. Les valeurs sont alors calculées uniquement au niveau administratif des données de population, sans valeur pour les unités inférieures, et uniquement pour les unités et les mois couverts par les données de population. Un paquet de résultats ne peut pas être généré tant qu'une formule utilise un type de population qui n'a aucune donnée.

Vous n'avez pas à saisir les identifiants à la main : les sélecteurs **Insérer un indicateur** et **Insérer une population** au-dessus du champ de formule les insèrent au curseur, correctement écrits. La légende sous le champ liste chaque identifiant utilisé par la formule avec son libellé. Écrivez un identifiant tel quel s'il ne contient que des lettres minuscules, des chiffres et des tirets bas ; sinon, mettez-le entre crochets, comme `[ANC.1]`.

Vous définissez également le format d'affichage (nombre, pourcentage ou taux pour 10 000) et, si vous le souhaitez, une règle de mise en forme conditionnelle pour le codage couleur, par exemple vert au-dessus de 80 % et jaune entre 70 % et 80 %. Seul un indicateur dérivé possède ces deux réglages. Un élément DHIS2, un indicateur téléversé ou une somme est un comptage : il s'affiche toujours comme un nombre et n'a pas de règle de mise en forme conditionnelle.

L'éditeur vérifie la formule au fur et à mesure de la saisie. Il refuse une formule qui nomme un indicateur inexistant, qui se réfère à elle-même, ou qui nécessite plus de huit indicateurs une fois développés chaque somme et chaque indicateur dérivé auxquels elle fait référence. La colonne **Statut** de la liste indique si chaque indicateur dérivé peut être calculé. Une formule qui utilise un indicateur sans données peut être enregistrée, mais les résultats ne peuvent pas être générés tant que ces données ne sont pas importées.

:::caution[Capture d'écran à ajouter]
L'éditeur d'un indicateur dérivé, montrant le champ de formule, les sélecteurs, la légende et le format.
:::

### Inclure dans l'analyse
<!-- help#ind-include -->

Chaque indicateur possède une case à cocher **Inclure dans l'analyse**. Lorsqu'elle est cochée, chaque paquet de résultats analyse l'indicateur : les modules de qualité des données l'ajustent et il est disponible dans les visualisations. Lorsqu'elle est décochée, l'indicateur n'existe que dans le dictionnaire. Ses données sont toujours importées et stockées, il peut toujours être membre d'une somme et être utilisé dans une formule, mais aucun paquet ne le porte en tant que tel.

C'est ainsi que vous conservez un élément de données pour l'utiliser dans un total ou un taux sans qu'il apparaisse dans les résultats. Un indicateur spécial est toujours analysé. Lorsqu'un indicateur dérivé inclus utilise un indicateur qui ne l'est pas, l'éditeur le signale, et le paquet inclut cet indicateur malgré tout.

### Importation groupée
<!-- help#ind-batch -->

Pour les instances comportant de nombreux indicateurs, **Importation groupée depuis CSV** téléverse toute la liste depuis un seul fichier, et **Télécharger le CSV** produit le même fichier à partir de la liste actuelle, ce qui permet de modifier tout le dictionnaire dans un tableur et de le téléverser à nouveau. Les colonnes sont `indicator_id`, `label`, `type`, `data_id`, `members`, `expression`, `include_in_analysis`, `format_as` et `thresholds`. Le `type` est `uploaded`, `dhis2_element`, `sum` ou `derived`. La colonne `data_id` contient l'identifiant DHIS2 d'un `dhis2_element` (obligatoire) ou l'identifiant du fichier d'un indicateur `uploaded` (vide tant qu'aucun fichier n'a été attribué). Pour une somme, `members` liste les identifiants des membres séparés par des points-virgules. Pour un indicateur dérivé, `expression` est la formule, `format_as` vaut `number`, `percent` ou `rate_per_10k`, et `thresholds` est sa règle de mise en forme conditionnelle ; les autres types sont toujours `number` et n'ont pas de règle. Les indicateurs nommés dans le fichier sont créés ou mis à jour, et les indicateurs existants conservent leur ordre de tri. Un indicateur qui possède des données conserve son `data_id`.

Cochez **Remplacer tout le dictionnaire par ce fichier** pour supprimer aussi chaque indicateur que le fichier ne nomme pas. Le téléversement est refusé, avec la liste des raisons, s'il devait supprimer un indicateur qui possède des données ou qu'une somme ou une formule utilise encore, changer le type d'un indicateur qui possède des données ou qu'une somme compte parmi ses membres, ou déplacer un identifiant DHIS2 ou un identifiant du fichier vers un autre indicateur alors que l'ancien possède des données.

## Indicateurs HFA

Les données issues de l'évaluation des établissements de santé (Health Facility Assessment) fonctionnent différemment des données HMIS. Les enquêtes HFA ont des structures de questions personnalisées qui varient d'une évaluation à l'autre, c'est pourquoi les indicateurs HFA nécessitent du code R pour extraire les valeurs à partir des données d'enquête brutes.

### Définir les indicateurs HFA

Chaque indicateur HFA possède un nom de variable, une catégorie, une sous-catégorie, des catégories de service, une définition, un type de données (binaire ou numérique) et une méthode d'agrégation (somme ou moyenne). Gardez des noms de variables courts et cohérents, comme `has_essential_medicines` ou `staff_trained_count`.

Les noms de variables doivent commencer par une lettre et ne contenir que des lettres, des chiffres et des tirets bas, avec un maximum de 64 caractères. Une fois un indicateur créé, son nom de variable ne peut plus être modifié — d'autres indicateurs peuvent y faire référence dans leur code R, et le renommer briserait ces références. Choisissez les noms avec soin avant d'enregistrer.

Les noms de variables ne doivent pas non plus dupliquer un nom de variable d'enquête déjà présent dans votre jeu de données HFA. Utiliser un nom de variable d'enquête comme nom de variable d'indicateur masquerait la colonne du jeu de données dans le code R des autres indicateurs, produisant des résultats incorrects.

Le champ **catégories de service** est facultatif et fournit une classification transversale supplémentaire, indépendante de la hiérarchie catégorie/sous-catégorie. Un indicateur peut appartenir à plusieurs catégories de service simultanément. Les catégories de service sont gérées dans leur propre onglet du gestionnaire d'indicateurs HFA et peuvent être attribuées à n'importe quel indicateur, quelle que soit sa catégorie. Lors du filtrage des visualisations ou des données du projet par catégorie de service, une correspondance est établie si l'indicateur appartient à au moins l'une des catégories sélectionnées - il n'est pas nécessaire qu'il appartienne à toutes.

![Indicateurs HFA](/images/hfa-indicators-en.png)

### Code R pour l'extraction
<!-- help#ind-r-code -->

Chaque indicateur HFA nécessite du code R spécifiant comment extraire sa valeur à partir des données d'enquête brutes. Le code s'exécute pour chaque établissement et doit renvoyer TRUE/FALSE pour les indicateurs binaires, ou un nombre pour les indicateurs numériques.

L'éditeur de code indique quelles variables sont disponibles dans votre jeu de données à chaque point temporel. Si la structure de l'enquête a changé entre les évaluations, vous pouvez écrire un code différent pour différents points temporels. FASTR valide la syntaxe et signale les variables inconnues comme des erreurs, et avertit des problèmes potentiels comme les opérateurs `=` isolés qui pourraient être des comparaisons non intentionnelles. Il vérifie également si le type de résultat de votre code correspond au type déclaré de l'indicateur — par exemple, un indicateur binaire dont le code n'effectue aucune comparaison affichera un avertissement de type.

Les avertissements (affichés en orange) sont consultatifs et ne bloquent pas l'enregistrement. Les erreurs (affichées en rouge) — notamment les erreurs de syntaxe et les références à des variables absentes du jeu de données — empêchent l'indicateur d'être marqué comme prêt.

![Code R d'un indicateur HFA](/images/hfa-code-en.png)

### Code filtre

Chaque entrée de code par point temporel prend également en charge un champ de code filtre facultatif. Le code filtre restreint les établissements qui contribuent à la valeur de l'indicateur — seuls les établissements pour lesquels l'expression de filtre s'évalue à TRUE sont inclus. Si vous saisissez un code filtre pour un point temporel, vous devez également fournir un code R pour ce même point temporel ; un filtre sans code R n'est pas valide et bloque l'enregistrement.

### Cohérence du code

Lorsqu'un indicateur s'applique à plusieurs points temporels, FASTR vérifie si le code d'extraction est cohérent. Un code incohérent peut être intentionnel (les questions de l'enquête changent d'un cycle à l'autre), mais il mérite d'être examiné. Utilisez **Tout revalider** après avoir effectué des modifications afin d'actualiser la validation de tous les indicateurs.

La liste des indicateurs affiche un résumé de l'état du code : **prêt** (aucune erreur ni avertissement), **avertissement** (problèmes consultatifs uniquement) et **erreur** (erreurs de syntaxe ou de variables inconnues). Les boutons **Tout revalider**, **Vérifier les variables inutilisées**, **Télécharger Excel** et **Importer Excel** sont désactivés lorsqu'aucune donnée HFA n'a encore été importée, car ces actions dépendent du dictionnaire de données de l'enquête.

### Supprimer des indicateurs

Avant de supprimer un indicateur ou un ensemble d'indicateurs, FASTR vérifie si d'autres indicateurs font référence aux noms de variables supprimés dans leur code R. Si des références sont trouvées, la boîte de dialogue de confirmation liste les indicateurs concernés et avertit que leur code échouera à la validation après la suppression.

### Assistant IA pour les indicateurs

Les administrateurs globaux peuvent ouvrir un panneau d'assistant IA directement dans le gestionnaire d'indicateurs HFA en cliquant sur le bouton **IA**. Ce bouton apparaît dans la barre supérieure du gestionnaire, ainsi que dans l'en-tête de l'éditeur de code et du formulaire de téléversement du classeur Excel lorsque le panneau n'est pas encore ouvert. L'assistant peut améliorer les libellés, organiser les indicateurs en catégories et créer de nouveaux indicateurs à partir du jeu de données d'enquête sous-jacent. Il lit et écrit les indicateurs via un ensemble d'outils dédiés - en chargeant l'état actuel avant de proposer des modifications, en validant le code R par rapport au dictionnaire de données et en affichant une boîte de dialogue de confirmation avec un diff avant d'appliquer toute modification. Lors de l'application de mises à jour groupées, toutes les modifications sont envoyées au serveur en une seule opération transactionnelle : soit tous les indicateurs sont mis à jour, soit aucun ne l'est, ce qui évite qu'un échec partiel ne laisse le jeu de données dans un état incohérent. L'assistant opère sur les indicateurs HFA au niveau de l'instance et est totalement isolé de l'assistant IA des projets.

### Gérer les catégories de service

Les catégories de service sont créées et gérées depuis l'onglet **Catégories de service** du gestionnaire d'indicateurs HFA. Cliquez sur **Ajouter** pour créer une nouvelle catégorie de service - vous fournissez un libellé et FASTR génère automatiquement un identifiant, que vous pouvez modifier. Vous pouvez réorganiser les catégories de service par glisser-déposer, et les modifier ou les supprimer individuellement. La suppression d'une catégorie de service la retire de tous les indicateurs qui lui sont actuellement associés. Les identifiants de catégorie de service ne peuvent pas contenir le caractère pipe (`|`).

### Téléversement de classeur Excel

Les indicateurs HFA prennent en charge la création par lot via un classeur Excel. Téléversez un classeur Excel (.xlsx) comportant quatre feuilles :

- **Categories** : id, label
- **Sub-categories** : id, categoryId, label
- **Service categories** : id, label (facultatif)
- **Indicators** : varName, categoryId, subCategoryId, serviceCategoryId (séparés par `|` pour plusieurs), shortLabel, definition, type, aggregation, r_code__&lt;point temporel&gt;, r_filter_code__&lt;point temporel&gt;, …

Si la feuille Service categories est absente, les indicateurs sont importés sans catégorie de service.

Lors de l'importation, choisissez entre les modes **Ajouter aux existants** et **Remplacer tous les existants**. En mode **Ajouter aux existants**, les indicateurs dont les noms de variables existent déjà sur la plateforme sont ignorés — seuls les nouveaux noms de variables sont créés. Après l'importation, un résumé liste les indicateurs ignorés. En mode **Remplacer tous les existants**, tous les indicateurs, catégories, sous-catégories et catégories de service existants sont définitivement supprimés avant l'importation. Pour confirmer une importation en mode remplacement, vous devez saisir `yes please delete` dans le champ de confirmation avant que le bouton **Importer** devienne actif.

FASTR détecte les colonnes de points temporels intégrées dans le fichier et présente une étape de mappage où vous confirmez à quel point temporel de la plateforme chaque colonne doit être importée. Si les libellés des colonnes correspondent exactement aux points temporels de votre plateforme, le mappage est pré-rempli automatiquement. Chaque point temporel de la plateforme ne peut recevoir qu'une seule colonne du classeur — mapper deux colonnes vers le même point temporel est refusé.

## Bonnes pratiques

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux tirets bas. Un identifiant peut être changé plus tard : un meilleur nom trouvé après la première importation n'est pas perdu.

Vérifiez les identifiants DHIS2 de la liste lorsque des éléments de données sont modifiés ou remplacés sur le serveur DHIS2. Un élément de données remplacé a un nouvel identifiant DHIS2 : créez un nouvel élément DHIS2 pour lui, et faites une somme sur l'ancien et le nouvel élément si la série doit continuer comme une seule. Pour les indicateurs dérivés, documentez vos choix de seuils - les futurs analystes voudront comprendre le raisonnement derrière les valeurs limites.
