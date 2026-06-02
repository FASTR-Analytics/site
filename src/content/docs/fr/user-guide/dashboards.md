---
title: Tableaux de bord
description: Assembler des visualisations dans des tableaux de bord dynamiques et partageables.
sidebar:
  order: 4
---

Un tableau de bord regroupe plusieurs visualisations sur une seule page afin que chacun puisse voir l'ensemble d'un coup d'œil. Là où une visualisation répond à une seule question, un tableau de bord en aborde tout un ensemble lié - couverture, qualité et tendances côte à côte. Les tableaux de bord restent dynamiques : les graphiques se mettent à jour au fur et à mesure que vos données évoluent, et vous pouvez en publier un sous forme de page web que les parties prenantes consultent sans compte FASTR.

## Créer un tableau de bord
<!-- help#dash-create -->

Ouvrez votre projet et accédez à la section **Tableaux de bord**. Cliquez sur **Créer un tableau de bord** et donnez-lui un **Titre**. Vous pouvez également définir un **identifiant d'URL** facultatif - un identifiant court et lisible (lettres minuscules, chiffres et traits d'union) qui devient une partie de l'adresse web publique. Si vous le laissez vide, FASTR en génère un à partir du titre.

Le tableau de bord s'ouvre vide. Vous le construisez en ajoutant des éléments, en les agençant, puis en décidant de le garder privé ou de le publier.

:::caution[Capture d'écran à ajouter]
La fenêtre « Créer un tableau de bord » montrant les champs Titre et identifiant d'URL.
:::

## Ajouter des éléments
<!-- help#dash-add-items -->

Chaque élément d'un tableau de bord est une carte affichant l'une de vos visualisations enregistrées. Cliquez sur **Ajouter un élément** et choisissez une visualisation du projet. La carte affiche le graphique, la carte ou le tableau avec ses paramètres actuels, et elle se rafraîchit automatiquement chaque fois que les données sous-jacentes changent.

Si la visualisation que vous choisissez est répartie en réplicants - des variantes distinctes du même graphique, une par région ou par établissement, par exemple - FASTR vous demande comment vous souhaitez l'ajouter. Vous pouvez ajouter uniquement le **réplicant sélectionné** sous forme de carte unique, ou ajouter **tous les réplicants en tant que groupe**, de sorte que toutes les variantes restent ensemble comme une seule unité.

:::caution[Capture d'écran à ajouter]
Le processus d'ajout d'élément montrant le choix entre un réplicant unique et tous les réplicants en tant que groupe.
:::

## Groupes de réplicants

Un groupe de réplicants est une carte unique qui contient plusieurs variantes de la même visualisation. Au lieu d'encombrer le tableau de bord d'une carte distincte pour chaque district, vous ajoutez un seul groupe et laissez les utilisateurs basculer entre les membres. Sur le tableau de bord, le groupe apparaît comme une carte empilée portant l'indication du nombre de membres - « 12 réplicants », par exemple - et affiche une variante par défaut.

Sélectionnez le groupe pour ouvrir son éditeur sur la gauche, où vous pouvez ajuster son comportement :

- **Libellé du groupe** renomme le groupe tel qu'il apparaît sur le tableau de bord
- **Réplicant par défaut** choisit quelle variante s'affiche en premier avant toute interaction
- **Modifier la visualisation** change la configuration de tous les membres à la fois
- **Changer de visualisation** remplace l'ensemble du groupe par une autre visualisation
- **Supprimer le groupe** retire le groupe et tous ses membres en une seule fois

Sur un tableau de bord publié, les utilisateurs disposent d'un menu déroulant sur la carte du groupe pour basculer eux-mêmes entre les membres - pratique pour permettre à un responsable régional d'accéder directement à sa propre zone.

:::caution[Capture d'écran à ajouter]
Une carte de groupe de réplicants montrant l'apparence empilée et le nombre de membres, avec le panneau d'édition du groupe ouvert.
:::

## Agencer la mise en page

Faites glisser les cartes pour les réorganiser ; la grille se réajuste à mesure que vous déplacez les éléments. Pour retirer plusieurs cartes à la fois, sélectionnez-les - cliquez, puis maj-clic ou cmd-clic pour en choisir plusieurs - et utilisez le menu contextuel (clic droit) pour supprimer la sélection. Consacrez un peu de temps à l'ordre et au regroupement : un tableau de bord se lit mieux lorsque les graphiques liés sont proches les uns des autres et que les chiffres les plus importants viennent en premier.

## Publier et partager
<!-- help#dash-publish -->

Un tableau de bord peut être privé (connexion FASTR requise) ou public (toute personne disposant du lien peut le consulter). Ouvrez **Paramètres** pour contrôler cela à l'aide du commutateur **Exiger l'authentification**. Laissez-le désactivé pour rendre le tableau de bord public.

Le même panneau propose deux mises en page pour la vue publiée. **Grille** dispose toutes les cartes dans une grille adaptative, ce qui convient à une vue d'ensemble en un coup d'œil. **Barre latérale** liste les éléments dans un menu de navigation à gauche et affiche un seul grand élément à la fois, ce qui convient pour guider un public à travers les éléments dans l'ordre ; les groupes de réplicants y apparaissent sous forme de sections déroulantes.

Lorsque vous êtes prêt à partager, utilisez **Copier le lien** pour récupérer l'URL publique, ou **Aperçu** pour ouvrir le tableau de bord publié dans un nouvel onglet et le vérifier tel qu'un utilisateur le verra.

:::caution[Capture d'écran à ajouter]
Les paramètres du tableau de bord montrant le commutateur Exiger l'authentification et le choix de mise en page Grille / Barre latérale.
:::

## Problèmes courants

**Une carte affiche « aucune donnée »** : La visualisation associée n'a aucun résultat pour la fenêtre de données ou les filtres actuels. Ouvrez cette visualisation pour vérifier sa configuration - voir [Visualisations](/fr/user-guide/visualizations/).

**Les modifications n'apparaissent pas sur la page publique** : Vérifiez que vous avez bien enregistré, puis rouvrez le lien public. Utilisez **Aperçu** pour voir exactement ce que voient les utilisateurs plutôt que l'éditeur.

**Le lien public demande une connexion** : L'option **Exiger l'authentification** est encore activée. Désactivez-la dans **Paramètres** pour rendre le tableau de bord public.
