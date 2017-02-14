'use strict';

var passport = require('passport');
var Mysql = require('../users/users.model');

exports.signup = function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('name');
        }
        return res.send(true);

    })(req, res, next);

};

exports.localSignin = function (req, res, next) {

    passport.authenticate('local-login', function (err, user, info) {

        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('errorcredentials');
        }
        return res.send(user);
    })(req, res, next);

};

exports.getProfile = function (req, res, next) {

    Mysql.getUser(req.body.user, function (error, rows) {
        if (error) {

            return res.send('err');

        } else {

            res.json(rows[0]);
        }
    });

};








