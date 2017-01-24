(function() {
  'use strict';

  angular
    .module('app.menus')
    .controller('MenusController', MenusController);

  MenusController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function MenusController($q, dataservice, logger) {
    var vm = this;
    vm.title = 'Menus';
    vm.messageCount = 0;
    vm.menus = [];

    activate();

    function activate() {
      var promises = [getMenus()];
      return $q.all(promises).then(function() {
        logger.info('Activated Menus View');
      });
    }

    function getMenus(){
      return dataservice.getMenus().then(function(data) {
        vm.menus = data;
        return vm.menus;
      });
    }
  }
})();
