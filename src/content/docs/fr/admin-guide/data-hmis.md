---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et importer les données via le système d'exécutions d'importation DHIS2, qui récupère les données par indicateur et par mois et les intègre de manière incrémentielle.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. Le système d'importation DHIS2 convient aux mises à jour régulières depuis un système national en production. Il prend en charge les exécutions immédiates, les exécutions planifiées ponctuelles et les importations planifiées récurrentes.

## Démarrer une importation

Accédez à la section **Données** et sélectionnez **Données SNIS**. Si vous disposez des permissions d'administration, vous verrez **Importations** et d'autres contrôles dans la barre d'en-tête. Cliquez sur **Importations** pour ouvrir la surface d'importation unifiée, qui contient des onglets pour l'activité en cours, les exécutions planifiées et l'historique.

## Processus d'importation CSV
<!-- help#hmis-csv -->

Depuis la surface d'importation, cliquez sur **Téléverser un fichier CSV** pour ouvrir l'assistant d'importation CSV. L'assistant collecte toutes les informations nécessaires avant d'envoyer quoi que ce soit au serveur — l'abandonner à n'importe quelle étape n'a aucun effet.

Une importation CSV comporte quatre étapes : téléverser le fichier, associer ses colonnes aux quatre champs requis, associer les valeurs de la colonne indicateur à vos indicateurs, puis lancer. FASTR prépare ensuite le fichier et l'intègre automatiquement ou le met en attente de votre vérification.

1. **Téléversez votre fichier.** Sélectionnez un fichier CSV existant parmi les ressources de votre instance, ou téléversez-en un nouveau. L'assistant lit les en-têtes du CSV dès qu'un fichier est sélectionné. Si le fichier ne peut pas être analysé, une erreur s'affiche.

2. **Colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : l'identifiant de l'établissement, la colonne indicateur, la période (format AAAAMM) et la valeur.

3. **Correspondance.** L'assistant analyse le fichier pour chaque valeur distincte de la colonne indicateur. Associez chaque valeur à l'indicateur auquel ses lignes appartiennent, ou marquez-la comme ignorée. Une valeur est présélectionnée lorsqu'elle correspond à l'identifiant d'un indicateur ou à l'identifiant DHIS2 d'un élément DHIS2. Les lignes sous les valeurs ignorées sont rejetées et comptées, mais elles ne bloquent jamais l'importation — l'utilisateur a choisi ces valeurs à ignorer. Au moins une valeur doit être associée (non ignorée) avant de pouvoir continuer.

4. **Vérifiez et lancez.** Un résumé affiche le fichier sélectionné, les associations de colonnes et le nombre de valeurs associées par rapport aux valeurs ignorées. Lisez la notice sur la préparation. Si une autre importation est en cours, le bouton devient **Mettre en file d'attente** et l'importation démarre automatiquement à la fin de l'exécution en cours.

Une fois lancée, la préparation valide chaque ligne (périodes, valeurs, établissements) et enregistre chaque ligne sous l'indicateur auquel sa valeur est associée. Un fichier entièrement valide s'intègre automatiquement. Si des lignes sont rejetées pour des raisons autres que les valeurs de correspondance ignorées, l'importation se maintient dans un état **à vérifier** — rien n'est fusionné tant que vous n'avez pas agi depuis l'onglet **En cours** de la vue Importations.

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Une importation DHIS2 récupère les valeurs rapportées par les établissements, un élément DHIS2 et un mois à la fois, directement depuis votre serveur DHIS2. Elle utilise la connexion DHIS2 enregistrée de l'instance, définie dans la carte de connexion DHIS2 sur la page Données. Si aucune connexion enregistrée n'existe, configurez-en une avant de démarrer une importation DHIS2.

Depuis la surface d'importation, cliquez sur **Nouvelle importation DHIS2** pour ouvrir l'assistant d'importation.

### Lancer une importation

L'assistant vous guide à travers quatre étapes selon vos choix.

1. **Indicateurs.** Sélectionnez les indicateurs à importer dans le tableau de tous les indicateurs configurés dans votre instance. Seuls les indicateurs de type Élément DHIS2, Somme et Calculé sont affichés — les indicateurs Téléversés ne sont pas récupérés depuis DHIS2. L'assistant indique combien d'éléments DHIS2 la sélection développe, quelles parties sont exclues (termes de population, indicateurs Téléversés) et avertit si la formule d'un indicateur calculé ne peut pas être résolue.

