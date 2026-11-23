---
title: Explorer
description: Parcourir les tableaux, graphiques et cartes d'un paquet de résultats.
sidebar:
  order: 4
---

La page **Explorer** vous permet de parcourir un paquet de résultats sans rien construire. Elle présente les résultats de chaque module sous forme de tableaux, de graphiques et de cartes prêts à l'emploi, pour vous permettre de vérifier des chiffres, de repérer des problèmes et de vous familiariser avec les données avant d'insérer une visualisation dans une présentation ou un rapport.

## Choisir ce que vous consultez
<!-- help#explore-choose -->

La barre en haut de la page détermine ce que vous explorez. Choisissez un **paquet de résultats** - le paquet épinglé est sélectionné pour vous - et une **portée**. Sélectionnez ensuite un onglet selon le type de données : **HMIS**, **FOSA** ou **ICEH**. Un onglet n'apparaît que si le paquet contient ces données.

Sous la barre, choisissez un **module** et, lorsque le module en propose plusieurs, une **vue**. Les vues sont organisées autour de questions courantes - des vues de qualité des données telles que **Valeurs aberrantes**, **Complétude** et **Cohérence interne**, des vues de couverture telles que **Couverture dans le temps** et **Couverture par zone**, des vues sur les services telles que **Perturbation des services**, et des vues HFA telles que **Indicateurs par vague d'enquête**. De nombreuses vues peuvent s'afficher sous forme de **Tableau**, **Dans le temps**, de **Graphique** ou sur une **Carte** - utilisez le sélecteur de type pour passer de l'une à l'autre.

FASTR mémorise le type de données, le module, la vue et le type d'affichage choisis pour la prochaine ouverture de la page.

![Page Explorer](/images/explore-page-fr.png)

## Affiner les résultats

La barre d'outils au-dessus des résultats vous permet de changer le niveau géographique (**National** ou un niveau de zone administrative inférieur), de sélectionner des zones ou des indicateurs particuliers, de choisir une période telle que **12 derniers mois** ou **Dernière année**, et de régler la granularité temporelle sur **Mois**, **Trimestre** ou **Année**.

En vue tableau, cliquez sur un en-tête de colonne pour trier, utilisez **Chercher une colonne** pour accéder directement à une colonne, et cliquez sur **Télécharger** pour enregistrer le tableau au format CSV.

## Explorer et votre portée

Explorer présente un paquet à travers une seule portée à la fois ; ce que vous voyez dépend donc de la portée choisie. Si vous êtes limité à des portées particulières, la liste des portées ne propose que les vôtres et la page s'ouvre sur la première d'entre elles.

Explorer est en lecture seule. Pour conserver un graphique, créez une visualisation sur la page Produits ou insérez-en une dans une présentation ou un rapport - voir [Visualisations](/fr/user-guide/visualizations/).

## Problèmes courants

**« Aucun paquet de résultats n'est encore prêt »** : votre administrateur n'a pas encore généré de paquet. Demandez-lui d'en générer un sur la page Résultats.

**« Aucune donnée pour cette sélection »** : les filtres ou la portée actuels ne laissent rien à afficher. Élargissez la période, choisissez un niveau géographique plus élevé ou changez de portée.

**Un module ou un onglet est absent** : le paquet n'inclut pas ce type de données ou ce module, ou votre portée l'exclut.
