    
var Controller = require('./users.controller');
var passport = require('passport');

module.exports = function (app) {
    app.post('/api/signup', Controller.signup);
    app.post('/api/localSignin', Controller.localSignin);
    
   
        /*app.get('/auth/facebook', Controller.facebook);

        
        app.get('/auth/facebook/callback', Controller.facebook);*/
};


