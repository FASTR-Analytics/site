---
title: Produits
description: Créer, organiser et partager des présentations, des rapports et des visualisations.
sidebar:
  order: 1
---

Tout ce que vous créez dans FASTR est un **produit**. Il en existe trois types : une **présentation** pour présenter, un **rapport** pour la rédaction de documents longs et une **visualisation** - un graphique, une carte ou un tableau enregistré individuellement. Les trois types sont réunis sur la page **Produits**, la première page qui s'affiche lorsque vous vous connectez.

## D'où les produits tirent leurs données
<!-- help#products-data -->

Chaque produit tire ses chiffres d'un **paquet de résultats** et d'une **portée**. Un paquet de résultats est un ensemble figé de résultats d'analyse que votre administrateur a générés à partir des données de l'instance à un moment donné. Une portée est une fenêtre de données nommée - elle définit les données, les zones administratives, les années et les indicateurs que le produit peut utiliser. La portée intégrée **Toutes les données** n'a aucune limite.

Comme un produit est lié à un seul paquet, ses chiffres ne changent pas lorsque de nouvelles données sont importées. Ils ne changent que lorsque quelqu'un déplace le produit vers un paquet plus récent. Une présentation ou un rapport terminé reste ainsi stable jusqu'à ce que vous décidiez de le mettre à jour.

Le paquet et la portée apparaissent ensemble sous forme d'une petite étiquette dans l'en-tête de l'éditeur, par exemple « Octobre 2026 · Région Nord ». Si vous pouvez modifier le produit, cliquez sur cette étiquette (ou choisissez **Paquet de résultats et portée…** dans le menu du produit) pour passer à un autre paquet ou à une autre portée. Les visualisations construites avec l'ancienne combinaison apparaissent alors comme obsolètes jusqu'à ce que vous les mettiez à jour.

## Créer un produit
<!-- help#products-create -->

Cliquez sur **Nouveau** en haut de la page Produits et choisissez **Nouvelle présentation**, **Nouveau rapport** ou **Nouvelle visualisation**.

Pour une présentation ou un rapport, une boîte de dialogue vous demande :

1. Un **Nom** pour le produit.
2. Un **Dossier** dans lequel le placer. **Général** regroupe les produits qui ne sont dans aucun dossier.
3. Un **Paquet de résultats**. Le paquet épinglé par votre administrateur est sélectionné pour vous.
4. Une **Portée**. **Toutes les données** est sélectionnée, sauf si vous êtes limité à certaines portées.

Cliquez sur **Créer** et l'éditeur s'ouvre immédiatement. Pour une visualisation, vous choisissez le paquet et la portée, cliquez sur **Suivant**, puis sélectionnez une métrique - voir [Visualisations](/fr/user-guide/visualizations/).

Si les options de création sont grisées, l'instance ne dispose pas encore d'un paquet de résultats ou d'une portée. Un administrateur doit d'abord les créer.

![Menu Nouveau de la page Produits](/images/products-new-menu-fr.png)

## Se repérer

La page Produits affiche une arborescence de dossiers. Cliquez sur un dossier pour l'ouvrir ou le fermer, et cliquez sur un produit pour ouvrir son éditeur. Les colonnes indiquent le **Type**, le **Paquet** et la **Portée** de chaque produit, ainsi que sa date de modification (**Modifié le**). Cliquez sur l'en-tête **Nom** ou **Modifié le** pour trier, puis cliquez à nouveau pour inverser l'ordre.

Saisissez au moins trois lettres dans la zone de recherche pour trouver des produits par leur nom. Les produits correspondants restent à leur place dans l'arborescence, et les dossiers qui les contiennent s'ouvrent pour que vous voyiez où ils se trouvent.

Chaque ligne indique aussi votre accès au produit - **Propriétaire**, **Éditeur** ou **Lecteur** - ainsi qu'une icône de cadenas si le produit est réservé à certaines personnes.

## Organiser avec des dossiers
<!-- help#products-folders -->

Les dossiers permettent de garder une instance chargée facile à gérer. Vous pouvez regrouper les produits par domaine de programme, par public ou par cycle de rapportage. Pour en créer un, choisissez **Nouveau dossier** dans le menu **Nouveau**, donnez-lui un nom et une couleur, puis cliquez sur **Sauvegarder**.

Pour déplacer un produit ou un dossier, faites-le glisser sur un autre dossier, ou ouvrez son menu (le bouton **⋮** ou un clic droit) et utilisez **Déplacer dans**, **Déplacer vers Général** ou **Déplacer vers un dossier…**. Le menu d'un dossier propose aussi **Renommer / changer la couleur…** et **Supprimer le dossier**.

Supprimer un dossier ne supprime jamais son contenu. Celui-ci remonte d'un niveau, et la confirmation vous indique où il sera placé.

