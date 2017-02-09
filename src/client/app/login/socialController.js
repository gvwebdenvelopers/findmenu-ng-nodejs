(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('socialController', SignupController);

    SignupController.$inject = ['dataservice', '$state', '$timeout', 'cookiesService', 'logger', 'headerService'];

    function SignupController(dataservice, $state, $timeout, cookiesService, logger, headerService) {
        var vm = this;

        social();

        function social() {

            dataservice.facebook().then(function (response) {
                console.log(response);
                logger.success('Usuario autentificado');
                cookiesService.SetCredentials(response.data);
                headerService.login();
                $state.go('home');
            });
        }
    }
})();