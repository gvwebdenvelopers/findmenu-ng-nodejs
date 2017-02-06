(function () {
    'use strict';

    angular
            .module('blocks.headerService')
            .factory('headerService', header);

    header.$inject = ['cookiesService', '$rootScope', '$state'];

    /* @ngInject */
    function header(cookiesService, $rootScope, $state) {
        return {
            login: login,
            logout: logout
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
                //El usuario que se registra por email no suele tener nombre, asi que mostramos su correo
                //Esta funcionalidad no funciona por ahora ya que no reconoce si el nombre esta vacio.

                /*if (user.user.length === 1) {
                   
                    $rootScope.profile = user.user;
                } else {
                    $rootScope.profile = user.name;
                }*/

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

    }

}());

