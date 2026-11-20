---
title: Assistant IA
description: Obtenir des analyses de vos données grâce à l'IA.
sidebar:
  order: 7
---

L'assistant IA vous aide à explorer et à interpréter vos données par le biais d'une conversation. Il est disponible sur l'ensemble de la plateforme — dans les présentations, les rapports, la page Explorer, la page Paquets de résultats, la page Produits et les vues de paquets individuels — afin que vous puissiez poser des questions où que vous travailliez.

## Ouvrir l'assistant
<!-- help#ai-open -->

Cliquez sur le bouton **IA** en bas à droite de l'écran pour ouvrir le panneau de l'assistant. Le panneau s'affiche en regard de votre vue actuelle. Pour le fermer, cliquez sur le bouton chevron dans l'en-tête du panneau ou cliquez à nouveau sur le bouton **IA**.

Le panneau démarre fermé lors d'une première utilisation dans un navigateur et s'ouvre une fois que vous l'avez utilisé. Si vous l'avez fermé lors d'une session précédente, il reste fermé jusqu'à ce que vous l'ouvriez à nouveau ; si vous l'avez laissé ouvert, il se rouvre automatiquement à votre prochaine visite. Vous pouvez faire glisser le bouton **IA** de haut en bas sur le bord droit pour le positionner où vous le souhaitez — la position est mémorisée par navigateur.

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

Dans l'éditeur de présentation, l'assistant peut lire le contenu actuel d'une ou plusieurs diapositives — y compris les modifications non enregistrées affichées sur le canevas — et modifier les diapositives dans toute la présentation. Il peut changer le texte, les paramètres, mettre à jour les mises en page, ajuster des visualisations existantes (réplicant, filtres, désagrégation, période, légendes) et modifier n'importe quelle diapositive de la présentation qu'elle soit ouverte ou non, en enregistrant ces modifications immédiatement. Pour la diapositive ouverte, les modifications apparaissent sur le canevas immédiatement et sont enregistrées automatiquement.

Les paramètres propres à la présentation — ses logos, le texte de pied de page et le filigrane — peuvent également être modifiés par l'assistant à l'aide d'un outil dédié. Ces modifications s'appliquent immédiatement sur toutes les diapositives et sont enregistrées automatiquement.

Lorsque l'assistant crée une diapositive de contenu comprenant une figure issue d'un indicateur à plusieurs sous-indicateurs, il filtre la figure sur les sous-indicateurs nommés dans le texte de la diapositive. Un indicateur multi-panneaux non filtré génère un panneau par sous-indicateur, ce qui peut faire déborder la mise en page de la diapositive.

Chaque visualisation d'une présentation est résolue sous le paquet de résultats et la portée propres à cette présentation. Lorsque l'assistant crée ou modifie une visualisation, il utilise automatiquement le paquet associé à la présentation — vous n'avez pas besoin de préciser quel paquet utiliser.

Les diapositives de contenu peuvent également contenir des **blocs image** qui affichent l'une des ressources image téléversées sur l'instance. L'assistant peut ajouter des blocs image sur demande, en utilisant les noms de fichiers des ressources de l'instance.

Après avoir construit ou restructuré une diapositive de contenu contenant un tableau dense ou plusieurs blocs, vous pouvez demander à l'assistant de l'examiner — il inspecte l'image rendue de la diapositive et vous indique ce qu'il voit, ce qui vous permet de détecter les débordements ou les problèmes de mise en page avant d'exporter.

Lorsque l'assistant crée ou propose une diapositive, il utilise les noms de champs suivants pour chaque type de diapositive :
- Les **diapositives de couverture** utilisent `title` (obligatoire) et optionnellement `subtitle`, `presenter` et `date`.
- Les **diapositives de section** utilisent `sectionTitle` (obligatoire) et optionnellement `sectionSubtitle`.
- Les **diapositives de contenu** utilisent `header` (optionnel) et un tableau `blocks`.

## Travailler avec les rapports

Dans l'éditeur de rapport, l'assistant peut réécrire des passages, insérer de nouvelles visualisations et modifier des visualisations existantes directement. Lorsque vous lui demandez de modifier du texte, il propose un diff dans une fenêtre modale que vous acceptez ou refusez avant toute application. Lorsque vous lui demandez de modifier une visualisation - par exemple, changer son réplicant ou son filtre de période - il applique la modification directement à l'aperçu en direct et enregistre immédiatement, sans étape de diff. Pour remplacer une visualisation par un graphique ou un indicateur entièrement différent, demandez à l'assistant de remplacer la visualisation plutôt que de la modifier.

