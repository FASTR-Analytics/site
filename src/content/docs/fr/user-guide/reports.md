---
title: Rapports
description: Rédaction de documents détaillés avec des visualisations dynamiques intégrées.
sidebar:
  order: 6
---

Les rapports sont des documents détaillés que vous rédigez directement dans FASTR - une revue trimestrielle, une note de synthèse nationale, un récit analytique. Vous écrivez le texte en markdown et y insérez des visualisations dynamiques, de sorte que les graphiques du document restent liés à vos données au lieu d'être des images collées qui deviennent obsolètes. Lorsque le rapport est prêt, exportez-le au format PDF, Word ou HTML.

Un rapport est l'outil approprié lorsque vous avez besoin de texte rédigé autour de vos chiffres. Si vous souhaitez surtout afficher des graphiques sur une page, un [tableau de bord](/user-guide/dashboards/) convient mieux ; si vous présentez devant un public, une [présentation](/user-guide/slide-decks/) sera plus adaptée. Les rapports sont faits pour l'écrit.

## Créer un rapport
<!-- help#report-create -->

Ouvrez l'onglet **Produits** sur l'écran d'accueil de votre instance. Les rapports apparaissent sous forme de cartes dans l'explorateur de produits, aux côtés des présentations. Cliquez sur **Nouveau** et choisissez **Nouveau rapport** pour en créer un — l'éditeur s'ouvre immédiatement avec le nouveau rapport prêt à être rédigé. Vous pouvez organiser les rapports dans des dossiers à l'aide de **Nouveau dossier** et les déplacer entre dossiers depuis le menu de leur carte.

## Rédiger dans l'éditeur

L'éditeur utilise FASTR Markdown : vous écrivez du texte brut et le mettez en forme à l'aide de marques simples - `#` pour les titres, `-` pour les listes à puces, `1.` pour les listes numérotées et des barres verticales pour les tableaux. Le gras, l'italique et le code en ligne fonctionnent comme partout ailleurs. FASTR Markdown prend également en charge les blocs `:::` pour les encadrés, les tuiles de chiffres, les bandeaux, les pages de couverture et d'autres contenus structurés — le menu **Insérer** les liste tous.

Votre travail est enregistré automatiquement au fur et à mesure que vous tapez. Un indicateur d'état dans l'en-tête montre où en sont les choses - **Enregistrement** pendant qu'une modification est en cours, **Enregistré** avec l'heure du dernier enregistrement une fois celui-ci terminé, et un état d'erreur clair si un enregistrement échoue, afin que vous sachiez vérifier votre connexion plutôt que de perdre votre travail.

Lorsque la collaboration en direct est active, l'indicateur d'état change : il affiche **En direct** avec un point vert pendant que les modifications sont transmises en continu au serveur, **Hors ligne — reconnexion…** avec un point jaune si la connexion est interrompue, et **Non enregistré — nouvel essai…** avec un point rouge si le point de contrôle côté serveur échoue. En mode En direct, l'enregistrement automatique REST est remplacé par le point de contrôle continu de la session, de sorte que l'indicateur ne passe plus par les états Enregistrement/Enregistré.

## Mode Édition

Les rapports FASTR Markdown s'ouvrent directement en mode **Édition** — la mise en page finale est ce que vous voyez au fur et à mesure que vous tapez. L'éditeur markdown et l'aperçu rendu ne font qu'un : les blocs de page, les visualisations en direct et tous les styles de blocs apparaissent en place pendant que vous écrivez. Il n'y a donc pas de bascule Aperçu ou Divisé séparée pour ce format.

Les anciens rapports Markdown ordinaires et HTML conservent le bouton bascule **Édition / Divisé / Aperçu**. **Édition** affiche le source markdown. **Divisé** affiche l'éditeur et l'aperçu rendu côte à côte. **Aperçu** restitue le rapport tel qu'il se présentera une fois terminé.

![Edit and View Modes FR](/images/edit-and-view-modes-fr.png)

## La barre d'outils

