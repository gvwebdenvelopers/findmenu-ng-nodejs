
module.exports.init = function (app) {

//importo routers de cada modulo
    require('../contact/contact.router.js')(app);
    require('../menus/menus.router.js')(app);
    require('../users/users.router.js')(app);

};
