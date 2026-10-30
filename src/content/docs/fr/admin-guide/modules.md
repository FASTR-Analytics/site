---
title: Modules
description: Installation et gestion des modules analytiques.
sidebar:
  order: 7
---

Les modules sont le moteur analytique de FASTR. Chaque module exécute des scripts R qui traitent les données de votre projet - calcul d'indicateurs, détection de valeurs aberrantes, génération d'estimations de couverture ou réalisation d'autres analyses statistiques. Les résultats deviennent des métriques qui alimentent vos visualisations et vos rapports. Les modules sont configurés au niveau de l'instance via les lots de résultats, qui sont ensuite lus par les présentations et les rapports.

## Comprendre l'architecture d'un module

Un module comporte deux parties. La **définition de calcul** contient les scripts R qui traitent les données et produisent des résultats - ceux-ci s'exécutent dans des conteneurs Docker isolés. La **définition de présentation** précise quelles métriques le module produit et comment elles peuvent être visualisées.

Les modules sont inclus lors de la génération d'un lot de résultats au niveau de l'instance. Un lot de résultats regroupe les sorties de tous les modules sélectionnés pour un ensemble de données choisi. Chaque présentation et chaque rapport lit ses figures à partir d'un lot de résultats associé.

## Configurer les paramètres par défaut des modules
<!-- help#amod-configure -->

Les administrateurs de l'instance peuvent définir des sélections de modules par défaut et des valeurs de paramètres qui préremplissent l'assistant de génération de lots de résultats. Accédez à **Lots de résultats** au niveau de l'instance et cliquez sur **Paramètres par défaut des modules**. Sélectionnez les modules qui sont pré-cochés par défaut et définissez les valeurs de paramètres par défaut pour chacun.

Ces valeurs par défaut configurent l'assistant de génération lors de la création d'un nouveau lot de résultats. Les valeurs des paramètres des modules se règlent uniquement ici et s'appliquent à chaque lot qui inclut le module — elles ne sont pas modifiables dans l'assistant lui-même.

Si les valeurs par défaut globales du réseau sont publiées — un fichier enregistrant la valeur de paramètre utilisée par la plupart des pays pour chaque paramètre de module — l'éditeur affiche un panneau en haut. Lorsqu'une valeur de paramètre diffère de la valeur par défaut globale, le panneau affiche un comptage des paramètres différents et propose un bouton **Tout réinitialiser aux valeurs par défaut globales** pour restaurer tous les paramètres en une seule fois. Les paramètres individuels qui diffèrent de la valeur par défaut globale sont signalés en ligne par un badge, la valeur par défaut globale et un bouton de réinitialisation. Vous pouvez également réinitialiser l'ensemble des paramètres d'un module aux valeurs par défaut globales à l'aide du bouton **Réinitialiser aux valeurs par défaut globales** situé à côté de ce module. La réinitialisation à la valeur par défaut globale définit chaque paramètre à la valeur utilisée par la plupart des pays : non épinglé lorsque cette valeur est égale à la valeur par défaut de la définition actuelle (de sorte qu'il suit automatiquement la définition), épinglé sinon.

## Générer un lot de résultats
<!-- help#amod-install -->

Pour produire des résultats de modules, générez un nouveau lot de résultats depuis la page **Lots de résultats** de l'instance. Cliquez sur **Générer un nouveau lot de résultats** pour ouvrir l'assistant. L'assistant vous guide en trois étapes : sélectionner les familles de données à inclure (HMIS, HFA, données d'équité ICEH), choisir les modules à exécuter, puis confirmer le libellé.

L'assistant est une fenêtre modale éphémère — rien n'est enregistré sur le serveur avant que vous ne cliquiez sur **Lancer la génération**. L'ensemble de la configuration (sélections de familles de données, choix de modules et libellé) est soumis en une seule étape. Si vous fermez l'assistant avant de lancer, rien n'est conservé.

