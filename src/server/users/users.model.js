var mysql = require('../config.db');

var userModel = {};

userModel.getUser = function (id, callback) {
    if (mysql.connection) {
        //var sql = 'SELECT * FROM users WHERE id = ' + id;
        //'SELECT * FROM users WHERE id =' + id, function (err, rows)
        mysql.connection.query('SELECT * FROM users WHERE id =' + id, function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
};

userModel.countUser = function (user, callback) {

    if (mysql.connection) {
        mysql.connection.query('SELECT COUNT(*) AS userCount FROM users WHERE user like "' + user + '"', function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(rows);
            }
        });
    }
};

userModel.insertUser = function (userData, callback) {

    if (mysql.connection) {
        mysql.connection.query('INSERT INTO users SET ?', userData, function (err, result) {
            if (err) {
                throw err;
            } else {
                callback(result);
            }
        });
    }
};



module.exports = userModel;