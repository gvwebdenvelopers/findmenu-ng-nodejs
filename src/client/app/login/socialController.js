(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('socialController', socialController);

    socialController.$inject = ['dataservice', '$state', 'cookiesService',
        'logger', 'headerService'
    ];

    function socialController(dataservice, $state, cookiesService, logger,
        headerService) {

        social();

        function social() {
            dataservice.socialLogin().then(function(response) {
                logger.success('Usuario autentificado');
                cookiesService.SetCredentials(response.data);
                headerService.login();
            });
        }
    }
})();