Les rapports FASTR Markdown comportent une barre d'outils au-dessus de l'éditeur, composée de deux rangées. La **rangée de menus** contient les menus **Fichier**, **Insérer** et **Page**. La **rangée de la barre d'outils** est une bande persistante de commandes de mise en forme qui s'adapte au contexte du curseur.

Le menu **Fichier** regroupe les opérations portant sur l'ensemble du document : téléchargement, envoi par e-mail, renommage et duplication. Le menu **Insérer** liste tous les types de blocs disponibles — visualisations, images, titres, encadrés, tuiles de chiffres, tableaux, liens, et plus encore. Le menu **Page** contrôle le thème, l'arrière-plan, la taille et l'orientation de la page, ainsi que la numérotation des sections.

La barre d'outils affiche les commandes de texte (style de titre, gras, italique, souligné, taille du texte, surlignage, lien, couleur du texte et types de liste) lorsqu'aucun élément intégré n'est sélectionné. Lorsque le curseur se trouve dans un bloc `:::`, le nom du bloc et ses propres commandes (ton, colonnes, type, et attributs similaires) s'affichent à droite des commandes de texte. Lorsqu'une visualisation ou une image est sélectionnée, les commandes de l'élément remplacent les commandes de texte.

## Ajouter des visualisations et des images
<!-- help#report-figures -->

Les rapports peuvent contenir deux types de contenu visuel, et la distinction est importante. Une **visualisation** est un graphique ou une carte dynamique issue du paquet de résultats du produit - elle se génère à partir des données actuelles et se met à jour lorsque ces données changent. Une **image** est un fichier statique que vous téléversez, comme un schéma ou une photo.

Pour ajouter une visualisation, ouvrez le menu **Insérer** et choisissez **Visualisation…**, puis sélectionnez une visualisation dans le paquet de résultats du produit. Pour ajouter une image, choisissez **Image…** et téléversez un fichier ou choisissez-en un parmi les ressources de votre projet. Dans les deux cas, l'élément apparaît dans le document sous forme de carte que vous pouvez sélectionner.

La sélection d'une visualisation ou d'une image fait apparaître des commandes dans la barre d'outils pour la manipuler :

- **Modifier la visualisation** ouvre les paramètres de la visualisation - ajustez la période, la désagrégation ou le style
- **Changer** remplace la visualisation par une autre
- **Supprimer** retire la visualisation ou l'image du rapport

Comme les visualisations restent liées au paquet de résultats, un rapport rédigé le trimestre dernier affichera les chiffres de ce trimestre la prochaine fois que vous l'ouvrirez - sans mise à jour manuelle ni nouveau collage de graphiques.

Si une visualisation ou une image ne peut pas être chargée lors de l'export, FASTR la remplace par une courte notice à la place de l'élément manquant plutôt que d'interrompre l'export. Le reste du rapport est exporté normalement.

![Adding Figures and Images FR](/images/adding-figures-and-images-fr.png)

## Paramètres du rapport

Cliquez sur **Paramètres** dans l'en-tête du rapport pour ouvrir le panneau des paramètres. Vous pouvez y modifier le nom du rapport et le déplacer vers un autre dossier. Pour modifier le paquet de résultats ou la portée géographique, cliquez sur **Paquet de résultats et portée…** depuis le menu de la carte du rapport. Changer le paquet ou la portée affecte chaque visualisation du rapport — les visualisations issues d'un autre paquet ou d'une autre portée affichent un badge de mise à jour.

## Choisir un thème

Les rapports FASTR Markdown ont un thème de conception qui contrôle les polices, les couleurs et l'apparence de chaque bloc. Ouvrez le menu **Page** et choisissez **Thème** pour passer d'un thème intégré à un autre avec un aperçu rapide, ou choisissez **Tous les thèmes et styles enregistrés…** pour ouvrir le sélecteur de thème complet où les aperçus de feuilles de style réelles sont affichés côte à côte. Vous pouvez changer le thème d'un rapport à tout moment sans toucher au corps du texte.

