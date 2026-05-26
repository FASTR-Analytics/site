---
title: "Extraction des données"
---

<!-- AUTO-TRANSLATED from 02_data_extraction.md -->
<!-- Add REVIEWED marker after human review to protect from overwrite -->



**Note:** Le contenu de cette section s'appuie sur les documents de présentation existants du FASTR et est susceptible d'être révisé.

## Vue d'ensemble

Cette section décrit la raison d'être, les exigences et les pratiques recommandées pour l'extraction des données sur la prestation des services de routine du DHIS2 en vue de leur utilisation dans le pipeline analytique de la FASTR.

### Pourquoi extraire des données du DHIS2 ?

**Ajustement de la qualité des données**

L'approche FASTR donne la priorité à l'ajustement systématique de la qualité des données afin de permettre une utilisation plus rigoureuse des données de routine du DHIS2 et de générer des estimations analytiquement robustes et pertinentes pour les politiques. La méthodologie comprend des procédures standardisées pour :

- Identifier et corriger les valeurs aberrantes
- Ajuster les rapports incomplets
- Appliquer des mesures de qualité des données cohérentes entre les indicateurs et les établissements

Ces procédures nécessitent un traitement des données et des opérations statistiques qui ne peuvent être mis en œuvre dans l'environnement analytique natif de DHIS2.

**Complexité de l'analyse**

FASTR applique des méthodes analytiques - notamment des techniques de régression - qui vont au-delà de l'analyse descriptive des tendances disponible dans DHIS2. Alors que DHIS2 permet de visualiser les tendances brutes de la prestation de services, FASTR offre des capacités analytiques supplémentaires, notamment :

- L'identification d'augmentations ou de diminutions statistiquement significatives des volumes de services
- L'ajustement des limites de la qualité des données
- La prise en compte explicite des variations saisonnières attendues
- La comparaison de la prestation de services sur des périodes clés, par exemple avant et après des réformes politiques, des chocs ou des perturbations

Le choix entre l'utilisation exclusive des données analytiques du DHIS2 et l'application de l'approche FASTR doit être guidé par l'objectif analytique visé. L'approche FASTR est conçue pour les analyses qui nécessitent une plus grande rigueur statistique, une comparabilité dans le temps et une cohérence entre les différents niveaux géographiques.

!!! warning "Extraire des volumes, pas des pourcentages"

    Le pipeline FASTR exige des **volumes bruts de services** — le nombre réel d'événements déclarés par chaque établissement chaque mois (par exemple, *« 152 enfants ont reçu Penta1 dans cet établissement en mars 2024 »*). Il **n'accepte pas** de pourcentages, de proportions, de taux ou de chiffres de couverture pré-calculés.

    **Pourquoi cela compte :**

    - **La détection des valeurs aberrantes repose sur l'ampleur.** Un établissement déclarant 850 visites CPN1 alors que sa fourchette habituelle est de 100 à 200 est manifestement aberrant. Le même établissement déclarant *« 92 % de couverture »* ne nous apprend rien — le pourcentage est plafonné à 100, masque le volume sous-jacent et efface le signal qui sert à détecter les erreurs de déclaration.
    - **On peut additionner des volumes entre établissements ; pas des pourcentages.** Pour obtenir un total régional ou national, la plateforme additionne les volumes des établissements. Faire une moyenne des pourcentages entre établissements de tailles différentes donne le mauvais résultat (un hôpital de 100 lits et un poste de santé de 5 lits pèseraient à parts égales).
    - **La plateforme construit elle-même le dénominateur.** Le module 5 dérive la population cible (femmes enceintes, nourrissons, etc.) à partir des données SIGS, des enquêtes et des projections de l'ONU. Le module 6 calcule ensuite la couverture comme `volume ÷ dénominateur`. Si vous fournissez directement un % de couverture, il n'y a plus de volume à diviser ni de comparaison à faire.
    - **L'ajustement impute des volumes.** Les modules 1 et 2 détectent les valeurs aberrantes au moyen de seuils statistiques sur les valeurs brutes et comblent les mois manquants par moyennes mobiles des volumes passés. Ces deux méthodes sont statistiquement dénuées de sens sur des pourcentages.

    **Que faut-il extraire :** uniquement le numérateur — nombre de services rendus, doses administrées, visites enregistrées, décès déclarés, etc. La plateforme se charge de l'agrégation, de l'ajustement et du calcul de la couverture.

    **Pièges courants à éviter :**

    - Les *« data elements »* DHIS2 qui stockent directement la couverture en % (par exemple `Taux de couverture CPN1`) — extraire plutôt le volume sous-jacent (par exemple `Visites CPN1 — premier contact`).
    - Les indicateurs pré-agrégés par mois ou par trimestre au niveau du district — extraire plutôt des lignes établissement-mois.
    - Les indicateurs calculés comme *« % d'enfants complètement vaccinés »* — fournir séparément les composants sous-jacents (BCG, Penta1, Rougeole 1, etc.).

### Quel est le format et la granularité requis ?

Les données doivent être extraites pour chaque **indicateur d'intérêt**, au **niveau de l'établissement**, et à un pas de temps **mensuel** pour la **période d'analyse**.

