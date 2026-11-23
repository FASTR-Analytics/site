---
title: Visualisations
description: Créer et personnaliser des graphiques, des cartes et des tableaux.
sidebar:
  order: 3
---

Les visualisations transforment les résultats d'un paquet de résultats en graphiques, cartes et tableaux. Vous pouvez enregistrer une visualisation comme produit à part entière sur la page Produits, ou placer des visualisations dans des présentations et des rapports. Dans tous les cas, vous les construisez et les ajustez avec le même éditeur.

## Types de visualisation

FASTR propose plusieurs types de visualisation, chacun adapté à des questions différentes. Un **graphique à barres** compare des valeurs entre catégories - les consultations externes par type d'établissement, ou la couverture selon les districts. Une **série chronologique** montre l'évolution d'une métrique dans le temps, ce qui aide à repérer les tendances et les variations saisonnières. Une **carte** montre d'un coup d'œil les variations régionales. Un **tableau** donne le détail numérique complet lorsque vous avez besoin de valeurs précises. Un **graphique circulaire** montre comment un total se répartit entre ses composantes.

Le type à choisir dépend de la question. « Comment nos districts se comparent-ils ? » se prête à une carte ou à un graphique à barres. « Quel est le chiffre exact pour le district X en mars ? » se prête à un tableau.

![Un graphique en barres, une carte, une série temporelle et un tableau](/images/visualizations-types-fr.png)

## Créer une visualisation
<!-- help#viz-create -->

Chaque visualisation part d'une **métrique** - un résultat produit par l'un des modules du paquet, comme « couverture CPN1 » ou « complétude des rapports ».

Pour enregistrer une visualisation comme produit à part entière, allez sur la page **Produits**, cliquez sur **Nouveau** et choisissez **Nouvelle visualisation**. Choisissez un paquet de résultats et une portée, cliquez sur **Suivant**, puis suivez trois étapes :

1. **Métrique** - parcourez les modules ou recherchez la métrique souhaitée. **Résultats principaux** regroupe les métriques les plus utilisées.
2. **Préréglages** - choisissez l'une des vues prêtes à l'emploi fournies par le module. Chacune affiche un aperçu en direct. Choisir un préréglage crée immédiatement la visualisation.
3. **Configurer** - si aucun préréglage ne convient, choisissez **Personnalisé**, puis choisissez le **Type de visualisation** et les dimensions de **Désagréger par**.

![L'étape Préréglages de l'assistant Insérer une visualisation](/images/visualizations-create-fr.png)

La visualisation prend le nom de sa métrique et est enregistrée dans le dossier **Général**. Renommez-la depuis l'en-tête de l'éditeur.

Dans une présentation ou un rapport, les trois mêmes étapes apparaissent lorsque vous insérez une nouvelle visualisation. La visualisation utilise alors le paquet et la portée de la présentation ou du rapport.

## Réutiliser une visualisation enregistrée

Lorsque vous ajoutez une visualisation à une diapositive ou à un rapport, vous pouvez choisir **Insérer une visualisation existante** et sélectionner une visualisation enregistrée. FASTR insère une **copie**. Les modifications apportées à la copie n'affectent pas la visualisation enregistrée, et les modifications ultérieures de la visualisation enregistrée n'affectent pas la copie. Vous pouvez ainsi constituer une bibliothèque de graphiques standard que chacun peut reprendre dans son propre travail.

## L'éditeur de visualisation

L'éditeur affiche un aperçu en direct à droite et les paramètres à gauche, répartis en trois onglets. Les modifications apparaissent immédiatement dans l'aperçu.

![Éditeur de visualisation](/images/visualizations-editor-fr.png)

### Onglet Données
<!-- help#viz-data-tab -->

L'onglet Données définit les informations affichées. **Type de présentation** permet de passer d'un tableau à une série chronologique, un graphique à barres, un graphique circulaire ou une carte. Dans une visualisation enregistrée, **Changer d'indicateur** permet de recommencer avec une autre métrique.

**Filtre (sous-ensemble)** restreint les données - le plus souvent la **Période**, comme les 12 derniers mois ou la dernière année civile complète, mais aussi certaines zones ou certains indicateurs. **Affichage (désagréger)** ventile les chiffres. Ajouter le type d'établissement à un graphique à barres, par exemple, affiche des barres distinctes pour les hôpitaux, les centres de santé et les dispensaires au lieu d'un total unique.

