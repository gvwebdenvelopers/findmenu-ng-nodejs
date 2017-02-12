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
        'GOOGLE_ID'        : '1009379597815-h0g2sjbir9ea7cn6k145am410afuv7qv.apps.googleusercontent.com',
        'GOOGLE_SECRET'   : 'Fbujmj2wmdk_sSUELecomKRq',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }
};



