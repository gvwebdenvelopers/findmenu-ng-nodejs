(function() {
  'use strict';

  angular
    .module('app.menus')
    .controller('MenusController', MenusController);

  MenusController.$inject = ['$q', 'dataservice', 'logger', '$uibModal'];
  /* @ngInject */
  function MenusController($q, dataservice, logger, $uibModal) {
    var vm = this;
    vm.title = 'Menus';
    vm.showModalDetails = showModalDetails;
    //Map centered on spain
    vm.map = { center: { latitude: 38.810543, longitude: -0.604137 }, zoom: 10 };

    vm.menus = [];
    vm.menu_detail = [];
    //modal variables
    vm.viewOnMap = viewOnMap();

    vm.showing = false;
    vm.template = "app/menus/menus.view.html"
    vm.animationsEnabled = true;

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

    function getMenu(id_menu){
      return dataservice.getMenu(id_menu).then(function(data) {
        vm.menu = data;
        return vm.menu;
      });
    }

    function showModalDetails() {
        console.log("En showModalDetails");
        var modalInstance = $uibModal.open({
            animation: 'true',
            templateUrl: 'app/menus/menu-details.html',
            controller: 'MenusController',
            controllerAs: 'vm',
            size: "lg"
        });
    }

    function viewOnMap(){
      console.log("View on map");
      //$ubiModalInstance.dismiss("cancel");
    }
  }
})();
