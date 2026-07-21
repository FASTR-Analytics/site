---
title: Présentations
description: Créer des présentations et exporter des documents.
sidebar:
  order: 5
---

Les présentations vous permettent d'assembler des visualisations en présentations soignées destinées aux parties prenantes. Au lieu d'exporter des graphiques individuels et de les organiser manuellement dans PowerPoint, vous construisez la présentation directement dans FASTR - avec un style cohérent, des pages de couverture et des séparateurs de section. Une fois terminée, vous exportez l'ensemble sous forme de fichier PDF ou PowerPoint.

## Créer une présentation
<!-- help#deck-create -->

Ouvrez votre projet et cliquez sur **Présentations** dans la barre latérale gauche. Cliquez sur **Créer une présentation** pour commencer. Vous lui donnerez un nom et pourrez éventuellement l'affecter à un dossier pour l'organiser.

Une nouvelle présentation démarre vide. Le panneau de gauche affiche vos diapositives, et la zone principale montre un aperçu de la diapositive sélectionnée. Vous construirez la présentation en ajoutant différents types de diapositives.

![Creating Slide Deck FR](/images/creating-slide-deck-fr.png)

## Types de diapositives

Les présentations contiennent trois types de diapositives. Les **diapositives de couverture** introduisent la présentation avec un titre, un sous-titre, le nom du présentateur (facultatif) et une date. Les **diapositives de section** divisent le contenu en groupes logiques avec un titre de section. Les deux utilisent un design affirmé, en pleine page. Les **diapositives de contenu** sont l'endroit où vivent vos données - elles contiennent des visualisations, du texte et des images.

Lorsque vous ajoutez une diapositive, vous en choisissez le type. Vous pouvez convertir un type en un autre par la suite à l'aide du menu déroulant de l'éditeur.

## Construire des diapositives de contenu
<!-- help#deck-content-slides -->

Les diapositives de contenu utilisent un système de mise en page flexible composé d'un ou plusieurs blocs de contenu. Un bloc peut contenir du texte (mis en forme avec Markdown), une visualisation de votre projet ou une image téléversée.

Pour ajouter une visualisation, cliquez sur un bloc de figure vide et choisissez **Sélectionner une visualisation**. Sélectionnez-en une dans la liste : elle apparaît dans le bloc, rendue avec ses paramètres actuels. Vous pouvez trier les visualisations dans le panneau de sélection par nom ou par récemment mis à jour en utilisant le contrôle de tri en haut du panneau. Si vous devez ajuster l'affichage - période différente ou désagrégation différente - vous pouvez modifier la visualisation intégrée directement depuis la diapositive.

Faites un clic droit sur un bloc pour accéder aux options de mise en page comme « Diviser gauche/droite » ou « Supprimer le bloc ». Vous pouvez faire glisser les séparateurs entre les blocs pour ajuster leurs tailles relatives.

Si une visualisation ou une image ne peut pas être rendue - par exemple en raison d'une erreur de données ou d'un fichier manquant - FASTR affiche une courte notice dans le bloc plutôt que de le laisser vide ou d'interrompre l'export.

![Building Content Slides FR](/images/building-content-slides-fr.png)

## Présenter des diapositives

Cliquez sur **Présenter** dans l'en-tête de la liste des diapositives pour ouvrir le présentateur en plein écran. Le présentateur affiche une diapositive à la fois et précharge les diapositives voisines afin que la navigation soit instantanée. Utilisez les touches fléchées ou les commandes à l'écran pour passer d'une diapositive à l'autre. Appuyez sur **Échap** ou cliquez sur le bouton de fermeture pour quitter. Cliquez sur l'icône d'agrandissement pour passer en mode plein écran réel ; appuyer sur **Échap** en plein écran quitte entièrement la présentation.

Lorsque des collaborateurs ajoutent, suppriment ou réorganisent des diapositives pendant que le présentateur est ouvert, le présentateur prend en compte ces modifications automatiquement. La liste des diapositives et le compteur de pages se mettent à jour pour refléter la présentation actuelle, et les rendus mis en cache sont actualisés dès qu'un collaborateur modifie une diapositive déjà chargée.

