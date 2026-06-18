---
title: Visualisations
description: Créer et personnaliser des graphiques, des cartes et des tableaux.
sidebar:
  order: 3
---

Une fois que vos modules ont traité les données, vous voudrez en voir les résultats. Les visualisations sont le moyen de transformer des résultats analytiques bruts en graphiques, cartes et tableaux qui racontent une histoire. Vous pouvez les personnaliser, les exporter sous forme d'images ou les ajouter à des présentations.

## Types de visualisations

FASTR propose quatre types de visualisations, chacun adapté à des questions différentes. Un **graphique** convient bien lorsque vous comparez des valeurs entre catégories - par exemple, les consultations externes par type d'établissement, ou les taux de couverture entre districts. Les visualisations **chronologiques** montrent comment un indicateur évolue dans le temps, ce qui les rend utiles pour repérer des tendances ou des variations saisonnières. Les **cartes** affichent les données géographiquement, ce qui aide lorsque vous souhaitez visualiser d'un coup d'œil les variations régionales. Les **tableaux** vous donnent l'intégralité du détail numérique lorsque vous avez besoin de valeurs précises ou que vous souhaitez examiner plusieurs dimensions à la fois.

Le type que vous choisissez dépend de la question à laquelle vous répondez. Si quelqu'un demande « comment nos districts se comparent-ils ? », une carte ou un graphique est pertinent. S'il demande « quel est le chiffre exact pour le district X en mars ? », un tableau est plus utile.

