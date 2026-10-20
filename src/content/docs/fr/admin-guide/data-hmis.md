---
title: "Données : SNIS"
description: Importer et gérer les données sanitaires de routine à partir de fichiers CSV ou de DHIS2.
sidebar:
  order: 4
---

Les données du SNIS (Système national d'information sanitaire) constituent le fondement de la plupart des analyses de systèmes de santé dans FASTR. Ces données rassemblent les statistiques de routine collectées auprès des établissements - volumes de prestations de services, chiffres de surveillance des maladies et indicateurs de performance des programmes, rapportés sur une base mensuelle. Avant d'exécuter des modules analytiques ou de créer des visualisations, vous devez importer ces données dans votre instance.

## Consulter les données

Accédez à la section **Données** et sélectionnez **Données HMIS**. La page affiche vos données et, pour les administrateurs globaux, les contrôles d'importation dans un panneau latéral.

### Visualisation

La zone principale montre les données importées, une figure à la fois. Un enregistrement est une valeur rapportée par un établissement pour un mois.

Choisissez d'afficher les **Indicateurs communs** ou les **Indicateurs bruts** à l'aide du sélecteur en haut du panneau gauche. Les indicateurs communs sont les mesures nommées de votre dictionnaire ; les indicateurs bruts sont les identifiants de votre serveur DHIS2 qui leur sont associés.

Choisissez **Enregistrements** pour compter les enregistrements, ou **Prestations de services** pour additionner les valeurs rapportées. Choisissez **Graphique** ou **Tableau** pour basculer entre un graphique linéaire chronologique et un tableau croisé dynamique.

La liste des indicateurs à gauche s'applique à la figure.

## Méthodes d'importation

FASTR prend en charge deux façons d'importer les données du SNIS. Vous pouvez téléverser un fichier CSV si vous disposez de données exportées depuis un autre système ou préparées manuellement. Vous pouvez également, si votre organisation utilise DHIS2, vous connecter directement et récupérer les données depuis le système en production.

Les téléversements CSV conviennent bien aux importations périodiques ou aux données historiques. L'intégration directe avec DHIS2 convient aux mises à jour régulières depuis un système national en production, puisque vous pouvez sélectionner des indicateurs bruts et des périodes précis sans préparer de fichier, et planifier une importation récurrente.

## Démarrer une importation

Si vous êtes administrateur global, la barre d'en-tête en haut de la page Données HMIS affiche un bouton **Importations** qui ouvre la vue des importations. Pendant qu'une importation est en cours, une notice de statut apparaît dans le panneau latéral. La vue comporte quatre onglets et deux boutons, **Nouvelle importation DHIS2** et **Téléverser un fichier CSV**.

- **En cours** affiche l'importation en cours d'exécution avec sa progression et sa phase actuelle, les importations en file d'attente derrière elle, et toute importation CSV en attente de vérification. Vous pouvez annuler l'importation en cours ou retirer une importation en file d'attente.
- **À venir** liste les importations planifiées : les calendriers récurrents et les exécutions ponctuelles qui n'ont pas encore démarré. **Modifier** ouvre l'assistant pré-rempli avec les paramètres de la planification, et l'icône poubelle la supprime. Une planification refusée, manquée, ou dont la dernière exécution a échoué est mise en évidence en rouge avec l'erreur sous son statut, et un avis rouge au-dessus des onglets signale qu'une importation planifiée nécessite votre attention.
- **Historique** liste chaque exécution qui a démarré, y compris celle en cours, avec sa date de début, la personne qui l'a lancée, son origine (DHIS2 ou CSV), sa sélection, le nombre de paires récupérées et en échec pour une exécution DHIS2, son statut, et un bouton **Version** qui ouvre les informations d'importation de la version du jeu de données créée par l'exécution. Cliquez sur une ligne pour voir son détail.
- **Par indicateur** affiche le registre des importations par indicateur brut. Cliquez sur une ligne pour voir le détail mensuel et accéder aux actions de réimportation et de réessai.

Les importations s'exécutent en arrière-plan, une à la fois. Si une importation est déjà en cours, la nouvelle est mise en file d'attente et démarre lorsque la précédente se termine.

## Processus d'importation CSV
<!-- help#hmis-csv -->

Lors d'une importation à partir d'un fichier CSV, vous suivez trois étapes.

1. **Téléversez votre fichier.** Sélectionnez un fichier CSV existant parmi les ressources de votre instance, ou téléversez-en un nouveau. FASTR lit les en-têtes de colonnes dès qu'un fichier est sélectionné.

2. **Associez les colonnes.** Associez les colonnes de votre fichier CSV aux quatre champs requis : `facility_id`, `raw_indicator_id`, `period_id` et `count`.

3. **Vérifier et lancer.** Le récapitulatif affiche le fichier et les associations de colonnes. Cliquez sur **Démarrer l'importation**, ou sur **Mettre en file d'attente** si une autre importation est en cours. FASTR prépare ensuite le fichier : il vérifie la période, la valeur, l'établissement et l'indicateur brut de chaque ligne. Les lignes dont la valeur `raw_indicator_id` ne correspond à aucun indicateur brut enregistré sont écartées et comptabilisées comme indicateurs non associés. Si rien n'est écarté, les lignes préparées sont fusionnées dans le jeu de données automatiquement. Si certaines lignes sont écartées, l'exécution se met en pause avec le statut **À vérifier**. Elle apparaît sous forme de carte dans l'onglet En cours, et vous choisissez l'une des deux actions suivantes :

- **Intégrer malgré tout** fusionne les lignes conservées et ignore les lignes écartées.
- **Abandonner** annule l'importation ; rien n'est fusionné.

Si toutes les lignes sont écartées, l'exécution se termine par une erreur au lieu de se mettre en pause.

La fusion met à jour les lignes déjà présentes pour un établissement, un indicateur brut et un mois, et insère les autres. Les cellules absentes du fichier conservent leur valeur précédente.

## Processus d'importation DHIS2
<!-- help#hmis-dhis2 -->

Cliquez sur **Nouvelle importation DHIS2**. Une importation DHIS2 récupère les valeurs rapportées par les établissements, un indicateur brut et un mois à la fois, directement depuis votre serveur DHIS2. Elle comporte cinq étapes.

1. **Identifiants.** FASTR vérifie si une connexion DHIS2 enregistrée existe pour cette instance. Si c'est le cas, l'étape affiche l'URL de connexion et vous permet de continuer avec celle-ci. Si aucune n'est enregistrée, ou si vous souhaitez utiliser des identifiants différents pour cette importation uniquement, saisissez l'URL DHIS2, le nom d'utilisateur et le mot de passe. Les identifiants en ligne ne sont utilisés que pour l'importation en cours et ne sont pas enregistrés. Une importation future ou récurrente utilise toujours les identifiants enregistrés ; l'étape l'explique et propose un lien pour enregistrer les identifiants si nécessaire.

2. **Indicateurs.** Sélectionnez les indicateurs bruts à importer. La liste affiche chaque indicateur brut enregistré dans votre instance. Sélectionnez ceux dont vous souhaitez récupérer les données.

3. **Heure.** Exécutez l'importation **Maintenant**, **Une fois, à une heure donnée**, ou de façon **Récurrente**, dans le fuseau horaire de votre choix. Une importation récurrente s'exécute chaque jour, chaque semaine ou chaque mois. Un calendrier hebdomadaire s'exécute toutes les 1, 2 ou 4 semaines, le jour de la semaine de la date de première exécution que vous choisissez. Un calendrier mensuel s'exécute un jour de la semaine choisi du mois (le premier, le deuxième, le troisième, le quatrième ou le dernier), tous les 1 ou 3 mois. La planification d'une importation future ou récurrente nécessite des identifiants enregistrés — l'étape le signale s'ils sont manquants.

4. **Configuration.** Pour **Maintenant** et **Une fois, à une heure donnée**, choisissez une plage de périodes fixe. Pour **Récurrente**, choisissez **Derniers N mois** (jusqu'à 24), recalculés à chaque exécution de l'importation.

5. **Vérifier et lancer.** Le récapitulatif liste la connexion, le nombre d'indicateurs et, pour une exécution non récurrente, le nombre de paires (indicateur, mois) à récupérer. Cliquez sur **Démarrer l'importation** (ou **Mettre en file d'attente** si une autre importation est en cours) pour une exécution immédiate, sur **Planifier l'importation** pour une exécution ponctuelle ultérieure, ou sur **Enregistrer la planification** pour une importation récurrente. Si l'importation serait mise en file d'attente mais que vous utilisez des identifiants en ligne, le récapitulatif explique que les importations en file d'attente utilisent toujours la connexion enregistrée et bloque la soumission jusqu'à ce que vous enregistriez les identifiants ou attendiez la fin de l'importation en cours.

Vous pouvez également cliquer sur **Gérer la connexion** dans la barre d'en-tête des importations pour mettre à jour la connexion DHIS2 enregistrée à tout moment sans démarrer une nouvelle importation.

Chaque paire (indicateur brut, mois) est récupérée et fusionnée séparément. Pour une paire récupérée avec succès, FASTR supprime les lignes existantes pour exactement les établissements interrogés, puis insère les valeurs renvoyées par DHIS2. Une paire en échec ne touche pas aux données existantes, et une exécution interrompue conserve chaque paire déjà fusionnée.

FASTR achemine automatiquement chaque indicateur brut vers l'API DHIS2 appropriée. Les éléments de données et les opérandes sont récupérés via l'API dataValueSets, qui renvoie les valeurs rapportées directement par les établissements. Les indicateurs DHIS2 — qui représentent des formules calculées côté serveur — sont récupérés via l'API analytics. Les deux routes produisent les mêmes données stockées dans votre instance, de sorte que l'acheminement est transparent pour vous et pour toute analyse en aval.

Un indicateur brut dont l'identifiant ne correspond à rien dans DHIS2 n'est pas récupéré. Chaque mois sélectionné échoue sans récupération et échouera à chaque exécution jusqu'à ce que l'identifiant soit corrigé ou que l'indicateur brut soit supprimé de la liste.

## Validation et gestion des erreurs
<!-- help#hmis-validation -->

Le processus de préparation détecte plusieurs types de problèmes : champs requis manquants, valeurs numériques invalides, établissements absents de votre liste d'établissements, périodes invalides et lignes avec des identifiants d'indicateurs non associés (identifiants d'indicateurs bruts présents dans le fichier ne correspondant à aucun indicateur brut enregistré, affichés avec un échantillon). Pour chaque catégorie, le résumé affiche un nombre. Corrigez le fichier ou enregistrez les indicateurs bruts manquants avant de relancer l'importation.

Pour une importation DHIS2, le détail de l'exécution affiche le résumé, les indicateurs introuvables dans DHIS2, et chaque paire (indicateur, mois) en échec avec son erreur. Chaque erreur est classée **Configuration** (un identifiant inconnu ou un autre refus de DHIS2), qui échouera à nouveau tant que la liste des indicateurs n'est pas corrigée, ou **Serveur** (un délai d'attente dépassé ou une erreur du serveur), qui peut réussir lors d'une nouvelle tentative. Lorsqu'un mois est en échec, **Réessayer les paires en échec** dans l'onglet **Par indicateur** de la vue des importations ouvre l'assistant avec toutes les paires en échec sélectionnées, et le détail d'une exécution propose la même chose pour les paires en échec de cette exécution.

## Gérer l'historique des importations

Chaque importation qui fusionne des données crée une nouvelle version du jeu de données. L'onglet **Historique** de la vue des importations liste chaque exécution, et le bouton **Version** d'une exécution ouvre les informations d'importation de sa version, avec le nombre de lignes insérées, mises à jour ou supprimées. Pour voir l'état d'importation de chaque indicateur mois par mois, et pour réimporter un indicateur brut, utilisez l'onglet **Par indicateur** de la vue des importations.

Pour supprimer des données, cliquez sur **Supprimer les données** dans la barre d'en-tête, choisissez tous les indicateurs ou une sélection et la plage de périodes, puis saisissez `yes please delete` pour confirmer. Seul un administrateur global peut supprimer des données. La suppression est irréversible et est refusée tant qu'une importation est en cours.

## Après l'importation

Une fois les données intégrées, elles deviennent disponibles pour la génération d'un lot de résultats. Générez un nouveau lot de résultats depuis la page **Lots de résultats** de l'instance pour inclure les données fraîches dans vos projets.
