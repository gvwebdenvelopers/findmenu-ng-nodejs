    
var Controller = require('./users.controller');

module.exports = function (app) {
    app.post('/api/signup', Controller.signup);
    app.post('/api/localSignin', Controller.localSignin);
};


