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

Une importation CSV comporte trois étapes : téléverser le fichier, associer ses colonnes aux quatre champs requis, puis lancer. FASTR prépare ensuite le fichier et le fusionne dans le jeu de données, ou se met en pause pour vérification lorsque des lignes ont été écartées.

1. **Téléversement.** Sélectionnez un fichier CSV déjà téléversé dans votre instance (ses ressources), ou téléversez-en un nouveau.

2. **Colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : **Identifiant de l'établissement**, **Indicateur**, **Période** (format YYYYMM) et **Valeur**. L'interface affiche toutes les colonnes du fichier, ce qui permet de les associer même si votre fichier utilise d'autres noms.

3. **Vérifier et lancer.** Cliquez sur **Démarrer l'importation**, ou sur **Mettre en file d'attente** si une autre importation est en cours.

La colonne indicateur peut contenir trois sortes de valeurs. Une valeur qui est l'identifiant du fichier ou l'identifiant DHIS2 d'un indicateur est rangée sous cet indicateur. Sinon, si la valeur est l'identifiant d'un indicateur et que cet indicateur possède déjà des données, les lignes sont rangées sous l'identifiant du fichier ou l'identifiant DHIS2 de cet indicateur : un fichier qui utilise vos propres identifiants d'indicateurs fonctionne donc aussi. Toute autre valeur est inconnue, et l'importation se met en pause pour que vous décidiez quoi en faire. Une valeur qui est à la fois l'identifiant du fichier d'un indicateur et l'identifiant d'un autre indicateur fait échouer l'importation, en nommant les deux, puisqu'elle pourrait appartenir à l'un comme à l'autre.

FASTR prépare ensuite le fichier : il vérifie chaque ligne par rapport à vos établissements et à vos indicateurs, et compte ce qu'il écarte. Si rien n'est écarté, les lignes préparées sont fusionnées dans le jeu de données sans autre action. Si certaines lignes sont écartées, l'exécution se met en pause avec le statut **À vérifier**. Elle apparaît sous forme de carte dans l'onglet En cours, avec les résultats de la préparation, et vous choisissez l'une des trois actions suivantes :

- **Intégrer malgré tout** fusionne les lignes conservées et ignore les lignes écartées.
- **Créer des indicateurs pour les identifiants inconnus et préparer à nouveau** ouvre l'étape de nommage sur chaque valeur inconnue du fichier. Chacune devient un indicateur téléversé qui porte la valeur comme identifiant du fichier, sous un identifiant proposé que vous pouvez modifier, avec le libellé que vous lui donnez. Saisir l'identifiant d'un indicateur téléversé existant sans identifiant du fichier attribue la valeur à cet indicateur à la place. Le même fichier est ensuite préparé à nouveau.
- **Abandonner** annule l'importation ; rien n'est fusionné.

La fusion met à jour les lignes déjà présentes pour un établissement, un identifiant du fichier et un mois, et insère les autres. Les cellules absentes du fichier conservent leur valeur précédente.

