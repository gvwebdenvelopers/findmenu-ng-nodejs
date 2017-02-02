(function() {
  'use strict';

  angular
    .module('app.menus')
    .controller('MenusController', MenusController);

  MenusController.$inject = ['$q', '$location', 'dataservice', 'logger', '$uibModal'];
  /* @ngInject */
  function MenusController($q, $location, dataservice, logger, $uibModal) {
    var vm = this;
    vm.title = 'Menus';
    vm.showModalDetails = showModalDetails;
    //Map centered on spain
    vm.map = { center: { latitude: 38.810543, longitude: -0.604137 }, zoom: 10 };

    vm.menus = [];
    vm.menuDetail = [];
    //modal variables

    vm.showing = false;
    vm.template = 'app/menus/menus.view.html';
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

    function getMenu(idMenu){
      console.log( 'En get menu: ' + idMenu );

      /*return dataservice.getMenu(idMenu).then(function(data) {
        console.log( 'Data ' + data );
        vm.menuDetail = data;
        return vm.menuDetail;
      });*/
      for( var i=0; i< vm.menus.length; i++){
        if( vm.menus[i].id == idMenu ){
          console.log(vm.menus[i]);
          return vm.menus[i];
        }
      }
      return "Menu not found";
    }

    function showModalDetails( menuId ) {
        var modalInstance = $uibModal.open({
            animation: 'true',
            controller: 'MenusDetailsCtrl',
            controllerAs: 'vm',
            scope: vm,
            size: 'lg',
            templateUrl: 'app/menus/menu-details.html',
            resolve: {
              param: function(){
                return getMenu( menuId );
              }
            }
        });
    }

    /*
    function getCurrentLocation(){
      return dataservice.getCurrentLocation().then( function( data ){
        vm.currentMarker = {
            id:0,
            coords:{
              latitude= data.coords.latitude,
              longitude = data.coords.longitude            }
            }
        };
         data;
        return vm.currentMarker;
      });
    };
    */
  }
})();
