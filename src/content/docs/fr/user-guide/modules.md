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

L'onglet Modules affiche chaque module installé et son état actuel. Un badge d'état situé à côté du nom de chaque module vous indique ce qui se passe :

- **Prêt** - Les résultats sont à jour ; vous pouvez créer des visualisations immédiatement
- **En cours d'exécution** - Le module traite les données ; un texte de progression s'affiche à mesure qu'il travaille
- **En attente** - Le module est en file d'attente, dans l'attente de dépendances ou de données
- **Erreur** - Un problème est survenu ; consultez les journaux pour plus de détails (nécessite l'intervention d'un administrateur)

## Quand les modules sont relancés

Les modules se relancent automatiquement lorsque leurs entrées changent, garantissant que les visualisations reflètent toujours les calculs les plus récents. Les déclencheurs comprennent les actualisations de données, les modifications de configuration et les mises à jour de modules en amont. Vous verrez les indicateurs d'état se mettre à jour en temps réel à mesure que les modules progressent dans la file d'attente.

## Consulter les sorties des modules
<!-- help#umod-outputs -->

Bien que vous interagissiez généralement avec les résultats des modules par l'intermédiaire des visualisations, vous pouvez inspecter les sorties brutes directement depuis l'onglet Modules. Cliquez sur le bouton de menu d'un module prêt pour accéder aux **Journaux** (sortie de la console R), aux **Fichiers** (résultats CSV téléchargeables) ou au **Script** (le code R lui-même, si vous y êtes autorisé).

![Module Logs FR](/images/modules-logs-fr.png)

## Métriques et visualisations
<!-- help#umod-metrics -->

Le lien entre les modules et les visualisations passe par les métriques. Lorsque vous créez une visualisation, vous sélectionnez d'abord une métrique parmi les résultats d'un module. La visualisation interroge ensuite cette métrique selon vos choix de configuration.

Comprendre cet enchaînement aide à résoudre les problèmes. Si une visualisation affiche « aucune donnée », vérifiez si le module sous-jacent est prêt. Si les résultats semblent dépassés, vérifiez si les modules doivent être relancés. S'il vous manque une métrique attendue, assurez-vous que le module concerné est bien installé.

Certaines métriques sont accompagnées de **préréglages** - des modèles de visualisation préconfigurés créés par les auteurs des modules. Les préréglages représentent des façons courantes de visualiser cette sortie et constituent un bon point de départ lorsque vous ne connaissez pas encore les dimensions d'une métrique.

## Mises à jour des modules

Les modules évoluent au fil du temps à mesure que les méthodologies s'améliorent. L'onglet Modules indique quand des mises à jour sont disponibles. Appliquer les mises à jour est une tâche administrative qui déclenche généralement une relance. Si vous voyez des badges « Mise à jour disponible » et que vous estimez que ces mises à jour sont importantes pour votre travail, contactez l'administrateur de votre projet.
