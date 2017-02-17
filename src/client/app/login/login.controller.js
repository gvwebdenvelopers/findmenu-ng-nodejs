(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$translatePartialLoader','dataservice', '$state', '$uibModalInstance',
                              'cookiesService', 'logger', 'headerService'];

    function LoginController( $translatePartialLoader, dataservice, $state, $uibModalInstance,
                              cookiesService, logger, headerService) {
        var vm = this;
        $translatePartialLoader.addPart('layout');
        vm.inputUser = '';
        vm.inputPass = '';
        vm.SubmitLogin = SubmitLogin;
        vm.SubmitSignup = SubmitSignup;

        function CloseModal() {
            $uibModalInstance.dismiss('cancel');
        }

        function SubmitLogin() {
            var data = {
                'user': vm.inputUser,
                'password': vm.inputPass
            };

            var dataUserJSON = JSON.stringify(data);
            dataservice.localSignin(dataUserJSON).then(function (response) {
                if (response.data.user === vm.inputUser) {
                    logger.success('Usuario autentificado');
                    cookiesService.SetCredentials(response.data);
                    $uibModalInstance.dismiss('cancel');
                    CloseModal();
                    headerService.login();
                    $state.go('home');
                } else if (response.data === 'errorcredentials') {
                    logger.error('Error en las credenciales, el usuario o la contraseña no son correctos');
                } else {
                    logger.error('Error en el server');
                }

            });
        }

        function SubmitSignup() {
            CloseModal();
            $state.go('signup');
        }

    }
})();
