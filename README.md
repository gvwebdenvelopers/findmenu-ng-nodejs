##FINDMENU by Jorge Martínez y Oscar Otero
Proyecto final 2º DAW 2016 de los alumnos Jorge Martínez y Oscar Otero. Es una aplicación basada en búsqueda de menús por geolocalización. El backend esta implementado en nodejs, el frontend en Angular 1, CSS3 y HTML5. Para su funcionamiento se requiere base de datos MySQL.

## Running findemnu

1.- Descargarse el proyecto desde github

2.- Instalar paquetes:
2.1- Ejecutar el comando `npm install`

2.2- Ejecutar el comando `bower install`

-> MOMENTANEO: añadir archivo sendgrid.env en la ruta /src/server/utils

3.- Run the project with `gulp serve-dev`

##Archivos gitignore
Los siguientes archivos no se encuentran disponibles en el repositorio
# carpetas
node_modules/
bower_components/

# other
.tmp
sendgrid.env
config.db.js
