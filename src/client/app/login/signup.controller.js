(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['dataservice', '$state', '$timeout', 'logger', '$log'];

    function SignupController(dataservice, $state, $timeout, logger, $log) {
        var vm = this;
        vm.inputUser = '';
        vm.inputEmail = '';
        vm.inputPass = '';
        vm.inputPass2 = '';
        vm.SubmitSignup = SubmitSignup;

        function SubmitSignup() {

            if (vm.inputPass === vm.inputPass2) {

                var data = {
                    'user': vm.inputUser,
                    'email': vm.inputEmail,
                    'password': vm.inputPass,
                    'usertype': 'client'
                };

                var dataUserJSON = JSON.stringify(data);
                dataservice.signup(dataUserJSON).then(function(response) {
                    if (response.data === true) {
                        logger.success('Usuario introducido');
                        $timeout(function() {
                            $state.go('home');
                        }, 3000);
                    } else {
                        if (response.data === 'name') {
                            logger.warning('Ya existe un usuario con ese nombre');

                        } else if (response.data === 'err') {
                            logger.error('Error en el server');
                        }
                    }
                });
            } else {
                logger.warning('Los dos passwords deben ser iguales');

            }
        }
    }
})();