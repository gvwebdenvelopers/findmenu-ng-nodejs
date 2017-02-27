
![alt text](https://github.com/gvwebdenvelopers/findmenu-ng-nodejs.git/raw/master/src/client/images/findmenu_2.png "Logo Title Text 1")


##FINDMENU by Jorge Martínez y Oscar Otero
Proyecto final 2º DAW 2016 de los alumnos Jorge Martínez y Oscar Otero. Es una aplicación basada en búsqueda de menús por geolocalización. La estructura del proyecto ha sido generada a partir de HotTowel Angular. El backend ha sido modificado implementandolo en nodejs.
El Frontend utiliza las tecnologias Angular 1, CSS3 y HTML5. Para su funcionamiento se requiere base de datos MySQL.

## Demo 

[Findmenu.tk](https://findmenu.tk:3000)

## Requerimientos generales

La aplicación dispondrá de un módulo de login con autentificación local,facebook,twitter y google.

La aplicación dispondrá de un módulo de ofertas que se verán listadas y en un mapa.

La aplicación dispondráde un módulo de contact donde se podrán enviar correos de sugerencias.

## Requerimientos cliente

El cliente estará programado con Angularjs utilizando el yeoman de Jhon Papa y su guía de estilo.

El cliente dispondrá de test unitarios.

El cliente dispondrá de traducciones.

## Requerimientos servidor

El servidor estrá programado con nodejs y utilizará una estructura de router,controller y model.

El servidor utilizará passport para la autentificación.

El servidor utilizará mysql para la base de datos.

## Requerimientos deploy

La aplicación se lanzará en un vps contratado.

La aplicación debe funcionar con certificados de conexión segura.

La aplicación utilizará un sistema de actualización vinculado a github, con lo cual se actualizará y reiniciará cada vez que detecte un push en master.

## Requerimientos de interfaz web: aspectos que se evaluarán del proyecto 
El proyecto debe de ser Responsive.

Utilizar elementos HTML5 (sentido semántico) y sus atributos de forma correcta. Validar código en https://validator.w3.org/*

Tener un CSS para el caso concreto de imprimir pantalla, en un par de apartados de la web. "media=print".

Utilizar animaciones CSS3 al estilo AngularJS, minimo 2.

Utilizando Sass realiza un esquema de colores de forma que se pueda cambiar rápidamente los colores al modificar estas variables.

Añadir elementos gráficos en formato svg.

Tener un favicon para la app. Cuanto más soporte mejor.

Tener en cuenta aspectos sobre Accesibilidad**

## Running findemnu en modo desarrollo

1.- Descargarse el proyecto desde github.

   1.1- ficheros que no está en git necesarios para el funcionamiento, hay ejemplos en el directorio examples.

- .env ubícalo en /src/server/config aqui van tus social apikeys y la apikey para enviar correos con sebdgrid.
- config.db.js este será el fichero de configuración para tu base de datos.

2.- Instalar paquetes:

   2.1- Instala paquetes npm en global. 

   `npm install -g bower gulp nodemon`.

   2.2- Ejecutar el comando `npm install`.

   2.3- Ejecutar el comando `bower install`.

   2.4- Al realizar el bowwer install tener en cuenta si usamos ngmaterials escoger la version 1.4.14 .

3.- Run the project with `gulp serve-dev` modo desarrollo para modificar la aplicación.

## Optimice findmenu to build version

Antes de lanzar la aplicación en modo producción debemos optimizarla, para ello existen una tareas que debemos pasar ya que después en el modo build también se ejecutarán y no funcionarán si no estan correctas.

### Code Analysis

- `gulp vet`

    Realiza análisis de código estático en todos los archivos javascript.Utiliza jshint and jscs.

- `gulp vet --verbose`

    Muestra todos los archivos afectados y la información extendida sobre el análisis de código.

- `gulp plato`

    Realiza el análisis de código utilizando plato en todos los archivos javascript. Plato genera un informe en la carpeta de informes.

### Testing

- `gulp serve-specs`

    Sirve y navega a la página html en un navegador de pruebas y ejecuta las pruebas de unidad en ella. Inyecta cualquier cambio sobre la marcha y vuelve a ejecutar las pruebas. Vista rápida y fácil de las pruebas como una alternativa a la terminal a través de `gulp test`.

- `gulp test`

    Ejecuta todas las pruebas unitarias usando karma, mocha, chai y sinon con phantomjs. Depende de la tarea del vet, para el análisis de código.

## Running findemnu en modo build

1.- Crea los certificados, cert1.pem y privkey1.pem, hay ejemplos en la carpeta examples, debes situarlos en la raiz del proyecto.

2.- Lanza la aplicación en modo build `gulp serve-build`.

- Esto optimizará el código en la carpeta build y lanzará el servidor, hay que modificar la url a https://localhost:8001.

## Findmenu deploy

Para desplegar la aplicación debemos haber hecho funcionar la aplicación en modo serve-build en local y deberemos tener en cuenta los mismos pasos que hemos realizado y además losficheros que no se actualizan en git.

Realiza un git clone de la aplicación en tu carpeta home del vps.

Importa la base de datos y crea los ficheros que no están en git en sus directorios.

- config.db.js
- .env
- privatekey1.pem
- cert1.pem

Realiza un prueba `sudo PORT=3000 NODE_ENV=build ./src/server/app.js` y conecta con la url https://tudominio:3000, si cierras la consola la aplicación se parará.

Para tener la aplicación siempre funcionando debes intalar un paquete.

- `npm install forever -g`
- Ahora ejecuta dentro del directorio el siguiente comando `sudo PORT=3000 NODE_ENV=build forever start ./src/server/app.js` cierra la terminal y comprueba que sigue funcionando.
- Ejecutando `sudo forever list` podrás observar que la tarea sigue en curso. Ahora ya tienes la aplicación funcionando.

## Findmenu deploy auto update

Esta funcionalidad nos permitirá actualizar la aplicación del vps trabajndo en local, de esta formacada vez que realices un push en la rama master se actualizarán los cambios efectuados.

- Crea una carpeta llamada hook en la raiz.
- Crea dos ficheros dentro hook.js y post-update.sh será un servidor de escuha y un script, hay ejemplos en lacarpeta examples, modificalos para tu vps.
- En github debes debes ir a settings y crear un webhook para el server de escucha,introduciendo tu url con el puerto que le configures.
- Este server lo ejecutarás con forever pero sin sudo, de esta forma al actualizar parará los procesos con sudo pero este proceso no y podrás actualizar.

## Notas:

Este proyecto no está completamente terminado pero tiene una buena base de ejemplos para poder ampliarlo o rectificado.

Aceptamos todo tipo de comentarios, correcciones o dudas sobre el mismo.

Para ver mas tareas de gulp consulta el fichero  README_jhonpapa.tx o busca el repositorio de Jhon Papa en github.

[Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide)
>*Opinionated Angular style guide for teams by [@john_papa](//twitter.com/john_papa)*


