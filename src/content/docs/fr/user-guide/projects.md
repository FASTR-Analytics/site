---
title: Projets
description: Navigation dans les projets et compréhension des fenêtres de données.
sidebar:
  order: 1
---

Un projet est votre espace de travail pour l'analyse dans FASTR. Il est associé à un lot de résultats qui fournit des résultats analytiques précalculés, ainsi que les visualisations, les rapports et les présentations que vous créez à partir de ces résultats. Comprendre le fonctionnement des projets vous aide à trouver ce dont vous avez besoin et à interpréter ce que vous voyez.

## Ouvrir un projet
<!-- help#uproj-open -->

Lorsque vous vous connectez à FASTR, vous voyez la liste des projets auxquels vous avez accès. La liste peut être triée par nom ou par récemment mis à jour à l'aide du contrôle de tri en haut. Cliquez sur le nom d'un projet pour l'ouvrir. La vue du projet comporte une barre de navigation à gauche avec des onglets pour les différentes sections - généralement **Présentations**, **Visualisations**, **Métriques**, **Lot de résultats** et **Paramètres**. Ce que vous voyez dépend de vos permissions ; un lecteur, par exemple, ne verra pas les options de configuration.

Le nom du projet apparaît en haut de l'écran. Si le projet a une portée Zone administrative 2, un badge indiquant le nom de la zone apparaît à côté du nom du projet.

![Open a Project FR](/images/open-a-project-fr.png)

## Comprendre le lot de résultats
<!-- help#uproj-data-window -->

Chaque projet est servi depuis un **lot de résultats** - un ensemble de résultats de modules précalculés généré au niveau de l'instance. Le lot de résultats détermine quelles métriques et données sont disponibles pour les visualisations, les rapports et les présentations du projet.

Pour voir quel lot utilise votre projet, accédez à l'onglet **Lot de résultats**. L'onglet affiche le lot actuellement utilisé et, pour les éditeurs, une carte **Paramètres du paquet** avec un menu déroulant pour sélectionner un autre lot et une option pour suivre automatiquement le lot épinglé de l'instance.

Changer de lot de résultats modifie les données derrière chaque visualisation, rapport et présentation du projet. FASTR affiche un rapport de compatibilité avant qu'un changement prenne effet, listant les visualisations qui ne se résoudraient pas avec le nouveau lot. Vous pouvez examiner l'impact et décider si vous souhaitez continuer.

Si le projet a une portée Zone administrative 2 et que le lot sélectionné ne contient pas de données pour cette zone, un avertissement s'affiche. Les indicateurs au niveau des zones n'afficheront aucune donnée, mais les indicateurs nationaux restent visibles.

![Understanding the Data Window FR](/images/understanding-the-data-window-fr.png)

## Fraîcheur des données et mises à jour

Votre projet est servi depuis un lot de résultats fixe. Lorsque votre administrateur génère un nouveau lot de résultats avec des données mises à jour et l'associe à votre projet, les visualisations refléteront les résultats du nouveau lot. Si votre projet suit le lot épinglé de l'instance, il bascule automatiquement chaque fois qu'un administrateur épingle un nouveau lot. Si les résultats vous semblent obsolètes, consultez l'onglet **Lot de résultats** pour voir quel lot est utilisé et contactez l'administrateur de votre projet si un lot plus récent devrait être associé.

## Projets verrouillés
<!-- help#uproj-locked -->

Les administrateurs peuvent verrouiller un projet pour empêcher toute modification. Un projet verrouillé fonctionne normalement en consultation - vous pouvez parcourir les visualisations, exporter des images et générer des rapports. En revanche, vous ne pouvez pas créer de nouvelles visualisations, modifier celles qui existent, ni changer aucun paramètre.

Le verrouillage est utile lorsque vous avez finalisé une analyse et que vous souhaitez la préserver telle quelle - par exemple, avant de partager les résultats avec des parties prenantes externes ou de l'archiver pour référence ultérieure. Si vous devez apporter des modifications à un projet verrouillé, contactez votre administrateur pour le déverrouiller.

## Collaborer en temps réel

Lorsque plusieurs personnes ont un projet ouvert en même temps, vous pouvez voir qui d'autre est présent. Des curseurs en direct montrent où vos collègues pointent sur les pages des onglets Visualisations, Présentations, Rapports et autres - le curseur de chaque personne apparaît sous la forme d'une flèche colorée avec son nom. Les mêmes indicateurs de présence apparaissent sous forme de petites icônes d'avatar sur les cartes de visualisation, les cartes de présentation et les cartes de rapport, afin que vous puissiez voir d'un coup d'œil qui modifie quoi avant de l'ouvrir.

Chaque personne n'apparaît qu'une seule fois dans l'affichage de présence, même si elle a le projet ouvert dans plusieurs onglets simultanément.

Si vous perdez votre connexion au serveur de collaboration, une bannière s'affiche en haut de l'écran pour vous en informer. Vos modifications continuent d'être enregistrées normalement ; la bannière disparaît et affiche une brève confirmation « De nouveau en direct » une fois la connexion rétablie. Si vos permissions changent pendant que vous avez un projet ouvert - par exemple, un administrateur accorde ou révoque l'accès en modification - la session de collaboration se reconnecte automatiquement afin que vos nouvelles permissions prennent effet sans nécessiter de rechargement de la page.

## Obtenir de l'aide

Cliquez sur **Aide** dans l'en-tête du projet pour accéder aux visites guidées, demander de l'aide, envoyer des commentaires ou ouvrir la documentation. Les visites guidées vous accompagnent pas à pas dans des parties spécifiques de la plateforme et peuvent être lancées à tout moment depuis le menu **Aide**.
