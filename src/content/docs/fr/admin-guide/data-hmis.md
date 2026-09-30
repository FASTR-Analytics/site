---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Consulter les données

Accédez à la section **Données** et sélectionnez **Données HMIS**. La page comporte deux onglets, **Visualisation** et **Registre**.

### Visualisation

L'onglet **Visualisation** montre les données importées, une figure à la fois. Un enregistrement est une valeur rapportée par un établissement pour un mois.

Choisissez **Graphique linéaire** pour voir une ligne par indicateur au fil des mois. Choisissez **Enregistrements** pour compter les enregistrements, ou **Prestations de services** pour additionner les valeurs rapportées.

Choisissez **Carte de chaleur** pour voir quels indicateurs ont des données pour quelles périodes. Chaque ligne est un indicateur. Chaque colonne est un mois ou une année, selon votre choix sous **Périodes**. Une cellule est remplie lorsque l'indicateur a au moins un enregistrement pour cette période, et vide lorsqu'il n'en a aucun. Dans la vue par année, une cellule est remplie dès qu'un mois de l'année a un enregistrement. Placez le pointeur sur une cellule pour voir l'indicateur et la période.

La liste des indicateurs à gauche s'applique aux deux figures.

### Registre

L'onglet **Registre** indique ce qui a été importé pour chaque indicateur. Il comporte une ligne pour chaque indicateur dont FASTR a tenté l'importation, depuis DHIS2 ou depuis un téléversement CSV. Les colonnes sont :

- **ID de l'indicateur** et **Libellé**.
- **Identifiant DHIS2**, affiché seulement pour un élément DHIS2.
- **Mois avec données**, sur l'ensemble des mois entre le premier et le dernier mois du jeu de données.
- **Dernière importation**, avec la date et l'origine de l'importation, DHIS2 ou CSV.
- **Mois en échec**, les mois qu'une importation DHIS2 n'a pas pu récupérer.
- **Valeurs ignorées**, les valeurs d'établissement que la dernière importation DHIS2 a laissées de côté parce qu'elles n'étaient pas des nombres entiers positifs ou nuls.

Les indicateurs avec des mois en échec sont listés en premier. Cliquez sur une ligne pour ouvrir un tableau avec une ligne par mois : état, nombre d'enregistrements, nombre de prestations de services et date d'importation. Pour un élément DHIS2, **Réimporter cet indicateur** en haut récupère à nouveau tous les mois depuis DHIS2.

Lorsqu'un mois est en échec, **Réessayer les paires en échec** au-dessus du tableau ouvre l'assistant d'importation DHIS2 avec chaque élément DHIS2 et chaque mois en échec déjà sélectionnés ; vous choisissez le moment de l'exécution et vous la lancez. Après l'une ou l'autre action, un message sur la page indique où suivre l'importation.

Renommer un indicateur ne change pas l'identifiant sous lequel ses données sont stockées : l'indicateur garde donc sa ligne dans le registre.

