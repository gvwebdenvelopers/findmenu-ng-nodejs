    
var Controller = require('./users.controller');
//var passport = require('passport');
//require('./users.controller');

module.exports = function (app, passport) {
    app.post('/api/signup', Controller.signup);
    app.post('/api/localSignin', Controller.localSignin);

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
            {successRedirect: '/socialsignin', failureRedirect: '/'}));

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter',
            {successRedirect: '/socialsignin', failureRedirect: '/'}));

};