Chaque visualisation d'un rapport est résolue sous le paquet de résultats et la portée propres à ce rapport. Lorsque l'assistant insère ou remplace une visualisation, il utilise automatiquement le paquet associé au rapport.

Lorsque vous ouvrez un nouveau rapport qui ne contient encore aucun contenu, l'assistant suit une séquence de questions, sections, plan et brouillon avant de rédiger. Il pose d'abord des questions sur le public visé, la longueur et le contenu sous forme d'invites interactives ; consulte ensuite les données pertinentes ; s'accorde sur une structure de sections ; puis propose un plan complet pour votre approbation avant de rédiger le document entier avec toutes les figures incluses. Si vous préférez passer directement au brouillon, il vous suffit de le préciser.

Après avoir inséré ou modifié une figure dont la lisibilité ne peut pas être évaluée depuis sa seule configuration — un tableau dense, de nombreuses séries ou de longues étiquettes — vous pouvez demander à l'assistant de l'examiner. Il inspectera l'image rendue et vous indiquera ce qu'il voit.

## Consulter les produits

Sur la page Produits, vous pouvez demander à l'assistant de lister les produits que vous pouvez voir — présentations, rapports et visualisations enregistrées — avec leur dossier, leur paquet de résultats, leur portée et votre niveau d'accès. Vous pouvez également effectuer une recherche par mot-clé pour affiner la liste. L'assistant ne peut pas ouvrir les produits à votre place — vous le faites en cliquant dessus — mais il peut décrire ce qui est disponible et vous aider à décider où trouver ce dont vous avez besoin.

## Trouver les valeurs d'une dimension

Lorsque vous travaillez sur des visualisations, des filtres ou des sélections de réplicant, vous pouvez demander à l'assistant de lister les valeurs que prend une dimension — par exemple, les indicateurs d'une métrique, ou les zones administratives disponibles sous la portée actuelle. L'assistant utilise un outil dédié qui lit les valeurs directement depuis le paquet de résultats, de sorte que la liste reflète ce qui se trouve réellement dans les données.

## Conversations et historique

Chaque conversation est enregistrée automatiquement. Vous pouvez démarrer de nouvelles conversations et passer de l'une à l'autre à l'aide du menu dans l'en-tête du panneau. L'assistant se souvient de ce dont vous avez discuté au sein d'une conversation, ce qui vous permet de vous appuyer sur les questions précédentes.

Un seul onglet de navigateur peut exécuter le chat IA à la fois. Si vous ouvrez FASTR dans plusieurs onglets, l'onglet où l'assistant est actif affiche le chat complet ; les autres onglets affichent une notice. Si l'onglet actif est en train de générer une réponse, la notice vous indique que l'IA répond là-bas et vous invite à patienter. Une fois qu'il est inactif, cliquez sur **L'utiliser ici** pour déplacer le chat vers l'onglet actuel.

## Limites d'utilisation

L'utilisation de l'IA est soumise à des limites quotidiennes qui s'appliquent à l'ensemble de votre instance. Un indicateur d'utilisation au bas du panneau montre quelle part de votre limite quotidienne vous avez consommée. Si vous atteignez la limite, attendez sa réinitialisation - généralement à minuit UTC. Vous pouvez ajuster le modèle, le budget de jetons maximum et l'effort de raisonnement dans le panneau de paramètres IA, accessible depuis le menu de l'en-tête du panneau.

## Conseils pour de meilleurs résultats

Posez des questions précises plutôt que générales. Faites référence à des indicateurs, des périodes et des zones géographiques spécifiques lorsque cela est pertinent. Lorsque vous demandez une interprétation, précisez le contexte relatif à votre public - « explique ceci pour une présentation au ministère » produit un résultat différent de « résume pour l'équipe technique ».

Si vous obtenez un résultat inattendu, essayez de reformuler. Utiliser les noms et la terminologie exacts des indicateurs de vos modules aide souvent l'assistant à trouver la bonne information.

Lorsqu'une requête renvoie trop de lignes, l'assistant suggère d'ajouter des filtres, de réduire la période ou de supprimer des désagrégations pour ramener les résultats dans les limites.
