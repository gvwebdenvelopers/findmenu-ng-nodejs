(function () {
    'use strict';

    angular
            .module('headerService')
            .factory('headerService', header);

    header.$inject = ['cookiesService', '$rootScope', '$state', '$uibModal'];

    /* @ngInject */
    function header(cookiesService, $rootScope, $state, $uibModal) {
        return {
            login: login,
            logout: logout,
            openLoginModal: openLoginModal
        };

        function login() {

            //al cargarse la pagina por primera vez, user es undefined
            var user = cookiesService.GetCredentials();
            if (user) {
                console.log(user);
                //mostramos enlces segun laentrada
                $rootScope.accederV = false;
                $rootScope.profileV = true;
                $rootScope.logoutV = true;
                $rootScope.profile = user.user;
                

                //redirigimos al home si nos logueamos
                $state.go('home');

            } else {
                $rootScope.accederV = true;
            }
        }

        function logout() {

            cookiesService.ClearCredentials();

            //habilitamos o deshabilitamos enlaces
            $rootScope.accederV = true;
            $rootScope.profileV = false;
            //limpiamos los valores         
            $rootScope.profile = '';
            $rootScope.logoutV = false;
            //redirigimos al home
            $state.go('home');
        }

        function openLoginModal() {

            var modalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                size: 'lg'
            });

        };

    }

}());
