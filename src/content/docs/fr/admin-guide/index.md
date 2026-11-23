---
title: Guide de l'administrateur
description: Configuration et gestion de votre instance FASTR.
sidebar:
  order: 0
---

Ce guide couvre les tâches d'administration destinées aux personnes qui gèrent une instance FASTR. Que vous mettiez en place une nouvelle instance ou que vous en mainteniez une existante, vous y trouverez les instructions pour importer des données, produire des résultats, contrôler ce que chacun peut voir et gérer les utilisateurs.

## Comment s'articule une instance

Comprendre le cheminement des données brutes jusqu'aux produits finis permet de mieux situer chaque tâche d'administration.

D'abord, les **données** arrivent. Vous importez les données HMIS (rapportage mensuel de routine, à partir de fichiers CSV ou de DHIS2) et les données HFA (enquêtes d'évaluation des établissements) sur la page **Données**, ainsi que les établissements, les indicateurs et les cartes qui donnent du sens à ces données.

Ensuite, vous générez un **paquet de résultats** sur la page **Résultats**. Un paquet exécute les modules d'analyse sur un instantané des données de l'instance et en conserve les résultats. Les paquets ne changent plus une fois générés : une présentation ou un rapport terminé continue donc d'afficher les mêmes chiffres jusqu'à ce que quelqu'un le passe à un paquet plus récent. Un paquet peut être **épinglé** ; les nouveaux produits démarrent sur celui-ci.

Puis les **portées** déterminent les parties d'un paquet qu'un produit peut utiliser - par exemple, une région, une plage d'années ou un sous-ensemble d'indicateurs. La portée intégrée **Toutes les données** ne limite rien.

Enfin, les utilisateurs construisent des **produits** - présentations, rapports et visualisations - sur la page **Produits**. Chaque produit utilise un paquet de résultats et une portée, et dispose de son propre propriétaire et de ses propres paramètres de partage.

## Le rôle des administrateurs

La gestion des utilisateurs consiste à ajouter des personnes et à décider de ce à quoi elles ont accès. Les permissions d'instance déterminent qui peut voir et modifier les données et qui peut gérer les utilisateurs. L'accès par portée peut limiter une personne à certaines portées, de sorte qu'elle ne voie que les produits et les données compris dans ces limites. L'accès à chaque produit est défini par son propriétaire.

La configuration des données consiste à mettre en place les établissements, les indicateurs et les cartes, à importer les données HMIS et HFA et à assurer le bon déroulement des importations. La gestion des résultats consiste à générer de nouveaux paquets lorsque des données récentes arrivent, à choisir celui qui est épinglé et à supprimer les anciens.

## Avant de commencer

Vous avez besoin d'un compte sur l'instance FASTR de votre organisation, avec un accès administrateur ou les permissions appropriées. Si vous rejoignez une instance existante, un autre administrateur vous ajoute sur la page **Utilisateurs**. Tant que ce n'est pas fait, un message vous indique que votre compte n'est pas encore approuvé.

## Naviguer dans la plateforme

La barre de navigation à gauche liste les pages principales. Ce que vous voyez dépend de vos permissions.

- **Produits** liste les présentations, rapports et visualisations dans une arborescence de dossiers. Tout le monde y a accès.
- **Explorer** permet à chacun de parcourir les tableaux, graphiques et cartes d'un paquet de résultats.
- **Résultats** liste les paquets de résultats et permet d'en générer de nouveaux. Cette page nécessite la permission **Voir les données**.
- **Portées** liste les portées de l'instance. Tout le monde y a accès ; les personnes ayant accès à toutes les données peuvent les créer et les modifier.
- **Données** regroupe les établissements, les indicateurs, les cartes, les importations et les paramètres de l'instance. Cette page nécessite **Voir les données**.
- **Ressources** regroupe les fichiers téléversés, tels que les fichiers CSV, les feuilles de calcul et les images. Tout le monde y a accès.
- **Utilisateurs** liste toutes les personnes ayant accès à l'instance. Cette page nécessite **Voir les utilisateurs**.

L'en-tête contient le menu **Aide** (visites guidées, demandes d'aide, retours et lien vers cette documentation), le menu de langue, la cloche des nouveautés et le menu de votre compte. Le bouton **IA** sur le bord droit de l'écran ouvre l'assistant IA depuis n'importe quelle page.

![Barre de navigation](/images/admin-index-navigation-fr.png)

## Premières étapes courantes

Lors de la mise en place d'une nouvelle instance, vous effectuez généralement ces tâches dans l'ordre :

1. Importez votre liste d'établissements HMIS, qui crée aussi la hiérarchie des zones administratives
2. Définissez les indicateurs que vous allez importer
3. Importez votre premier jeu de données HMIS (et les données d'enquête HFA, si vous en disposez)
4. Générez un paquet de résultats et épinglez-le
5. Créez des portées pour les régions ou les programmes qui ont besoin de leur propre fenêtre de données
6. Ajoutez les utilisateurs et limitez-les à certaines portées si nécessaire

Chacune de ces étapes fait l'objet d'une page dans ce guide.

## Obtenir de l'aide

Si vous rencontrez un problème qui n'est pas traité ici, ouvrez le menu **Aide** dans l'en-tête et choisissez **Demander de l'aide**. Décrivez ce que vous essayiez de faire et ce qui n'a pas fonctionné - vous pouvez joindre des captures d'écran, particulièrement utiles pour le dépannage. Les **Visites guidées**, dans le même menu, vous font découvrir chaque page de la plateforme.

## Dans cette section

- [Utilisateurs](/fr/admin-guide/users/) - Ajout d'utilisateurs, permissions et accès par portée
- [Structure](/fr/admin-guide/structure/) - Établissements, zones administratives, pondérations d'échantillonnage et cartes
- [Indicateurs](/fr/admin-guide/indicators/) - Définition des indicateurs HMIS et HFA
- [Données : HMIS](/fr/admin-guide/data-hmis/) - Importation des données sanitaires de routine
- [Données : HFA](/fr/admin-guide/data-hfa/) - Importation des données d'évaluation des établissements
- [Paquets de résultats](/fr/admin-guide/results-packages/) - Génération, épinglage et gestion des résultats
- [Portées](/fr/admin-guide/scopes/) - Définition des données que les produits peuvent utiliser
- [Modules](/fr/admin-guide/modules/) - Modules analytiques
