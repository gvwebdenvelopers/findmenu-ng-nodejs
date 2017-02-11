
module.exports.init = function (app,passport) {

//importo routers de cada modulo
    require('../contact/contact.router.js')(app);
    require('../menus/menus.router.js')(app);
    require('../users/users.router.js')(app,passport);

};
