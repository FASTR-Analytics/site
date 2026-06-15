---
title: Projets
description: Création et configuration des projets d'analyse.
sidebar:
  order: 6
---

Les projets constituent l'espace de travail principal pour l'analyse dans FASTR. Chaque projet réunit un sous-ensemble des données de votre instance avec un ensemble spécifique de modules analytiques, produisant des visualisations, des rapports et des présentations dans un but précis. Vous pouvez créer des projets distincts pour différentes périodes, régions géographiques ou domaines de programme.

## Créer un projet
<!-- help#aproj-create -->

Tout utilisateur disposant de la permission « Créer des projets » peut démarrer un nouveau projet depuis l'écran d'accueil. Cliquez sur **Créer un projet**, saisissez un nom qui identifie la portée du projet, et le système met en place un espace de travail isolé avec sa propre base de données.

Les nouveaux projets démarrent vides - aucun module installé, aucune fenêtre de données définie. Vos prochaines étapes consisteront généralement à activer les modules dont vous avez besoin et à configurer la fenêtre de données.

:::caution[Capture d'écran à ajouter]
Boîte de dialogue de création de projet montrant le champ du nom du projet.
:::

## Configurer la fenêtre de données
<!-- help#aproj-data-window -->

La fenêtre de données détermine quel sous-ensemble des données de votre instance alimente le projet. Lorsque vous importez des données HMIS au niveau de l'instance, toutes ces données deviennent disponibles pour être intégrées dans les fenêtres des projets - mais chaque projet peut sélectionner une portion différente.

Ouvrez le projet et accédez à **Données** dans la barre latérale gauche. Vous y configurez les données auxquelles le projet peut accéder selon plusieurs dimensions.

La **période temporelle** définit les mois ou les années à inclure. Un graphique affiche le nombre d'enregistrements par mois, ce qui vous aide à visualiser la disponibilité des données. Utilisez les sélecteurs de période pour définir vos bornes de début et de fin - les enregistrements situés hors de cette plage n'apparaîtront pas dans les résultats des modules ni dans les visualisations.

Les **indicateurs** peuvent être filtrés pour n'inclure que ce qui est pertinent pour votre analyse. Si vous vous concentrez sur la santé maternelle, par exemple, vous pouvez exclure les indicateurs sans rapport afin de garder des listes de métriques faciles à gérer. Activez « Inclure tous les indicateurs » pour disposer de l'ensemble complet, ou sélectionnez des indicateurs spécifiques lorsque vous avez besoin d'une portée plus restreinte.

Les **zones administratives** vous permettent de restreindre le projet à des régions ou des districts spécifiques. C'est utile lorsque vous menez des analyses distinctes pour différentes unités infranationales, ou lorsque certaines zones présentent des problèmes de qualité des données que vous souhaitez exclure pendant votre investigation.

Les **types et la propriété des établissements** offrent un filtrage supplémentaire lorsque votre instance comporte ces attributs d'établissement. Vous pouvez restreindre la fenêtre aux seuls établissements publics, ou vous concentrer sur les hôpitaux en excluant les postes de santé de niveau inférieur.

Les **catégories de service HFA** contrôlent quels indicateurs HFA sont inclus lorsque les données HFA sont activées pour le projet. Lors de l'activation ou de la reconfiguration du jeu de données HFA, une boîte de dialogue de paramètres vous permet de choisir d'inclure toutes les catégories de service ou de restreindre la sélection à certaines d'entre elles. Seuls les indicateurs associés à une catégorie de service sélectionnée sont importés dans le projet. Laissez le paramètre sur « Tout inclure » si vous souhaitez tous les indicateurs HFA quelle que soit leur catégorie de service.

:::caution[Capture d'écran à ajouter]
Interface de configuration de la fenêtre de données montrant le graphique de la période temporelle avec ses sélecteurs, ainsi que le panneau de sélection des indicateurs.
:::

## Gérer les utilisateurs et les permissions du projet

L'accès au projet est contrôlé par un système de permissions granulaire. Cliquez sur **Paramètres** dans la barre latérale gauche, puis faites défiler jusqu'à **Utilisateurs du projet**. Le tableau affiche tous les utilisateurs de l'instance et leur rôle actuel dans ce projet.

FASTR organise les permissions en trois catégories :

- **Produits analytiques** couvre la consultation et la configuration des visualisations, des rapports et des présentations
- **Données et modules** inclut la consultation des données, des métriques et des journaux, ainsi que la configuration et l'exécution des modules
- **Administration du projet** gère les paramètres, la gestion des utilisateurs et les opérations de sauvegarde

Cliquez sur le bouton de modification à côté d'un utilisateur pour modifier ses permissions. Vous pouvez activer ou désactiver des permissions individuelles ou utiliser des préréglages comme « Lecteur » ou « Éditeur ». Les administrateurs de l'instance disposent automatiquement d'un accès complet à tous les projets.

Pour les modifications groupées, sélectionnez plusieurs utilisateurs à l'aide des cases à cocher, puis cliquez sur **Modifier les permissions**. L'éditeur groupé utilise un interrupteur à trois états - inchangé, accorder ou révoquer - ce qui vous permet de modifier des permissions spécifiques sans affecter les autres.

:::caution[Capture d'écran à ajouter]
Tableau des utilisateurs du projet avec les colonnes de permissions et les boutons de modification.
:::

## Verrouiller des projets
<!-- help#aproj-lock -->

Lorsqu'une analyse est terminée, vous pouvez verrouiller le projet pour préserver son état. Un projet verrouillé empêche toute modification des modules, de la configuration des données et des visualisations, tout en permettant aux utilisateurs de consulter les rapports et d'exporter les résultats.

Dans les **Paramètres** du projet, trouvez la section **État de verrouillage du projet** et cliquez sur **Verrouiller le projet**. La carte du projet sur l'écran d'accueil affichera une icône de cadenas. Pour reprendre l'édition, retournez dans les paramètres et cliquez sur **Déverrouiller le projet**.

## Copier des projets

Il arrive que vous ayez besoin d'un projet similaire à un projet existant - par exemple les mêmes modules mais pour une période différente. Plutôt que de repartir de zéro, copiez l'original.

Ouvrez le projet source, allez dans les **Paramètres** et cliquez sur **Copier le projet**. Saisissez un nom pour le nouveau projet. La copie s'exécute en arrière-plan et peut prendre plusieurs minutes pour les projets volumineux. Le nouveau projet apparaît sur l'écran d'accueil une fois terminé, avec l'ensemble des installations de modules, des paramètres, des visualisations et des rapports.

:::caution[Capture d'écran à ajouter]
Boîte de dialogue de copie de projet montrant le champ du nom du nouveau projet.
:::

## Contexte IA du projet

L'assistant IA de FASTR peut interpréter les graphiques et suggérer des analyses, mais ses réponses sont plus utiles lorsqu'il comprend le contexte du projet. Dans les **Paramètres**, vous pouvez définir un **Contexte du projet pour l'interprétation par l'IA** - une description de ce que ce projet analyse ou des questions auxquelles il cherche à répondre. Les modifications apportées au contexte IA sont répercutées immédiatement sur l'ensemble du projet. Quelques phrases sur l'objectif du projet peuvent améliorer considérablement la qualité de l'analyse assistée par l'IA.
