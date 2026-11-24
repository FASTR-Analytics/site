---
title: Présentations
description: Construire, présenter et exporter des présentations.
sidebar:
  order: 5
---

Les présentations vous permettent de construire un support directement dans FASTR, avec des visualisations en direct issues de votre paquet de résultats. Au lieu d'exporter les graphiques un par un pour les disposer dans PowerPoint, vous construisez la présentation en un seul endroit avec un thème cohérent, puis vous la présentez depuis le navigateur ou la téléchargez en fichier PDF ou PowerPoint.

## Créer une présentation
<!-- help#deck-create -->

Sur la page **Produits**, cliquez sur **Nouveau** et choisissez **Nouvelle présentation**. Donnez un nom à la présentation, choisissez un dossier, un paquet de résultats et une portée, puis cliquez sur **Créer** - voir [Produits](/fr/user-guide/products/) pour la signification du paquet et de la portée.

La présentation s'ouvre immédiatement et vous invite à choisir un thème. Choisissez-en un et cliquez sur **Appliquer le thème** ; vous pourrez le changer plus tard depuis le menu **Présentation**.

## L'éditeur de présentation

L'éditeur comporte un **rail de diapositives** à gauche, qui liste vos diapositives sous forme de miniatures, et la diapositive ouverte à côté. Au-dessus, l'en-tête contient le nom de la présentation (cliquez dessus pour la renommer), l'étiquette du paquet et de la portée, l'état d'enregistrement, **Présenter** et **Historique**. Sous l'en-tête se trouvent une rangée de menus - **Ajouter une diapositive**, **Fichier**, **Présentation** et, pour la diapositive ouverte, **Diapositive**, **Insérer** et **Panneau divisé** - ainsi qu'une barre d'outils de mise en forme.

Dans le rail, cliquez sur une carte pour ouvrir la diapositive correspondante et faites glisser les cartes pour les réordonner. Sélectionnez plusieurs diapositives avec Ctrl/Cmd-clic ou Maj-clic, puis faites un clic droit pour les dupliquer ou les supprimer.

Il n'y a pas de bouton d'enregistrement. Les modifications sont enregistrées au fil de votre travail, et d'autres personnes peuvent modifier la même présentation en même temps que vous. **Annuler** et **Rétablir** dans la barre d'outils (ou Ctrl/Cmd+Z) n'agissent que sur vos propres modifications.

![Éditeur de présentation](/images/slide-decks-editor-fr.png)

## Types de diapositives

Cliquez sur **Ajouter une diapositive** et choisissez un type de diapositive. Une **Diapositive de couverture** ouvre la présentation avec un titre, un sous-titre, un présentateur et une date. Une **Diapositive de section** divise la présentation en parties. Une **Diapositive de contenu** accueille vos données - elle contient du texte, des visualisations et des images.

Pour changer le type de la diapositive ouverte, utilisez **Diapositive** > **Type de diapositive**. Si vous changez de type puis revenez au type d'origine, le contenu précédent réapparaît.

## Construire des diapositives de contenu
<!-- help#deck-content-slides -->

Une diapositive de contenu est composée d'un ou plusieurs blocs. Chaque bloc contient du texte, une visualisation ou une image - faites votre choix avec **Type de contenu** dans la barre d'outils lorsqu'un bloc est sélectionné. Pour changer la disposition, cliquez sur **Mise en page** (ou faites un clic droit sur la diapositive) et utilisez **Diviser** pour partager un bloc en lignes ou en colonnes, **Ajouter** pour insérer une colonne ou une ligne à côté, **Déplacer** pour le décaler, ou **Supprimer cette cellule**. Faites glisser les séparateurs entre les blocs pour les redimensionner, et faites glisser un bloc sur un autre pour les intervertir.

Pour écrire, double-cliquez sur un bloc de texte ou un titre et saisissez directement sur la diapositive. La barre d'outils propose des styles de texte, le gras, l'italique, les listes et les citations. Le corps du texte s'ajuste automatiquement à la taille de son bloc.

Utilisez **Insérer** pour ajouter l'en-tête, le sous-en-tête, la date ou le pied de page de la diapositive. **Panneau divisé** ajoute un panneau coloré, à motif ou avec une image sur un côté d'une diapositive de contenu.

