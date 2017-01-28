(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('SignupController', HomeController);

    HomeController.$inject = ['dataservice', '$state', '$timeout', 'logger'];

    function HomeController(logger, dataservice, $state, $timeout) {
        var vm = this;
        vm.title = 'Signup';
        vm.inputUser = '';
        vm.inputEmail = '';
        vm.inputPass = '';
        vm.inputPass2 = '';
        vm.SubmitSignup = SubmitSignup;

        activate();

        function activate() {
            //logger.info('Activated Signup View');
        }

        function SubmitSignup() {
            
            console.log("entro");

            /*var data = {"user_email": vm.signup.inputEmail,
                "password": vm.signup.inputPass, "password2": vm.signup.inputPass2};
            var data = JSON.stringify(data);
            dataservice.singup(data).then(function (response) {
                if (response.success) {
                    $timeout(function () {
                        //$location.path('/');
                        //CommonService.banner("El usuario se ha dado de alta correctamente, revisa su correo para activarlo", "");
                    }, 2000);
                } else {
                    if (response.typeErr === "User") {
                        // $scope.err = true;
                        //$scope.error = response.message;
                        $timeout(function () {
                            // $scope.err = false;
                            // $scope.errorpass = "";
                        }, 3000);


                    } else if (response.typeErr === "error_server") {
                        //CommonService.banner("Error en el servidor", "Err");
                    }
                }

            });*/
        };

    }
})();