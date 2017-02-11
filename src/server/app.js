/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var cors = require('cors'); //cal per a signin fb
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());//esto se debe poner sino da fallo conect.sid

require('./config/passport.js')(passport);
require('./config/routes').init(app);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'findmenuangularnodejs'
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

/*app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {successRedirect: '/socialsignin', failureRedirect: '/'}));*/


app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/socialsignin',
    failureRedirect: '/'
}));
app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/socialsignin',
    failureRedirect: '/'
}));

//retorno del cliente para recoger los datos
    /*app.get('/auth/success', function (req, res) {
        console.log('entro a success');
        res.json(req.user);
    });*/
    
app.get('/social/failure', function (req, res) {
    console.log('fail');
    res.render('after-auth', {state: 'failure', user: null});
});


console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
    case 'build':
        //console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        //console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
            '\n__dirname = ' + __dirname +
            '\nprocess.cwd = ' + process.cwd());
});
