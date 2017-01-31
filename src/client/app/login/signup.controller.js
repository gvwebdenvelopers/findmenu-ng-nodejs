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

            if (vm.inputPass == vm.inputPass2) {
                //console.log("entro");
                var data = {
                    "user": vm.inputUser,
                    "user_email": vm.inputEmail,
                    "password": vm.inputPass,
                    "usertype": "client"
                };
               // console.log(data);
                var data_user_JSON = JSON.stringify(data);
                dataservice.signup(data_user_JSON).then(function (response) {

                    console.log(response);
                    if (response.success) {
                        $timeout(function () {
                            $state.go('home');
                            //CommonService.banner("El usuario se ha dado de alta correctamente, revisa su correo para activarlo", "");
                            
                            vm.resultMessageFail = 'Usuario introducido';
                        }, 2000);
                    } else {
                        console.log(response);
                        if (response.typeErr === "Name") {
                            vm.resultMessageFail = 'Ya existe un usuario con ese nombre';
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);
                        


                        } else if (response.typeErr === "error_server") {
                            //CommonService.banner("Error en el servidor", "Err");
                            vm.resultMessageFail = 'Error en el server';
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