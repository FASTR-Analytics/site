---
title: Présentations
description: Créer des présentations et exporter des documents.
sidebar:
  order: 5
---

Les présentations vous permettent d'assembler des visualisations en présentations soignées destinées aux parties prenantes. Au lieu d'exporter des graphiques individuels et de les organiser manuellement dans PowerPoint, vous construisez la présentation directement dans FASTR - avec un style cohérent, des pages de couverture et des séparateurs de section. Une fois terminée, vous exportez l'ensemble sous forme de fichier PDF ou PowerPoint.

## Créer une présentation
<!-- help#deck-create -->

Ouvrez l'onglet **Produits** sur l'écran d'accueil de votre instance. Les présentations apparaissent sous forme de cartes dans l'explorateur de produits, aux côtés des rapports. Cliquez sur **Nouvelle présentation** pour en créer une — l'éditeur s'ouvre immédiatement. Vous pouvez organiser les présentations dans des dossiers à l'aide de **Nouveau dossier** et les déplacer entre dossiers depuis le menu de leur carte.

Une nouvelle présentation démarre vide. Le panneau de gauche affiche vos diapositives, et la zone principale montre un aperçu de la diapositive sélectionnée. Vous construirez la présentation en ajoutant différents types de diapositives.

Pour créer des présentations, un paquet de résultats doit d'abord être épinglé au niveau de l'instance.

![Creating Slide Deck FR](/images/creating-slide-deck-fr.png)

## Types de diapositives

Les présentations contiennent trois types de diapositives. Les **diapositives de couverture** introduisent la présentation avec un titre, un sous-titre, le nom du présentateur (facultatif) et une date. Les **diapositives de section** divisent le contenu en groupes logiques avec un titre de section. Les deux utilisent un design affirmé, en pleine page. Les **diapositives de contenu** sont l'endroit où vivent vos données - elles contiennent des visualisations, du texte et des images.

Lorsque vous ajoutez une diapositive, vous en choisissez le type. Vous pouvez convertir un type en un autre par la suite à l'aide du menu déroulant de la barre d'outils de l'éditeur de diapositive.

## Construire des diapositives de contenu
<!-- help#deck-content-slides -->

Les diapositives de contenu utilisent un système de mise en page flexible composé d'un ou plusieurs blocs de contenu. Un bloc peut contenir du texte (mis en forme avec Markdown), une visualisation de votre projet ou une image téléversée.

Pour ajouter une visualisation à un bloc de figure vide, cliquez sur **Insérer une figure** et choisissez un indicateur et une configuration depuis le paquet de résultats du produit. Si vous devez ajuster l'affichage — période différente ou désagrégation différente — vous pouvez modifier la figure intégrée directement depuis la diapositive à l'aide de **Modifier la visualisation**. Pour remplacer une figure existante par une autre, utilisez **Remplacer la figure** depuis le même panneau.

Faites un clic droit sur un bloc pour accéder aux options de mise en page comme « Diviser gauche/droite » ou « Supprimer le bloc ». Vous pouvez faire glisser les séparateurs entre les blocs pour ajuster leurs tailles relatives.

Si une visualisation ou une image ne peut pas être rendue - par exemple en raison d'une erreur de données ou d'un fichier manquant - FASTR affiche une courte notice dans le bloc plutôt que de le laisser vide ou d'interrompre l'export.

![Building Content Slides FR](/images/building-content-slides-fr.png)

## Paramètres de la présentation

Cliquez sur **Paramètres** dans la barre d'outils de la présentation pour ouvrir le panneau des paramètres. Vous pouvez y modifier le nom de la présentation, la déplacer vers un autre dossier, changer le paquet de résultats à partir duquel les figures sont issues, et modifier la portée géographique. Changer le paquet ou la portée affecte chaque figure de la présentation — les figures issues d'un autre paquet ou d'une autre portée affichent un badge de mise à jour.

Pour modifier le paquet ou la portée, cliquez sur **Paquet, portée et dossier** depuis le menu de débordement de la présentation. Cela ouvre le panneau des paramètres du produit où vous pouvez mettre à jour ces propriétés.

## Présenter des diapositives

Cliquez sur **Présenter** dans la barre d'outils de la liste des diapositives pour ouvrir le présentateur en plein écran. Le présentateur affiche une diapositive à la fois et précharge les diapositives voisines afin que la navigation soit instantanée. Utilisez les touches fléchées ou les commandes à l'écran pour passer d'une diapositive à l'autre. Appuyez sur **Échap** ou cliquez sur le bouton de fermeture pour quitter. Cliquez sur l'icône d'agrandissement pour passer en mode plein écran réel ; appuyer sur **Échap** en plein écran quitte entièrement la présentation.

Lorsque des collaborateurs ajoutent, suppriment ou réorganisent des diapositives pendant que le présentateur est ouvert, le présentateur prend en compte ces modifications automatiquement. La liste des diapositives et le compteur de pages se mettent à jour pour refléter la présentation actuelle, et les rendus mis en cache sont actualisés dès qu'un collaborateur modifie une diapositive déjà chargée.

## Style de la présentation

Cliquez sur **Paramètres** dans la barre d'outils de la présentation pour configurer le style qui s'applique à toutes les diapositives. Les options incluent le thème de couleurs, la police de caractères, le modèle de mise en page et le traitement de la couverture. Vous pouvez également configurer quels logos apparaissent sur les diapositives de couverture, les en-têtes et les pieds de page.

Pour choisir un thème de couleurs, cliquez sur **Plus de thèmes…** à côté du libellé du thème de couleurs pour ouvrir la fenêtre de sélection de thème. La fenêtre affiche tous les thèmes de couleurs standard et spéciaux sous forme d'aperçus côte à côte rendus sur une diapositive de contenu type, afin que vous puissiez les comparer avant de choisir. Sélectionnez une carte de thème pour l'appliquer et fermer la fenêtre. Une carte **Personnalisé** vous permet de saisir un code couleur hexadécimal pour dériver un thème complet à partir de la couleur de marque de votre organisation.

