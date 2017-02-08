    
var Controller = require('./users.controller');
var passport = require('passport');

module.exports = function (app) {
    app.post('/api/signup', Controller.signup);
    app.post('/api/localSignin', Controller.localSignin);
    // facebook -------------------------------
        // send to facebook to do the authentication
        app.get('/auth/facebook', Controller.facebook);

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback', Controller.facebook);
};


