var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var Mysql = require('../users/users.model');

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

    passport.serializeUser(function (user, done) {
        console.log('uso serializer');//no borrar
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        console.log('uso deserialize');//no borrar
        Mysql.getUser(id, function (error, rows) {
            done(error, rows[0]);
        });
    });

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
};
