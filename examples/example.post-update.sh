#!/bin/bash
unset 'GIT_DIR'
cd /home/usuario/findmenu-ng-nodejs
sudo forever stop ./src/server/app.js
git fetch origin && git pull origin master && bower install && npm install && gulp build && sudo PORT=3000 NODE_ENV=build forever start ./src/server/app.js
exec git update-server-info