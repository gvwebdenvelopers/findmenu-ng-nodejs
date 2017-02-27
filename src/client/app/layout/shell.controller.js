(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout'];
  /* @ngInject */
  function ShellController($rootScope, $timeout) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;

    //mostramos barra de carga
    hideSplash();

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
