// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'        : '1708321856124780', // your App ID
        'clientSecret'    : '6d5024fd1fada07526b00ea02edb26d0', // your App Secret
        'callbackURL'     : 'http://findmenu.nod:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'Z4nqoDjg7krYLL7Sb3rGMm1Pr',
        'consumerSecret'     : 'iTBPy09lsMyQyCZ9qEiffoUsP3Z7CY82GDi6lOqIn5BVqaUTR2',
        'callbackURL'        : 'https://nodejs-angular1-yomogan.c9users.io/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }
};

//test2_nodejs
//En Facebook, Dominios de aplicaciones y URL del sitio -> https://nodejs-angular1-yomogan.c9users.io/

//test1_nodejs
//En Twitter, Website y Callback URL -> https://nodejs-angular1-yomogan.c9users.io/


