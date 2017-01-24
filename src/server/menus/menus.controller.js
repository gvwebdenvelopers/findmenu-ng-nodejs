var Menus = require('./menus.model.js');

exports.getMenus = function(req, res) {
	Menus.getMenus(
		function(err, menus) {
			if (err)
  			res.send(err)
      console.log(menus);
			res.json(menus); // devuelve todos los menus en JSON
		}
	);
}

exports.getMenu = function(req, res) {
	Menus.getMenu( req.param.menu_id,
		function(err, menu) {
			if (err)
  			res.send(err)
      console.log(menu);
			res.json(menu); // devuelve el menu en JSON
		}
	);
}
