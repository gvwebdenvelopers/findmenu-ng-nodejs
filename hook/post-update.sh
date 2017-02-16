#!/bin/bash
unset 'GIT_DIR'
cd /home/jordimart/findmenu-ng-nodejs
forever stop src/server/app.js
git fetch origin && git pull origin master && bower install && npm install && gulp build && PORT=3000 NODE_ENV=build
forever start ./src/server/app.js
exec git update-server-info

