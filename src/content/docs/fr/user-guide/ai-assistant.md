---
title: Assistant IA
description: Obtenir des analyses de vos données grâce à l'IA.
sidebar:
  order: 7
---

L'assistant IA vous aide à explorer et à interpréter vos données par le biais d'une conversation. Il est disponible sur l'ensemble de la plateforme — dans les présentations, les rapports, la page Explorer, la page Paquets de résultats, la page Produits et les vues de paquets individuels — afin que vous puissiez poser des questions où que vous travailliez.

## Ouvrir l'assistant
<!-- help#ai-open -->

Cliquez sur le bouton **Demander à l'IA** en bas à droite de l'écran pour ouvrir le panneau de l'assistant. Le panneau s'affiche en regard de votre vue actuelle. Pour le fermer, cliquez sur le bouton chevron dans l'en-tête du panneau ou cliquez à nouveau sur le bouton **Demander à l'IA**.

L'assistant est sensible au contexte : chaque message lui indique la vue actuelle et, lorsqu'un paquet de résultats est en vue, le paquet et la portée sous lesquels chaque lecture de données se résout. Vous n'avez pas besoin de préciser quel paquet utiliser.

![Opening the Assistant FR](/images/opening-the-assistant-fr.png)

## Poser des questions
<!-- help#ai-ask -->

Saisissez votre question dans le champ situé au bas du panneau. L'assistant peut expliquer ce que mesurent des indicateurs précis, décrire des tendances dans vos données, répondre à des questions sur les résultats des modules et vous aider à rédiger du contenu narratif pour vos rapports.

Les bonnes questions sont précises. Plutôt que « parle-moi des données », essayez « comment se présente le taux d'utilisation des consultations externes dans la région X par rapport à l'année dernière ? ». Plus vous fournissez de contexte, plus la réponse est utile.

## La bibliothèque d'invites
<!-- help#ai-prompt-library -->

La bibliothèque d'invites contient des invites pré-rédigées pour les tâches d'analyse courantes. Cliquez sur l'icône de menu dans l'en-tête du panneau IA et sélectionnez **Bibliothèque d'invites** pour la parcourir. Les invites sont organisées par catégorie - interprétation, comparaison, contrôles de qualité des données, et plus encore.

Lorsque vous sélectionnez une invite, vous pouvez la personnaliser avant de l'exécuter. Vous pouvez également enregistrer vos propres invites dans la bibliothèque pour les réutiliser. Les invites peuvent être enregistrées comme **Mes invites** (privées, visibles uniquement par vous) ou **Invites du pays** (partagées avec tous les utilisateurs de votre instance). Seuls les administrateurs peuvent enregistrer des invites à l'échelle du pays.

![Prompt Library FR](/images/prompt-library-fr.png)

## Joindre des documents

Vous pouvez joindre des documents PDF à une conversation pour donner à l'assistant un contexte supplémentaire - par exemple, une note de politique, un protocole ou un rapport de référence. Cliquez sur l'icône de document dans la zone de saisie du chat pour ouvrir le sélecteur de documents.

Le sélecteur affiche les fichiers PDF disponibles dans les ressources de votre instance. Sélectionnez un ou plusieurs fichiers à joindre, ou téléversez un nouveau PDF directement depuis votre appareil. Les documents que vous joignez sont en attente jusqu'à l'envoi de votre prochain message. Les pièces jointes en attente apparaissent sous forme de puces dans la zone de saisie et peuvent être supprimées avant l'envoi en cliquant sur le **×** de chaque puce.

Une fois un message envoyé avec des pièces jointes, ces documents apparaissent dans l'historique de la conversation sans option de suppression - ils ont déjà été transmis à l'assistant. Les pièces jointes en attente qui n'ont pas encore été envoyées peuvent encore être supprimées.

Chaque conversation gère son propre ensemble de pièces jointes. Lorsque vous passez à une autre conversation, les pièces jointes en attente se mettent à jour pour refléter l'état de cette conversation.

## Travailler avec les diapositives

L'assistant est particulièrement utile lors de la création de présentations. Vous pouvez lui demander de rédiger le contenu de diapositives, de suggérer des visualisations qui appuient un récit, ou de vous aider à structurer votre présentation. Il sait quelles diapositives vous avez déjà ajoutées et peut faire référence aux indicateurs disponibles.

