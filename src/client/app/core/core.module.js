(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus','ngMaterial', 'ngMessages','ngAria',
      'ui.bootstrap','ngCookies','cookiesService',
      'headerService'
    ]).config(config);

    function config($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    };
})();
