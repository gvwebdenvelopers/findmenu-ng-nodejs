(function () {
    'use strict';

    angular
            .module('app.layout')
            .controller('MenuController', MenuController);

    MenuController.$inject = ['$state', 'routerHelper', '$uibModal', 'headerService'];
    /* @ngInject */
    function MenuController($state, routerHelper, $uibModal, headerService) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.showModalSignup = showModalSignup;
        vm.logout = logout;

        activate();

        function activate() {
            getNavRoutes();
            //La dependencia headerService debe estar en el core para funcionar
            headerService.login();
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }

        //Funciones que dependen de header Service y si no esta no funcionaran
        function showModalSignup() {
            headerService.openLoginModal();

        }

        function logout() {
            headerService.logout();
        }


    }
})();
