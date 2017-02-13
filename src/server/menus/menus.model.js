var mysql = require('../config/config.db');

var menusModel = {};

// Obtiene todos los objetos Menus de la base de datos
menusModel.getMenus = function (callback){
  if (mysql.connection) {
      mysql.connection.query('SELECT * FROM restaurantes ORDER BY id', function(error, rows) {
          if(error){
              throw error;
          }else{
              callback(null, rows);
          }
      });
  }
};

menusModel.getMenusMarkers = function (callback){
  if (mysql.connection) {
      var sql = 'SELECT id, latitud, longitud, nombre FROM restaurantes ORDER BY id';
      mysql.connection.query(sql , function(error, rows) {
          if(error){
              throw error;
          }else{
              callback(null, rows);
          }
      });
  }
};

menusModel.getMenu = function(id, callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM restaurantes WHERE id = ' + id ;
        mysql.connection.query(sql, function(error, row) {
            if(error){
                throw error;
            }else{
                callback(null, row);
            }
        });
    }
};

module.exports = menusModel;
