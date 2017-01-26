var ControllerMenus = require ('./menus.controller');

module.exports = function(app) {
  app.get('/api/menus', ControllerMenus.getMenus);

  app.get('/api/menu/:menu_id', ControllerMenus.getMenus);
};
