// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'        : '1708321856124780', // your App ID
        'clientSecret'    : '6d5024fd1fada07526b00ea02edb26d0', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'DD491DZAVm7RBQBpsSri6q3Re',
        'consumerSecret'     : 'ZpRtjdj2nJTxWCyWECPWzz9Z65xCkkLpYEDK0JXiHkZzVDDocQ',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'consumerKey'      : '1009379597815-nli89nprm6iat5cmfdmplhse321uop7j.apps.googleusercontent.com',
        'consumerSecret'   : 'H0djqkOgkjgYN-toq-ksGdBR',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }
};

//test2_nodejs
//En Facebook, Dominios de aplicaciones y URL del sitio -> https://nodejs-angular1-yomogan.c9users.io/

//test1_nodejs
//En Twitter, Website y Callback URL -> https://nodejs-angular1-yomogan.c9users.io/