Sur un nouveau rapport qui ne contient encore que son titre, le sélecteur de thème propose une deuxième étape : une galerie de modèles. Les modèles donnent au rapport ses sections et ses blocs, avec des indications grises dans chaque emplacement à remplacer par votre texte. L'assistant IA sait quel modèle vous avez choisi et écrit selon sa forme. Choisissez un modèle et cliquez sur **Utiliser le modèle** pour l'appliquer, ou cliquez sur **Passer** pour commencer avec une page blanche. Vous pouvez rouvrir le sélecteur de thème à tout moment depuis le menu **Page** — l'étape modèle n'apparaît que lorsque le corps du rapport est encore vide.

Le sélecteur de thème affiche également les styles personnalisés enregistrés par les administrateurs de votre instance. Un style personnalisé fournit à l'IA une description de conception spécifique lors de la rédaction ou de la restructuration de rapports HTML, ou une palette de couleurs pour les rapports FASTR Markdown. Les styles enregistrés apparaissent aux côtés des thèmes intégrés dans le sélecteur.

## Collaborer sur un rapport

Lorsque plusieurs personnes ont le même rapport ouvert, vous pouvez voir où travaillent vos collègues. Des curseurs en direct apparaissent à la fois dans le volet éditeur de code et dans l'aperçu rendu, afin que vous sachiez d'un coup d'œil si quelqu'un d'autre modifie la section que vous vous apprêtez à changer. Une petite icône de présence apparaît également sur la carte du rapport dans la vue en liste. Les collaborateurs qui consultent actuellement le même rapport apparaissent sous forme d'icônes d'avatar dans l'en-tête.

L'éditeur est collaboratif : les sélections de texte des collaborateurs distants sont mises en évidence dans leur couleur, et survoler une sélection en surbrillance affiche le nom de la personne. Lorsque l'assistant IA propose une modification de texte que vous acceptez, la modification est rebasée sur les modifications concurrentes effectuées par vos collègues pendant que la proposition était ouverte - si un bloc ne peut pas être appliqué proprement, l'assistant vous indique quelles lignes ont été ignorées.

Lorsqu'un collaborateur a une visualisation sélectionnée, une bordure de présence colorée apparaît autour de cette visualisation dans les volets éditeur et aperçu, avec son nom affiché au-dessus. Si l'éditeur de la visualisation est ouvert, la bordure porte un indicateur de modification afin que les autres sachent que la configuration de la visualisation est en cours de modification.

## Historique des versions

Cliquez sur **Historique** dans l'en-tête du rapport pour ouvrir le panneau d'historique des versions. Les versions sont enregistrées automatiquement à la fin de chaque session d'édition et regroupées par jour sur la gauche. Sélectionnez une version pour voir un diff de ce que cette session a modifié - le texte ajouté est mis en évidence avec la couleur de l'éditeur, le texte supprimé est affiché barré, et survoler une modification indique qui l'a effectuée.

Depuis l'aperçu de la version, vous pouvez également basculer vers une vue **Aperçu** qui restitue l'intégralité du rapport tel qu'il se présentait à ce moment-là. Utilisez **Restaurer** pour réinitialiser le rapport à cette version (votre contenu actuel est d'abord enregistré comme nouvelle version, rien n'est perdu), ou **Restaurer comme copie** pour créer un tout nouveau rapport à partir de l'instantané tout en laissant le rapport actuel intact.

Si le rapport contient des modifications en direct qui ne peuvent pas être enregistrées au moment où vous demandez une restauration, FASTR vous en informera et vous invitera à réessayer une fois l'enregistrement rétabli.

## Assistance par IA

Le bouton **IA** ouvre un assistant qui peut vous aider pendant que vous rédigez. Il peut reformuler un passage sélectionné, insérer ou remplacer des visualisations, et modifier des visualisations existantes directement sans les reconstruire - par exemple, changer le réplicant affiché par un graphique, ajuster ses filtres ou mettre à jour des légendes. L'assistant propose les modifications de texte dans une fenêtre modale que vous acceptez ou refusez avant toute application ; les modifications de visualisations sont appliquées immédiatement à l'aperçu en direct et enregistrées. Consultez [Assistant IA](/user-guide/ai-assistant/) pour une vue d'ensemble complète.