Après avoir cliqué sur **Lancer la génération**, la page du nouveau lot s'ouvre automatiquement dès que la notification SSE arrive. Vous pouvez quitter la page et suivre la progression sur la page Lots de résultats.

![Installer des modules](/images/installing-modules-en.png)

### Étape 1 — Choisir les données

Sélectionnez les familles de données à partir desquelles ce lot de résultats est généré. Chaque famille incluse est capturée dans son intégralité. Seules les familles pour lesquelles des données ont été téléversées sur l'instance sont disponibles à la sélection. Si une importation DHIS2 est en cours, les données HMIS sont temporairement indisponibles et une note l'explique — vous devez attendre la fin de l'importation avant de générer un lot incluant les données HMIS.

### Étape 2 — Configurer les modules

Choisissez les modules à exécuter. La liste de sélection affiche chaque module disponible organisé par famille de données, avec les modules principaux en premier et les analyses complémentaires en dessous. Sélectionnez un module en cochant sa case. La sélection d'un module inclut automatiquement tous les modules dont il dépend ; un module ne peut pas être désélectionné tant qu'un autre module sélectionné en dépend. Les modules qui nécessitent des familles de données non choisies à l'étape 1 sont affichés comme indisponibles, avec une note indiquant quelle famille est manquante afin que vous puissiez revenir à l'étape 1 pour l'ajouter.

Si un module sélectionné a des valeurs de paramètres enregistrées dans les paramètres par défaut des modules qui échouent à la validation, les noms de ces modules sont listés sous la sélection avec une invite à les corriger dans **Paramètres par défaut des modules** avant de lancer. Les valeurs des paramètres ne sont pas modifiables dans l'assistant.

Les modules disponibles comprennent :

- **Détection des perturbations** — détecte les perturbations de service à l'aide d'un modèle bayésien binomial négatif. Produit les séries observée, attendue, borne inférieure et borne supérieure qui alimentent le graphique des perturbations bayésien. Nécessite le module d'ajustements de la qualité des données comme prérequis.
- **Estimations de couverture** — calcule les estimations de couverture. Nécessite le module de dénominateurs de couverture comme prérequis.
- **Utilisation des services** — calcule les valeurs des indicateurs communs dérivés en appliquant la formule de chaque indicateur aux ingrédients additionnés issus de l'extraction HMIS. Nécessite le module d'ajustements de la qualité des données comme prérequis. Lorsque des termes de population sont utilisés dans les formules d'indicateurs, ce module utilise les données de personnes-années issues du magasin de population ; les zones et les mois non couverts par le magasin de population sont exclus pour ces indicateurs.

### Étape 3 — Confirmer et lancer

Saisissez un libellé pour le lot de résultats et vérifiez les sélections de données et de modules. L'assistant propose un libellé basé sur la date du jour. Cliquez sur **Lancer la génération** pour démarrer.

## Données de population et valeurs des indicateurs

Lorsqu'une ou plusieurs formules d'indicateurs font référence à un terme de population, le module d'utilisation des services nécessite que des données de population soient importées au niveau de l'instance avant la génération. La génération échoue si une population est référencée mais qu'aucune donnée n'est présente pour une zone de la structure HMIS actuelle au niveau de population configuré.

Le niveau de population doit être défini sur la page Population de l'instance et ne doit pas être plus profond que le niveau de profondeur administrative de la structure HMIS. Si le niveau de population est plus profond que la structure, la génération échoue avec un message clair expliquant l'incompatibilité.

Pour les zones et les mois pour lesquels des données de population existent, le module calcule l'indicateur. Pour les zones ou les mois non couverts par le magasin de population, le module exclut ces cellules pour les indicateurs dépendant de la population au lieu de faire échouer l'ensemble de la génération. Le lot de résultats enregistre les types de population actifs et la couverture obtenue.

## Supprimer des lots de résultats en masse

