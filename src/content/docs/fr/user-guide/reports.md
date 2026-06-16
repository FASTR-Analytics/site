---
title: Rapports
description: Rédaction de documents détaillés avec des figures dynamiques intégrées.
sidebar:
  order: 6
---

Les rapports sont des documents détaillés que vous rédigez directement dans FASTR - une revue trimestrielle, une note de synthèse nationale, un récit analytique. Vous écrivez le texte en markdown et y insérez des figures dynamiques issues de vos visualisations, de sorte que les graphiques du document restent liés à vos données au lieu d'être des images collées qui deviennent obsolètes. Lorsque le rapport est prêt, exportez-le au format PDF ou Word.

Un rapport est l'outil approprié lorsque vous avez besoin de texte rédigé autour de vos chiffres. Si vous souhaitez surtout afficher des graphiques sur une page, un [tableau de bord](/user-guide/dashboards/) convient mieux ; si vous présentez devant un public, une [présentation](/user-guide/slide-decks/) sera plus adaptée. Les rapports sont faits pour l'écrit.

## Créer un rapport
<!-- help#report-create -->

Ouvrez votre projet et accédez à la section **Rapports**. Chaque rapport apparaît sous forme de carte affichant un aperçu de ses premières lignes ainsi que le nombre de figures et d'images qu'il contient, ce qui facilite la recherche de celui que vous souhaitez. Faites un clic droit sur une carte pour la déplacer vers un dossier, la dupliquer ou la supprimer.

Cliquez sur **Créer un rapport**, donnez-lui un nom et, si vous le souhaitez, choisissez un dossier. Le rapport s'ouvre directement dans l'éditeur, prêt à être rédigé.

:::caution[Capture d'écran à ajouter]
La liste des rapports montrant les cartes de rapport avec des aperçus de contenu et le nombre de figures et d'images.
:::

## Rédiger dans l'éditeur

L'éditeur utilise le markdown : vous écrivez du texte brut et le mettez en forme à l'aide de marques simples - `#` pour les titres, `-` pour les listes à puces, `1.` pour les listes numérotées et des barres verticales pour les tableaux. Le gras, l'italique et le code en ligne fonctionnent comme partout ailleurs. Si le markdown vous est inconnu, vous n'avez besoin que des bases ; les titres et les listes couvrent l'essentiel de ce dont un rapport a besoin.

Votre travail est enregistré automatiquement au fur et à mesure que vous tapez. Un indicateur d'état dans l'en-tête montre où en sont les choses - **Enregistrement** pendant qu'une modification est en cours, **Enregistré** avec l'heure du dernier enregistrement une fois celui-ci terminé, et un état d'erreur clair si un enregistrement échoue, afin que vous sachiez vérifier votre connexion plutôt que de perdre votre travail.

## Modes Édition et Aperçu

L'en-tête comporte un bouton bascule **Édition / Aperçu**. **Édition** affiche l'éditeur markdown avec les outils de rédaction. **Aperçu** restitue le rapport tel qu'il se présentera une fois terminé - titres, listes, tableaux et figures dynamiques mis en forme. Passez en mode Aperçu pour relire ou pour montrer le résultat à quelqu'un sans que les commandes d'édition ne gênent ; les figures y restent également interactives.

:::caution[Capture d'écran à ajouter]
L'éditeur de rapport en mode Édition, avec le bouton bascule Édition/Aperçu et l'indicateur d'état d'enregistrement automatique dans l'en-tête.
:::

## Ajouter des figures et des images
<!-- help#report-figures -->

Les rapports peuvent contenir deux types de contenu visuel, et la distinction est importante. Une **figure** est une visualisation dynamique issue de votre projet - elle se génère à partir des données actuelles et se met à jour lorsque ces données changent. Une **image** est un fichier statique que vous téléversez, comme un schéma ou une photo.

Pour ajouter une figure, cliquez sur **Insérer une figure** et choisissez une visualisation. Pour ajouter une image, cliquez sur **Insérer une image** et téléversez un fichier ou choisissez-en un parmi les ressources de votre projet. Dans les deux cas, l'élément apparaît dans le document sous forme de carte que vous pouvez sélectionner.

La sélection d'une figure ou d'une image ouvre un panneau sur la gauche pour la manipuler :

- **Légende** définit le texte affiché avec la figure ou l'image
- **Modifier la visualisation** ouvre les paramètres de la figure - ajustez la période, la désagrégation ou le style
- **Changer de visualisation** remplace la figure par une autre
- **Créer une nouvelle visualisation** construit une visualisation inédite et l'intègre sur place
- **Supprimer** retire la figure ou l'image du rapport

Comme les figures restent liées à leurs visualisations, un rapport rédigé le trimestre dernier affichera les chiffres de ce trimestre la prochaine fois que vous l'ouvrirez - sans mise à jour manuelle ni nouveau collage de graphiques.

Si une figure ou une image ne peut pas être chargée lors de l'export, FASTR la remplace par une courte notice à la place de l'élément manquant plutôt que d'interrompre l'export. Le reste du rapport est exporté normalement.

:::caution[Capture d'écran à ajouter]
Un rapport avec une figure dynamique intégrée sélectionnée, montrant le panneau de gauche avec la légende et les actions sur la figure.
:::

## Assistance par IA

Le bouton **IA** ouvre un assistant qui peut vous aider pendant que vous rédigez - en reformulant un passage que vous avez sélectionné, en remplaçant une figure par un graphique fraîchement créé, ou en créant de nouvelles visualisations à partir de vos indicateurs et en les insérant. L'assistant propose des modifications que vous pouvez accepter ou refuser, au lieu de modifier le contenu en silence. Consultez [Assistant IA](/user-guide/ai-assistant/) pour une vue d'ensemble complète.

## Exporter
<!-- help#report-export -->

Cliquez sur **Télécharger** et choisissez **PDF** ou **Word (.docx)**. Le PDF est idéal pour un document final et figé que vous diffusez ou archivez ; le Word convient mieux lorsqu'un collègue doit le modifier ou le commenter. Les deux formats utilisent des styles de titres cohérents, de sorte que les titres et la structure sont repris proprement dans le fichier exporté. Les figures dynamiques sont rendues dans le document au moment de l'export.

:::caution[Capture d'écran à ajouter]
La boîte de dialogue Télécharger montrant les options d'export PDF et Word.
:::

## Problèmes courants

**Une figure n'affiche rien ou semble incorrecte** : La visualisation sous-jacente n'a pas de données pour la fenêtre actuelle, ou sa configuration nécessite une modification. Sélectionnez la figure et utilisez **Modifier la visualisation** - voir [Visualisations](/user-guide/visualizations/).

**L'état indique « Échec de l'enregistrement »** : Un enregistrement n'a pas atteint le serveur, généralement à cause d'un problème de connexion. Restez sur la page, vérifiez votre connexion et continuez à éditer - FASTR réessaie ; ne fermez pas l'onglet avant de voir **Enregistré**.

**Le fichier exporté ne correspond pas à ce que je vois** : L'export restitue la version enregistrée actuelle. Assurez-vous que l'en-tête affiche **Enregistré**, puis téléchargez à nouveau.
