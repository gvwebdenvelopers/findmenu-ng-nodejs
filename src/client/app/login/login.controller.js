(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', '$state', '$uibModalInstance', 'cookiesService', 'logger','headerService','$window'];

    function LoginController(dataservice, $state, $uibModalInstance, cookiesService, logger,headerService,$window) {
        var vm = this;
        vm.inputUser = '';
        vm.inputPass = '';
        vm.SubmitLogin = SubmitLogin;
        vm.SubmitSignup = SubmitSignup;
        vm.SigninFacebook=SigninFacebook;
        vm.SigninTwitter=SigninTwitter;
        vm.SigninGoogle=SigninGoogle;
        var facebookPopup;

    vm.callFacebookOauth = function() {
       var url = '/auth/facebook',
                width = 1000,
                height = 650,
                top = (window.outerHeight - height) / 2,
                left = (window.outerWidth - width) / 2;
            $window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
        
    };


        function CloseModal() {
            $uibModalInstance.dismiss('cancel');
        }

        function SubmitLogin() {
            console.log('entro al login');
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
            $state.go('signup');
            $uibModalInstance.dismiss('cancel');

        }
        
        function SigninFacebook(){
            
            //dataservice.facebook().then(function (response) {
                
           // });
           
        }
        function SigninTwitter(){
           
        }
        function SigninGoogle(){
            
        }
    }
})();