var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var bcrypt = require('bcrypt-nodejs');
var Mysql = require('../users/users.model');
var configAuth = require('./auth'); // use this one for testing
//var OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
//var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta

//exportamos lalibreria de funciones
module.exports = function (passport) {

passport.serializeUser(function(user, done) {   
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

    passport.use(
            'local-signup',
            new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'user',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
                    function (req, user, password, done) {

                        Mysql.countUser(user, function (rows) {
                            if (rows[0].userCount >= 1) {
                                return done(null, false, 'el nombre de usuario ya existe');
                            } else {
                                // if there is no user with that username
                                // create the user
                                var newUser = {
                                    user: user,
                                    password: bcrypt.hashSync(password, null, null),
                                    email: req.body.email,
                                    usertype: req.body.usertype
                                };

                                Mysql.insertUser(newUser, function (rows) {
                                    if (rows) {
                                        return done(null, user);
                                    }
                                });//fin de consulta
                            }//fin del else
                        });//fin de count
                    }));//fin de local   

    passport.use(
            'local-login',
            new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'user',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
                    function (req, user, password, done) { 
                       
                        Mysql.getUser(user, function (error, rows) {
                            if (!rows.length) {
                                
                                return done(null, false, 'nouser'); 
                            }
                            if (!bcrypt.compareSync(password, rows[0].password)) {
                               
                                return done(null, false, 'wrongpassword'); 
                            } else {
                             
                                return done(null, rows[0]);
                            }
                        });
                        
                    })
            );
    
    /**
     * Sign in with Facebook.
     */
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {

        Mysql.countUser(profile.id, function (rows) {
            if (rows[0].userCount === 0) {

                console.log('no existe e inserto');
                var newUser = {
                    user: profile.id,
                    email: profile._json.email,
                    usertype: 'client',
                    password:''
                };

                Mysql.insertUser(newUser, function (rows) {
                    if (rows) {
                        return done(null, rows);
                    }
                });//fin de consulta
                return done(null, rows);
            } else {
                console.log('si existe y devuelvo datos');
                Mysql.getUser(profile.id, function (error, rows) {
                    if (!rows.length) {

                        return done(null, false, 'nouser');

                    } else {

                        return done(null, rows[0]);
                    }
                });

            }//fin del else
        });//fin de count

    }));
    
    passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
    passReqToCallback : true
  },
  function(req, token, tokenSecret, profile, done) {
     Mysql.countUser(profile.id, function (rows) {
            if (rows[0].userCount === 0) {
                console.log(profile);
                console.log('no existe e inserto twitter');
                var newUser = {
                    user: profile.id,
                    email: 'default',
                    usertype: 'client',
                    password:''
                };

                Mysql.insertUser(newUser, function (rows) {
                    if (rows) {
                        return done(null, rows);
                    }
                });//fin de consulta
                return done(null, rows);
            } else {
                console.log('si existe y devuelvo datos twitter');
                Mysql.getUser(profile.id, function (error, rows) {
                    if (!rows.length) {

                        return done(null, false, 'nouser');

                    } else {

                        return done(null, rows[0]);
                    }
                });

            }//fin del else
        });
  }));
  
  passport.use(new GoogleStrategy({
        consumerKey       : configAuth.googleAuth.consumerKey,
        consumerSecret    : configAuth.googleAuth.consumerSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {
       Mysql.countUser(profile.id, function (rows) {
            if (rows[0].userCount === 0) {
                console.log(profile);
                console.log('no existe e inserto google');
                var newUser = {
                    user: profile.id,
                    email: profile._json.email,
                    usertype: 'client',
                    password:''
                };

                Mysql.insertUser(newUser, function (rows) {
                    if (rows) {
                        return done(null, rows);
                    }
                });//fin de consulta
                return done(null, rows);
            } else {
                console.log('si existe y devuelvo datos google');
                Mysql.getUser(profile.id, function (error, rows) {
                    if (!rows.length) {

                        return done(null, false, 'nouser');

                    } else {

                        return done(null, rows[0]);
                    }
                });

            }//fin del else
        });
  }));
   
};
