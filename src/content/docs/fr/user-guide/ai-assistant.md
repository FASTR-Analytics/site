---
title: Assistant IA
description: Obtenir des analyses de vos données grâce à l'IA.
sidebar:
  order: 7
---

L'assistant IA vous aide à explorer et à interpréter les données de votre projet par le biais d'une conversation. Il comprend vos modules, vos indicateurs et vos visualisations - vous pouvez donc poser des questions comme « que montre la tendance de la couverture en CPN1 ? » ou « quels districts ont la plus faible complétude des données ? » et obtenir des réponses fondées sur vos résultats réels.

## Ouvrir l'assistant
<!-- help#ai-open -->

Cliquez sur **IA** dans n'importe quelle vue de projet pour ouvrir le panneau de l'assistant sur le côté droit de l'écran. Le panneau reste ouvert lorsque vous naviguez entre les visualisations, les présentations et les autres sections - l'IA suit votre contexte et adapte ses réponses en conséquence.

L'assistant fonctionne différemment selon l'endroit où vous vous trouvez. Lorsque vous consultez la liste des indicateurs, il peut rechercher et expliquer les indicateurs disponibles. Lorsque vous modifiez une présentation, il peut vous aider à rédiger du contenu ou à suggérer des visualisations. Dans l'éditeur de visualisation, il comprend avec quel indicateur vous travaillez.

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

Le sélecteur affiche les fichiers PDF disponibles dans les ressources de votre projet. Sélectionnez un ou plusieurs fichiers à joindre, ou téléversez un nouveau PDF directement depuis votre appareil. Les documents que vous joignez sont en attente jusqu'à l'envoi de votre prochain message. Les pièces jointes en attente apparaissent sous forme de puces dans la zone de saisie et peuvent être supprimées avant l'envoi en cliquant sur le **×** de chaque puce.

Une fois un message envoyé avec des pièces jointes, ces documents apparaissent dans l'historique de la conversation sans option de suppression - ils ont déjà été transmis à l'assistant. Les pièces jointes en attente qui n'ont pas encore été envoyées peuvent encore être supprimées.

Chaque conversation gère son propre ensemble de pièces jointes. Lorsque vous passez à une autre conversation, les pièces jointes en attente se mettent à jour pour refléter l'état de cette conversation.

## Travailler avec les diapositives

L'assistant est particulièrement utile lors de la création de présentations. Vous pouvez lui demander de rédiger le contenu de diapositives, de suggérer des visualisations qui appuient un récit, ou de vous aider à structurer votre présentation. Il sait quelles diapositives vous avez déjà ajoutées et peut faire référence aux indicateurs disponibles.

Lorsque vous demandez à l'assistant de créer une diapositive, il en rédige le contenu et affiche un aperçu. Examinez le brouillon, demandez des modifications, puis ajoutez-le à votre présentation en un seul clic.

Lors de la modification d'une diapositive existante, l'assistant peut également modifier les figures déjà présentes sur la diapositive - par exemple, changer le réplicant affiché par un graphique, ajuster des filtres ou mettre à jour des légendes - sans reconstruire la figure de zéro. L'assistant peut aussi mettre à jour les figures directement depuis la vue de la présentation, sans ouvrir l'éditeur de diapositive, et enregistre ces modifications immédiatement.

## Travailler avec les rapports

Dans l'éditeur de rapport, l'assistant peut réécrire des passages, insérer de nouvelles figures et modifier des figures existantes directement. Lorsque vous lui demandez de modifier du texte, il propose un diff dans une fenêtre modale que vous acceptez ou refusez avant toute application. Lorsque vous lui demandez de modifier une figure - par exemple, changer son réplicant ou son filtre de période - il applique la modification directement à l'aperçu en direct et enregistre immédiatement, sans étape de diff. Pour remplacer une figure par un graphique ou un indicateur entièrement différent, demandez à l'assistant de remplacer la figure plutôt que de la modifier.

## Naviguer entre les onglets

L'assistant peut changer l'onglet principal du projet en votre nom. Il peut naviguer vers **Rapports**, **Présentations**, **Visualisations**, **Métriques** et **Paramètres**. L'onglet **Lot de résultats** n'est accessible qu'aux administrateurs d'instance et aux utilisateurs disposant de permissions de configuration des données. La navigation par onglet n'est pas disponible pendant que vous modifiez une visualisation, une présentation ou une diapositive.

## Conversations et historique

Chaque conversation est enregistrée automatiquement. Vous pouvez démarrer de nouvelles conversations et passer de l'une à l'autre à l'aide du menu. C'est utile lorsque vous avez demandé à l'assistant d'expliquer quelque chose de complexe - vous pouvez revenir à cette explication plus tard sans avoir à la redemander.

Les conversations sont limitées à votre projet et incluent le contexte de vos données. L'assistant se souvient de ce dont vous avez discuté au sein d'une conversation, ce qui vous permet de vous appuyer sur les questions précédentes.

## Limites d'utilisation

L'utilisation de l'IA est soumise à des limites quotidiennes et hebdomadaires qui s'appliquent à l'ensemble de votre instance. Un indicateur d'utilisation au bas du panneau montre quelle part de votre limite quotidienne vous avez consommée. Si vous atteignez la limite, attendez sa réinitialisation - généralement à minuit UTC. Vous pouvez ajuster le modèle et le budget de jetons maximum dans le panneau de paramètres IA, accessible depuis l'en-tête du panneau.

## Conseils pour de meilleurs résultats

Posez des questions précises plutôt que générales. Faites référence à des indicateurs, des périodes et des zones géographiques spécifiques lorsque cela est pertinent. Lorsque vous demandez une interprétation, précisez le contexte relatif à votre public - « explique ceci pour une présentation au ministère » produit un résultat différent de « résume pour l'équipe technique ».

Si vous obtenez un résultat inattendu, essayez de reformuler. Utiliser les noms et la terminologie exacts des indicateurs de vos modules aide souvent l'assistant à trouver la bonne information.
