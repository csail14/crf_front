# Application PMIS - Front end

## Objet

Le PMIS - Portail de Mesure d'Impact Social de la Croix-Rouge française regroupe les ressources et outils des travaux menés par la CRf autour de l'impact social.
Ce répo porte uniquement sur le front office de l'application. Il est lié au repo du back : https://gitlab.com/la-guilde-du-pixel/pmis-croix-rouge-francaise/

## Documentations fonctionnelles

- Spécifications fonctionnelles : https://docs.google.com/document/d/1CgAM0bjKBW0oKZIO-YGnR5W70OoVpVxG-8HTvcfvasc/edit?usp=sharing
- Wireframes front : https://www.figma.com/file/6sKkRKK1uGvlzyQwIO1pYP/CRF?node-id=2429%3A253
- Prototype front : https://www.figma.com/proto/6sKkRKK1uGvlzyQwIO1pYP/CRF?node-id=2429%3A253

## Langages et outils

React

# Serveur

Pad e pré-requis particulier, seule la technologie Javascript est utilisée. Le vhost doit pointer vers le dossier build dans le dossier du projet.

## Vhost

Exemple vhost (git init dans le dossier react)

```
<VirtualHost *:80>
        ServerName recette-impact-social.croix-rouge.fr
        ServerAdmin ******
        DocumentRoot "******/react/build"
        <Directory "*****/react/build">
                Allowoverride All
        </Directory>
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        RewriteEngine on
        RewriteCond %{SERVER_NAME} =recette-impact-social.croix-rouge.fr
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

# Installer l'application en dev

## Pré-requis

- Back office installé et fonctionnel
- Serveur LAMP classique (Javascript utilisé uniquement)
- npm installé sur serveur

## Installation

Initialiser et cloner le projet dans le dossier concerné

1. git init
2. git remote add origin https://gitlab.com/la-guilde-du-pixel/pmis-front-croix-rouge-francaise.git
3. git pull
4. git checkout dev
5. Ajouter .env à la racine
5. commande "npm install"
6. commande "npm run build"
7. Faire pointer le vhost sur le dossier build

- Contenu .env
Le user est un utilisateur Wordpress abonné pour l'authentification POST

```
REACT_APP_ENV_API_LINK=https://pmis-wp.laguildedupixel.fr/wp-json
REACT_APP_WP_LINK=https://pmis-wp.laguildedupixel.fr
REACT_APP_USER= post
REACT_APP_USER_PASSWORD=f^ZEYfVJcjVeQ(3Pja

```

- Contenu du .htaccess
```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
</IfModule>

```

Ouvrir l'url de recette : rec-impact-social.croix-rouge.fr

## Mettre à jour l'application 
1. git pull
2. commande "npm run build"

# (Développement) Installer React et build l'application

1. cloner le repo
2. `npm install`
3. `npm start` pour lancer l'application en local

Pour build l'application : 
- `npm run build`
  
