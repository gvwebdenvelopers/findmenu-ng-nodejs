##FINDMENU by Jorge Martínez y Oscar Otero
Proyecto final 2º DAW 2016 de los alumnos Jorge Martínez y Oscar Otero. Es una aplicación basada en búsqueda de menús por geolocalización. La estructura del proyecto ha sido generada a partir de HotTowel Angular. El backend ha sido modificado implementandolo en nodejs.
El Frontend utiliza las tecnologias Angular 1, CSS3 y HTML5. Para su funcionamiento se requiere base de datos MySQL.

## Requerimientos de interfaz web: aspectos que se evaluaran del proyecto común
El proyecto debe de ser Responsive.

Utilizar elementos HTML5 (sentido semántico) y sus atributos de forma correcta. Validar código en https://validator.w3.org/*

Tener un CSS para el caso concreto de imprimir pantalla, en un par de apartados de la web. "media=print".

Utilizar animaciones CSS3 al estilo AngularJS, minimo 2.

Utilizando Sass realiza un esquema de colores de forma que se pueda cambiar rápidamente los colores al modificar estas variables.

Añadir elementos gráficos en formato svg.

Tener un favicon para la app. Cuanto más soporte mejor.

Tener en cuenta aspectos sobre Accesibilidad**

## Running findemnu

1.- Descargarse el proyecto desde github
  1.1- ficheros que no está en git necesarios para el funcionamiento, hay ejemplos en eldirectorios examples
      - .env ubícalo en /src/server/config aqui van tus social apikeys y la apikey para enviar correos con sebdgrid
      - config.db.js este será el fichero de configuración para tu base de datos

2.- Instalar paquetes:
  2.1- Instala paquetes npm en global 
      npm install -g bower gulp nodemon
  2.2- Ejecutar el comando `npm install`
  2.3- Ejecutar el comando `bower install`
  2.4- Al realizar el bowwer install tener en cuenta si usamos ngmaterials escoger la version 1.4.14

3.- Run the project with `gulp serve-dev` modo desarrollo para modificar la aplicación

##Archivos gitignore
Los siguientes archivos no se encuentran disponibles en el repositorio
CARPETAS
node_modules/
bower_components/