![Deck Styling FR](/images/deck-styling-fr.png)

## Collaborer sur une présentation

Lorsque plusieurs personnes ont la même présentation ouverte, le curseur de chacun apparaît sous la forme d'une flèche colorée avec son nom sur le canevas de la diapositive. Vous pouvez également voir qui modifie actuellement une diapositive spécifique - une petite icône de présence apparaît en bas des vignettes de diapositives dans la liste. Des icônes d'avatar dans la barre d'outils de la présentation indiquent qui d'autre a la présentation ouverte en même temps. Cela facilite la coordination sans écraser le travail d'un autre.

Lorsque vous ouvrez l'éditeur de diapositive, les champs de texte du titre, de l'en-tête et des autres champs racines de la diapositive sont liés de manière collaborative : les curseurs des collaborateurs distants apparaissent dans le même champ de texte que celui dans lequel vous tapez, afin que vous puissiez voir exactement où ils se trouvent. Les blocs de texte de corps sur les diapositives de contenu fonctionnent de la même manière.

L'assistant IA ne modifie pas une diapositive qu'un autre collaborateur a actuellement ouverte dans l'éditeur, afin d'éviter d'écraser des modifications en cours. Si vous demandez à l'IA de modifier une diapositive en cours d'édition par un collègue, elle vous en informera et attendra que vous réessayiez une fois la diapositive libre.

## Annuler et rétablir dans l'éditeur de diapositive

Lorsque vous modifiez une diapositive, l'en-tête comporte des boutons **Annuler** et **Rétablir**. Ceux-ci inversent vos propres modifications de diapositive - ajout de blocs, changement de mise en page, déplacement de figures et texte saisi dans n'importe quel champ de texte de la diapositive - sans affecter les modifications effectuées par les collaborateurs. Les boutons n'apparaissent que lorsque vous avez la permission de modifier la présentation. Vous pouvez également utiliser Ctrl+Z et Ctrl+Maj+Z (ou Cmd+Z et Cmd+Maj+Z sur Mac) comme raccourcis clavier ; ceux-ci fonctionnent aussi bien lorsque le focus est sur le canevas de la diapositive que lorsque vous tapez dans un champ de texte de la diapositive.

## Copier des diapositives entre présentations

Pour copier des diapositives d'une présentation vers une autre, sélectionnez les diapositives souhaitées dans la liste, puis ouvrez le menu de débordement de la présentation et choisissez **Copier vers une présentation…**. Une boîte de dialogue vous permet de choisir la présentation de destination. Les diapositives sont copiées avec leurs figures ; celles-ci se résoudront sous le paquet de résultats et la portée propres à la présentation de destination.

## Historique des versions

Cliquez sur **Historique des versions** dans le menu de débordement de la présentation pour ouvrir le panneau d'historique des versions. Les versions sont enregistrées automatiquement à la fin de chaque session d'édition et regroupées par jour sur la gauche. Sélectionnez une version pour voir une grille de toutes les vignettes de diapositives telles qu'elles se présentaient à ce moment-là. Les diapositives nouvelles, modifiées et supprimées sont signalées par le nom du collaborateur qui a effectué la modification. Cliquez sur une vignette pour ouvrir une vue en grand format ; les diapositives modifiées affichent également une ventilation des champs de texte et des blocs ayant changé au cours de cette session.

La détection des changements est désormais plus précise. Encapsuler des blocs dans des colonnes, supprimer un conteneur ou redimensionner un conteneur de mise en page sont tous signalés comme des changements d'arrangement dans le diff de session, même si l'ordre des blocs de contenu individuels n'a pas changé.

Utilisez **Restaurer** pour réinitialiser la présentation à cette version (votre contenu actuel est d'abord enregistré comme nouvelle version), ou **Restaurer comme copie** pour créer une nouvelle présentation à partir de l'instantané.

Si la présentation contient des modifications en direct qui ne peuvent pas être enregistrées au moment où vous demandez une restauration, FASTR vous en informera et vous invitera à réessayer une fois l'enregistrement rétabli.

## Exporter et partager
<!-- help#deck-export -->

Cliquez sur **Télécharger** pour exporter votre présentation. **PDF natif** produit un fichier vectoriel de haute qualité où le texte reste net à n'importe quel niveau de zoom. **PPTX avec figures matricielles** crée un fichier PowerPoint où les visualisations sont intégrées sous forme d'images - utile si les destinataires doivent apporter des modifications.

Vous pouvez aussi partager des présentations directement par e-mail. Cliquez sur **Partager**, sélectionnez les destinataires dans la liste des utilisateurs de votre instance ou ajoutez des adresses e-mail, et incluez éventuellement un message. FASTR valide les adresses e-mail avant de générer le PDF, de sorte que les adresses invalides sont signalées immédiatement plutôt qu'après un export long. FASTR génère un PDF et l'envoie en pièce jointe.

![Exporting and Sharing FR](/images/exporting-and-sharing-fr.png)

## Organisation

Utilisez des dossiers pour garder vos présentations organisées. Dans l'explorateur de produits, cliquez sur **Nouveau dossier** pour en créer un, puis utilisez le menu de la carte d'une présentation pour la déplacer. Vous pouvez dupliquer des présentations lorsque vous créez des variantes pour différents publics. Le champ de recherche filtre les présentations par nom. Utilisez le contrôle de tri pour classer les présentations par nom ou par récemment mis à jour. Basculez entre la vue en grille et la vue en liste à l'aide du sélecteur de vue dans la barre d'outils.
