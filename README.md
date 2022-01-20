# Application PMIS - Front end

## Objet

Le PMIS - Portail de Mesure d'Impact Social de la Croix-Rouge française regroupe les ressources et outils des travaux menés par la CRf autour de l'impact social.
Ce répo porte uniquement sur le front office de l'application.

## Langages et outils

React

# Serveur

Pad e pré-requis particulier, seule la technologie Javascript est utilisée. Le vhost doit pointer vers le dossier build dans le dossier du projet.

## Vhost

Exemple vhost (git init dans le dossier react)

# Installer l'application en prod

## Pré-requis

- Back office installé et fonctionnel
- Serveur LAMP classique (Javascript utilisé uniquement)
- npm installé sur serveur
- Compte Okta (configuration ci-dessous)

Ajouter l'url du front dans Trusted Origin
- Okta Admin > Security > API > Trusted Origins 

## Installation

Initialiser et cloner le projet dans le dossier concerné

1. git init
2. git remote add origin ****
3. git pull
4. git checkout dev
5. Ajouter .env à la racine (modèle dans .env.example)
5. commande "npm install"
6. commande "npm run build"
7. Faire pointer le vhost sur le dossier build

- NB. Dans le .env, le user est un utilisateur Wordpress administrateur pour l'authentification POST

Ouvrir l'url de prod : impact-social.croix-rouge.fr

## Mettre à jour l'application 
1. git pull
2. commande "npm run build"

# (Développement) Installer React et build l'application

1. cloner le repo
2. `npm install`
3. `npm start` pour lancer l'application en local

Pour build l'application : 
- `npm run build`
  
