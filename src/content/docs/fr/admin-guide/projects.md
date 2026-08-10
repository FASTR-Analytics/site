---
title: Projets
description: Création et configuration des projets d'analyse.
sidebar:
  order: 6
---

Les projets constituent l'espace de travail principal pour l'analyse dans FASTR. Chaque projet réunit un lot de résultats contenant des sorties de modules précalculées avec les visualisations, les rapports et les présentations que vous créez à partir de ces résultats. Vous pouvez créer des projets distincts pour différentes périodes, régions géographiques ou domaines de programme.

## Créer un projet
<!-- help#aproj-create -->

Tout utilisateur disposant de la permission « Créer des projets » peut démarrer un nouveau projet depuis l'écran d'accueil. Cliquez sur **Créer un projet**, saisissez un nom qui identifie la portée du projet, et le système met en place un espace de travail isolé.

Les nouveaux projets démarrent sans lot de résultats associé. L'étape suivante consiste à associer un lot de résultats depuis l'onglet **Lot de résultats**, qui est le point d'entrée pour accéder aux résultats des modules et aux données du projet.

![Nom du projet](/images/project-name-en.png)

## Associer un lot de résultats
<!-- help#aproj-data-window -->

Un lot de résultats est généré au niveau de l'instance et contient des résultats de modules précalculés. Pour rendre les données et les résultats analytiques disponibles dans un projet, ouvrez le projet et accédez à **Lot de résultats** dans la barre latérale gauche, puis associez l'un des lots disponibles.

Changer de lot de résultats modifie les données derrière chaque visualisation, rapport et présentation du projet. Avant qu'un changement prenne effet, FASTR affiche un rapport de compatibilité listant les visualisations qui ne se résoudraient pas avec le nouveau lot — elles restent dans le projet et indiquent pourquoi elles ne peuvent pas être tracées. Rien ne change tant que vous ne confirmez pas.

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

Chaque utilisateur peut basculer entre le mode clair et le mode sombre depuis son profil. Ouvrez votre profil en cliquant sur votre avatar dans la barre supérieure, puis accédez à la section **Apparence** et activez **Mode sombre**. Le paramètre est enregistré par navigateur et prend effet immédiatement - tous les graphiques, cartes et tableaux s'adaptent au thème sélectionné.