- Les données doivent être stockées au **format long**, avec une ligne par observation
- Les données doivent être enregistrées au format **.csv**
- Les données peuvent être stockées dans un seul fichier ou réparties dans plusieurs fichiers, qui peuvent être combinés lors du téléchargement vers la plateforme d'analyse

**Pourquoi des données mensuelles au niveau de l'établissement ?**

L'utilisation des données les plus granulaires disponibles permet une évaluation plus précise des modèles de déclaration et des problèmes de qualité des données. Les données mensuelles au niveau de l'établissement permettent un ajustement solide de l'exhaustivité de la déclaration, l'identification des anomalies spécifiques à l'établissement et l'estimation des tendances dans le temps tout en tenant compte des variations saisonnières. Ce niveau de granularité permet une mise en œuvre complète de la méthodologie FASTR.

### Variables clés

L'ensemble de données extraites doit comprendre au minimum les variables suivantes :

| Élément | Description |
|--------|-------------|
| Unités org. | Identifiant de l'unité organisationnelle |
| Période | Période de l'observation |
| Nom de l'indicateur | Nom de l'indicateur |
| Total / compte | Valeur agrégée de l'indicateur |

**Termes de l'unité organisationnelle**

| Terme | Description |
|------|-------------|
| `orgunitlevel1` | Niveau administratif le plus élevé (par exemple, pays) |
| `orgunitlevel2` | Niveau administratif intermédiaire (par exemple, état ou province) |
| `orgunitlevel3` | District ou équivalent |
| `orgunitlevel4` | Sous-district ou établissement de santé |
| `orgunitlevel5` | Unité ou département au sein d'un établissement |
| `organisationunitid` | Identifiant DHIS2 unique pour l'unité organisationnelle |
| `organisationunitname` | Nom de l'unité organisationnelle |
| `organisationunitcode` | Code normalisé de l'unité organisationnelle |
| `organisationunitdescription` | Description de l'unité organisationnelle |

**Termes de la période**

| Terme | Description |
|------|-------------|
| `periodid` | Identifiant unique pour la période de déclaration |
| `periodname` | Libellé de la période lisible (par exemple, janvier 2024, T1 2024) |
| `periodcode` | Code de période normalisé (par exemple, 202401) |
| `perioddescription` | Description incluant les dates de début et de fin de la période |

**Termes de l'élément de données**

| Terme | Description |
|------|-------------|
| `dataid` | Identifiant unique de l'élément de données |
| `dataname` | Nom de l'élément de données |
| `datacode` | Code normalisé de l'élément de données |
| `datadescription` | Description de l'élément de données |

**Autres termes**

| Terme | Description |
|------|-------------|
| `total` | Valeur agrégée de l'élément de données par unité organisationnelle et période |
| `date_downloaded` | Date d'extraction des données, pour audit et contrôle de version |

### Combien de données ?

**Analyse FASTR initiale**

Pour la mise en œuvre initiale, il est généralement recommandé d'extraire environ **cinq ans de données historiques**. La fenêtre temporelle appropriée doit être déterminée en fonction de :

- La disponibilité et l'exhaustivité des données
- La cohérence des définitions des indicateurs dans le temps
- Les caractéristiques du système national de données de routine

Une série chronologique pluriannuelle améliore la fiabilité de l'estimation des tendances et de la correction des variations saisonnières.

**Mise à jour régulière de l'analyse FASTR**

Pour les mises à jour de routine (par exemple, mise en œuvre trimestrielle) :

- Commencez par la base de données FASTR existante et extrayez les données pour les mois les plus récents non encore inclus (généralement une **période de trois mois**)
- Extraire à nouveau les **trois mois précédents** pour tenir compte des déclarations tardives ou des révisions des données récentes
- Si l'on soupçonne des révisions substantielles des données historiques, envisager d'extraire à nouveau une période historique plus longue

### Outils d'extraction de données

*Le contenu de la documentation complète doit être développé.*

Cette section couvrira :
- Les options d'exportation des données DHIS2
- Les méthodes d'extraction basées sur l'API
- Les exigences en matière de transformation des données
- Les contrôles d'assurance qualité des données extraites

---

<!--
////////////////////////////////////////////////////////////////////
//                                                                //
//   _____ _     _____ ____  _____    ____ ___  _   _ _____ _   _ //
//  / ____| |   |_   _|  _ \| ____|  / ___/ _ \| \ | |_   _| \ | |//
//  | (___ | |     | | | | | | |__   | |  | | | |  \| | | | |  \| |//
//   \___ \| |     | | | | | |  __|  | |  | | | | . ` | | | | . ` |//
//   ____) | |___ _| |_| |_| | |____ | |__| |_| | |\  | | | | |\  |//
//  |_____/|_____|_____|____/|______| \____\___/|_| \_| |_| |_| \_|//
//                                                                //
//            Modifiez les diapositives de l'atelier              //
//                   en dessous de cette ligne                    //
//                                                                //
////////////////////////////////////////////////////////////////////
-->















---

**Dernière mise à jour** : 06-05-2026
**Contact** : <fastr@worldbank.org>
