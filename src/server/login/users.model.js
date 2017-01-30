var mysql = require('../config.db');

var userModel = {};

userModel.insertUser = function(userData,callback){
     console.log(userData);
    if (mysql.connection) {
        mysql.connection.query('INSERT INTO users SET ?', userData, function(error, result) {
             console.log(result);
            if(error){
                throw error;
            }else{
                //devolvemos la última id insertada
               
                callback(result);
            }
        });
    }
};

module.exports = userModel;