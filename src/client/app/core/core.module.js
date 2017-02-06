(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus','ngMaterial', 'ngMessages','ngAria',
      'ui.bootstrap','ngCookies','blocks.localstorageService','blocks.cookiesService'
    ]);
})();
