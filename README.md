# Formation Angular

Vous trouverez dans ce repository les différentes étapes du projet sur lequel nous nous sommes basés tout au long de la formation.

Chaque étape est matérialisée par une branche, à partir de la branche master.

Pour récupérer l'ensemble des branches, exécutez `git pull --all`

Pour lister les branches : `git branch -a`

Pour changer de branche : `git checkout <nom-branche>`

Par exemple pour la première étape : `git checkout classeStatistique`

 ## Listes des branches

 * [master](#master)
 * [classeStatistique](#classeStatistique)
 * [composantStatistique](#composant)
 * [ngFor](#ngfor)
 * [directive](#directive)
 * [pipe](#pipe)
 * [service](#service)
 * [forms](#forms)
 * [http](#http)
 * [i18n](#i18n)
 * [webSocket](#websocket)
 * [interceptor](#interceptor)
 * [full](#full)
 

## Master

Cette branche contient le template initial.

## Classe statistique

Ajout de la classe statistique et utilisation du data-binding dans le template du dashboard.
Ajout d'une fonction "switch" permettant de traduire un état en classe boostrap.

## Composant statistique

Jusqu'à présent le dashboard présente du code copié / collé. 
On rationnalise cela avec un composant "statistique" qui a pour objectif de représenter une statistique.
C'est un webComponent, ie. une balise html personnalisée, que l'on peut utiliser dans le template de notre dashboard. 

## ngFor

Au lieu d'afficher 4 instances ; on itère sur un tableau avec la directive structurelle ngForm.
On observe le mécanisme de détections de changements, en modifiant notre tableau au runtime, la vue est mise à jour automatiquement.

## Directive d'attribut

Ajout d'une directive permettant d'afficher une bordure au survol d'une statistique à la souris.
La couleur de la bordure est paramétrée, en fonction de l'état de la statistique.

## Pipe

Ajout d'un pipe permettant de transformer un état en couleur (déport du switch dans ce pipe).

## Service

Ajout d'un service statistique ; l'instanciation de nos statistiques est déportée dans ce service.

## Forms

Ajout d'un formulaire de création / mise à jour d'une statistique.
Utilisation des mécanismes d'input / output, du cycle de vie des composants (interface OnChanges).

Vous trouverez dans cette branche deux composants, un pour chaque type de formulaire (reactive / template driven).

## Http

Modification du service avec interrogation d'une API REST avec les notions de Promise.

## i18n

Ajout du service AppTranslate et de la librairie ngx-translate qui permet d'interroger des fichiers de langue et de ne plus avoir de chaînes "en dur" dans nos templates / classes.

## WebSocket

Ajout d'un service websocket qui permet d'être informé en temps réel des changements effectués en base, par les autres utilisateurs.

L'interface devient "réactive" avec un mode de communication "PUSH" (le back-end nous envoie des informations).

## Interceptor 

Ajout d'un intercepteur exemple qui bouchonne le GET statistiques.

## Projet complet

Projet complet avec quelques ajouts : 
  - utilisation de la librairie ngx-spinner 
  - ajout d'un graphique type "pie" permettant de compter les statistiques par état.