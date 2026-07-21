---
title: Projets
description: Navigation dans les projets et compréhension des fenêtres de données.
sidebar:
  order: 1
---

Un projet est votre espace de travail pour l'analyse dans FASTR. Il contient une portion définie des données de santé de votre organisation, les modules analytiques qui traitent ces données, ainsi que les visualisations et les rapports que vous créez à partir des résultats. Comprendre le fonctionnement des projets vous aide à trouver ce dont vous avez besoin et à interpréter ce que vous voyez.

## Ouvrir un projet
<!-- help#uproj-open -->

Lorsque vous vous connectez à FASTR, vous voyez la liste des projets auxquels vous avez accès. La liste peut être triée par nom ou par récemment mis à jour à l'aide du contrôle de tri en haut. Cliquez sur le nom d'un projet pour l'ouvrir. La vue du projet comporte une barre de navigation à gauche avec des onglets pour les différentes sections - généralement **Présentations**, **Visualisations**, **Modules**, **Données** et **Paramètres**. Ce que vous voyez dépend de vos permissions ; un lecteur, par exemple, ne verra pas les options de configuration.

Le nom du projet apparaît en haut de l'écran, accompagné d'un indicateur d'état. Cet indicateur signale si les modules analytiques sont à jour ou si un traitement est en cours. Une coche verte indique que tout est à jour. Un indicateur qui tourne signifie que des modules sont en cours d'exécution. Si vous voyez un symbole d'avertissement ou d'erreur, c'est qu'un module nécessite votre attention - généralement parce que les données en amont ont changé ou qu'un problème de configuration est survenu.

:::caution[Capture d'écran à ajouter]
Vue du projet montrant la barre de navigation et l'en-tête du projet avec l'indicateur d'état.
:::

## Comprendre la fenêtre de données
<!-- help#uproj-data-window -->

Chaque projet travaille avec un sous-ensemble spécifique des données de votre organisation. Ce sous-ensemble est appelé la **fenêtre de données**, et il définit les limites de tout ce que vous pouvez analyser ou visualiser dans le projet.

La fenêtre de données comporte généralement trois contraintes. La **période temporelle** indique quels mois ou quelles années sont disponibles - par exemple, de janvier 2022 à décembre 2024. La **portée géographique** détermine quelles zones administratives et quels établissements sont inclus, ce qui permet à un projet de se concentrer sur des régions ou des types d'établissements spécifiques. Le filtre des **indicateurs** contrôle quels indicateurs de santé (comme les visites de CPN ou le nombre de vaccinations) sont accessibles dans le projet.

Pour consulter la fenêtre de données de votre projet, ouvrez l'onglet **Données** dans la navigation. Il affiche la date du dernier export de données dans le projet et résume les paramètres actuels - plage temporelle, zones administratives incluses, types d'établissements et indicateurs sélectionnés.

:::caution[Capture d'écran à ajouter]
Onglet Données affichant le résumé de la fenêtre de données HMIS, avec la période, les zones administratives et la liste des indicateurs.
:::

Pourquoi est-ce important ? Lorsque vous créez des visualisations, vous ne pouvez travailler qu'avec les données qui se trouvent dans votre fenêtre. Si vous filtrez un graphique sur mars 2021 mais que la période de votre projet commence en janvier 2022, aucune donnée ne s'affichera. Si la visualisation d'un collègue montre des résultats différents des vôtres, vérifiez si vos projets ont des fenêtres de données différentes - c'est souvent l'explication.

## Fraîcheur des données et mises à jour

Les données de votre projet sont un instantané. Lorsque votre administrateur charge de nouvelles données au niveau de l'instance, votre projet n'est pas mis à jour automatiquement. À la place, l'onglet Données affiche un avertissement indiquant ce qui a changé - nouvelles données mensuelles, modifications de structure ou changements de correspondance d'indicateurs.

La mise à jour des données d'un projet est une tâche administrative. Si vous voyez un avertissement de péremption et que vous avez besoin de chiffres à jour, contactez l'administrateur du projet. Lorsqu'il actualise les données, tous les modules sont relancés automatiquement pour intégrer les changements.

## Projets verrouillés
<!-- help#uproj-locked -->

Les administrateurs peuvent verrouiller un projet pour empêcher toute modification. Un projet verrouillé fonctionne normalement en consultation - vous pouvez parcourir les visualisations, exporter des images et générer des rapports. En revanche, vous ne pouvez pas créer de nouvelles visualisations, modifier celles qui existent, ni changer aucun paramètre.

Le verrouillage est utile lorsque vous avez finalisé une analyse et que vous souhaitez la préserver telle quelle - par exemple, avant de partager les résultats avec des parties prenantes externes ou de l'archiver pour référence ultérieure. Si vous devez apporter des modifications à un projet verrouillé, contactez votre administrateur pour le déverrouiller.

## Collaborer en temps réel

Lorsque plusieurs personnes ont un projet ouvert en même temps, vous pouvez voir qui d'autre est présent. Des curseurs en direct montrent où vos collègues pointent sur les pages des onglets Visualisations, Présentations, Rapports et autres - le curseur de chaque personne apparaît sous la forme d'une flèche colorée avec son nom. Les mêmes indicateurs de présence apparaissent sous forme de petites icônes d'avatar sur les cartes de visualisation, les cartes de présentation et les cartes de rapport, afin que vous puissiez voir d'un coup d'œil qui modifie quoi avant de l'ouvrir.

Si vous perdez votre connexion au serveur de collaboration, une bannière s'affiche en haut de l'écran pour vous en informer. Vos modifications continuent d'être enregistrées normalement ; la bannière disparaît et affiche une brève confirmation « De nouveau en direct » une fois la connexion rétablie.
