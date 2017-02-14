(function () {
    'use strict';

    angular
            .module('app.login')
            .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
                state: 'signup',
                config: {
                    url: '/signup',
                    templateUrl: 'app/login/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'vm',
                    title: 'Signup'
                }
            }, {
                //Devuelve al usuario que está en sesión
                state: 'socialsignin',
                config: {
                    url: '/socialsignin',
                    controller: 'socialController'

                }
            }, {
                //Devuelve al usuario que está en sesión
                state: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/login/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    title: 'Profile'

                }
            }

        ];
    }
})();

