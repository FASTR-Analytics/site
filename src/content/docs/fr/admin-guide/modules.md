---
title: Modules
description: Les modules d'analyse, leurs paramètres et leurs journaux.
sidebar:
  order: 7
---

Les modules sont les analyses que FASTR exécute lorsqu'il génère un paquet de résultats. Chaque module est un script R qui lit les données de l'instance, ou les sorties d'autres modules, et produit des fichiers de résultats - listes de valeurs aberrantes, volumes de services ajustés, estimations de couverture, indicateurs d'enquête. Ces résultats deviennent les métriques utilisées dans les visualisations, les présentations et les rapports.

Vous n'installez ni ne mettez à jour les modules vous-même. FASTR propose le même ensemble de modules sur chaque instance, et chaque nouveau paquet de résultats exécute la version actuelle de chaque module. Votre rôle est de choisir leurs paramètres et de vérifier leurs sorties lorsque quelque chose semble anormal.

## Les modules

Les modules sont regroupés selon le type de données qu'ils utilisent. Dans chaque groupe, un module principal produit les résultats essentiels, et des analyses complémentaires l'alimentent ou le complètent.

| Données | Module | Ce qu'il fait |
|---|---|---|
| HMIS | **Utilisation des services** (principal) | Volumes de services et valeurs des indicateurs pour chaque zone et chaque période. Les indicateurs dont les formules utilisent des termes de population nécessitent des données de population - voir [Indicateurs](/fr/admin-guide/indicators/). |
| HMIS | **Évaluation de la qualité des données** | Valeurs aberrantes, complétude de la notification et cohérence interne entre indicateurs liés. |
| HMIS | **Ajustements de la qualité des données** | Volumes de services ajustés pour les valeurs aberrantes et la notification incomplète. |
| HMIS | **Détection des perturbations** | Volumes de services attendus, pour montrer où les services ont été insuffisants. |
| HMIS | **Dénominateurs de couverture** | Populations cibles utilisées pour calculer la couverture. |
| HMIS | **Estimations de couverture** | Couverture des services clés, comparée aux estimations d'enquête. |
| FOSA | **Évaluation des établissements de santé** | Indicateurs issus des cycles de l'enquête d'évaluation des établissements de santé. |
| ICEH | **Analyse de l'enquête ICEH** | Indicateurs d'équité issus des données d'enquête ICEH. |

Certains modules ont besoin que d'autres s'exécutent d'abord. Les ajustements de la qualité des données nécessitent l'évaluation de la qualité des données, et la détection des perturbations, l'utilisation des services et les dénominateurs de couverture utilisent tous les volumes ajustés. Les estimations de couverture nécessitent les dénominateurs de couverture. FASTR s'en charge pour vous lorsque vous générez un paquet.

Pour le fonctionnement de chaque analyse, consultez la section [Méthodologie](/fr/methodology/00_introduction/).

## Configurer les paramètres par défaut des modules
<!-- help#amod-configure -->

Les paramètres des modules - seuils, indicateurs à vérifier, niveau administratif d'analyse - se règlent à un seul endroit et servent à chaque paquet de résultats que vous générez. Vous avez besoin de l'autorisation **Configurer les données**.

Sur la page **Résultats**, cliquez sur **Paramètres par défaut des modules**. Les modules qui ont des paramètres sont listés à gauche, regroupés par type de données. Sélectionnez-en un pour voir ses paramètres à droite.

Chaque paramètre part de la valeur par défaut choisie par les auteurs du module. Lorsque vous en modifiez un, il est marqué **Diffère de la valeur par défaut**, avec la valeur par défaut à côté et un bouton pour la rétablir. La liste de gauche indique combien de paramètres vous avez modifiés dans chaque module. **Réinitialiser aux valeurs par défaut de la définition** rétablit tous les paramètres du module affiché, et **Tout réinitialiser aux valeurs par défaut de la définition** fait de même pour tous les modules.

Cliquez sur **Appliquer** pour enregistrer vos modifications, ou sur **Annuler** pour les abandonner. Les nouveaux paramètres s'appliquent au prochain paquet que vous générez ; les paquets existants conservent les paramètres avec lesquels ils ont été générés.

![Paramètres par défaut des modules](/images/modules-defaults-fr.png)

## Choisir les modules lors de la génération
<!-- help#amod-install -->

La deuxième étape de l'assistant de génération, **Configurer les modules**, liste tous les modules par type de données. Tous les modules que les données choisies permettent d'exécuter sont cochés au départ. Lorsque vous cochez un module, les modules dont il dépend sont cochés aussi, et vous ne pouvez pas décocher un module tant qu'un autre module coché en a besoin - la liste indique quels modules le requièrent.

Un module est grisé s'il a besoin de données que vous n'avez pas choisies à la première étape, avec une note qui nomme les données manquantes. Cliquez sur **Retour** pour les ajouter.

L'assistant ne permet pas de modifier les paramètres. Si les paramètres enregistrés d'un module ne sont pas valides, l'assistant nomme le module, et vous les corrigez dans **Paramètres par défaut des modules** avant de lancer la génération.

Consultez [Paquets de résultats](/fr/admin-guide/results-packages/) pour le reste de l'assistant.

![Étape Configurer les modules](/images/modules-wizard-fr.png)

## Exécution et état des modules
<!-- help#amod-status -->

Pendant la génération d'un paquet, sa page affiche une barre de progression et la dernière ligne de sortie du module en cours d'exécution. La génération se déroule en arrière-plan : vous pouvez quitter la page.

Lorsque le paquet est prêt, la ligne **Modules** en haut de sa page liste tous les modules qu'il contient, regroupés par type de données. Cliquez sur un module pour ouvrir ses journaux.

Si un module échoue, le paquet échoue avec lui. La page affiche **Échec de la génération** avec les journaux du module qui s'est arrêté, pour que vous puissiez voir ce qui s'est passé. Corrigez la cause - souvent les données ou un paramètre de module - et générez un nouveau paquet.

## Paramètres, scripts et journaux

Chaque onglet de la page d'un paquet liste ses modules à gauche. Sélectionnez-en un pour voir, sous ses visualisations prédéfinies :

- **Paramètres** - les valeurs des paramètres avec lesquelles ce paquet a été généré.
- **Script et journaux** - **Script** affiche le code R exact qui a été exécuté, et **Journaux** affiche sa sortie console, y compris les avertissements et les erreurs.
- **Fichiers de sortie** - les fichiers de résultats produits par le module, que vous pouvez télécharger pour vos propres vérifications.

Le script, les journaux et les fichiers nécessitent l'autorisation **Voir les données**.

![Paramètres, script, journaux et fichiers d'un module](/images/modules-package-module-fr.png)

Les journaux sont le premier endroit à consulter lorsque les résultats d'un module semblent erronés. Ils montrent chaque étape du script, la quantité de données trouvée et les avertissements émis en cours de route.

![Journaux d'un module](/images/modules-logs-fr.png)