## Style de la présentation

Cliquez sur **Paramètres** dans l'en-tête de la présentation pour configurer le style qui s'applique à toutes les diapositives. Les options incluent le thème de couleurs, la police de caractères, le modèle de mise en page et le traitement de la couverture. Vous pouvez également configurer quels logos apparaissent sur les diapositives de couverture, les en-têtes et les pieds de page.

![Deck Styling FR](/images/deck-styling-fr.png)

## Collaborer sur une présentation

Lorsque plusieurs personnes ont la même présentation ouverte, le curseur de chacun apparaît sous la forme d'une flèche colorée avec son nom sur le canevas de la diapositive. Vous pouvez également voir qui modifie actuellement une diapositive spécifique - une petite icône de présence apparaît en bas des vignettes de diapositives dans la liste. Des icônes d'avatar dans l'en-tête de la présentation indiquent qui d'autre a la présentation ouverte en même temps. Cela facilite la coordination sans écraser le travail d'un autre.

Lorsque vous ouvrez l'éditeur de diapositive, les champs de texte du titre, de l'en-tête et des autres champs racines de la diapositive sont liés de manière collaborative : les curseurs des collaborateurs distants apparaissent dans le même champ de texte que celui dans lequel vous tapez, afin que vous puissiez voir exactement où ils se trouvent. Les blocs de texte de corps sur les diapositives de contenu fonctionnent de la même manière.

L'assistant IA ne modifie pas une diapositive qu'un autre collaborateur a actuellement ouverte dans l'éditeur, afin d'éviter d'écraser des modifications en cours. Si vous demandez à l'IA de modifier une diapositive en cours d'édition par un collègue, elle vous en informera et attendra que vous réessayiez une fois la diapositive libre.

## Historique des versions

Cliquez sur **Historique des versions** dans le menu de débordement de la présentation pour ouvrir le panneau d'historique des versions. Les versions sont enregistrées automatiquement à la fin de chaque session d'édition et regroupées par jour sur la gauche. Sélectionnez une version pour voir une grille de toutes les vignettes de diapositives telles qu'elles se présentaient à ce moment-là. Les diapositives nouvelles, modifiées et supprimées sont signalées par le nom du collaborateur qui a effectué la modification. Cliquez sur une vignette pour ouvrir une vue en grand format ; les diapositives modifiées affichent également une ventilation des champs de texte et des blocs ayant changé au cours de cette session.

Utilisez **Restaurer** pour réinitialiser la présentation à cette version (votre contenu actuel est d'abord enregistré comme nouvelle version), ou **Restaurer comme copie** pour créer une nouvelle présentation à partir de l'instantané.

## Exporter et partager
<!-- help#deck-export -->

Cliquez sur **Télécharger** pour exporter votre présentation. **PDF natif** produit un fichier vectoriel de haute qualité où le texte reste net à n'importe quel niveau de zoom. **PPTX avec figures matricielles** crée un fichier PowerPoint où les visualisations sont intégrées sous forme d'images - utile si les destinataires doivent apporter des modifications.

Vous pouvez aussi partager des présentations directement par e-mail. Cliquez sur **Partager**, sélectionnez les destinataires dans la liste des utilisateurs de votre instance ou ajoutez des adresses e-mail, et incluez éventuellement un message. FASTR génère un PDF et l'envoie en pièce jointe.

![Exporting and Sharing FR](/images/exporting-and-sharing-fr.png)

## Organisation

Utilisez des dossiers pour garder vos présentations organisées à mesure que votre projet s'agrandit. Dans la vue en liste, cliquez sur **Nouveau dossier** pour en créer un, puis faites un clic droit sur les présentations pour les déplacer. Vous pouvez dupliquer des présentations lorsque vous créez des variantes pour différents publics. Le champ de recherche filtre les présentations par nom. Utilisez le contrôle de tri en haut de la liste pour classer les présentations par nom ou par récemment mis à jour.
