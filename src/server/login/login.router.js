var Controller = require ('./login.controller');
//var passport =require('./utils/passport');

//module.exports = function(app) {
   // app.post('/api/signup', Controller.signup);
//};

module.exports = function(app,passport) {
    
    app.post('/api/signup', passport.authenticate('local-signup',function(err, user,next) {
        if (err){ return next(err);}
        if (!user) {return next(null, false);}
        return next(null, user);
        
    }));
};



