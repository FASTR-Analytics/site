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

![Creating a Report FR](/images/creating-a-report-fr.png)

## Rédiger dans l'éditeur

L'éditeur utilise le markdown : vous écrivez du texte brut et le mettez en forme à l'aide de marques simples - `#` pour les titres, `-` pour les listes à puces, `1.` pour les listes numérotées et des barres verticales pour les tableaux. Le gras, l'italique et le code en ligne fonctionnent comme partout ailleurs. Si le markdown vous est inconnu, vous n'avez besoin que des bases ; les titres et les listes couvrent l'essentiel de ce dont un rapport a besoin.

Votre travail est enregistré automatiquement au fur et à mesure que vous tapez. Un indicateur d'état dans l'en-tête montre où en sont les choses - **Enregistrement** pendant qu'une modification est en cours, **Enregistré** avec l'heure du dernier enregistrement une fois celui-ci terminé, et un état d'erreur clair si un enregistrement échoue, afin que vous sachiez vérifier votre connexion plutôt que de perdre votre travail.

Lorsque la collaboration en direct est active, l'indicateur d'état change : il affiche **En direct** avec un point vert pendant que les modifications sont transmises en continu au serveur, **Hors ligne — reconnexion…** avec un point jaune si la connexion est interrompue, et **Non enregistré — nouvel essai…** avec un point rouge si le point de contrôle côté serveur échoue. En mode En direct, l'enregistrement automatique REST est remplacé par le point de contrôle continu de la session, de sorte que l'indicateur ne passe plus par les états Enregistrement/Enregistré.

## Modes Édition, Divisé et Aperçu

L'en-tête comporte un bouton bascule **Édition / Divisé / Aperçu**. **Édition** affiche l'éditeur markdown avec les outils de rédaction. **Divisé** affiche l'éditeur et l'aperçu rendu côte à côte. **Aperçu** restitue le rapport tel qu'il se présentera une fois terminé - titres, listes, tableaux et figures dynamiques mis en forme. Passez en mode Aperçu pour relire ou pour montrer le résultat à quelqu'un sans que les commandes d'édition ne gênent ; les figures y restent également interactives.

![Edit and View Modes FR](/images/edit-and-view-modes-fr.png)

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

![Adding Figures and Images FR](/images/adding-figures-and-images-fr.png)

## Collaborer sur un rapport

Lorsque plusieurs personnes ont le même rapport ouvert, vous pouvez voir où travaillent vos collègues. Des curseurs en direct apparaissent à la fois dans le volet éditeur de code et dans l'aperçu rendu, afin que vous sachiez d'un coup d'œil si quelqu'un d'autre modifie la section que vous vous apprêtez à changer. Une petite icône de présence apparaît également sur la carte du rapport dans la vue en liste. Les collaborateurs qui consultent actuellement le même rapport apparaissent sous forme d'icônes d'avatar dans l'en-tête.

L'éditeur est collaboratif : les sélections de texte des collaborateurs distants sont mises en évidence dans leur couleur, et survoler une sélection en surbrillance affiche le nom de la personne. Lorsque l'assistant IA propose une modification de texte que vous acceptez, la modification est rebasée sur les modifications concurrentes effectuées par vos collègues pendant que la proposition était ouverte - si un bloc ne peut pas être appliqué proprement, l'assistant vous indique quelles lignes ont été ignorées.

Lorsqu'un collaborateur a une figure sélectionnée, une bordure de présence colorée apparaît autour de cette figure dans les volets éditeur et aperçu, avec son nom affiché au-dessus. Si l'éditeur de visualisation de la figure est ouvert, la bordure porte un indicateur de modification afin que les autres sachent que la configuration de la figure est en cours de modification.

## Historique des versions

Cliquez sur **Historique** dans l'en-tête du rapport pour ouvrir le panneau d'historique des versions. Les versions sont enregistrées automatiquement à la fin de chaque session d'édition et regroupées par jour sur la gauche. Sélectionnez une version pour voir un diff de ce que cette session a modifié - le texte ajouté est mis en évidence avec la couleur de l'éditeur, le texte supprimé est affiché barré, et survoler une modification indique qui l'a effectuée.

Depuis l'aperçu de la version, vous pouvez également basculer vers une vue **Aperçu** qui restitue l'intégralité du rapport tel qu'il se présentait à ce moment-là. Utilisez **Restaurer** pour réinitialiser le rapport à cette version (votre contenu actuel est d'abord enregistré comme nouvelle version, rien n'est perdu), ou **Restaurer comme copie** pour créer un tout nouveau rapport à partir de l'instantané tout en laissant le rapport actuel intact.

Si le rapport contient des modifications en direct qui ne peuvent pas être enregistrées au moment où vous demandez une restauration, FASTR vous en informera et vous invitera à réessayer une fois l'enregistrement rétabli.

## Assistance par IA

Le bouton **IA** ouvre un assistant qui peut vous aider pendant que vous rédigez. Il peut reformuler un passage sélectionné, insérer ou remplacer des figures, et modifier des figures existantes directement sans les reconstruire - par exemple, changer le réplicant affiché par un graphique, ajuster ses filtres ou mettre à jour des légendes. L'assistant propose les modifications de texte dans une fenêtre modale que vous acceptez ou refusez avant toute application ; les modifications de figures sont appliquées immédiatement à l'aperçu en direct et enregistrées. Consultez [Assistant IA](/user-guide/ai-assistant/) pour une vue d'ensemble complète.

## Annuler et rétablir

L'en-tête du rapport comporte des boutons **Annuler** et **Rétablir** qui inversent vos propres modifications du corps du texte sans affecter les modifications de vos collègues. Ces boutons n'apparaissent qu'en modes Édition et Divisé, et uniquement lorsque vous avez la permission de modifier le rapport. Ils opèrent sur le même historique que les raccourcis clavier Ctrl+Z et Ctrl+Maj+Z dans l'éditeur.

## Exporter
<!-- help#report-export -->

Cliquez sur **Télécharger** et choisissez **PDF** ou **Word (.docx)**. Le PDF est idéal pour un document final et figé que vous diffusez ou archivez ; le Word convient mieux lorsqu'un collègue doit le modifier ou le commenter. Les deux formats utilisent des styles de titres cohérents, de sorte que les titres et la structure sont repris proprement dans le fichier exporté. Les figures dynamiques sont rendues dans le document au moment de l'export.

![Exporting Reports FR](/images/exporting-reports-fr.png)

## Problèmes courants

**Une figure n'affiche rien ou semble incorrecte** : La visualisation sous-jacente n'a pas de données pour la fenêtre actuelle, ou sa configuration nécessite une modification. Sélectionnez la figure et utilisez **Modifier la visualisation** - voir [Visualisations](/user-guide/visualizations/).

**L'état indique « Échec de l'enregistrement »** : Un enregistrement n'a pas atteint le serveur, généralement à cause d'un problème de connexion. Restez sur la page, vérifiez votre connexion et continuez à éditer - FASTR réessaie ; ne fermez pas l'onglet avant de voir **Enregistré**.

**Le fichier exporté ne correspond pas à ce que je vois** : L'export restitue la version enregistrée actuelle. Assurez-vous que l'en-tête affiche **Enregistré**, puis téléchargez à nouveau.

**La restauration indique que l'enregistrement doit d'abord se rétablir** : Si le rapport contient des modifications en direct qui échouent à s'enregistrer, la version de sécurité ne peut pas être créée tant que l'enregistrement ne reprend pas. Attendez que l'indicateur **Non enregistré** disparaisse, puis réessayez la restauration.