Lorsque vous demandez à l'assistant de créer une diapositive, il en rédige le contenu et affiche un aperçu. Si la présentation est ouverte et que vous pouvez la modifier, vous pouvez ajouter le brouillon directement depuis la carte d'aperçu.

Dans l'éditeur de présentation, l'assistant peut lire le contenu actuel de la diapositive ouverte — y compris les modifications non enregistrées affichées sur le canevas — et modifier les diapositives dans toute la présentation. Il peut changer le texte, mettre à jour les mises en page, ajuster des visualisations existantes (réplicant, filtres, désagrégation, période, légendes) et modifier n'importe quelle diapositive de la présentation qu'elle soit ouverte ou non, en enregistrant ces modifications immédiatement. Pour la diapositive ouverte, les modifications apparaissent sur le canevas immédiatement et sont enregistrées automatiquement.

Chaque visualisation d'une présentation est résolue sous le paquet de résultats et la portée propres à cette présentation. Lorsque l'assistant crée ou modifie une visualisation, il utilise automatiquement le paquet associé à la présentation — vous n'avez pas besoin de préciser quel paquet utiliser.

## Travailler avec les rapports

Dans l'éditeur de rapport, l'assistant peut réécrire des passages, insérer de nouvelles visualisations et modifier des visualisations existantes directement. Lorsque vous lui demandez de modifier du texte, il propose un diff dans une fenêtre modale que vous acceptez ou refusez avant toute application. Lorsque vous lui demandez de modifier une visualisation - par exemple, changer son réplicant ou son filtre de période - il applique la modification directement à l'aperçu en direct et enregistre immédiatement, sans étape de diff. Pour remplacer une visualisation par un graphique ou un indicateur entièrement différent, demandez à l'assistant de remplacer la visualisation plutôt que de la modifier.

Chaque visualisation d'un rapport est résolue sous le paquet de résultats et la portée propres à ce rapport. Lorsque l'assistant insère ou remplace une visualisation, il utilise automatiquement le paquet associé au rapport.

Lorsque vous ouvrez un nouveau rapport qui ne contient encore aucun contenu, l'assistant suit une séquence de questions, plan et brouillon avant d'écrire. Il pose d'abord quelques questions courtes sur le public visé, la longueur et le contenu ; consulte ensuite les données pertinentes ; puis propose un plan pour votre approbation avant de rédiger le document complet. Si vous préférez passer directement au brouillon, il vous suffit de le préciser.

## Consulter les produits

Sur la page Produits, vous pouvez demander à l'assistant de lister tous les produits que vous pouvez voir, avec leur dossier, leur paquet de résultats, leur portée et votre niveau d'accès. L'assistant ne peut pas ouvrir les produits à votre place — vous le faites en cliquant dessus — mais il peut décrire ce qui est disponible et vous aider à décider où trouver ce dont vous avez besoin.

## Conversations et historique

Chaque conversation est enregistrée automatiquement. Vous pouvez démarrer de nouvelles conversations et passer de l'une à l'autre à l'aide du menu dans l'en-tête du panneau. L'assistant se souvient de ce dont vous avez discuté au sein d'une conversation, ce qui vous permet de vous appuyer sur les questions précédentes.

Un seul onglet de navigateur peut exécuter le chat IA à la fois. Si vous ouvrez FASTR dans plusieurs onglets, l'onglet où l'assistant est actif affiche le chat complet ; les autres onglets affichent une notice avec un bouton **L'utiliser ici** pour déplacer le chat vers cet onglet.

## Limites d'utilisation

L'utilisation de l'IA est soumise à des limites quotidiennes qui s'appliquent à l'ensemble de votre instance. Un indicateur d'utilisation au bas du panneau montre quelle part de votre limite quotidienne vous avez consommée. Si vous atteignez la limite, attendez sa réinitialisation - généralement à minuit UTC. Vous pouvez ajuster le modèle et le budget de jetons maximum dans le panneau de paramètres IA, accessible depuis le menu de l'en-tête du panneau.

## Conseils pour de meilleurs résultats

Posez des questions précises plutôt que générales. Faites référence à des indicateurs, des périodes et des zones géographiques spécifiques lorsque cela est pertinent. Lorsque vous demandez une interprétation, précisez le contexte relatif à votre public - « explique ceci pour une présentation au ministère » produit un résultat différent de « résume pour l'équipe technique ».

Si vous obtenez un résultat inattendu, essayez de reformuler. Utiliser les noms et la terminologie exacts des indicateurs de vos modules aide souvent l'assistant à trouver la bonne information.
