var ControllerMenus = require ('./menus.controller');

module.exports = function(app) {
  app.get('/api/menus', ControllerMenus.getMenus);
};
