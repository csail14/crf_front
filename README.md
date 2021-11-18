# Application PMIS - Front end

## Objet
Le PMIS - Portail de Mesure d'Impact Social de la Croix-Rouge française regroupe les ressources et outils des travaux menés par la CRf autour de l'impact social.
Ce répo porte uniquement sur le front office de l'application. Il est lié au repo du front : https://gitlab.com/la-guilde-du-pixel/pmis-croix-rouge-francaise/

## Documentations fonctionnelles
- Spécifications fonctionnelles : https://docs.google.com/document/d/1CgAM0bjKBW0oKZIO-YGnR5W70OoVpVxG-8HTvcfvasc/edit?usp=sharing
- Wireframes front : https://www.figma.com/file/6sKkRKK1uGvlzyQwIO1pYP/CRF?node-id=2429%3A253
- Prototype front : https://www.figma.com/proto/6sKkRKK1uGvlzyQwIO1pYP/CRF?node-id=2429%3A253

## Langages et outils
React

# Installer l'application en dev

Pas de pré-requis particulier sur le serveur.

- Cloner le repo
- Faire pointer le vhost sur le dossier build

Exemple vhost

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

# Installer React et build l'application 

- cloner le repo
- `npm install`
- `npm build`

