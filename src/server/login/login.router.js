    
var Controller = require('./login.controller');

module.exports = function (app) {
    app.post('/api/signup', Controller.signup);
};


