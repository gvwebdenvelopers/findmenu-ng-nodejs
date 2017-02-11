
var passport = require('passport');

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

exports.facebook = function (req, res, next) {
    console.log('entro a facebook controlador');
    passport.authenticate('facebook',

     function (err, user, info) {
      //console.log(err);
      //console.log(user);
      //console.log(info);
        /*if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('errorcredentials');
        }
        //return res.send(user);
        res.redirect('/');*/
    })(req, res, next);

};

exports.facebookCallback = function (req, res, next) {
    console.log('entro a facebookcallback controlador');
     passport.authenticate('facebook',function (err, user, info) {
     if(user){
         //console.log(user);
         //console.log(res.user);
         //successRedirect: '/socialsignin';
         //return res.send(req.user);
         res.redirect('/socialsignin');
     }
        //{successRedirect: '/socialsignin', failureRedirect: '/'});
    })(req, res, next);
};




