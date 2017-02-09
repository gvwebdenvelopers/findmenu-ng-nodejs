(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('socialController', SignupController);

    SignupController.$inject = ['dataservice', '$state', '$timeout','logger'];

    function SignupController(dataservice, $state, $timeout,logger) {
        var vm = this;
        vm.title = 'Signup';
        vm.inputUser = '';
        vm.inputEmail = '';
        vm.inputPass = '';
        vm.inputPass2 = '';
        //social = social;
        
        
social();


function social(){
    console.log('hola');
     dataservice.facebook().then(function (response) {
         console.log(response);
     });
}
        /*function SubmitSignup() {

            if (vm.inputPass === vm.inputPass2) {

                var data = {
                    'user': vm.inputUser,
                    'email': vm.inputEmail,
                    'password': vm.inputPass,
                    'usertype': 'client'
                };

                var dataUserJSON = JSON.stringify(data);
                dataservice.signup(dataUserJSON).then(function (response) {
                    if (response.data === true) {
                        $timeout(function () {                           
                            logger.success('Usuario introducido');
                            $state.go('home');             
                        }, 3000);
                    } else {
                        if (response.data === 'name') {
                            logger.warning('Ya existe un usuario con ese nombre');
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);

                        } else if (response.data === 'err') {
                            logger.error('Error en el server');
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);
                        }
                    }
                });

            } else {
                 logger.warning('Los dos passwords deben ser iguales');
                $timeout(function () {
                }, 3000);

            }
        }*/
    }
})();