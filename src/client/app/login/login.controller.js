(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', '$state', '$timeout', '$uibModalInstance'];

    function LoginController(dataservice, $state, $timeout, $uibModalInstance) {
        var vm = this;
        vm.inputEmail = '';
        vm.inputPass = '';
        vm.SubmitLogin = SubmitLogin;
        vm.SubmitSignup = SubmitSignup;
        //vm.CloseModal = CloseModal;

        function CloseModal() {
            $uibModalInstance.dismiss('cancel');
        }

        function SubmitLogin() {
            console.log('entro al login');
            $uibModalInstance.dismiss('cancel');
        }

        function SubmitSignup() {
            console.log('entro al signup');
            $state.go('signup');
             $uibModalInstance.dismiss('cancel');

        }
    }
})();