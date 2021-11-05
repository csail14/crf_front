# Add the content of the folder build to your project public_html

# Add a nex file .htaccess with this content :

<IfModule mod_rewrite.c>

RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]

</IfModule>

Build et mettre le fichier htacces dans le build
