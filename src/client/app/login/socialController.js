(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('socialController', socialController);

    socialController.$inject = ['dataservice', '$state', 'cookiesService', 'logger', 'headerService'];

    function socialController(dataservice, $state, cookiesService, logger, headerService) {
        var vm = this;

        social();

        function social() {

            dataservice.socialLogin().then(function (response) {
                console.log(response);
                logger.success('Usuario autentificado');
                cookiesService.SetCredentials(response.data);
                headerService.login();
                $state.go('home');
            });
        }
    }
})();