2. **Heure.** Choisissez quand l'importation s'exécute : **Maintenant** la démarre immédiatement (ou la met en file d'attente si une autre importation est active), **Une fois, à une heure donnée** planifie une exécution ponctuelle à une date et une heure précises dans un fuseau horaire choisi, ou **Récurrente** configure un calendrier selon la cadence choisie. Les calendriers récurrents proposent les options suivantes : quotidienne, hebdomadaire (avec un intervalle configurable de toutes les 1, 2 ou 4 semaines) et mensuelle (n-ième jour de la semaine du mois, avec un intervalle configurable de tous les 1 ou 3 mois). Pour les calendriers hebdomadaires, choisissez la date de la première exécution — le jour de la semaine en est déduit automatiquement. Pour les calendriers mensuels avec un intervalle de 3 mois, définissez également le mois de départ pour ancrer la phase.

3. **Configuration.** Pour les exécutions immédiates ou ponctuelles, sélectionnez la plage de périodes à importer. Pour les exécutions récurrentes, définissez le nombre de mois en arrière à partir du mois en cours à inclure à chaque déclenchement.

4. **Vérifier et lancer.** Un résumé affiche l'URL de connexion, le nombre d'indicateurs et les éléments DHIS2 vers lesquels ils se développent, le calendrier et le nombre total de paires élément-mois. Si une autre importation est en cours, le lancement met la nouvelle importation en file d'attente pour qu'elle démarre automatiquement à la fin de l'exécution en cours.

### Fonctionnement des importations DHIS2

Chaque exécution d'importation récupère les données par paire (élément DHIS2, mois). La sélection que vous effectuez en termes d'indicateurs est développée en éléments DHIS2 au lancement : une Somme contribue les identifiants de données de ses membres, un indicateur Calculé se décompose à travers sa formule jusqu'aux éléments DHIS2 qu'il atteint. Les termes de population et les indicateurs Téléversés sont exclus et listés dans le détail de l'exécution. Pour chaque paire, le système supprime les lignes existantes pour cet identifiant de données et ce mois au sein des établissements interrogés, puis insère les nouvelles valeurs récupérées. Cette approche de suppression ciblée puis insertion garantit que les valeurs que DHIS2 ne renvoie plus sont correctement retirées plutôt que laissées en place.

Les paires terminées sont enregistrées au fur et à mesure. Si une exécution est annulée ou rencontre une erreur, les paires déjà terminées sont conservées.

### Onglet En cours

L'onglet En cours affiche l'importation en cours (le cas échéant) avec une barre de progression en direct et la phase actuelle, ainsi que les importations en file d'attente. Il affiche également les importations dans un état **à vérifier** — il s'agit des importations CSV dont la préparation a écarté des lignes. Pour chaque importation à vérifier, vous pouvez choisir **Intégrer malgré tout** (pour fusionner les lignes retenues) ou **Abandonner** (pour annuler l'importation sans rien fusionner). Vous pouvez annuler une importation en cours ou supprimer une importation en attente.

### Onglet À venir

L'onglet À venir liste les importations planifiées - aussi bien les calendriers récurrents que les exécutions ponctuelles en attente. Pour chaque planification, vous pouvez cliquer sur **Modifier** pour ouvrir l'assistant pré-rempli avec ses paramètres, ou sur **Supprimer** pour la retirer. Un calendrier récurrent qui a été refusé, manqué, ou dont la dernière exécution a échoué est mis en évidence en rouge, avec le détail de l'erreur affiché sous le statut. Pour planifier une importation, cliquez sur **Nouvelle importation DHIS2** et, lorsqu'on vous demande quand l'exécuter, choisissez **Une fois, à une heure donnée** ou **Récurrente**.

### Onglet Historique

L'onglet Historique affiche toutes les exécutions terminées, annulées et en erreur. La colonne **Importé via** indique si chaque exécution provient de DHIS2 ou d'un CSV. Pour les exécutions DHIS2, la colonne de sélection affiche le nombre d'indicateurs ainsi que le nombre d'éléments DHIS2 vers lesquels ils se développent, et la plage de périodes. Les comptages de paires par résultat sont affichés pour les exécutions DHIS2 ; les exécutions CSV affichent le nom du fichier à la place. Cliquez sur une ligne pour ouvrir la vue de détail de l'exécution.

Pour les exécutions DHIS2, la vue de détail affiche le résumé complet, les identifiants DHIS2 introuvables dans DHIS2, les identifiants qui sont des indicateurs DHIS2 (formules, qui ne peuvent pas être récupérés directement — recréez-les via l'importation d'indicateurs DHIS2 dans la configuration des indicateurs), les paires où des valeurs d'établissements ont été ignorées car non entières, les échecs de récupération par paire et un bouton **Version** qui ouvre directement les informations d'importation de la version du jeu de données créée par cette exécution. Depuis le détail d'une exécution DHIS2, cliquez sur **Réessayer les paires en échec** pour ouvrir l'assistant pré-configuré pour réimporter exactement les paires en échec.

## Validation et gestion des erreurs
<!-- hmis-validation -->

Pour une importation CSV, les résultats de la préparation listent chaque problème par catégorie, avec un nombre et des exemples de lignes. Les catégories sont : lignes avec des champs requis manquants, lignes avec des valeurs invalides, établissements absents de votre registre et lignes sous des valeurs ignorées à l'étape de correspondance. Le comptage des valeurs ignorées par correspondance est informatif — l'utilisateur a choisi ces valeurs à ignorer — et ne cause jamais la mise en attente de l'importation pour vérification. Les lignes rejetées pour toute autre raison mettent l'importation dans un état **à vérifier** jusqu'à ce que vous agissiez.

Pour les importations DHIS2, les erreurs par paire sont enregistrées dans le détail de l'exécution avec une classification. Les erreurs de configuration (par exemple un identifiant DHIS2 introuvable dans DHIS2, ou un identifiant appartenant à une formule d'indicateur DHIS2 plutôt qu'à un élément de données) sont marquées comme permanentes et échoueront à nouveau jusqu'à ce que la configuration soit corrigée. Les erreurs serveur (comme les délais d'attente) sont marquées comme transitoires et peuvent réussir lors d'une nouvelle tentative ultérieure. Les valeurs d'établissements qui ne sont pas des entiers non négatifs sont ignorées plutôt que de faire échouer la paire ; le nombre et un exemple sont affichés dans le détail de l'exécution et enregistrés dans le registre.

## Gérer l'historique des importations

Chaque importation réussie crée une nouvelle version du jeu de données. Depuis la vue de détail d'une exécution DHIS2, cliquez sur le bouton **Version** pour accéder directement aux informations d'importation de cette version. Vous pouvez également supprimer des données si nécessaire - cette action est irréversible et réservée aux administrateurs globaux.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour la génération d'un lot de résultats. Générez un nouveau lot de résultats depuis la page **Lots de résultats** de l'instance pour inclure les données fraîches dans vos projets.