:::caution[Capture d'écran à ajouter]
La page des données HMIS sur l'onglet Visualisation avec la carte de chaleur par année.
:::

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et récupérer les données depuis le système en production.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. L'intégration directe avec DHIS2 convient aux mises à jour régulières depuis un système national en production, puisque vous pouvez sélectionner des indicateurs et des périodes précis sans préparer de fichier, et planifier une importation récurrente.

## Démarrer une importation

Si vous êtes administrateur global, la barre d'en-tête en haut de la page Données HMIS affiche un bouton **Importations** qui ouvre la vue des importations. Pendant qu'une importation est en cours, l'étiquette **Importation en cours** apparaît à côté. La vue comporte trois onglets et deux boutons, **Nouvelle importation DHIS2** et **Téléverser un fichier CSV**.

- **En cours** affiche l'importation en cours d'exécution avec sa progression et sa phase actuelle, les importations en file d'attente derrière elle, et toute importation CSV en attente de vérification. Vous pouvez annuler l'importation en cours ou retirer une importation en file d'attente.
- **À venir** liste les importations planifiées : les calendriers récurrents et les exécutions ponctuelles qui n'ont pas encore démarré. **Modifier** ouvre l'assistant pré-rempli avec les paramètres de la planification, et l'icône poubelle la supprime. Une planification refusée, manquée, ou dont la dernière exécution a échoué est mise en évidence en rouge avec l'erreur sous son statut, et un avis rouge au-dessus des onglets signale qu'une importation planifiée nécessite votre attention.
- **Historique** liste chaque exécution qui a démarré, y compris celle en cours, avec sa date de début, la personne qui l'a lancée, son origine (DHIS2 ou CSV), sa sélection (les indicateurs, les éléments DHIS2 vers lesquels ils se développent et la plage de périodes pour une exécution DHIS2 ; le nom du fichier pour une exécution CSV), le nombre de paires récupérées et en échec pour une exécution DHIS2, son statut, et un bouton **Version** qui ouvre les informations d'importation de la version du jeu de données créée par l'exécution. Cliquez sur une ligne pour voir son détail.

Les importations s'exécutent en arrière-plan, une à la fois. Si une importation est déjà en cours, la nouvelle est mise en file d'attente et démarre lorsque la précédente se termine.

:::caution[Capture d'écran à ajouter]
La vue des données HMIS avec le bouton Importations dans la barre d'en-tête et la vue des importations ouverte sur l'onglet En cours.
:::

## Processus d'importation CSV
<!-- help#hmis-csv -->

Cliquez sur **Téléverser un fichier CSV**. Une importation CSV comporte quatre étapes : téléverser le fichier, associer ses colonnes aux quatre champs requis, associer les valeurs de la colonne indicateur à vos indicateurs, puis lancer. Rien n'est écrit dans le jeu de données avant le lancement : fermer l'assistant à n'importe quelle étape n'a aucun effet. FASTR prépare ensuite le fichier et le fusionne dans le jeu de données, ou se met en pause pour vérification lorsque des lignes ont été écartées.

1. **Téléversement.** Sélectionnez un fichier CSV déjà téléversé dans votre instance (ses ressources), ou téléversez-en un nouveau. FASTR lit les en-têtes de colonnes dès qu'un fichier est sélectionné, et le signale si le fichier ne peut pas être lu.

2. **Colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : **Identifiant de l'établissement**, **Indicateur**, **Période (aaaamm)** et **Valeur**. L'interface affiche toutes les colonnes du fichier, ce qui permet de les associer même si votre fichier utilise d'autres noms.

3. **Correspondance.** FASTR lit le fichier et liste chaque valeur distincte de la colonne indicateur avec le nombre de lignes qui la portent. Pour chaque valeur, choisissez l'indicateur auquel ses lignes appartiennent, ou **Ignorer cette valeur**. L'indicateur doit déjà exister dans votre liste d'indicateurs (voir Indicateurs) ; une importation n'en crée jamais. Une valeur est présélectionnée lorsqu'elle correspond à l'identifiant d'un indicateur, sans tenir compte de la casse ni de la ponctuation, ou lorsqu'elle est exactement l'identifiant DHIS2 d'un élément DHIS2. Lorsqu'une valeur pourrait correspondre à deux indicateurs, aucun indicateur n'est présélectionné et c'est à vous de choisir. Il en va de même lorsque deux valeurs iraient sur le même indicateur : au cours d'une même importation, un indicateur ne peut recevoir qu'une seule valeur. Vous ne pouvez pas continuer tant qu'une valeur reste à décider, tant qu'un indicateur est choisi pour deux valeurs, ou tant que toutes les valeurs sont ignorées. Vos choix ne sont pas enregistrés : la prochaine importation, même du même fichier, repart de la même présélection.

4. **Vérifier et lancer.** Le récapitulatif affiche le fichier, les associations de colonnes et le nombre de valeurs associées et ignorées. Cliquez sur **Démarrer l'importation**, ou sur **Mettre en file d'attente** si une autre importation est en cours. Le fichier ne doit pas avoir changé depuis que l'étape Correspondance l'a lu ; si c'est le cas, le lancement est refusé et vous devez reprendre l'importation depuis l'étape Téléversement.

FASTR prépare ensuite le fichier : il vérifie la période, la valeur et l'établissement de chaque ligne et enregistre le nombre de lignes écartées, range chaque ligne conservée sous l'indicateur auquel sa valeur est associée, et totalise les lignes sous les valeurs que vous avez ignorées. Si rien n'est écarté, les lignes préparées sont fusionnées dans le jeu de données sans autre action. Les lignes sous des valeurs ignorées sont signalées dans les résultats mais ne mettent pas l'importation en pause. Si certaines lignes sont écartées pour une autre raison, l'exécution se met en pause avec le statut **À vérifier**. Elle apparaît sous forme de carte dans l'onglet En cours, avec les résultats de la préparation, et vous choisissez l'une des deux actions suivantes :

- **Intégrer malgré tout** fusionne les lignes conservées et ignore les lignes écartées.
- **Abandonner** annule l'importation ; rien n'est fusionné.

Si toutes les lignes sont écartées, l'exécution se termine par une erreur au lieu de se mettre en pause.

La fusion met à jour les lignes déjà présentes pour un établissement, un indicateur et un mois, et insère les autres. Les cellules absentes du fichier conservent leur valeur précédente.

Si la colonne indicateur compte plus de 2 000 valeurs distinctes, l'étape Correspondance s'arrête et indique le nombre de valeurs trouvées. Cela signifie presque toujours que la mauvaise colonne a été choisie.

:::caution[Capture d'écran à ajouter]
L'étape Colonnes montrant les quatre champs requis avec des sélecteurs déroulants.
:::

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Cliquez sur **Nouvelle importation DHIS2**. Une importation DHIS2 récupère les valeurs rapportées par les établissements, un élément DHIS2 et un mois à la fois, directement depuis votre serveur DHIS2. Elle utilise la connexion DHIS2 enregistrée de l'instance, définie dans la carte **Connexion DHIS2** de la page Données. Elle comporte quatre étapes. Si aucune connexion n'est enregistrée, l'assistant le signale et n'en affiche aucune.

1. **Indicateurs.** Sélectionnez les indicateurs à importer dans votre liste d'indicateurs. La liste propose les éléments DHIS2, les sommes et les indicateurs calculés ; les indicateurs téléversés ne sont pas proposés, car une importation DHIS2 ne peut pas les récupérer. Un élément DHIS2 est récupéré par son identifiant DHIS2. Sélectionner une somme récupère ceux de ses membres qui sont des éléments DHIS2, et sélectionner un indicateur calculé récupère les éléments DHIS2 que sa formule utilise ; un membre téléversé ou une valeur de population n'est pas récupéré. Vous ne pouvez pas continuer si la sélection ne récupère aucune donnée, ou si la formule d'un indicateur calculé sélectionné ne peut pas être lue, par exemple parce qu'elle nomme un indicateur qui n'existe pas. La raison est affichée sous la liste.

2. **Heure.** Exécutez l'importation **Maintenant**, **Une fois, à une heure donnée**, ou de façon **Récurrente**, dans le fuseau horaire de votre choix. Une importation récurrente s'exécute chaque jour, chaque semaine ou chaque mois. Un calendrier hebdomadaire s'exécute toutes les 1, 2 ou 4 semaines, le jour de la semaine de la date de première exécution que vous choisissez. Un calendrier mensuel s'exécute un jour de la semaine choisi du mois (le premier, le deuxième, le troisième, le quatrième ou le dernier), tous les 1 ou 3 mois ; pour tous les 3 mois, vous choisissez aussi le mois de départ. Choisissez une plage horaire de faible trafic pour le serveur DHIS2.

3. **Configuration.** Pour **Maintenant** et **Une fois, à une heure donnée**, choisissez une plage de périodes fixe. Pour **Récurrente**, choisissez **Derniers N mois** (jusqu'à 24), recalculés à chaque exécution de l'importation.

4. **Vérifier et lancer.** Le récapitulatif liste la connexion, le nombre d'indicateurs et d'éléments DHIS2, les mois et, pour une exécution non récurrente, le nombre de paires (élément DHIS2, mois) à récupérer. En dessous, il liste les éléments DHIS2 que l'importation récupère, chacun avec son identifiant d'indicateur, son libellé et son identifiant DHIS2, puis les parties de la sélection qui ne sont pas récupérées et pourquoi : les indicateurs téléversés, qu'une importation DHIS2 ne peut pas récupérer, et les valeurs de population utilisées dans une formule, qui proviennent de la page Population et non de DHIS2. Cliquez sur **Démarrer l'importation** (ou **Mettre en file d'attente** si une autre importation est en cours) pour une exécution immédiate, sur **Planifier l'importation** pour une exécution ponctuelle ultérieure, ou sur **Enregistrer la planification** pour une importation récurrente.

Le même assistant s'ouvre depuis la liste des indicateurs : sélectionnez-y des indicateurs et choisissez **Importer les données HMIS depuis DHIS2**. Les indicateurs sélectionnés sont déjà choisis à l'étape Indicateurs ; un indicateur téléversé parmi eux est laissé de côté, et l'étape le signale. Après le lancement, un message dans la liste indique où suivre l'exécution. Lorsqu'il s'ouvre depuis **Réessayer les paires en échec**, les paires sont déjà choisies et seules les étapes Heure et Vérifier sont affichées.

Chaque paire (élément DHIS2, mois) est récupérée et fusionnée séparément, et les lignes sont conservées sous l'identifiant DHIS2 de l'élément. Pour une paire récupérée avec succès, FASTR supprime les lignes existantes pour exactement les établissements interrogés, puis insère les valeurs renvoyées par DHIS2. Les cellules que DHIS2 ne renvoie plus, parce que la valeur y a été supprimée ou corrigée à zéro, sont retirées plutôt que laissées en place. Une paire en échec ne touche pas aux données existantes, et une exécution interrompue conserve chaque paire déjà fusionnée. Une valeur d'établissement qui n'est pas un nombre entier positif ou nul n'est pas importée ; elle est ignorée et comptabilisée dans le détail de l'exécution.

Un indicateur dont l'identifiant DHIS2 est un indicateur DHIS2 (une formule) plutôt qu'un élément de données n'est pas récupéré. Le détail de l'exécution le signale et renvoie vers **Ajouter depuis DHIS2** dans la liste des indicateurs, qui transforme la formule en éléments de données. Un identifiant que DHIS2 ne connaît pas est listé sous **Identifiants DHIS2 introuvables dans DHIS2**.

:::caution[Capture d'écran à ajouter]
L'étape Indicateurs montrant la liste des indicateurs avec les colonnes Type et Défini par et une sélection.
:::

## Validation et gestion des erreurs
<!-- help#hmis-validation -->

Pour une importation CSV, les résultats de la préparation listent chaque problème par catégorie avec un nombre : lignes avec des champs requis manquants, lignes avec des valeurs invalides, établissements absents de votre liste d'établissements (avec des exemples de lignes) et périodes invalides. Les lignes sous des valeurs que vous avez ignorées à l'étape Correspondance apparaissent avec les décomptes de lignes plutôt que dans la liste des problèmes. Si beaucoup de lignes sont écartées, corrigez le fichier ou la liste des établissements avant de relancer l'importation.

Pour une importation DHIS2, le détail de l'exécution affiche le résumé, les identifiants DHIS2 introuvables dans DHIS2, les identifiants qui sont des indicateurs DHIS2, les paires où des valeurs d'établissement ont été ignorées avec leur nombre, et chaque paire (élément DHIS2, mois) en échec avec son erreur, l'identifiant DHIS2 et l'indicateur qui le porte. Chaque erreur est classée **Configuration** (un identifiant inconnu, un indicateur DHIS2 ou un autre refus de DHIS2), qui échouera à nouveau tant que la liste des indicateurs n'est pas corrigée, ou **Serveur** (un délai d'attente dépassé ou une erreur du serveur), qui peut réussir lors d'une nouvelle tentative. Lorsqu'un mois est en échec, **Réessayer les paires en échec** dans l'onglet **Registre** de la page Données HMIS ouvre l'assistant avec toutes les paires en échec sélectionnées, et le détail d'une exécution propose la même chose pour les paires en échec de cette exécution.

## Gérer l'historique des importations

Chaque importation qui fusionne des données crée une nouvelle version du jeu de données. L'onglet **Historique** de la vue des importations liste chaque exécution (voir Démarrer une importation ci-dessus), et le bouton **Version** d'une exécution ouvre les informations d'importation de sa version, avec le nombre de lignes insérées, mises à jour ou supprimées. Pour voir l'état d'importation de chaque indicateur mois par mois, et pour réimporter un indicateur, utilisez l'onglet **Registre** de la page Données HMIS (voir Consulter les données ci-dessus).

Pour supprimer des données, cliquez sur **Supprimer les données** dans la barre d'en-tête, choisissez tous les indicateurs ou une sélection et la plage de périodes, puis saisissez `yes please delete` pour confirmer. Seul un administrateur global peut supprimer des données. La suppression est irréversible et est refusée tant qu'une importation est en cours.

## Supprimer les données ICEH

Le jeu de données ICEH propose deux options de suppression. Pour supprimer toutes les données ICEH, cochez **Supprimer TOUTES les données ICEH**, saisissez `yes please delete` dans le champ de confirmation et cliquez sur **Supprimer**. Pour ne retirer que certains indicateurs en conservant les autres, décochez **Supprimer TOUTES les données ICEH**, sélectionnez dans la liste les indicateurs à retirer et cliquez sur **Supprimer**. Seuls les indicateurs sélectionnés sont retirés ; tous les autres sont conservés.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour la génération d'un lot de résultats. Générez un nouveau lot de résultats depuis la page **Lots de résultats** de l'instance pour inclure les données fraîches dans vos projets.
