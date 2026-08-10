---
title: Modules
description: Installation et gestion des modules analytiques.
sidebar:
  order: 7
---

Les modules sont le moteur analytique de FASTR. Chaque module exécute des scripts R qui traitent les données de votre projet - calcul d'indicateurs, détection de valeurs aberrantes, génération d'estimations de couverture ou réalisation d'autres analyses statistiques. Les résultats deviennent des métriques qui alimentent vos visualisations et vos rapports. Les modules sont configurés au niveau de l'instance via les lots de résultats, qui sont ensuite associés aux projets.

## Comprendre l'architecture d'un module

Un module comporte deux parties. La **définition de calcul** contient les scripts R qui traitent les données et produisent des résultats - ceux-ci s'exécutent dans des conteneurs Docker isolés. La **définition de présentation** précise quelles métriques le module produit et comment elles peuvent être visualisées.

Les modules sont inclus lors de la génération d'un lot de résultats au niveau de l'instance. Un lot de résultats regroupe les sorties de tous les modules sélectionnés pour un ensemble de données choisi. Les projets servent leurs visualisations à partir d'un lot de résultats associé.

## Configurer les paramètres par défaut des modules
<!-- help#amod-configure -->

Les administrateurs de l'instance peuvent définir des sélections de modules par défaut et des valeurs de paramètres qui préremplissent l'assistant de génération de lots de résultats. Accédez à **Lots de résultats** au niveau de l'instance et cliquez sur **Paramètres par défaut des modules**. Sélectionnez les modules qui sont pré-cochés par défaut et définissez les valeurs de paramètres par défaut pour chacun. Ces valeurs par défaut s'appliquent à chaque nouvelle configuration de lot, mais peuvent être remplacées lors de la génération d'un lot individuel.

## Générer un lot de résultats
<!-- help#amod-install -->

Pour produire des résultats de modules, générez un nouveau lot de résultats depuis la page **Lots de résultats** de l'instance. Cliquez sur **Générer un nouveau lot de résultats** pour ouvrir l'assistant. L'assistant vous guide en trois étapes : sélectionner les familles de données à inclure (HMIS, HFA, données d'équité ICEH), choisir les modules à exécuter et configurer leurs valeurs de paramètres, puis confirmer le libellé et éventuellement associer le lot à des projets spécifiques immédiatement.

Si une configuration est déjà en cours, un bouton **Reprendre la configuration** apparaît à la place. Reprendre permet de continuer là où vous vous étiez arrêté.

![Installer des modules](/images/installing-modules-en.png)

### Étape 1 — Choisir les données

Sélectionnez les familles de données à partir desquelles ce lot de résultats est généré. Chaque famille incluse est capturée dans son intégralité. Seules les familles pour lesquelles des données ont été téléversées sur l'instance sont disponibles à la sélection.

### Étape 2 — Configurer les modules

Choisissez les modules à exécuter. La sélection d'un module inclut automatiquement tous les modules dont il dépend ; un module ne peut pas être désélectionné tant qu'un autre module sélectionné en dépend. Les modules qui nécessitent des familles de données non choisies à l'étape 1 sont affichés comme indisponibles. Pour chaque module sélectionné, configurez ses valeurs de paramètres — l'assistant prérenseigne les valeurs par défaut issues des paramètres par défaut des modules.

### Étape 3 — Confirmer et lancer

Saisissez un libellé pour le lot de résultats et vérifiez les sélections de données et de modules. Sélectionnez éventuellement des projets à associer immédiatement au nouveau lot — ces projets basculeront vers le nouveau lot lorsque la génération réussira. Cliquez sur **Lancer la génération** pour démarrer. La génération s'exécute en arrière-plan ; vous pouvez quitter la page et suivre la progression sur la page Lots de résultats.

## Exécution et état des modules
<!-- help#amod-status -->

Chaque module dans un lot de résultats affiche son état de génération actuel :

- **Prêt** signifie que les résultats sont disponibles. Vous verrez les horodatages et les versions de données et de paramètres qui ont produit la sortie.
- **En cours d'exécution** indique que le module génère actuellement des résultats. Des messages de progression montrent quelle étape est en cours.
- **Erreur** signale qu'un problème est survenu lors de la génération.

Une fois qu'un lot est entièrement généré, son statut s'affiche sur la page du catalogue des lots de résultats.

![État d'un module](/images/module-status-en.png)

## Consulter les journaux et les diagnostics

Lorsqu'un module produit une erreur ou des résultats inattendus, consultez les journaux depuis la vue de détail du lot de résultats. Accédez aux **Journaux** pour voir la sortie de la console R, les avertissements, les erreurs et les informations de minutage.

Pour les problèmes complexes, affichez le **Script** pour voir le code R exact qui a été exécuté. L'option **Fichiers** montre les fichiers de données produits par le module, utiles pour inspecter manuellement les résultats intermédiaires.

## Supprimer des lots de résultats

Pour supprimer un lot de résultats, cliquez sur **Supprimer** sur sa carte dans le catalogue des lots de résultats de l'instance. FASTR refuse la suppression tant qu'un projet utilise le lot ou que celui-ci est encore en cours de génération. La carte explique la raison lorsque la suppression est bloquée. La suppression retire définitivement les fichiers et les résultats en cache du lot et ne peut pas être annulée.
