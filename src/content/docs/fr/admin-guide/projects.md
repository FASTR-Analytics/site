---
title: Projets
description: Création et configuration des projets d'analyse.
sidebar:
  order: 6
---

Les projets constituent l'espace de travail principal pour l'analyse dans FASTR. Chaque projet réunit un lot de résultats contenant des sorties de modules précalculées avec les visualisations, les rapports et les présentations que vous créez à partir de ces résultats. Vous pouvez créer des projets distincts pour différentes périodes, régions géographiques ou domaines de programme.

## Créer un projet
<!-- help#aproj-create -->

Tout utilisateur disposant de la permission « Créer des projets » peut démarrer un nouveau projet depuis l'écran d'accueil. Cliquez sur **Créer un projet**, saisissez un nom qui identifie la portée du projet, puis choisissez une portée — **National** ou une Zone administrative 2 spécifique. La portée détermine la façon dont le lot de résultats associé est filtré pour ce projet : un projet à portée limitée voit le lot comme s'il ne contenait que cette zone, tandis que les indicateurs sans ventilation par zone restent nationaux.

Les nouveaux projets démarrent sans lot de résultats associé. L'étape suivante consiste à associer un lot de résultats depuis l'onglet **Lot de résultats**, qui est le point d'entrée pour accéder aux résultats des modules et aux données du projet.

![Nom du projet](/images/project-name-en.png)

## Associer un lot de résultats
<!-- help#aproj-data-window -->

Un lot de résultats est généré au niveau de l'instance et contient des résultats de modules précalculés. Pour rendre les données et les résultats analytiques disponibles dans un projet, ouvrez le projet et accédez à **Lot de résultats** dans la barre latérale gauche, puis associez l'un des lots disponibles.

Les éditeurs peuvent sélectionner n'importe quel lot prêt de l'instance via le menu déroulant dans les paramètres du paquet. Ils peuvent également activer **Toujours utiliser le paquet épinglé de l'instance** pour abonner le projet au paquet que l'administrateur désigne comme épingle de l'instance — chaque fois que l'épingle change, le projet bascule automatiquement. Choisir manuellement un autre paquet désactive cet abonnement.

Lorsqu'un projet suit le paquet épinglé mais se trouve actuellement sur un autre, un avertissement s'affiche avec un bouton **Basculer vers le paquet épinglé** pour resynchroniser immédiatement.

Changer de lot de résultats modifie les données derrière chaque visualisation, rapport et présentation du projet. Avant qu'un changement prenne effet, FASTR affiche un rapport de compatibilité listant les visualisations qui ne se résoudraient pas avec le nouveau lot — elles restent dans le projet et indiquent pourquoi elles ne peuvent pas être tracées. Rien ne change tant que vous ne confirmez pas.

Si le projet a une portée Zone administrative 2 définie et que le lot sélectionné ne contient pas de données pour cette zone, un avertissement s'affiche dans le rapport de compatibilité et dans l'onglet Lot de résultats après association. Les indicateurs au niveau des zones n'afficheront aucune donnée, mais les indicateurs nationaux restent visibles.

## Portée du projet

Chaque projet a une portée — **National** ou une Zone administrative 2 spécifique. La portée est définie lors de la création du projet et peut être modifiée ultérieurement par un administrateur global depuis **Paramètres**. Un projet à portée limitée filtre le lot de résultats associé de sorte que les indicateurs au niveau des zones n'affichent que les données de cette zone ; les indicateurs nationaux restent visibles quelle que soit la portée. La portée du projet apparaît sous forme de badge à côté du nom du projet et est indiquée dans **Paramètres** sous **Portée du projet**.

## Gérer les utilisateurs et les permissions du projet

L'accès au projet est contrôlé par un système de permissions granulaire. Cliquez sur **Paramètres** dans la barre latérale gauche, puis faites défiler jusqu'à **Utilisateurs du projet**. Le tableau affiche tous les utilisateurs de l'instance et leur rôle actuel dans ce projet.

FASTR organise les permissions en trois catégories :

- **Produits analytiques** couvre la consultation et la configuration des visualisations, des rapports et des présentations
- **Données et modules** inclut la consultation des données, des métriques et des journaux, ainsi que la configuration et l'exécution des modules
- **Administration du projet** gère les paramètres, la gestion des utilisateurs et les opérations de sauvegarde

Cliquez sur le bouton de modification à côté d'un utilisateur pour modifier ses permissions. Vous pouvez activer ou désactiver des permissions individuelles ou utiliser des préréglages comme « Lecteur » ou « Éditeur ». Les administrateurs de l'instance disposent automatiquement d'un accès complet à tous les projets.

Pour les modifications groupées, sélectionnez plusieurs utilisateurs à l'aide des cases à cocher, puis cliquez sur **Modifier les permissions**. L'éditeur groupé utilise un interrupteur à trois états - inchangé, accorder ou révoquer - ce qui vous permet de modifier des permissions spécifiques sans affecter les autres.

![Utilisateurs du projet](/images/user-permissions-project-en.png)

## Verrouiller des projets
<!-- help#aproj-lock -->

Lorsqu'une analyse est terminée, vous pouvez verrouiller le projet pour préserver son état. Un projet verrouillé empêche toute modification des modules, de la configuration des données et des visualisations, tout en permettant aux utilisateurs de consulter les rapports et d'exporter les résultats.

Dans les **Paramètres** du projet, trouvez la section **État de verrouillage du projet** et cliquez sur **Verrouiller le projet**. La carte du projet sur l'écran d'accueil affichera une icône de cadenas. Pour reprendre l'édition, retournez dans les paramètres et cliquez sur **Déverrouiller le projet**.

## Copier des projets

Il arrive que vous ayez besoin d'un projet similaire à un projet existant - par exemple les mêmes modules mais pour une période différente. Plutôt que de repartir de zéro, copiez l'original.

Ouvrez le projet source, allez dans les **Paramètres** et cliquez sur **Copier le projet**. Saisissez un nom pour le nouveau projet. La copie s'exécute en arrière-plan et peut prendre plusieurs minutes pour les projets volumineux. Le nouveau projet apparaît sur l'écran d'accueil une fois terminé, avec l'ensemble des installations de modules, des paramètres, des visualisations et des rapports.

![Copier le projet](/images/copy-project-en.png)

## Contexte IA du projet

L'assistant IA de FASTR peut interpréter les graphiques et suggérer des analyses, mais ses réponses sont plus utiles lorsqu'il comprend le contexte du projet. Dans les **Paramètres**, vous pouvez définir un **Contexte du projet pour l'interprétation par l'IA** - une description de ce que ce projet analyse ou des questions auxquelles il cherche à répondre. Les modifications apportées au contexte IA prennent effet immédiatement sur l'ensemble du projet et sont visibles par tous les utilisateurs qui y travaillent. Quelques phrases sur l'objectif du projet peuvent améliorer considérablement la qualité de l'analyse assistée par l'IA.

## Apparence

Chaque utilisateur peut choisir entre un thème clair, sombre ou basé sur les préférences du système depuis son profil. Ouvrez votre profil en cliquant sur votre avatar dans la barre supérieure, puis accédez à la section **Apparence** et sélectionnez **Clair**, **Sombre** ou **Système** pour suivre les préférences de votre système d'exploitation. Le paramètre est enregistré par navigateur et prend effet immédiatement — tous les graphiques, cartes et tableaux s'adaptent au thème sélectionné.
