---
title: Portées
description: Définir les fenêtres de données dans lesquelles travaillent les produits et les utilisateurs.
sidebar:
  order: 8
---

Une portée est une fenêtre de données nommée. Elle détermine les parties d'un paquet de résultats qu'un produit peut utiliser - quels types de données, quelle zone administrative, quelles années ou quels cycles d'enquête, et quels modules et indicateurs. Chaque présentation, rapport et visualisation est associé à exactement une portée, et les utilisateurs peuvent être limités à certaines portées afin de ne voir que ce qu'elles contiennent.

## Quand utiliser les portées

Les portées sont utiles chaque fois qu'un groupe de produits, ou un groupe de personnes, ne doit travailler que sur une partie des données de l'instance. Un bureau régional de la santé peut recevoir une portée couvrant uniquement sa région. Une revue de la santé maternelle peut utiliser une portée limitée aux indicateurs de santé maternelle et néonatale. Une portée couvrant les trois dernières années permet d'exclure les données plus anciennes d'une analyse de tendance.

La portée intégrée **Toutes les données** inclut les données HMIS, HFA et ICEH et ne limite rien. Elle ne peut être ni modifiée ni supprimée. Si vous n'avez rien à restreindre, les produits peuvent simplement utiliser **Toutes les données**.

## Créer une portée
<!-- help#scopes-create -->

Toute personne ayant accès à toutes les données peut créer des portées. Sur la page **Portées**, cliquez sur **Nouvelle portée**, donnez-lui un **Libellé**, puis définissez ses limites dans les onglets **HMIS**, **FOSA** et **ICEH**. Chaque onglet a ses propres paramètres :

- **Inclure** - décochez pour exclure entièrement ce type de données de la portée
- **Géographie** - **Toutes les zones**, ou une zone administrative du deuxième niveau (HMIS et HFA)
- **Limiter les années** - une plage sur un curseur d'années (HMIS et ICEH)
- **Limiter les points temporels**, **Limiter les catégories** et **Limiter les catégories de service** - restreindre les données HFA à certains cycles d'enquête ou groupes d'indicateurs
- **Limiter les modules** et **Limiter les indicateurs** - n'inclure que les modules et les indicateurs que vous choisissez

Une limite ne s'applique à un tableau que si celui-ci comporte une colonne correspondante. Les options de modules et d'indicateurs proviennent du paquet de résultats épinglé. Cliquez sur **Enregistrer** lorsque vous avez terminé.

![Éditeur de portée](/images/scopes-editor-fr.png)

## La liste des portées

La liste affiche le libellé de chaque portée, un résumé de ses limites HMIS, HFA et ICEH, et le nombre de produits qui l'utilisent. Les portées marquées **Migrée** ont été créées automatiquement à partir des fenêtres de données des projets des versions antérieures de FASTR.

## Modifier et supprimer des portées
<!-- help#scopes-edit -->

Cliquez sur une portée pour la modifier. Changer ce qu'une portée limite signale comme obsolètes toutes les visualisations des produits qui l'utilisent, afin que les auteurs puissent les adapter aux nouvelles limites.

Une portée ne peut pas être supprimée tant qu'un produit l'utilise - déplacez d'abord ces produits vers une autre portée. Pour supprimer plusieurs portées inutilisées à la fois, sélectionnez-les et cliquez sur **Supprimer**.

Une portée attribuée à des utilisateurs limite ce que ces utilisateurs peuvent voir ; sa modification ou sa suppression nécessite donc la permission **Configurer les utilisateurs**. Cela évite que quiconque élargisse par erreur l'accès d'une personne soumise à des restrictions.

## Portées et utilisateurs

Les personnes limitées à des portées peuvent voir la page Portées, mais uniquement les portées qui leur sont attribuées, et elles ne peuvent pas les modifier. Pour limiter une personne à des portées, ouvrez son profil sur la page **Utilisateurs** - voir [Utilisateurs](/fr/admin-guide/users/).
