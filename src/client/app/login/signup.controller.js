(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('SignupController', SignupController);

    SignupController.$inject = ['dataservice', '$state', '$timeout'];

    function SignupController(dataservice, $state, $timeout) {
        var vm = this;
        vm.title = 'Signup';
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
                dataservice.signup(dataUserJSON).then(function (response) {
                    if (response.data === true) {
                        $timeout(function () {                           
                            vm.resultMessageFail = 'Usuario introducido';
                            //$state.go('home');
                            //CommonService.banner("El usuario se ha dado de alta
                            // correctamente, revisa su correo para activarlo", "");

                        }, 2000);
                    } else {
                        // console.log(response);
                        if (response.data === 'name') {
                            vm.resultMessageFail = 'Ya existe un usuario con ese nombre';                          
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);

                        } else if (response.data === 'err') {
                            //CommonService.banner("Error en el servidor", "Err");
                            vm.resultMessageFail = 'Error en el server';
                            console.log("fallo en labase de datos");
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);
                        }
                    }
                });

            } else {
                vm.resultMessageFail = 'Los dos passwords deben ser iguales';
                $timeout(function () {
                    vm.resultMessageFail = '';
                }, 3000);

            }
        }
    }
})();