:::caution[Capture d'écran à ajouter]
Exemples côte à côte de chaque type de visualisation (graphique, chronologie, carte, tableau) présentant le même indicateur.
:::

## Trouver et parcourir les visualisations

Ouvrez votre projet et cliquez sur **Visualisations** dans la barre de navigation à gauche. La liste affiche toutes les visualisations du projet, organisées en dossiers. Vous pouvez effectuer une recherche par nom à l'aide de la zone de recherche en haut, ce qui est utile dès qu'un projet accumule des dizaines de visualisations.

Certaines visualisations apparaissent avec un badge « par défaut » - elles sont créées automatiquement par les modules et ne peuvent pas être modifiées directement. Si vous souhaitez modifier une visualisation par défaut, l'ouvrir créera une copie modifiable que vous pourrez personnaliser et enregistrer comme la vôtre.

:::caution[Capture d'écran à ajouter]
Vue en liste des visualisations montrant les dossiers, la zone de recherche et le bouton « Créer une visualisation ».
:::

## Créer une visualisation
<!-- help#viz-create -->

Chaque visualisation commence par un indicateur. Les indicateurs sont les résultats analytiques produits par vos modules - des éléments comme le « taux de couverture CPN1 » ou le « score de complétude des données ». Lorsque vous créez une visualisation, vous décidez comment afficher l'un de ces indicateurs.

Cliquez sur **Créer une visualisation** pour commencer. La première étape vous demande de sélectionner un indicateur. Vous pouvez parcourir par module (utile si vous savez quelle analyse a produit le résultat souhaité) ou rechercher par nom. Une fois l'indicateur sélectionné, vous choisirez comment le visualiser.

:::caution[Vidéo à ajouter]
Démonstration de la création d'une visualisation du début à la fin : sélection d'un indicateur, choix d'un modèle prédéfini et arrivée dans l'éditeur.
:::

### Modèles prédéfinis vs. configuration personnalisée

Après avoir sélectionné un indicateur, vous verrez une liste de modèles prédéfinis. Les modèles prédéfinis sont des configurations toutes faites créées par les auteurs des modules - ils représentent des façons courantes de visualiser cet indicateur particulier. Si un modèle prédéfini correspond à vos besoins, sélectionnez-le et c'est terminé. La visualisation s'ouvre dans l'éditeur, prête à être utilisée ou ajustée.

Si aucun des modèles prédéfinis ne convient, choisissez **Personnalisé**. Cela vous permet de choisir le type de visualisation (graphique, chronologie, carte ou tableau) et de configurer la manière de désagréger les données. La désagrégation consiste à décomposer un chiffre unique en vues plus spécifiques - au lieu de « total des consultations externes », vous pourriez afficher les consultations par mois, par type d'établissement ou par district.

Toutes les désagrégations ne fonctionnent pas avec tous les types de visualisations. Par exemple, la désagrégation géographique est pertinente pour les cartes mais pas pour les chronologies. L'interface vous indique quelles options sont disponibles en fonction du type que vous avez choisi.

Certains types de graphiques ont des exigences spécifiques en matière de données. Le graphique des perturbations, par exemple, compare deux valeurs de données (réelle et attendue) sous forme de deux séries et ombre la différence entre elles. Si vous sélectionnez un graphique des perturbations, assurez-vous que les deux valeurs de données sont configurées - le graphique affichera un message d'erreur vous invitant à ajouter la deuxième valeur de données ou à désactiver le mode perturbations si une seule est présente.

:::caution[Capture d'écran à ajouter]
Étape 2 du processus de création montrant les cartes de modèles prédéfinis avec leurs aperçus, ainsi que l'option « Personnalisé ».
:::

## L'éditeur de visualisation

Une fois que vous avez créé ou ouvert une visualisation, vous vous trouvez dans l'éditeur. Le panneau de gauche contient toutes les options de configuration, organisées en trois onglets. La partie droite affiche un aperçu en direct qui se met à jour au fur et à mesure de vos modifications - vous pouvez voir immédiatement comment vos ajustements affectent le résultat.

:::caution[Capture d'écran à ajouter]
Vue complète de l'éditeur avec le panneau de gauche ouvert affichant les trois onglets, et un aperçu de graphique à droite.
:::

### Onglet Données
<!-- help#viz-data-tab -->

L'onglet Données contrôle quelles informations apparaissent dans la visualisation. C'est ici que vous restreignez la plage temporelle, ajoutez ou supprimez des désagrégations, ou filtrez sur des valeurs spécifiques.

Les filtres de période vous permettent de vous concentrer sur une fenêtre temporelle particulière. Si votre projet contient trois années de données mais que vous souhaitez n'afficher que les six derniers mois, c'est ici que vous le définissez. Les désagrégations vous permettent de décomposer les données - ajouter une désagrégation « type d'établissement » à un graphique afficherait des barres distinctes pour les hôpitaux, les centres de santé et les dispensaires au lieu d'un total unique.

Pour les désagrégations par zone administrative, vous pouvez inclure une ligne de total en cochant l'option **Inclure les résultats nationaux** (ou **Inclure les résultats de toutes les zones sélectionnées** lorsque la visualisation est limitée à une zone parente spécifique). Cette ligne de total apparaît en haut ou en bas du graphique ou du tableau selon le paramètre de position. L'option est disponible lorsqu'exactement un niveau de zone administrative est désagrégé, que ce niveau n'est pas affiché comme réplicant ou zone cartographique, et qu'il n'est pas filtré sur une seule valeur ; elle n'est pas non plus disponible sur les cartes. De plus, l'indicateur doit permettre l'agrégation entre zones - si ce n'est pas le cas, la case à cocher apparaît désactivée avec une explication.

Si une visualisation semble incorrecte ou affiche des résultats inattendus, l'onglet Données est généralement le premier endroit à vérifier. Un problème courant est d'avoir trop de désagrégations actives, ce qui peut rendre le résultat encombré ou difficile à lire.

:::caution[Capture d'écran à ajouter]
Onglet Données déployé montrant le filtre de période, les options de désagrégation et les commandes de filtre de valeurs.
:::

### Onglet Présentation

L'onglet Présentation ajuste l'apparence de la visualisation. Pour les graphiques, vous pouvez changer les couleurs, afficher ou masquer les étiquettes de données et configurer les plages des axes. Pour les cartes, vous pouvez ajuster l'échelle de couleurs et le style des frontières. Les tableaux disposent d'options pour la largeur des colonnes et le formatage des nombres.

Pour les graphiques à nuages de points utilisant l'affichage **points**, vous pouvez activer **Ajouter des connecteurs** pour tracer des lignes entre les points dans l'ordre des séries. Cela est utile lorsque vous souhaitez montrer à la fois la position individuelle des données et la trajectoire qui les relie.

Ces paramètres ne modifient pas les données affichées - seulement la manière dont elles le sont. Si vous souhaitez un rendu plus épuré pour une présentation, ou si vous devez respecter la charte de couleurs de votre organisation, c'est ici que vous effectuez ces ajustements.

:::caution[Capture d'écran à ajouter]
Onglet Présentation pour un graphique montrant le sélecteur de palette de couleurs et les options de configuration des axes.
:::

### Onglet Texte

L'onglet Texte ajoute du contexte à votre visualisation à travers trois champs de texte. Le **titre** apparaît au-dessus de la visualisation comme titre principal. Le **sous-titre** se place sous le titre et est utile pour un contexte supplémentaire - comme la période couverte ou la source des données. La **note de bas de page** apparaît en bas et sert généralement à des remarques méthodologiques ou à des mises en garde sur les données.

De bons titres rendent les visualisations explicites en elles-mêmes. Une personne consultant le graphique dans une présentation ne devrait pas avoir besoin de lire le texte environnant pour comprendre ce qu'elle regarde.

:::caution[Capture d'écran à ajouter]
Onglet Texte montrant les champs titre, sous-titre et note de bas de page avec un exemple de texte rempli.
:::

## Enregistrer et organiser

Cliquez sur **Enregistrer** lorsque vos modifications vous conviennent. Si vous créez une nouvelle visualisation, vous serez invité à lui donner un nom et, éventuellement, à l'affecter à un dossier.

Les dossiers aident à garder les choses organisées à mesure que votre projet grandit. Vous pourriez créer des dossiers par thème (« Indicateurs de couverture », « Qualité des données »), par public (« Présentation au ministère », « Revue interne ») ou par période (« Analyse T1 2024 »). Pour déplacer une visualisation vers un dossier, cliquez sur l'icône de dossier à côté de celle-ci dans la vue en liste.

Si vous souhaitez créer une variante d'une visualisation existante - par exemple, le même graphique mais filtré sur une autre région - ouvrez l'original et utilisez **Enregistrer comme nouveau** depuis le menu. Cela crée une copie que vous pouvez modifier sans affecter l'original.

## Exporter

### Images

Pour télécharger une visualisation sous forme d'image, ouvrez-la dans l'éditeur et cliquez sur **Télécharger**. Vous pouvez choisir le format PNG (idéal pour les présentations et les documents) ou SVG (idéal pour une retouche ultérieure ou une impression haute résolution). L'image exportée inclut le titre et la note de bas de page si vous les avez définis.

### Données

Parfois, vous avez besoin des chiffres sous-jacents, pas seulement de l'image. Cliquez sur **Télécharger** et sélectionnez **CSV** pour obtenir un fichier compatible avec les tableurs contenant les données derrière la visualisation. C'est utile lorsque vous devez effectuer une analyse supplémentaire dans Excel ou partager des chiffres exacts avec des collègues.

:::caution[Capture d'écran à ajouter]
Menu de téléchargement montrant les options d'export PNG, SVG et CSV.
:::

## Problèmes courants

**La visualisation affiche « aucune donnée »** : Vérifiez que vos modules ont terminé leur exécution et que l'indicateur dispose de données pour la période et les filtres que vous avez sélectionnés. Si la fenêtre de données du projet n'inclut pas les dates sur lesquelles vous filtrez, rien ne s'affichera.

**Le graphique semble encombré ou difficile à lire** : Vous avez peut-être trop de désagrégations actives. Essayez d'en supprimer une ou de filtrer sur moins de valeurs. Parfois, un tableau est un meilleur choix qu'un graphique lorsque vous avez de nombreuses catégories.

**Le graphique des perturbations affiche une erreur indiquant des valeurs de données manquantes** : Ce graphique nécessite une valeur de données réelle et une valeur attendue pour calculer la comparaison. Ouvrez l'onglet Données et ajoutez la deuxième valeur de données, ou choisissez un autre type de graphique.

**Les modifications n'apparaissent pas** : Assurez-vous d'avoir cliqué sur **Enregistrer**. L'aperçu se met à jour en direct, mais vos modifications ne sont pas conservées tant que vous n'enregistrez pas. Si vous quittez la page sans enregistrer, vous perdrez vos modifications.