Seuls les utilisateurs ayant accès à toutes les données peuvent créer, déplacer ou supprimer des dossiers. Si vous êtes limité à certaines portées, vous ne voyez que les dossiers qui contiennent des produits que vous pouvez ouvrir.

## Actions sur les produits

Ouvrez le menu d'un produit avec le bouton **⋮** ou par un clic droit sur sa ligne. Les options affichées dépendent de votre accès :

- **Dupliquer** crée votre propre copie du produit, nommée « (copie) », dans le même dossier. Toute personne pouvant consulter un produit peut le dupliquer. Vous pouvez conserver la portée de l'original ou en choisir une autre.
- **Paramètres** modifie le nom et le dossier du produit.
- **Paquet de résultats et portée…** change les données utilisées par le produit.
- **Gérer l'accès…** définit qui peut le consulter et le modifier.
- **Supprimer** supprime définitivement le produit. Seuls le propriétaire et les administrateurs peuvent supprimer un produit, et cette action est irréversible.

## Partage et accès
<!-- help#products-access -->

Chaque produit a un propriétaire - généralement la personne qui l'a créé - et une liste de personnes autorisées à le consulter ou à le modifier. Les nouveaux produits sont **Restreint** au départ : seuls vous et les administrateurs pouvez les ouvrir tant que vous ne les avez pas partagés.

Pour partager, choisissez **Gérer l'accès…** dans le menu du produit ou dans le menu **Fichier** de l'éditeur. La boîte de dialogue comporte deux parties :

- **Accès général** définit un niveau de base pour toute l'instance : **Restreint**, **Tout le monde dans cette instance peut consulter** ou **Tout le monde dans cette instance peut modifier**.
- **Personnes ayant accès** liste les personnes individuelles. Cliquez sur **Ajouter une personne…** pour ajouter quelqu'un, puis choisissez **Peut consulter** ou **Peut modifier**. Une personne peut recevoir plus d'accès que le niveau général, jamais moins.

Cliquez sur **Sauvegarder** pour appliquer vos modifications. Le propriétaire peut aussi utiliser **Transférer la propriété…** pour confier le produit à quelqu'un d'autre ; l'ancien propriétaire conserve un accès en modification.

Les trois niveaux d'accès fonctionnent ainsi :

- Les **Lecteurs** peuvent ouvrir le produit en lecture seule, le présenter, le télécharger, l'envoyer par e-mail et en faire leur propre copie.
- Les **Éditeurs** peuvent en plus modifier le contenu, le renommer et le déplacer, changer son paquet et sa portée, restaurer des versions antérieures et gérer l'accès.
- Les **Propriétaires** peuvent en plus supprimer le produit et transférer sa propriété. Les administrateurs disposent d'un accès propriétaire à tous les produits.

Les personnes limitées à certaines portées ne peuvent ouvrir que les produits dont elles détiennent la portée. Si vous ajoutez une telle personne, la boîte de dialogue vous avertit qu'elle n'a pas accès à la portée de ce produit.

![Boîte de dialogue Gérer l'accès](/images/products-manage-access-fr.png)

## Travailler ensemble
<!-- help#products-collab -->

Plusieurs personnes peuvent modifier la même présentation, le même rapport ou la même visualisation en même temps. Les avatars dans l'en-tête de l'éditeur indiquent qui d'autre est présent, et vous voyez leurs curseurs ainsi que les éléments sur lesquels ils travaillent. Les modifications sont enregistrées automatiquement au fil de votre travail - il n'y a pas de bouton d'enregistrement. Un indicateur d'état dans l'en-tête affiche **En direct** lorsque tout est enregistré.

L'annulation ne s'applique qu'à vos propres modifications, jamais à celles d'un collègue. Si vous perdez la connexion, un bandeau vous indique que FASTR se reconnecte ; gardez la page ouverte jusqu'à ce qu'il indique que vous êtes de nouveau en direct.

## Historique des versions
<!-- help#products-history -->

FASTR enregistre des versions automatiquement pendant que les utilisateurs travaillent. Cliquez sur **Historique** dans l'en-tête de l'éditeur pour les afficher, regroupées par jour, avec les personnes ayant contribué à chacune. Sélectionnez une version pour voir ce qui a changé pendant cette session - pour une présentation, les diapositives nouvelles, modifiées et supprimées portent un badge pour que vous les repériez rapidement.

Les éditeurs peuvent cliquer sur **Restaurer** pour ramener le produit à une version antérieure. Votre contenu actuel est d'abord enregistré comme version, donc rien n'est perdu. Toute personne pouvant consulter le produit peut utiliser **Restaurer comme copie** pour créer plutôt un produit distinct à partir d'une ancienne version.

![Historique des versions](/images/products-version-history-fr.png)
