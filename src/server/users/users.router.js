    'use strict';
    
var Controller = require('./users.controller');

module.exports = function (app, passport) {
    app.post('/api/signup', Controller.signup);
    app.post('/api/localSignin', Controller.localSignin);

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
            {successRedirect: '/socialsignin', failureRedirect: '/'}));

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter',
            {successRedirect: '/socialsignin', failureRedirect: '/'}));

    app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/socialsignin',
        failureRedirect: '/'
    }));

    //retorno del cliente para recoger los datos
    app.get('/auth/success', function (req, res) {
       // console.log(req.user);
        res.json(req.user);
    });
    
    app.post('/api/getprofile', Controller.getProfile);

    /*app.get('/social/failure', function (req, res) {
        console.log('fail');
        res.render('after-auth', {state: 'failure', user: null});
    });*/

};


