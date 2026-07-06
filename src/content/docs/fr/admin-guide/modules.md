---
title: Modules
description: Installation et gestion des modules analytiques.
sidebar:
  order: 7
---

Les modules sont le moteur analytique de FASTR. Chaque module exécute des scripts R qui traitent les données de votre projet - calcul d'indicateurs, détection de valeurs aberrantes, génération d'estimations de couverture ou réalisation d'autres analyses statistiques. Les résultats deviennent des métriques qui alimentent vos visualisations et vos rapports. C'est vous qui décidez quels modules activer en fonction des questions auxquelles vous avez besoin de répondre.

## Comprendre l'architecture d'un module

Un module comporte deux parties. La **définition de calcul** contient les scripts R qui traitent les données et produisent des résultats - ceux-ci s'exécutent dans des conteneurs Docker isolés. La **définition de présentation** précise quelles métriques le module produit et comment elles peuvent être visualisées.

Lorsque vous installez un module dans un projet, vous créez une instance de module. Cette instance conserve ses paramètres de configuration, la date de sa dernière exécution et l'information indiquant si les définitions ont été mises à jour. Plusieurs projets peuvent installer le même module mais le configurer différemment.

## Installer des modules
<!-- help#amod-install -->

Ouvrez **Modules** dans la barre latérale de gauche. La page liste tous les modules disponibles pour votre instance, en indiquant ceux qui sont actuellement activés et ceux qui peuvent être installés. Les modules installés affichent leur état - prêt, en cours d'exécution ou en attente de données.

Pour installer un module, repérez-le dans la liste et cliquez sur **Activer**. Certains modules dépendent d'autres - vous devrez peut-être activer un module de base de qualité des données avant de pouvoir activer un module de détection de valeurs aberrantes qui s'appuie sur ses résultats. FASTR vérifie ces dépendances automatiquement et vous invitera à installer d'abord les prérequis.

Une fois activé, un module entre généralement dans un état « en attente » jusqu'à ce que ses exigences en matière de données soient satisfaites. Lorsque votre projet dispose de données dans sa fenêtre et que les modules prérequis ont été exécutés, le module commence son traitement.

:::caution[Capture d'écran à ajouter]
Page Modules montrant un ensemble de modules activés avec leurs indicateurs d'état et de modules disponibles avec leurs boutons Activer.
:::

## Configurer les paramètres d'un module
<!-- help#amod-configure -->

De nombreux modules acceptent des paramètres qui contrôlent leur comportement. Un module de qualité des données peut vous permettre de définir des seuils pour les valeurs aberrantes. Un module de couverture peut nécessiter des chiffres de population cible.

Cliquez sur **Paramètres** pour n'importe quel module installé afin de consulter et de modifier ses paramètres. L'interface varie selon le module - certains comportent des champs numériques, d'autres des menus déroulants ou des cases à cocher. Lorsque vous enregistrez des modifications de paramètres, FASTR marque le module comme devant être relancé et le traite à nouveau automatiquement.

:::caution[Capture d'écran à ajouter]
Panneau de paramètres d'un module montrant des champs de saisie tels que des seuils et des sélections par menu déroulant.
:::

## Exécution et état des modules
<!-- help#amod-status -->

Chaque module affiche son état actuel dans la liste des modules :

- **Prêt** signifie que les résultats sont disponibles. Vous verrez les horodatages des définitions et de la dernière exécution du module.
- **En cours d'exécution** indique que le module est en train de traiter les données. Des messages de progression montrent quelle étape est en cours.
- **En attente** signifie que le module ne peut pas encore s'exécuter - le projet manque de données ou un prérequis n'est pas terminé.
- **Erreur** signale qu'un problème est survenu. Consultez les journaux pour plus de détails.

Lorsque les données en amont changent, les modules en aval deviennent obsolètes et sont retraités automatiquement. Ce suivi des dépendances maintient les résultats cohérents avec les données sous-jacentes.

:::caution[Capture d'écran à ajouter]
Carte d'un module installé montrant l'état prêt avec les horodatages des définitions et l'heure de la dernière exécution.
:::

## Mettre à jour les définitions des modules

Les définitions des modules évoluent à mesure que les méthodologies s'améliorent ou que des bogues sont corrigés. FASTR vérifie la présence de mises à jour lorsque vous visitez la page des modules et affiche un badge lorsque des mises à jour sont disponibles.

Cliquez sur **Mettre à jour** pour n'importe quel module afin de récupérer la dernière définition, ou utilisez **Tout mettre à jour** pour actualiser tous les modules installés d'un coup. Après une mise à jour, les modules sont relancés pour produire des résultats selon la nouvelle méthodologie. La carte du module affiche les références de commit (courtes empreintes SHA) afin que vous puissiez savoir précisément quelle version a produit vos résultats.

## Consulter les journaux et les diagnostics

Lorsqu'un module produit une erreur ou des résultats inattendus, consultez d'abord les journaux. Cliquez sur le menu à trois points de n'importe quel module et sélectionnez **Journaux** pour voir la sortie de la console R, les avertissements, les erreurs et les informations de minutage.

Pour les problèmes complexes, affichez le **Script** pour voir le code R exact qui a été exécuté. L'option **Fichiers** montre les fichiers de données produits par le module, utiles pour inspecter manuellement les résultats intermédiaires.

## Désactiver des modules

Si vous n'avez plus besoin des résultats d'un module, ouvrez le menu du module et sélectionnez **Désactiver**. Les résultats du module ainsi que les visualisations qui utilisaient ses métriques seront supprimés.

La désactivation affecte les dépendances en aval - les modules qui en dépendaient passeront à l'état en attente. Vous devez désactiver les modules dépendants avant de désactiver leurs prérequis. FASTR applique cette règle côté serveur : toute tentative de désactivation d'un module dont d'autres modules installés dépendent sera rejetée avec un message listant les modules à désactiver en premier. La désactivation est réversible ; vous pouvez réactiver un module plus tard et le relancer pour régénérer les résultats.
