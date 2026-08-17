---
title: Utilisateurs
description: Gestion des comptes utilisateurs et des permissions.
sidebar:
  order: 1
---

Toute personne qui accède à votre instance FASTR a besoin d'un compte utilisateur. Cette page explique comment ajouter des utilisateurs, configurer ce qu'ils peuvent faire au niveau de l'instance et les affecter à des projets spécifiques avec les permissions appropriées.

## Comprendre le modèle de permissions

FASTR utilise un système de permissions à deux niveaux. Les permissions au niveau de l'instance déterminent ce qu'une personne peut faire sur l'ensemble de la plateforme - comme consulter les listes d'utilisateurs, charger des données ou créer des projets. Les permissions au niveau du projet déterminent ce qu'elle peut faire au sein de chaque projet - consulter les visualisations, exécuter des modules ou modifier des paramètres.

Les administrateurs de l'instance disposent d'un accès complet à tout et n'ont pas besoin de permissions individuelles configurées. Pour tous les autres, vous définirez à la fois les permissions d'instance (ce à quoi ils peuvent accéder globalement) et les permissions de projet (ce qu'ils peuvent faire dans chaque projet auquel ils sont affectés).

Cette séparation vous permet d'avoir une personne qui gère les chargements de données à l'échelle de l'instance, mais qui ne dispose que d'un accès en lecture à certains projets, ou une personne qui administre un projet mais n'a aucun accès à un autre. Cette flexibilité est utile lorsque différentes équipes travaillent avec des données différentes ou lorsque vous devez restreindre l'accès à des analyses sensibles.

## Ajouter des utilisateurs
<!-- help#users-add -->

Ouvrez l'onglet **Utilisateurs** depuis la navigation principale. Cliquez sur **Ajouter des utilisateurs** pour ouvrir la boîte de dialogue d'ajout. Saisissez une ou plusieurs adresses e-mail - vous pouvez coller une liste séparée par des virgules, des points-virgules ou des sauts de ligne. Cliquez sur **Ajouter** pour créer les comptes.

![Ajouter des utilisateurs](/images/users-en.png)

Les nouveaux utilisateurs sont créés sans permission particulière - ils peuvent se connecter, mais ne verront aucun projet ni aucune donnée tant que vous n'aurez pas configuré leur accès. Après avoir ajouté quelqu'un, cliquez sur sa ligne dans la liste des utilisateurs pour ouvrir son profil et définir ses permissions.

Pour intégrer un grand nombre d'utilisateurs, utilisez **Importer par lot depuis un CSV** afin de charger un fichier contenant les adresses e-mail et le statut d'administrateur. Le fichier CSV doit comporter deux colonnes : `email` et `is_global_admin`. C'est plus rapide que d'ajouter les utilisateurs un par un lorsque vous configurez une nouvelle instance ou intégrez une équipe nombreuse.

## Modifier l'adresse e-mail d'un utilisateur

Les utilisateurs peuvent modifier leur propre adresse e-mail depuis leur profil. Ouvrez votre profil en cliquant sur votre nom ou votre avatar dans la barre de navigation supérieure, puis trouvez la carte **Adresse e-mail**. Cliquez sur **Changer d'e-mail** pour ouvrir la boîte de dialogue de changement d'e-mail.

Le changement s'applique à toutes les instances FASTR auxquelles l'utilisateur a accès, en conservant toutes les permissions et l'historique. Le processus comporte trois étapes : saisir la nouvelle adresse et confirmer la liste des instances concernées ; vérifier le code envoyé à la nouvelle adresse ; puis examiner le résultat par instance. Si une instance n'a pas pu être mise à jour, l'ancienne adresse reste sur le compte et une option **Réessayer** est disponible. Une fois que toutes les instances signalent un succès, la page se recharge automatiquement.

Les administrateurs disposant de la permission **Configurer les utilisateurs** peuvent également renommer l'adresse e-mail d'un autre utilisateur directement depuis l'onglet **Utilisateurs** à l'aide de l'action **Renommer l'e-mail**. Cela effectue le même renommage sur l'ensemble du réseau sans que l'utilisateur ait besoin de l'initier lui-même — utile comme solution de secours lorsqu'un utilisateur ne peut pas se connecter avec son ancienne adresse.

## Permissions d'instance
<!-- help#users-instance-permissions -->

Les permissions d'instance déterminent ce à quoi une personne peut accéder sur l'ensemble de votre instance FASTR. Cliquez sur un utilisateur dans la liste pour ouvrir son profil, puis faites défiler jusqu'à la section des permissions.

Si vous activez **Administrateur de l'instance**, cet utilisateur obtient un accès complet à tout - il peut gérer les utilisateurs, charger des données, configurer les paramètres et accéder à tous les projets. Réservez cette option aux personnes qui doivent maintenir la plateforme elle-même, et non aux analystes ordinaires.

Pour les non-administrateurs, vous pouvez activer des permissions spécifiques :

- **Configurer les utilisateurs** - Ajouter, supprimer et modifier d'autres comptes utilisateurs
- **Consulter les utilisateurs** - Voir la liste des utilisateurs sans apporter de modifications
- **Consulter les journaux** - Accéder aux journaux d'activité pour le dépannage
- **Configurer les paramètres** - Modifier la configuration à l'échelle de l'instance
- **Configurer les données** - Importer et modifier la structure et les jeux de données
- **Consulter les données** - Accéder aux pages de configuration des données sans les modifier
- **Créer des projets** - Lancer de nouveaux projets d'analyse

La plupart des analystes n'ont besoin que de « Consulter les données » et éventuellement de « Créer des projets » au niveau de l'instance. Leur travail principal se déroule au sein des projets, où vous configurerez des permissions plus détaillées.

![Permissions d'instance des utilisateurs](/images/user-permissions-instance-en.png)

## Permissions de projet
<!-- help#users-project-permissions -->

Alors que les permissions d'instance contrôlent l'accès à l'échelle de la plateforme, les permissions de projet déterminent ce qu'une personne peut faire au sein de projets spécifiques. Depuis le profil d'un utilisateur, faites défiler jusqu'à la section des permissions de projet pour voir une grille de tous les projets.

Cliquez sur un projet pour ouvrir l'éditeur de permissions pour cette combinaison utilisateur-projet. Vous verrez des cases à cocher regroupées en trois catégories :

- **Produits analytiques** contrôle l'accès aux visualisations, aux rapports et aux présentations. Les permissions « Consulter » permettent aux utilisateurs de voir le contenu existant ; les permissions « Configurer » leur permettent de créer et de modifier.
- **Données et modules** contrôle l'accès aux données sous-jacentes et au traitement analytique. Les utilisateurs qui ont besoin de comprendre la méthodologie peuvent avoir besoin de « Consulter les métriques » ou « Consulter le code du script », mais pas de « Configurer les modules ».
- **Administration du projet** couvre les paramètres, la gestion des utilisateurs au sein du projet, les journaux et les sauvegardes. Réservez ces permissions aux responsables de projet ou au personnel technique.

![Permissions de projet des utilisateurs](/images/user-permissions-project-en.png)

Plutôt que de cocher des cases individuelles, vous pouvez utiliser les boutons prédéfinis en haut :

- **Aucun accès** - Supprime toutes les permissions (l'utilisateur ne verra pas le projet)
- **Lecteur** - Peut consulter les visualisations, les rapports et les données, mais ne peut rien modifier
- **Éditeur** - Peut créer et modifier les visualisations, les rapports et les présentations
- **Administrateur** - Accès complet à tout dans le projet

Ces préréglages couvrent la plupart des scénarios courants. Utilisez des combinaisons personnalisées lorsque vous avez besoin d'un contrôle plus fin - par exemple, en donnant à quelqu'un un accès éditeur aux visualisations, mais pas aux rapports.

## Permissions de projet par défaut

Lorsque vous créez un nouveau projet, les utilisateurs existants reçoivent des permissions par défaut en fonction des paramètres de leur profil. Cliquez sur le bouton « Nouveaux projets (par défaut) » au bas de la grille de projets d'un utilisateur pour configurer les permissions qu'il recevra automatiquement lors de la création de nouveaux projets.

Cela fait gagner du temps lorsque votre organisation ajoute fréquemment des projets - vous n'avez pas à affecter manuellement chaque utilisateur à chaque nouveau projet. Définissez les valeurs par défaut sur « Lecteur » pour les personnes qui doivent voir toutes les analyses, ou sur « Aucun accès » pour celles qui ne travaillent que sur des projets spécifiques.

## Jetons d'accès personnels

FASTR prend en charge les jetons d'accès personnels (PAT) pour les intégrations et l'accès à l'API. Depuis votre profil, accédez à la section **Jetons d'accès personnels** pour créer, consulter et révoquer des jetons. Chaque jeton porte un libellé que vous choisissez à sa création. La valeur brute du jeton n'est affichée qu'une seule fois à la création — copiez-la immédiatement. La date de dernière utilisation d'un jeton se met à jour à chaque authentification, ce qui permet d'identifier facilement les jetons qui ne sont plus utilisés. Révoquez tout jeton dont vous n'avez plus besoin.

Les jetons d'accès personnels sont en libre-service : vous ne pouvez gérer que vos propres jetons, pas ceux des autres utilisateurs.

## Opérations par lot

La liste des utilisateurs prend en charge la sélection par lot pour les opérations courantes. Cochez les cases à côté de plusieurs utilisateurs, puis utilisez les boutons d'action qui apparaissent :

- **Définir comme administrateur** / **Retirer le statut d'administrateur** - Activer ou désactiver le statut d'administrateur
- **Modifier les permissions** - Mettre à jour les permissions d'instance de tous les utilisateurs sélectionnés en une seule fois
- **Modifier les permissions de projet par défaut** - Définir l'accès que les utilisateurs sélectionnés obtiennent pour les nouveaux projets
- **Télécharger les utilisateurs** - Exporter un fichier CSV des utilisateurs sélectionnés
- **Supprimer** - Supprimer les comptes utilisateurs sélectionnés

Les opérations par lot sont utiles lors de l'intégration d'équipes ou lorsque les politiques d'accès changent. Par exemple, si un nouveau projet démarre et que plusieurs personnes ont besoin d'un accès éditeur, sélectionnez-les toutes et mettez à jour leurs permissions par défaut en une seule étape.

![Permissions de projet des utilisateurs par lot](/images/user-permissions-project-multiple-en.png)

## Supprimer des utilisateurs

Pour supprimer un seul utilisateur, ouvrez son profil et cliquez sur **Supprimer cet utilisateur** en bas. Pour plusieurs utilisateurs, sélectionnez-les dans la liste et utilisez l'action de suppression par lot **Supprimer**. La suppression d'un utilisateur supprime son compte et révoque immédiatement tous ses accès - il ne pourra plus se connecter et toutes les sessions actives prendront fin.

La suppression est définitive. Si une personne a besoin d'une suspension temporaire de son accès, envisagez de définir ses permissions sur « Aucun accès » pour tous les projets au lieu de supprimer le compte. Cela préserve son identifiant de connexion au cas où elle aurait besoin de revenir plus tard.