## Annuler et rétablir

La barre d'outils du rapport comporte des boutons **Annuler** et **Rétablir** qui inversent vos propres modifications du corps du texte sans affecter les modifications de vos collègues. Ces boutons n'apparaissent que lorsque vous avez la permission de modifier le rapport. Ils opèrent sur le même historique que les raccourcis clavier Ctrl+Z et Ctrl+Maj+Z dans l'éditeur.

## Rechercher et remplacer

Appuyez sur **Ctrl+F** (ou **Cmd+F** sur Mac) lorsque l'éditeur est actif pour ouvrir le panneau de recherche et remplacement dans le texte source. Contrairement au Ctrl+F du navigateur, ce panneau atteint le texte à l'intérieur des blocs réduits qui ne sont pas visibles dans l'aperçu rendu.

## Partager par e-mail

Cliquez sur **E-mail** dans le menu **Fichier** pour envoyer le rapport en pièce jointe. Saisissez une ou plusieurs adresses de destinataires et un message facultatif. FASTR joint le rapport dans son format d'export natif — un fichier HTML pour les rapports HTML et FASTR Markdown, et un PDF pour les rapports Markdown ordinaires — et l'envoie en votre nom.

## Exporter
<!-- help#report-export -->

Cliquez sur **Télécharger** pour ouvrir les options d'export. Les formats disponibles dépendent du type de rapport :

- **Rapports Markdown** proposent **PDF** et **Word (.docx)**. Le PDF est idéal pour un document final et figé que vous diffusez ou archivez ; le Word convient mieux lorsqu'un collègue doit le modifier ou le commenter.
- **Rapports FASTR Markdown** proposent **PDF** (paginé exactement comme l'éditeur le montre), **Word (.docx)** et **fichier HTML**. Le PDF contient exactement les pages affichées dans l'éditeur. Le fichier Word garde les titres, le texte, les tableaux et les visualisations modifiables ; les couvertures, bandeaux et tuiles sont des images avec leur texte dans des zones modifiables par-dessus. Le fichier HTML est autonome avec les visualisations intégrées comme images et se lit comme une seule page continue.
- **Rapports HTML** proposent **fichier HTML** et **Imprimer / enregistrer en PDF**. Le fichier HTML est autonome. Imprimer ouvre la boîte de dialogue d'impression du navigateur où vous pouvez enregistrer en PDF.

Les visualisations dynamiques sont rendues dans le document au moment de l'export.

![Exporting Reports FR](/images/exporting-reports-fr.png)

## Problèmes courants

**Une visualisation n'affiche rien ou semble incorrecte** : La visualisation sous-jacente n'a pas de données pour la fenêtre actuelle, ou sa configuration nécessite une modification. Sélectionnez la visualisation et utilisez **Modifier la visualisation** - voir [Visualisations](/user-guide/visualizations/).

**L'état indique « Échec de l'enregistrement »** : Un enregistrement n'a pas atteint le serveur, généralement à cause d'un problème de connexion. Restez sur la page, vérifiez votre connexion et continuez à éditer - FASTR réessaie ; ne fermez pas l'onglet avant de voir **Enregistré**.

**Le fichier exporté ne correspond pas à ce que je vois** : L'export restitue la version enregistrée actuelle. Assurez-vous que l'en-tête affiche **Enregistré**, puis téléchargez à nouveau.

**La restauration indique que l'enregistrement doit d'abord se rétablir** : Si le rapport contient des modifications en direct qui échouent à s'enregistrer, la version de sécurité ne peut pas être créée tant que l'enregistrement ne reprend pas. Attendez que l'indicateur **Non enregistré** disparaisse, puis réessayez la restauration.
