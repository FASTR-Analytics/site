---
title: Modules
description: Comprendre les sorties des modules et les résultats analytiques.
sidebar:
  order: 2
---

Les modules sont les moteurs analytiques qui transforment les données de santé brutes en sorties exploitables. Ils exécutent des scripts R en arrière-plan pour calculer des taux de couverture, des scores de qualité, des analyses de tendances et d'autres indicateurs. En tant qu'utilisateur, vous n'avez pas besoin d'écrire ni de comprendre du code - vous devez seulement savoir comment trouver et exploiter les résultats produits par les modules.

## Ce que produisent les modules

Chaque module traite les données de votre projet et génère des **objets de résultats** - des jeux de données structurés contenant des valeurs calculées. Un module de qualité des données peut produire des scores de complétude pour chaque établissement et chaque mois. Un module de couverture peut calculer des taux de vaccination par district et par trimestre. Ces résultats deviennent la matière première des visualisations.

Les objets de résultats contiennent des **métriques** - les valeurs précises que vous pouvez visualiser. Un seul module peut produire des dizaines de métriques réparties dans plusieurs objets de résultats. Par exemple, un module de qualité des données peut générer en une seule fois des métriques de taux de notification, de score de valeurs aberrantes et de cohérence interne. Lorsque vous créez une visualisation, vous sélectionnez l'une de ces métriques comme point de départ.

![Module Status FR](/images/modules-status-fr.png)

## État des modules
<!-- help#umod-status -->

L'onglet **Lot de résultats** affiche le lot auquel votre projet est associé, notamment les modules qu'il contient et leur état de génération :

- **Prêt** - Les résultats sont disponibles ; vous pouvez créer des visualisations immédiatement
- **Indisponible** - Les résultats du module ne sont pas disponibles dans ce lot ; contactez votre administrateur pour plus de détails
- **Erreur** - Un problème est survenu lors de la génération ; contactez votre administrateur pour plus de détails

## Quand les résultats se mettent à jour

Les résultats des modules sont fixes au sein d'un lot de résultats. Les résultats se mettent à jour lorsque votre administrateur génère un nouveau lot avec des données fraîches et l'associe au projet. Si votre projet suit le lot épinglé de l'instance, il bascule automatiquement chaque fois qu'un administrateur épingle un nouveau lot. Vous verrez le lot de résultats changer dans l'onglet **Lot de résultats** lorsque cela se produit.

## Consulter les sorties des modules
<!-- help#umod-outputs -->

Bien que vous interagissiez généralement avec les résultats des modules par l'intermédiaire des visualisations, vous pouvez inspecter les sorties brutes depuis l'onglet **Lot de résultats** si vous disposez des permissions appropriées. Accédez aux **Journaux** (sortie de la console R, requiert la permission Consulter les journaux), aux **Fichiers** (résultats CSV téléchargeables, requiert Consulter les données) ou au **Script** (le code R lui-même, requiert Consulter les données) depuis la vue de détail du lot.

![Module Logs FR](/images/modules-logs-fr.png)

## Métriques et visualisations
<!-- help#umod-metrics -->

Le lien entre les modules et les visualisations passe par les métriques. Lorsque vous créez une visualisation, vous sélectionnez d'abord une métrique parmi les résultats d'un module. La visualisation interroge ensuite cette métrique selon vos choix de configuration.

Comprendre cet enchaînement aide à résoudre les problèmes. Si une visualisation affiche « aucune donnée », vérifiez si le lot de résultats contient des résultats pour cette métrique. Si les résultats semblent dépassés, vérifiez si le projet a été mis à jour avec un lot plus récent. S'il vous manque une métrique attendue, assurez-vous que le module concerné a bien été inclus lors de la génération du lot.

Certaines métriques sont accompagnées de **préréglages** - des modèles de visualisation préconfigurés créés par les auteurs des modules. Les préréglages représentent des façons courantes de visualiser cette sortie et constituent un bon point de départ lorsque vous ne connaissez pas encore les dimensions d'une métrique.

## Mises à jour des modules

Les modules évoluent au fil du temps à mesure que les méthodologies s'améliorent. Les résultats des modules mis à jour deviennent disponibles lorsque votre administrateur génère un nouveau lot de résultats avec les définitions de modules à jour et l'associe à votre projet. Si vous estimez que les résultats de modules mis à jour sont importants pour votre travail, contactez l'administrateur de votre projet.
