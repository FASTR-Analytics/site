---
title: Modules
description: D'où viennent les résultats, et comment trouver les sorties d'un module.
sidebar:
  order: 2
---

Les modules sont les analyses derrière chaque chiffre de FASTR. Lorsque votre administrateur génère un paquet de résultats, chaque module exécute un script R sur les données de l'instance - vérification de la qualité des données, ajustement des volumes de services pour les valeurs aberrantes et les rapports manquants, estimation de la couverture, analyse des cycles d'enquête - et enregistre ce qu'il trouve. Vous n'avez pas besoin d'écrire ni de lire du code pour utiliser les résultats. Il est utile de savoir de quel module provient un chiffre lorsque vous voulez le comprendre ou le vérifier.

## Ce que produisent les modules

Chaque module produit des **métriques** : les valeurs que vous pouvez afficher dans une visualisation, comme la complétude de la notification, les volumes de services ajustés ou la couverture de la première consultation prénatale. Un seul module peut produire des dizaines de métriques.

Les modules sont regroupés selon le type de données qu'ils utilisent. **Utilisation des services** est le module HMIS principal, avec des analyses complémentaires pour la qualité des données, les ajustements de la qualité des données, la détection des perturbations et la couverture. **Évaluation des établissements de santé** analyse les cycles d'enquête FOSA, et **Analyse de l'enquête ICEH** analyse les données d'équité ICEH. Un paquet de résultats ne contient que les modules choisis par votre administrateur et permis par les données : un module peut donc manquer dans un paquet et figurer dans un autre.

Pour le fonctionnement de chaque analyse, consultez la section [Méthodologie](/fr/methodology/00_introduction/).

## État des modules
<!-- help#umod-status -->

Les résultats d'un module sont disponibles lorsque le paquet auquel il appartient est **Prêt**. Chaque produit indique le paquet qu'il utilise dans l'étiquette de l'en-tête de son éditeur - voir [Produits](/fr/user-guide/products/).

Si vous avez l'autorisation **Voir les données**, la page **Résultats** liste tous les paquets et leur état, et l'ouverture d'un paquet montre les modules qu'il contient. Si la génération d'un paquet a échoué, les résultats de ses modules ne sont pas disponibles - demandez à votre administrateur, qui peut voir ce qui s'est passé dans les journaux.

## Quand les résultats changent

Les résultats des modules ne changent jamais à l'intérieur d'un paquet. De nouveaux résultats arrivent lorsque votre administrateur génère un nouveau paquet, généralement après l'importation de nouvelles données ou l'amélioration d'un module. Vos produits conservent leur paquet jusqu'à ce qu'un éditeur les passe à un paquet plus récent ; leurs visualisations sont alors marquées comme obsolètes pour que vous puissiez les mettre à jour.

## Consulter les sorties des modules
<!-- help#umod-outputs -->

Le moyen le plus simple de parcourir les résultats d'un module est la page [Explorer](/fr/user-guide/explore/), qui présente les résultats de chaque module sous forme de tableaux, de graphiques et de cartes prêts à l'emploi.

Si vous avez l'autorisation **Voir les données**, vous pouvez aussi regarder ce qu'il y a derrière les résultats. Sur la page **Résultats**, ouvrez un paquet et sélectionnez un module à gauche. Sous ses visualisations prédéfinies, vous trouverez :

- **Paramètres** - les paramètres avec lesquels le module a été exécuté, comme les seuils de valeurs aberrantes.
- **Script et journaux** - le code R exécuté et sa sortie console.
- **Fichiers de sortie** - les fichiers de résultats du module, que vous pouvez télécharger.

![Paramètres, script, journaux et fichiers d'un module](/images/modules-package-module-fr.png)

## Métriques et visualisations
<!-- help#umod-metrics -->

Chaque visualisation part d'une métrique. Lorsque vous en créez une, vous parcourez les métriques par module ou les recherchez, puis vous choisissez l'un des **préréglages** du module - des graphiques, cartes et tableaux prêts à l'emploi que les auteurs du module ont conçus comme points de départ. Voir [Visualisations](/fr/user-guide/visualizations/).

Connaître cette chaîne aide lorsque quelque chose semble anormal :

- **Une métrique attendue est absente** - le paquet ne contient pas le module qui la produit, ou votre portée l'exclut.
- **Une visualisation n'affiche aucune donnée** - le paquet n'a pas de résultats pour cette métrique avec la portée et les filtres du produit.
- **Les chiffres semblent anciens** - le produit utilise un paquet plus ancien. Vérifiez l'étiquette dans l'en-tête de l'éditeur.
