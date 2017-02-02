(function() {
  'use strict';

  angular
    .module('app.menus')
    .controller('MenusDetailsCtrl', MenusDetailsCtrl);

  MenusDetailsCtrl.$inject = ['$q', 'dataservice', '$uibModal', 'param'];
  /* @ngInject */
  function MenusDetailsCtrl( $q, dataservice, $uibModal , param) {
    var vm = this;
    vm.menuId = param;
    console.log("En MenusDetailsCtrl " + vm.menuId);
    vm.title = 'Menu';
    //Map centered on spain
    //vm.map = { center: { latitude: 38.810543, longitude: -0.604137 }, zoom: 10 };
    /*
    vm.menu_detail = [];
    //modal variables
    vm.viewOnMap = viewOnMap();

    //vm.showing = false;
    vm.animationsEnabled = true;

    activate();

    function activate() {
      console.log("En acivate" + vm.menuId);
      var promises = [getMenu( menuId )];
      return $q.all(promises).then(function() {
        logger.info('Activated Menu detail Modal');
      });
    }

    function getMenu(idMenu){
      return dataservice.getMenu(idMenu).then(function(data) {
        console.log( "Data" + data );
        vm.menuDetail = data;
        return vm.menuDetail;
      });
    }

    function viewOnMap(){
      console.log("View on map");
      //$ubiModalInstance.dismiss("cancel");
    }*/
  }
})();