:::caution[Capture d'écran à ajouter]
L'étape Colonnes montrant les quatre champs requis avec des sélecteurs déroulants.
:::

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Une importation DHIS2 récupère les valeurs rapportées par les établissements, un élément DHIS2 et un mois à la fois, directement depuis votre serveur DHIS2. Elle comporte cinq étapes.

1. **Identifiants.** FASTR utilise la connexion DHIS2 enregistrée de l'instance. Vous pouvez saisir une connexion pour cette exécution seulement ; une importation planifiée a besoin de la connexion enregistrée.

2. **Indicateurs.** Sélectionnez les indicateurs à importer dans votre liste d'indicateurs. Un élément DHIS2 est récupéré par son identifiant DHIS2. Sélectionner une somme récupère ses membres, et sélectionner un indicateur dérivé récupère les indicateurs que sa formule utilise. Les indicateurs téléversés ne sont pas récupérés.

3. **Heure.** Exécutez l'importation **Maintenant**, **Une fois, à une heure donnée**, ou de façon **Récurrente** (quotidienne, hebdomadaire ou mensuelle, dans le fuseau horaire de votre choix). Choisissez une plage horaire de faible trafic pour le serveur DHIS2.

4. **Configuration.** Choisissez les mois : **Derniers N mois**, recalculés à chaque exécution d'une importation récurrente, ou une plage de périodes fixe.

5. **Vérifier et lancer.** Le récapitulatif liste la connexion, le nombre d'indicateurs et les éléments DHIS2 auxquels ils correspondent, les mois, et le nombre de paires (élément DHIS2, mois) à récupérer. Cliquez sur **Démarrer l'importation**.

Chaque paire (élément DHIS2, mois) est récupérée et fusionnée séparément, et les lignes sont conservées sous l'identifiant DHIS2 de l'élément. Pour une paire récupérée avec succès, FASTR supprime les lignes existantes pour exactement les établissements interrogés, puis insère les valeurs renvoyées par DHIS2. Les cellules que DHIS2 ne renvoie plus, parce que la valeur y a été supprimée ou corrigée à zéro, sont retirées plutôt que laissées en place. Une paire en échec ne touche pas aux données existantes, et une exécution interrompue conserve chaque paire déjà fusionnée. Une valeur d'établissement qui n'est pas un nombre entier positif ou nul n'est pas importée ; elle est ignorée et comptabilisée dans le détail de l'exécution.

Un indicateur dont l'identifiant DHIS2 est un indicateur DHIS2 (une formule) plutôt qu'un élément de données n'est pas récupéré. Le détail de l'exécution le signale et renvoie vers **Importer depuis DHIS2** dans la liste des indicateurs, qui transforme la formule en éléments de données. Un identifiant que DHIS2 ne connaît pas est listé sous **Identifiants DHIS2 introuvables dans DHIS2**.

:::caution[Capture d'écran à ajouter]
L'étape Indicateurs montrant la liste des indicateurs avec les colonnes Type et Défini par et une sélection.
:::

## Validation et gestion des erreurs
<!-- help#hmis-validation -->

Pour une importation CSV, les résultats de la préparation listent chaque problème par catégorie, avec un nombre et des exemples de lignes. Les catégories sont : lignes avec des champs requis manquants, lignes avec des valeurs invalides, établissements absents de votre liste d'établissements, périodes invalides, et valeurs de la colonne indicateur qui ne correspondent à aucun indicateur. Pour les valeurs inconnues, les résultats affichent les plus fréquentes et l'ensemble complet, et la carte de l'onglet En cours propose de créer des indicateurs pour elles (voir le processus d'importation CSV ci-dessus). Si beaucoup de lignes sont écartées, corrigez le fichier ou la liste des établissements avant de relancer l'importation.

Pour une importation DHIS2, le détail de l'exécution affiche chaque paire (élément DHIS2, mois) en échec avec son erreur, l'identifiant DHIS2 et l'indicateur qui le porte. **Réessayer les paires en échec** dans l'onglet Par indicateur lance une nouvelle exécution sur toutes les paires en échec, et le détail d'une exécution propose la même chose pour les paires en échec de cette exécution.

## Gérer l'historique des importations

Chaque importation qui fusionne des données crée une nouvelle version du jeu de données. L'onglet **Historique** liste chaque exécution avec sa date, son mode d'importation (CSV ou DHIS2), sa sélection, et le nombre de lignes insérées, mises à jour ou supprimées. Cliquez sur une exécution pour voir son détail. L'onglet **Par indicateur** présente le même historique organisé par identifiant DHIS2 ou identifiant du fichier, avec l'indicateur qui porte chacun. Pour chacun, il montre les mois importés et à quelle date, avec un détail par mois et **Réimporter cet indicateur** pour le récupérer à nouveau depuis DHIS2. Un indicateur renommé garde son historique ici, car l'historique est conservé sous l'identifiant DHIS2 ou l'identifiant du fichier, et non sous l'identifiant de l'indicateur.

Pour supprimer des données, cliquez sur **Supprimer les données** dans la barre latérale, choisissez tous les indicateurs ou une sélection, les unités administratives et la plage de périodes, puis saisissez `yes please delete` pour confirmer. Les lignes supprimées sont celles conservées sous les identifiants DHIS2 et les identifiants du fichier des indicateurs sélectionnés. La suppression est irréversible et est refusée tant qu'une importation est en cours.

## Supprimer des données ICEH

Le jeu de données ICEH propose deux options de suppression. Pour supprimer toutes les données ICEH, cochez **Supprimer TOUTES les données ICEH**, saisissez `yes please delete` dans le champ de confirmation, puis cliquez sur **Supprimer**. Pour supprimer uniquement certains indicateurs tout en conservant les autres, décochez **Supprimer TOUTES les données ICEH**, sélectionnez les indicateurs à supprimer dans la liste, puis cliquez sur **Supprimer**. Seuls les indicateurs sélectionnés sont supprimés ; tous les autres sont conservés.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour tous les projets de votre instance. Les projets peuvent ajuster leur fenêtre de données pour inclure les nouvelles périodes, et les modules prendront en compte les données fraîches lors de leur prochaine exécution.
