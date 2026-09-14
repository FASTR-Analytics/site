---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et extraire les données depuis le système en production.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. L'intégration directe avec DHIS2 convient aux mises à jour régulières depuis un système national en production, puisque vous pouvez sélectionner des indicateurs et des périodes spécifiques sans préparation manuelle de fichiers.

## Démarrer une importation

Accédez à la section **Données** et sélectionnez **Données HMIS**. Si votre compte a le droit de configurer les données, la barre latérale affiche un bouton **Importations** qui ouvre la vue des importations. Ses onglets sont **En cours** (l'importation en cours d'exécution ou en file d'attente), **À venir** (les importations planifiées), **Historique** (toutes les exécutions passées) et **Par indicateur** (ce qui a été importé pour chaque indicateur). Cliquez sur **Nouvelle importation** et choisissez CSV ou DHIS2.

Les importations s'exécutent en arrière-plan, une à la fois. Si une importation est déjà en cours, la nouvelle est mise en file d'attente et démarre lorsque la précédente se termine.

:::caution[Capture d'écran à ajouter]
La vue des données HMIS avec le bouton Importations dans la barre latérale et la vue des importations ouverte sur l'onglet En cours.
:::

## Processus d'importation CSV
<!-- help#hmis-csv -->

Une importation CSV comporte quatre étapes : téléverser le fichier, associer ses colonnes aux quatre champs requis, associer les valeurs de la colonne indicateur à vos indicateurs, puis lancer. FASTR prépare ensuite le fichier et le fusionne dans le jeu de données, ou se met en pause pour vérification lorsque des lignes ont été écartées.

1. **Téléversement.** Sélectionnez un fichier CSV déjà téléversé dans votre instance (ses ressources), ou téléversez-en un nouveau.

2. **Colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : **Identifiant de l'établissement**, **Indicateur**, **Période** (format YYYYMM) et **Valeur**. L'interface affiche toutes les colonnes du fichier, ce qui permet de les associer même si votre fichier utilise d'autres noms.

3. **Correspondance.** FASTR lit le fichier et liste chaque valeur distincte de la colonne indicateur avec le nombre de lignes qui la portent. Pour chaque valeur, choisissez l'indicateur auquel ses lignes appartiennent, ou **Ignorer cette valeur**. L'indicateur doit déjà exister dans votre liste d'indicateurs (voir Indicateurs) ; une importation n'en crée jamais. Une valeur est présélectionnée lorsqu'elle correspond à l'identifiant d'un indicateur, sans tenir compte de la casse ni de la ponctuation, ou lorsqu'elle est exactement l'identifiant DHIS2 d'un élément DHIS2. Lorsqu'une valeur pourrait correspondre à deux indicateurs, aucun indicateur n'est présélectionné et c'est à vous de choisir. Il en va de même lorsque deux valeurs iraient sur le même indicateur : au cours d'une même importation, un indicateur ne peut recevoir qu'une seule valeur. Vous ne pouvez pas continuer tant qu'une valeur reste à décider, tant qu'un indicateur est choisi pour deux valeurs, ou tant que toutes les valeurs sont ignorées. Vos choix ne sont pas enregistrés : la prochaine importation, même du même fichier, repart de la même présélection.

4. **Vérifier et lancer.** Cliquez sur **Démarrer l'importation**, ou sur **Mettre en file d'attente** si une autre importation est en cours. Le fichier ne doit pas avoir changé depuis que l'étape Correspondance l'a lu ; si c'est le cas, le lancement est refusé et vous devez reprendre l'importation depuis l'étape Téléversement.

FASTR prépare ensuite le fichier : il vérifie la période, la valeur et l'établissement de chaque ligne et enregistre le nombre de lignes écartées, range chaque ligne conservée sous l'indicateur auquel sa valeur est associée, et totalise les lignes sous les valeurs que vous avez ignorées. Si rien n'est écarté, les lignes préparées sont fusionnées dans le jeu de données sans autre action. Les lignes sous des valeurs ignorées sont signalées dans les résultats mais ne mettent pas l'importation en pause. Si certaines lignes sont écartées pour une autre raison, l'exécution se met en pause avec le statut **À vérifier**. Elle apparaît sous forme de carte dans l'onglet En cours, avec les résultats de la préparation, et vous choisissez l'une des deux actions suivantes :

- **Intégrer malgré tout** fusionne les lignes conservées et ignore les lignes écartées.
- **Abandonner** annule l'importation ; rien n'est fusionné.

La fusion met à jour les lignes déjà présentes pour un établissement, un indicateur et un mois, et insère les autres. Les cellules absentes du fichier conservent leur valeur précédente.

Si la colonne indicateur compte plus de 2 000 valeurs distinctes, l'étape Correspondance s'arrête et indique le nombre de valeurs trouvées. Cela signifie presque toujours que la mauvaise colonne a été choisie.

:::caution[Capture d'écran à ajouter]
L'étape Colonnes montrant les quatre champs requis avec des sélecteurs déroulants.
:::

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Une importation DHIS2 récupère les valeurs rapportées par les établissements, un élément DHIS2 et un mois à la fois, directement depuis votre serveur DHIS2. Elle comporte cinq étapes.

1. **Identifiants.** FASTR utilise la connexion DHIS2 enregistrée de l'instance. Vous pouvez saisir une connexion pour cette exécution seulement ; une importation planifiée a besoin de la connexion enregistrée.

2. **Indicateurs.** Sélectionnez les indicateurs à importer dans votre liste d'indicateurs. La liste propose les éléments DHIS2, les sommes et les indicateurs dérivés ; les indicateurs téléversés ne sont pas proposés, car une importation DHIS2 ne peut pas les récupérer. Un élément DHIS2 est récupéré par son identifiant DHIS2. Sélectionner une somme récupère ceux de ses membres qui sont des éléments DHIS2, et sélectionner un indicateur dérivé récupère les éléments DHIS2 que sa formule utilise ; un membre téléversé ou une valeur de population n'est pas récupéré. Vous ne pouvez pas continuer si la sélection ne récupère aucune donnée, ou si la formule d'un indicateur dérivé sélectionné ne peut pas être lue, par exemple parce qu'elle nomme un indicateur qui n'existe pas. La raison est affichée sous la liste.

3. **Heure.** Exécutez l'importation **Maintenant**, **Une fois, à une heure donnée**, ou de façon **Récurrente** (quotidienne, hebdomadaire ou mensuelle, dans le fuseau horaire de votre choix). Choisissez une plage horaire de faible trafic pour le serveur DHIS2.

4. **Configuration.** Choisissez les mois : **Derniers N mois**, recalculés à chaque exécution d'une importation récurrente, ou une plage de périodes fixe.

5. **Vérifier et lancer.** Le récapitulatif liste la connexion, le nombre d'indicateurs et d'éléments DHIS2, les mois, et le nombre de paires (élément DHIS2, mois) à récupérer. En dessous, il liste les éléments DHIS2 que l'importation récupère, chacun avec son identifiant d'indicateur, son libellé et son identifiant DHIS2, puis les parties de la sélection qui ne sont pas récupérées et pourquoi : les indicateurs téléversés, qu'une importation DHIS2 ne peut pas récupérer, et les valeurs de population utilisées dans une formule, qui proviennent de la page Population et non de DHIS2. Cliquez sur **Démarrer l'importation**.

Le même assistant s'ouvre depuis la liste des indicateurs : sélectionnez-y des indicateurs et choisissez **Importer les données HMIS depuis DHIS2**. Les indicateurs sélectionnés sont déjà choisis à l'étape Indicateurs ; un indicateur téléversé parmi eux est laissé de côté, et l'étape le signale. Après le lancement, un message dans la liste indique où suivre l'exécution.

Chaque paire (élément DHIS2, mois) est récupérée et fusionnée séparément, et les lignes sont conservées sous l'identifiant DHIS2 de l'élément. Pour une paire récupérée avec succès, FASTR supprime les lignes existantes pour exactement les établissements interrogés, puis insère les valeurs renvoyées par DHIS2. Les cellules que DHIS2 ne renvoie plus, parce que la valeur y a été supprimée ou corrigée à zéro, sont retirées plutôt que laissées en place. Une paire en échec ne touche pas aux données existantes, et une exécution interrompue conserve chaque paire déjà fusionnée. Une valeur d'établissement qui n'est pas un nombre entier positif ou nul n'est pas importée ; elle est ignorée et comptabilisée dans le détail de l'exécution.

Un indicateur dont l'identifiant DHIS2 est un indicateur DHIS2 (une formule) plutôt qu'un élément de données n'est pas récupéré. Le détail de l'exécution le signale et renvoie vers **Ajouter des indicateurs depuis DHIS2** dans la liste des indicateurs, qui transforme la formule en éléments de données. Un identifiant que DHIS2 ne connaît pas est listé sous **Identifiants DHIS2 introuvables dans DHIS2**.

:::caution[Capture d'écran à ajouter]
L'étape Indicateurs montrant la liste des indicateurs avec les colonnes Type et Défini par et une sélection.
:::

## Validation et gestion des erreurs
<!-- help#hmis-validation -->

Pour une importation CSV, les résultats de la préparation listent chaque problème par catégorie, avec un nombre et des exemples de lignes. Les catégories sont : lignes avec des champs requis manquants, lignes avec des valeurs invalides, établissements absents de votre liste d'établissements, et périodes invalides. Les lignes sous des valeurs que vous avez ignorées à l'étape Correspondance apparaissent avec les décomptes de lignes plutôt que dans la liste des problèmes. Si beaucoup de lignes sont écartées, corrigez le fichier ou la liste des établissements avant de relancer l'importation.

Pour une importation DHIS2, le détail de l'exécution affiche chaque paire (élément DHIS2, mois) en échec avec son erreur, l'identifiant DHIS2 et l'indicateur qui le porte. **Réessayer les paires en échec** dans l'onglet Par indicateur lance une nouvelle exécution sur toutes les paires en échec, et le détail d'une exécution propose la même chose pour les paires en échec de cette exécution.

## Gérer l'historique des importations

Chaque importation qui fusionne des données crée une nouvelle version du jeu de données. L'onglet **Historique** liste chaque exécution avec sa date, son mode d'importation (CSV ou DHIS2), sa sélection, et le nombre de lignes insérées, mises à jour ou supprimées. Cliquez sur une exécution pour voir son détail. L'onglet **Par indicateur** présente le même historique organisé par indicateur, avec l'identifiant DHIS2 à côté de chaque élément DHIS2. Pour chacun, il montre les mois importés et à quelle date, avec un détail par mois et **Réimporter cet indicateur** pour le récupérer à nouveau depuis DHIS2. Un indicateur renommé garde son historique ici, car l'historique est conservé sous l'identifiant utilisé pour ranger les données, que le renommage ne change pas.

Pour supprimer des données, cliquez sur **Supprimer les données** dans la barre latérale, choisissez tous les indicateurs ou une sélection, les unités administratives et la plage de périodes, puis saisissez `yes please delete` pour confirmer. La suppression est irréversible et est refusée tant qu'une importation est en cours.

## Supprimer des données ICEH

Le jeu de données ICEH propose deux options de suppression. Pour supprimer toutes les données ICEH, cochez **Supprimer TOUTES les données ICEH**, saisissez `yes please delete` dans le champ de confirmation, puis cliquez sur **Supprimer**. Pour supprimer uniquement certains indicateurs tout en conservant les autres, décochez **Supprimer TOUTES les données ICEH**, sélectionnez les indicateurs à supprimer dans la liste, puis cliquez sur **Supprimer**. Seuls les indicateurs sélectionnés sont supprimés ; tous les autres sont conservés.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour tous les projets de votre instance. Les projets peuvent ajuster leur fenêtre de données pour inclure les nouvelles périodes, et les modules prendront en compte les données fraîches lors de leur prochaine exécution.