Au fil des générations, les anciens lots s'accumulent. Sélectionnez les lots dont vous n'avez plus besoin dans le tableau des lots de résultats et utilisez l'action groupée **Supprimer**. La vérification s'effectue lot par lot — les lots épinglés, encore en cours de génération ou associés à un produit sont refusés avec la raison indiquée, tandis que les autres sont supprimés. La liste se réduit en direct à chaque suppression sans rechargement.

## Épingler un lot de résultats

Les administrateurs peuvent désigner un lot prêt comme **lot épinglé** de l'instance. Les nouvelles présentations et les nouveaux rapports démarrent sur le lot épinglé. Les produits existants conservent leur propre lot, sauf si un éditeur les bascule manuellement. Pour épingler un lot, ouvrez sa vue de détail sur la page Lots de résultats et cliquez sur **Épingler**. Pour désépingler, cliquez sur **Désépingler** sur le lot actuellement épinglé.

Le lot épinglé est également le lot que le connecteur MCP de FASTR utilise. Lorsque vous connectez un client IA compatible au point d'accès MCP de votre instance, il lit les métriques et les données à partir du lot actuellement épinglé.

## Portées

Une portée définit quelle partie d'un lot de résultats une présentation ou un rapport peut afficher — par exemple une région, certaines années, ou certains modules et indicateurs. Les portées sont créées et gérées par les titulaires de la permission **Configurer les données** depuis l'onglet **Portées** de la navigation principale. La portée appelée **Toutes les données** est toujours présente et ne limite rien ; elle est affichée sous forme de panneau fixe au-dessus du tableau des portées plutôt que comme une ligne dans ce tableau. Sur la page Utilisateurs, un utilisateur peut également être limité à certaines portées afin de ne voir que les produits qui utilisent ces portées.

## Exécution et état des modules
<!-- help#amod-status -->

Chaque module dans un lot de résultats affiche son état de génération actuel :

- **Prêt** signifie que les résultats sont disponibles. Vous verrez les horodatages et les versions de données et de paramètres qui ont produit la sortie.
- **En cours d'exécution** indique que le module génère actuellement des résultats. Des messages de progression montrent quelle étape est en cours.
- **Erreur** signale qu'un problème est survenu lors de la génération.

Une fois qu'un lot est entièrement généré, son statut s'affiche sur la page du catalogue des lots de résultats. L'ouverture d'un lot depuis le catalogue affiche une barre d'état avec la progression de la génération, les puces de modules regroupées par famille de données pour un lot prêt, la ligne de sortie R en direct pendant l'exécution d'un script, les produits qui utilisent le lot et le tampon de population le cas échéant.

![État d'un module](/images/module-status-en.png)

## Consulter les journaux et les diagnostics

Lorsqu'un module produit une erreur ou des résultats inattendus, consultez les journaux depuis la vue de détail du lot de résultats. Accédez aux **Journaux** pour voir la sortie de la console R, les avertissements, les erreurs et les informations de minutage.

Pour les problèmes complexes, affichez le **Script** pour voir le code R exact qui a été exécuté. L'option **Fichiers** montre les fichiers de données produits par le module, utiles pour inspecter manuellement les résultats intermédiaires.

L'accès au script, aux fichiers et aux journaux requiert la permission **Consulter les données**. Ces permissions s'appliquent que vous consultiez depuis le catalogue de l'instance ou depuis l'onglet Lot de résultats d'un produit.

## Supprimer des lots de résultats

Pour supprimer un lot de résultats, ouvrez-le depuis le catalogue des lots de résultats de l'instance et cliquez sur **Supprimer**. FASTR refuse la suppression tant qu'un produit utilise le lot, tant que celui-ci est épinglé, ou tant que la génération est encore en cours. La vue de détail explique la raison lorsque la suppression est bloquée. La suppression retire définitivement les fichiers et les résultats en cache du lot et ne peut pas être annulée.
