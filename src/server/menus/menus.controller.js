var Menus = require('./menus.model.js');

exports.getMenus = function(req, res) {
	Menus.getMenus(
		function(err, menus) {
			if (err) {
				res.send(err);
			}

			res.json(menus); // devuelve todos los menus en JSON
		}
	);
};

exports.getMenusMarkers = function(req, res) {
	Menus.getMenus(
		function(err, markers) {
			if (err) {
				res.send(err);
			}
			res.json(markers); // devuelve todos los menus en JSON
		}
	);
};

exports.getMenu = function(req, res) {
	console.log('En server_getMenu' + req.param.menuId);
	Menus.getMenu(req.param.menuId,
		function(err, menu) {
			if (err) {
				res.send(err);
			}
			res.json(menu); // devuelve el menu requerido con id = req.param.menu_id en JSON
		}
	);
};
