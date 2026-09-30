---
title: Indicateurs
description: Définir et gérer les indicateurs de santé.
sidebar:
  order: 3
---

Les indicateurs sont les mesures de santé que votre instance FASTR suit - par exemple les taux de couverture vaccinale, les taux de complétude des rapports des établissements ou le nombre de consultations externes. Avant de pouvoir analyser des données, vous devez définir quels indicateurs sont pertinents et d'où proviennent leurs données. Cette page traite de la configuration des indicateurs pour les données HMIS et HFA.

## Indicateurs HMIS

Chaque indicateur HMIS est une ligne de la liste des indicateurs. Il n'existe pas de liste séparée d'identifiants DHIS2. Un élément DHIS2 est un indicateur qui porte l'identifiant DHIS2 d'un élément de données de votre serveur DHIS2. Un comptage qui arrive dans des fichiers CSV est un indicateur téléversé. Chaque importation CSV associe les valeurs de la colonne indicateur du fichier aux indicateurs auxquels elles appartiennent. Un total ou un taux est un indicateur construit à partir d'autres indicateurs.

C'est vous qui construisez la liste des indicateurs. Importer des données n'y ajoute jamais d'indicateur : une importation de données DHIS2 récupère les valeurs des éléments DHIS2 qui sont déjà des indicateurs, et une importation CSV ne peut ranger des lignes que sous des indicateurs qui existent déjà. Créez d'abord les indicateurs, dans cette liste ou avec **Ajouter depuis DHIS2**, puis importez les données.

L'identifiant et le libellé de l'indicateur sont des noms que vous donnez aux données, et vous pouvez les changer à tout moment sans déplacer une seule ligne. Les lignes de données d'un élément DHIS2 sont conservées sous son identifiant DHIS2, qui est fixe une fois que des données ont été importées sous lui. Les lignes d'un indicateur téléversé sont conservées sous un identifiant que FASTR gère pour lui ; vous ne le voyez jamais et ne le saisissez jamais.

### La liste des indicateurs
<!-- help#ind-list -->

La liste affiche chaque indicateur avec son identifiant, son libellé, son type, sa définition, sa case **Inclure** et, pour un indicateur calculé, son statut. L'en-tête au-dessus de la liste compte les indicateurs, ou indique combien correspondent lorsque vous effectuez une recherche. La colonne **Type** prend quatre valeurs :

- **Élément DHIS2** est un comptage récupéré depuis DHIS2. La colonne **Défini par** affiche l'identifiant DHIS2 de l'élément de données (ou de l'opérande, un élément de données restreint à une combinaison d'options de catégorie, écrit `UID.COC`) que l'importation récupère pour alimenter cet indicateur, avec le nom DHIS2 de l'élément en dessous lorsque FASTR le connaît.
- **Téléversé** est un comptage rempli par importation CSV. Sa colonne **Défini par** est vide : à l'étape Correspondance de chaque importation CSV, vous choisissez quelles valeurs du fichier lui appartiennent, et ce choix n'est pas conservé sur l'indicateur.
- **Somme** est le total d'autres indicateurs. La colonne **Défini par** liste ses membres. Les membres sont des éléments DHIS2 ou des indicateurs téléversés ; une somme ne peut pas contenir une somme. Les comptages des membres sont additionnés par établissement et par mois, et le résultat passe par le même ajustement de qualité des données que tout autre comptage.
- **Calculé** est une formule portant sur d'autres indicateurs et des populations, évaluée après l'ajustement et l'agrégation des données. La colonne **Défini par** affiche la formule.

Le bouton **Types d'indicateurs** explique les quatre types : d'où viennent les données de chaque type, si les modules de qualité des données les ajustent, si le type possède ses propres lignes de données, et quel format il peut avoir. Un élément DHIS2, un indicateur téléversé et une somme sont des comptages, et les modules de qualité des données les ajustent. Un élément DHIS2 et un indicateur téléversé sont les deux types qui possèdent leurs propres lignes de données ; une somme est lue à partir des lignes de ses membres, et un indicateur calculé est calculé à partir de sa formule après l'ajustement et l'agrégation des données. Les mêmes informations apparaissent sous le sélecteur de type lorsque vous créez ou modifiez un indicateur.