![Menu de mise en page d'une diapositive de contenu](/images/slide-decks-layout-menu-fr.png)

## Ajouter des visualisations
<!-- help#deck-visualizations -->

Sélectionnez un bloc de visualisation vide et choisissez l'une des options suivantes :

- **Insérer une nouvelle visualisation** - choisissez une métrique et un préréglage, puis ajustez la visualisation dans l'éditeur de visualisation. Voir [Visualisations](/fr/user-guide/visualizations/).
- **Insérer une visualisation existante** - choisissez l'une des visualisations enregistrées sur la page Produits. FASTR insère une copie : les modifications ultérieures de la visualisation enregistrée n'affectent pas la diapositive, et les modifications sur la diapositive n'affectent pas la visualisation enregistrée.

Lorsqu'un bloc contient une visualisation, sélectionnez-le et utilisez **Modifier la visualisation** pour changer sa période, ses filtres ou son style, ou **Remplacer la visualisation** pour la remplacer par une autre.

Si la présentation est déplacée vers un paquet de résultats plus récent, ses visualisations sont signalées comme obsolètes. Mettez-les à jour une par une depuis le badge de chaque bloc, ou toutes à la fois avec **Mettre à jour toutes les visualisations** dans l'en-tête.

## Appliquer un modèle
<!-- help#deck-blueprint -->

Un modèle est un gabarit réutilisable créé à partir d'une présentation existante dans un autre pays. Il contient les sujets de la présentation, les dispositions des diapositives et les consignes de rédaction, mais aucune donnée de ce pays - l'IA construit tout à partir de votre propre paquet de résultats lorsqu'elle applique le modèle.

Pour créer un modèle à partir de la présentation ouverte, choisissez **Fichier** > **Créer un modèle…**. L'IA lit les diapositives et prépare les sujets, les objectifs, les règles de mise à l'échelle et les consignes de rédaction ; une boîte de dialogue de progression affiche chaque étape. Relisez le résultat, modifiez les sujets ou les consignes, puis cliquez sur **Télécharger le fichier du modèle** pour enregistrer un fichier `.fastr-blueprint.json` que vous pouvez partager.

Pour appliquer un modèle à la présentation ouverte, choisissez **Fichier** > **Appliquer un modèle…** (ou utilisez l'action **Appliquer un modèle à cette présentation…** dans le menu du panneau IA). Choisissez le fichier du modèle, relisez ses sujets et ses rôles de période, définissez la période de rapport, puis cliquez sur **Appliquer avec l'IA**. Le panneau IA ouvre une nouvelle conversation, lit le modèle, vérifie les données de la présentation et propose une carte de plan indiquant le nombre de diapositives prévues par sujet. Modifiez les comptages et les remplacements sur la carte, puis cliquez sur **Créer** pour laisser l'IA créer les diapositives. Le contenu précédent de la présentation peut être remplacé ou conservé, et l'apparence du modèle peut être appliquée ou ignorée - la carte vous donne les deux choix.

## Thèmes et paramètres de la présentation

Le menu **Présentation** définit l'apparence de l'ensemble de la présentation. **Thème** propose un ensemble de designs prêts à l'emploi. **Logos** choisit les logos qui apparaissent sur les diapositives de couverture, les en-têtes de contenu et les pieds de page. **Pied de page et numéros** définit un pied de page unique pour toutes les diapositives de contenu et active ou désactive les numéros de page. Les modifications s'appliquent immédiatement. **Tous les paramètres…** ouvre les mêmes options sur un seul écran.

## Copier des diapositives vers une autre présentation

Pour réutiliser des diapositives, sélectionnez-les dans le rail et choisissez **Fichier** > **Copier N diapositives vers une présentation…**. Choisissez une présentation de destination que vous pouvez modifier et cliquez sur **Sauvegarder**. Les visualisations sont copiées telles quelles ; si la destination utilise un autre paquet ou une autre portée, elles y affichent un bouton de mise à jour.

## Présenter
<!-- help#deck-present -->

Cliquez sur **Présenter** pour afficher la présentation en plein écran. Utilisez les touches fléchées, la barre d'espace ou Page précédente et Page suivante pour passer d'une diapositive à l'autre, et Échap pour quitter.

## Téléchargement et partage
<!-- help#deck-export -->

Choisissez **Fichier** > **Télécharger…** pour exporter la présentation. **PDF natif** est recommandé - le texte reste net à tous les niveaux de zoom. **PPTX natif avec visualisations matricielles** crée un fichier PowerPoint dans lequel les graphiques sont des images, utile lorsque quelqu'un doit modifier les diapositives.

Pour envoyer la présentation par e-mail, choisissez **Fichier** > **Partager…**. Sélectionnez des personnes de l'instance ou saisissez des adresses e-mail, ajoutez un message facultatif et cliquez sur **Envoyer**. Chaque destinataire reçoit la présentation en pièce jointe au format PDF.

Les lecteurs peuvent aussi présenter, télécharger et partager une présentation, et copier ses diapositives dans une présentation qui leur appartient.

![Boîte de dialogue Télécharger la présentation](/images/slide-decks-download-fr.png)
