var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');
var Mysql = require('../users/users.model');
var configAuth = require('./auth'); // use this one for testing
var OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta

//exportamos lalibreria de funciones
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    //En una aplicación web típica, las credenciales utilizadas para autenticar un
    //usuario sólo se transmitirán durante la solicitud de inicio de sesión. Si la
    //autenticación tiene éxito, se establecerá y mantendrá una sesión a través de 
    //una cookie establecida en el navegador del usuario.

    //Cada solicitud posterior no contendrá credenciales, sino la cookie única que 
    //identifica la sesión. Para dar soporte a las sesiones de inicio de sesión, 
    //Passport serializará y deserializará las instancias de usuario de la sesión.

passport.serializeUser(function(user, done) {
    console.log('uso serializer');//no borrar
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('uso deserialize');//no borrar
  done(null, user);
});

    /*passport.serializeUser(function (user, done) {
        console.log('uso serializer');//no borrar
        done(null, user.user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        console.log('uso deserialize');//no borrar
        Mysql.getUser(id, function (error, rows) {
            done(error, rows[0]);
        });
    });*/

    //En este ejemplo, sólo el ID de usuario se serializa en la sesión, manteniendo
    //pequeña la cantidad de datos almacenados dentro de la sesión. Cuando se reciben
    //solicitudes posteriores, este ID se utiliza para encontrar al usuario, que se 
    //restaurará a req.user.

    // La lógica de serialización y deserialización es suministrada por la aplicación,
    // permitiendo a la aplicación elegir una base de datos apropiada y / o un asignador
    //de objetos, sin imposición por la capa de autenticación.

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
    
   

// =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    /*passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'name', 'email'],
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
            function (req, token, refreshToken, profile, done) {
                // asynchronous

                process.nextTick(function () {
                    console.log('entro a facebook');
                    console.log(profile.id);
                    console.log(req.user);
                    // check if the user is already logged in
                    if (!req.user) {
                        Mysql.getUser(profile.id , function (error, user) {
                            if (error)
                                return done(error);
                            if (user) {
                                console.log(user.user);
                                console.log('existe el usuario');
                                // if there is a user id already but no token (user was linked at one point and then removed)
                                if (!user.token) {
                                    user.token = token;
                                    user.name = profile.name.givenName + ' ' + profile.name.familyName;
                                    user.email = (profile.emails[0].value || '').toLowerCase();
                                    
                                    Mysql.insertUser(user, function (rows) {
                                    
                                    if (rows) {
                                        return done(null, user);
                                    }
                                });//fin de consulta
                                }
                                return done(null, user); // user found, return that user
                            } else {
                                    console.log('no existe el usuario');
                                var newUser = {
                                    user: profile.id,
                                    token: token,
                                    name: profile.name.givenName + ' ' + profile.name.familyName,
                                    email: (profile.emails[0].value || '').toLowerCase(),
                                    usertype: 'client'
                                };

                                Mysql.insertUser(newUser, function (rows) {
                                    
                                    if (rows) {
                                        return done(null, user);
                                    }
                                });//fin de consulta
                            }

                        });

                    } else {
                        // user already exists and is logged in, we have to link accounts
                        var user = req.user; // pull the user out of the session
                        user.user = profile.id;
                        user.token = token;
                        user.name = profile.name.givenName + ' ' + profile.name.familyName;
                        user.email = (profile.emails[0].value || '').toLowerCase();
                        Mysql.insertUser(user, function (rows) {
                                    
                                    if (rows) {
                                        return done(null, user);
                                    }
                    });
                }
                });

            }));*/
            
      
            
            
            
            
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
};
