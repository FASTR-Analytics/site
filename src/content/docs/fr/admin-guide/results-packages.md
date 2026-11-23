---
title: Paquets de résultats
description: Génération, épinglage et gestion des paquets de résultats.
sidebar:
  order: 6
---

Un paquet de résultats est un ensemble complet et figé de résultats d'analyse. Lorsque vous en générez un, FASTR prend un instantané des données de l'instance, exécute les modules d'analyse sur cet instantané et conserve tout ce que les modules produisent. Chaque présentation, rapport et visualisation tire ses chiffres d'un paquet : c'est donc sur la page **Résultats** que les nouvelles données deviennent disponibles pour les personnes qui construisent des produits.

## Pourquoi les paquets sont figés

Un paquet ne change jamais après sa génération. L'importation de nouvelles données ne modifie pas les paquets existants - elle n'affecte que le prochain paquet que vous générez. Ainsi, un rapport rédigé à partir du paquet d'octobre continue d'afficher les chiffres d'octobre, même après l'arrivée des données de novembre. Les auteurs passent leurs produits à un paquet plus récent lorsqu'ils sont prêts, et FASTR signale les visualisations concernées comme obsolètes afin qu'ils puissent les mettre à jour.

La contrepartie est que les nouvelles données n'atteignent les produits qu'après deux étapes : vous les importez, puis vous générez un nouveau paquet.

## Générer un paquet
<!-- help#results-generate -->

Vous avez besoin de la permission **Configurer les données** pour générer un paquet. Sur la page **Résultats**, cliquez sur **Générer un nouveau paquet de résultats** et suivez les trois étapes :

1. **Données** - choisissez les données à inclure : **Données HMIS**, **Données FOSA** et **Données d'équité ICEH**. Un type de données n'est pas disponible si rien n'a été importé pour lui, ou pendant qu'une importation DHIS2 est en cours.
2. **Modules** - choisissez les modules à exécuter. Tous les modules sont cochés au départ, et tout module dont un autre dépend est ajouté automatiquement.
3. **Confirmer et lancer** - saisissez un **Libellé** de 20 caractères au maximum. La date du jour est proposée. Les libellés doivent être uniques.

Cliquez sur **Lancer la génération**. La page du nouveau paquet s'ouvre et une barre de progression affiche chaque étape - export des données, exécution de chaque module et publication du paquet. La génération s'exécute en arrière-plan : vous pouvez quitter la page et y revenir.

Les modules réutilisent les sorties précédentes lorsque leurs entrées n'ont pas changé ; un nouveau paquet est donc souvent plus rapide à générer que le premier. Les paramètres de chaque module proviennent du bouton **Paramètres par défaut des modules** de la page Résultats - voir [Modules](/fr/admin-guide/modules/).

![Assistant de génération d'un paquet de résultats](/images/results-packages-generate-fr.png)

## La liste des résultats

La page Résultats liste chaque paquet avec les données qu'il contient, son nombre de modules, la date et l'auteur de sa création, son statut et le nombre de produits qui l'utilisent. Les statuts sont **En cours de génération**, **Prêt**, **Échoué** et **Retiré**. Cliquez sur une ligne pour ouvrir le paquet.

## À l'intérieur d'un paquet

Un paquet prêt s'ouvre sur une page comportant un onglet par type de données qu'il contient. Chaque onglet liste ses modules à gauche. Sélectionnez un module pour voir ses visualisations prédéfinies - les graphiques, cartes et tableaux par défaut fournis par le module - et utilisez le sélecteur **Portée** pour voir leur rendu sous une portée donnée.

Chaque module affiche aussi ses **Paramètres**, son **Script et journaux** et ses **Fichiers de sortie**, que vous pouvez télécharger. Si le paquet a utilisé des données de population, une ligne **Population** indique le niveau ainsi que le nombre de zones et de mois couverts.

Si la génération a échoué, la page affiche **Échec de la génération** avec les journaux du module qui s'est arrêté, afin que vous puissiez voir ce qui n'a pas fonctionné.

![Page d'un paquet de résultats](/images/results-packages-package-page-fr.png)

## Épingler un paquet
<!-- help#results-pin -->

Un seul paquet peut être épinglé. Le paquet épinglé est celui utilisé par défaut pour les nouvelles présentations et les nouveaux rapports : épinglez donc le paquet sur lequel vous souhaitez que les utilisateurs travaillent - généralement le plus récent qui semble correct.

Ouvrez un paquet prêt et cliquez sur **Épingler**. L'épinglage ne modifie jamais les produits existants ; ils conservent le paquet sur lequel ils ont été construits. Pour retirer l'épingle, cliquez sur **Désépingler**. FASTR n'épingle jamais un paquet automatiquement : après en avoir généré un nouveau, c'est vous qui choisissez le moment de basculer.

## Supprimer des paquets

Les paquets occupent de l'espace disque ; supprimez donc ceux dont personne n'a besoin. Ouvrez le paquet et cliquez sur **Supprimer**, ou sélectionnez-en plusieurs dans la liste et utilisez **Supprimer**. Un paquet ne peut pas être supprimé pendant sa génération, lorsqu'il est épinglé ou lorsqu'un produit l'utilise - la page affiche alors la raison à la place du bouton Supprimer. La suppression efface définitivement les fichiers du paquet.