Chaque indicateur possède un identifiant (comme `anc1`), un libellé et une case à cocher **Inclure dans l'analyse**. Certains identifiants portent la mention **Spécial** : les modules d'analyse les lisent par leur nom, un indicateur portant un identifiant spécial est donc toujours analysé (sa case **Inclure dans l'analyse** est cochée et ne peut pas être décochée), et ne peut pas être un indicateur calculé. Une nouvelle instance démarre avec une liste vide. Le bouton **Indicateurs spéciaux et mots réservés** liste les identifiants spéciaux, les identifiants de population et les mots réservés. Créez ceux dont vos données ont besoin, comme n'importe quel autre indicateur.

La zone de recherche fait correspondre chaque mot saisi avec l'identifiant, le libellé, le nom DHIS2, le type et la définition de chaque indicateur : vous pouvez donc retrouver un élément DHIS2 par son nom DHIS2 sans connaître son identifiant.

Pour créer un indicateur à la main, cliquez sur **Créer**, choisissez le type et remplissez la définition. Un élément DHIS2 possède un champ **Identifiant DHIS2**, obligatoire. Un indicateur téléversé n'a pas de champ de définition : vous lui donnez un identifiant et un libellé, et chaque importation CSV décide quelles valeurs du fichier lui appartiennent. Une somme possède un sélecteur de membres. Un indicateur calculé possède un champ de formule. Un identifiant d'indicateur ne peut pas contenir de virgules, de points-virgules, de deux-points ni de crochets, et doit comporter au maximum 128 caractères. Les identifiants de population et les noms de fonctions ne peuvent pas servir d'identifiants d'indicateurs, et un identifiant spécial ne peut être donné qu'à un élément DHIS2, un indicateur téléversé ou une somme.

Chaque indicateur possède aussi une **Direction**, plus élevé est meilleur ou plus bas est meilleur, que sa règle de mise en forme conditionnelle suit. Un élément DHIS2, un indicateur téléversé ou une somme possède une case **Faibles comptages attendus** ; lorsqu'elle est cochée, les modules d'ajustement traitent les comptages mensuels par établissement de cet indicateur comme attendus faibles.

Un élément DHIS2 créé avec **Ajouter depuis DHIS2** porte aussi le **Nom DHIS2** de l'élément, lu dans DHIS2 à ce moment-là. Il est affiché sous l'identifiant DHIS2 dans l'éditeur et dans la liste, pour distinguer les éléments sans les rechercher dans DHIS2. Vous ne le saisissez jamais. Changer l'identifiant DHIS2 l'efface. Lorsque des noms d'éléments changent dans DHIS2, choisissez **Actualiser les noms DHIS2** dans le menu de débordement de la barre d'outils : FASTR lit le nom actuel de chaque élément DHIS2 par son identifiant DHIS2 et l'enregistre, laisse le nom stocké inchangé pour les identifiants que DHIS2 n'a plus, et indique combien de noms ont été mis à jour, combien étaient déjà à jour et quels identifiants n'ont pas été trouvés. Les libellés, les identifiants et les données ne sont pas touchés.

Pour renommer un indicateur, ouvrez-le et changez son identifiant. Renommer réécrit chaque formule et chaque importation planifiée qui nomme l'indicateur. Ses données restent en place, et les paquets de résultats déjà générés conservent l'ancien identifiant. Un identifiant spécial peut aussi être renommé, mais les modules d'analyse ne le trouvent alors plus, jusqu'à ce qu'un comptage porte à nouveau cet identifiant. Le nouvel identifiant est refusé si un autre indicateur le porte déjà, ou s'il s'agit d'un mot réservé.

Un identifiant DHIS2 ne peut pas être modifié tant que l'indicateur possède des données. Pour donner un autre nom aux données, renommez plutôt l'indicateur. Un élément DHIS2 peut devenir un indicateur téléversé à tout moment et conserve ses données. Un indicateur téléversé peut devenir un élément DHIS2 tant qu'il n'a pas de données ; il prend alors l'identifiant DHIS2 que vous saisissez, au format de DHIS2. Faire passer un élément DHIS2 ou un indicateur téléversé à une somme ou à un indicateur calculé est refusé tant qu'il possède des données ou tant qu'une somme le compte parmi ses membres.

La suppression d'un indicateur est refusée tant qu'il possède des données, tant qu'une somme le compte parmi ses membres, ou tant que la formule d'un autre indicateur en a besoin.

Lorsqu'un administrateur global sélectionne des lignes dans la liste, quatre actions deviennent disponibles. **Importer les données HMIS depuis DHIS2** ouvre l'assistant d'importation DHIS2 avec les indicateurs sélectionnés déjà choisis à son étape Indicateurs (voir Données HMIS) ; un indicateur téléversé parmi eux est laissé de côté, et l'étape le signale. Après le lancement, un message dans la liste indique où suivre l'exécution. **Inclure dans l'analyse** et **Exclure de l'analyse** règlent la case de chaque indicateur sélectionné. **Supprimer** retire les indicateurs sélectionnés, selon les règles ci-dessus.

Un administrateur global peut aussi cliquer sur **Trier** pour fixer l'ordre de la liste. L'ordre enregistré est celui de chaque axe d'indicateurs dans chaque figure.

:::caution[Capture d'écran à ajouter]
La liste des indicateurs montrant les colonnes Type, Défini par, Inclure et Statut.
:::

### Ajouter des indicateurs depuis DHIS2
<!-- help#ind-dhis2-import -->

Cliquez sur **Ajouter depuis DHIS2** pour ajouter des éléments de données de votre serveur DHIS2 à la liste, sous forme d'éléments DHIS2. FASTR utilise la connexion DHIS2 enregistrée de l'instance, définie dans la carte **Connexion DHIS2** de la page Données. Recherchez par nom, code ou identifiant. Les résultats listent des éléments de données et des indicateurs DHIS2, et chaque ligne indique si l'élément peut être ajouté. Un élément de données ne peut être ajouté que si DHIS2 le décrit comme un comptage mensuel additif : type d'agrégation somme, type de valeur nombre ou entier, et au moins un ensemble de données mensuel. Tout le reste est refusé, avec la raison affichée.

Ajoutez les éléments voulus, puis cliquez sur **Suivant : nommer les indicateurs**. L'étape de nommage affiche chaque élément avec un identifiant proposé d'après son nom DHIS2, que vous pouvez modifier avant d'enregistrer ; vous pourrez aussi renommer l'indicateur plus tard. Un identifiant qui appartient déjà à un indicateur est refusé. Un élément de données dont l'identifiant DHIS2 figure déjà dans la liste est affiché comme déjà ajouté et ne crée rien.

Un indicateur DHIS2 (une formule dans DHIS2, comme un taux de couverture) n'est jamais ajouté sous forme de valeurs. FASTR lit son numérateur et son dénominateur, ajoute chaque élément de données qu'ils utilisent comme un élément DHIS2 à part entière, et crée un indicateur calculé avec la formule `(numérateur) / (dénominateur)` sur ces indicateurs, multipliée par 1000 lorsque le facteur de l'indicateur DHIS2 est 1000. Une formule DHIS2 que FASTR ne peut pas exprimer est refusée, et le message nomme la partie de la formule qui l'a bloquée : tout ce qui n'est pas un élément de données, un opérande, un nombre, l'un des quatre opérateurs arithmétiques ou une parenthèse, par exemple un indicateur de programme, un groupe d'unités d'organisation ou une fonction ; un facteur autre que 1, 100, 1000 ou 10 000 ; un indicateur annualisé ; ou plus de huit éléments de données.

Ajouter un élément de données ne fait que l'inscrire dans la liste. Pour récupérer ses données, sélectionnez les nouveaux indicateurs dans la liste et choisissez **Importer les données HMIS depuis DHIS2**, ou lancez une importation depuis Données HMIS.

:::caution[Capture d'écran à ajouter]
L'étape de nommage montrant les identifiants proposés pour deux éléments de données et l'aperçu de la formule d'un indicateur DHIS2 décomposé.
:::

### Sommes

Une somme additionne les comptages de ses membres par établissement et par mois. Utilisez-la lorsque le même service est rapporté sous plusieurs éléments de données, par exemple un vaccin enregistré sous un élément pour les séances fixes et un autre pour les séances avancées. Créez-la avec **Créer**, choisissez le type **Somme** et sélectionnez les membres parmi les éléments DHIS2 et les indicateurs téléversés de la liste. Une somme a besoin d'au moins un membre.

### Indicateurs calculés
<!-- help#ind-calculated -->

Un indicateur calculé est défini par une formule portant sur d'autres indicateurs, par exemple `anc4 / anc1` pour un taux de couverture. Il est calculé après l'agrégation des données : un chiffre régional ou annuel est donc la formule appliquée aux valeurs additionnées, et non une moyenne de ratios.

Une formule peut utiliser `+`, `-`, `*`, `/`, des parenthèses et des nombres, ainsi que les fonctions `abs()` (valeur absolue), `coalesce()` (la première valeur non vide) et `nullif()` (vide lorsque les deux valeurs sont égales). Elle ne se limite pas à un numérateur et un dénominateur : `(anc1 - anc4) / anc1` est une définition valide, tout comme n'importe quelle combinaison de trois indicateurs ou plus. Une formule peut faire référence à une somme, qui compte comme un seul ingrédient, ou à un autre indicateur calculé, dont la définition est insérée à la place de son identifiant.

Une formule peut aussi diviser par une population, écrite avec l'identifiant du type de population, par exemple `anc4 / population_pregnancies`. Les populations proviennent de la page Population de l'instance (Données → Population) : des effectifs annuels de population par unité administrative et par type de population, téléversés sous forme de CSV. Une valeur divisée par une population est annualisée, de sorte qu'une valeur mensuelle se lit comme un taux annuel. Les valeurs ne sont calculées que pour les unités et les mois couverts par les données de population. Un paquet de résultats ne peut pas être généré tant qu'une formule utilise un type de population qui n'a aucune donnée.

Vous n'avez pas à saisir les identifiants à la main : les sélecteurs **Insérer un indicateur** et **Insérer une population** au-dessus du champ de formule les insèrent au curseur, correctement écrits. La légende sous le champ liste chaque identifiant utilisé par la formule avec son libellé et, pour une population, la part des données qu'elle couvre. Écrivez un identifiant tel quel s'il commence par une lettre minuscule et ne contient que des lettres minuscules, des chiffres et des tirets bas ; sinon, mettez-le entre crochets, comme `[ANC.1]`. Un nom de fonction utilisé comme identifiant est toujours entre crochets.

Vous définissez également le format d'affichage (nombre, pourcentage ou taux pour 10 000), si vous le souhaitez une cible dans les unités d'affichage, et si vous le souhaitez une règle de mise en forme conditionnelle pour le codage couleur, par exemple vert au-dessus de 80 % et jaune entre 70 % et 80 %. Seul un indicateur calculé possède ces réglages. Un élément DHIS2, un indicateur téléversé ou une somme est un comptage : il s'affiche toujours comme un nombre et n'a ni cible ni règle de mise en forme conditionnelle. Lorsque la source de mise en forme conditionnelle d'une visualisation est **Indicateur**, chaque valeur est colorée selon la règle de son propre indicateur.

L'éditeur vérifie la formule au fur et à mesure de la saisie et affiche le problème sous le champ. Il refuse une formule qui ne peut pas être lue, qui nomme un indicateur inexistant, qui se réfère à elle-même, ou qui nécessite plus de huit ingrédients (indicateurs et populations) une fois développé chaque indicateur calculé auquel elle fait référence. La colonne **Statut** de la liste indique si chaque indicateur calculé peut être calculé, et un avertissement au-dessus de la liste le signale dès que l'un d'eux ne le peut pas. Une formule qui utilise un indicateur sans données peut être enregistrée, mais les résultats ne peuvent pas être générés tant que ces données ne sont pas importées.

:::caution[Capture d'écran à ajouter]
L'éditeur d'un indicateur calculé, montrant le champ de formule, les sélecteurs, la légende et le format.
:::

### Inclure dans l'analyse
<!-- help#ind-include -->

Chaque indicateur possède une case à cocher **Inclure dans l'analyse**. Lorsqu'elle est cochée, chaque paquet de résultats analyse l'indicateur : les modules de qualité des données l'ajustent et il est disponible dans les visualisations. Lorsqu'elle est décochée, l'indicateur n'existe que dans le dictionnaire. Ses données sont toujours importées et stockées, il peut toujours être membre d'une somme et être utilisé dans une formule, mais aucun paquet ne le porte en tant que tel.

C'est ainsi que vous conservez un élément de données pour l'utiliser dans un total ou un taux sans qu'il apparaisse dans les résultats. Un indicateur spécial est toujours analysé. Lorsqu'un indicateur calculé inclus utilise un indicateur qui ne l'est pas, l'éditeur le signale, et le paquet inclut cet indicateur malgré tout.

### Télécharger la liste

**Télécharger**, dans le menu de débordement de la barre d'outils, écrit toute la liste dans `indicators.csv`, pour la relire ou la partager. Les colonnes sont `indicator_id`, `label`, `type`, `dhis2_id`, `dhis2_label`, `members`, `expression`, `include_in_analysis`, `format_as`, `thresholds`, `direction`, `target` et `expected_low_counts`. Le `type` est `uploaded`, `dhis2_element`, `sum` ou `calculated`. Les colonnes `dhis2_id` et `dhis2_label` contiennent l'identifiant DHIS2 et le nom DHIS2 d'un `dhis2_element` et sont vides pour les autres types. Pour une somme, `members` liste les identifiants des membres séparés par des points-virgules. Pour un indicateur calculé, `expression` est la formule, `format_as` vaut `number`, `percent` ou `rate_per_10k`, `thresholds` est sa règle de mise en forme conditionnelle et `target` est sa cible ; les autres types sont toujours `number` et n'ont ni règle ni cible. Le fichier ne peut pas être réimporté dans FASTR ; vous modifiez la liste dans l'application.

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

Choisissez des identifiants d'indicateurs courts mais descriptifs. Évitez les espaces et les caractères spéciaux - tenez-vous-en aux lettres minuscules, aux chiffres et aux tirets bas. Un identifiant peut être changé plus tard : un meilleur nom trouvé après la première importation n'est pas perdu.

Vérifiez les identifiants DHIS2 de la liste lorsque des éléments de données sont modifiés ou remplacés sur le serveur DHIS2. Un élément de données remplacé a un nouvel identifiant DHIS2 : créez un nouvel élément DHIS2 pour lui, et faites une somme sur l'ancien et le nouvel élément si la série doit continuer comme une seule. Pour les indicateurs calculés, documentez vos choix de seuils - les futurs analystes voudront comprendre le raisonnement derrière les valeurs limites.
