
module.exports.init = function (app,passport) {

//importo routers de cada módulo
    require('../contact/contact.router.js')(app);
    require('../menus/menus.router.js')(app);
    require('../users/users.router.js')(app,passport);

};