Choisissez **Graphiques multiples (réplicants)** pour une dimension afin de créer un graphique par valeur - un par région, par exemple. Une bande au-dessus de l'aperçu permet alors de choisir celui à afficher, avec des boutons précédent et suivant pour les parcourir.

Lorsque vous ventilez les résultats par zone administrative, vous pouvez ajouter une ligne de total avec **Inclure les résultats nationaux**. Cette option n'est proposée que lorsque la métrique peut être additionnée entre zones.

Si une visualisation semble incorrecte, l'onglet Données est généralement le premier endroit à vérifier. Trop de désagrégations à la fois rendent souvent un graphique surchargé.

### Onglet Présentation
<!-- help#viz-presentation-tab -->

L'onglet Présentation modifie l'apparence de la visualisation sans changer les données. Les options dépendent du type : échelles de couleurs, étiquettes de données, nombre de décimales, légende, plages des axes, barres empilées, projection de la carte et étiquettes des régions, et ordre personnalisé des valeurs.

**Mise en forme conditionnelle** colore les valeurs selon qu'elles sont bonnes ou mauvaises. Choisissez **Indicateur** pour utiliser les règles définies pour chaque indicateur par votre administrateur, **Échelle** pour un dégradé de couleurs, ou **Seuils** pour définir vos propres valeurs limites avec un sens tel que **Plus élevé = meilleur**.

### Onglet Texte

L'onglet Texte apporte du contexte. Le **Titre** est l'intitulé principal, le **Sous-titre** se place juste en dessous et la **Note de bas de page** figure en bas - pratique pour les sources de données et les mises en garde. Vous pouvez saisir `PLAGE_DE_DATES` pour insérer la période couverte, ou `REPLICANT` pour insérer le nom du réplicant affiché.

De bons titres rendent une visualisation compréhensible par elle-même. Une personne qui la voit sur une diapositive ne devrait avoir besoin de rien lire d'autre pour la comprendre.

## Enregistrement

Une visualisation enregistrée est sauvegardée automatiquement au fil de votre travail, et vos collègues peuvent la modifier en même temps que vous. Utilisez **Historique** dans l'en-tête pour consulter et restaurer des versions antérieures - voir [Produits](/fr/user-guide/products/).

Lorsque vous modifiez une visualisation dans une présentation ou un rapport, l'éditeur affiche **Appliquer** et **Annuler** dès que vous faites une modification ; cliquez sur **Appliquer** pour reporter vos modifications sur la diapositive ou la page.

## Visualisations obsolètes

Lorsqu'un produit est déplacé vers un paquet de résultats plus récent ou une autre portée, ou que les limites de sa portée changent, ses visualisations sont signalées comme obsolètes. Un badge indique le paquet dont elles proviennent, avec un bouton pour les mettre à jour vers le paquet actuel. Dans une présentation ou un rapport, **Mettre à jour toutes les visualisations** dans l'en-tête les met toutes à jour en une fois. Les visualisations enregistrées affichent **Pas à jour** sur la page Produits.

## Téléchargement
<!-- help#viz-download -->

Cliquez sur **Télécharger** dans l'éditeur et choisissez un format :

- **Image** - un fichier PNG, sur fond blanc ou transparent, avec ou sans marges
- **Données agrégées pour la visualisation** - un fichier CSV des chiffres derrière le graphique
- **Données du tableau (telles qu'affichées)** - pour les tableaux, un fichier CSV présenté tel que vous le voyez
- **Données du fichier de résultats** - le fichier de résultats complet du module pour cette métrique

## Problèmes courants

**« Aucune donnée disponible avec la sélection de filtre actuelle »** : les filtres ne laissent rien à afficher, ou le paquet ne contient pas de données pour cette période. Élargissez la période ou retirez un filtre.

**Le graphique est surchargé ou difficile à lire** : retirez une désagrégation, filtrez sur moins de valeurs ou essayez plutôt un tableau.

**« Trop de points de données »** : la visualisation comporterait trop de barres ou de lignes pour être affichée. Retirez une désagrégation ou réduisez la période.

**Les chiffres semblent anciens** : le produit utilise un paquet de résultats plus ancien. Vérifiez l'étiquette du paquet dans l'en-tête de l'éditeur et mettez-le à jour si un paquet plus récent est disponible.
