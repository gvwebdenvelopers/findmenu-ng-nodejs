(function() {
  'use strict';

  angular
    .module('app.menus')
    .controller('MenusController', MenusController);

  MenusController.$inject = ['$q', '$location', 'dataservice', 'logger', '$uibModal', '$scope'];
  /* @ngInject */
  function MenusController($q, $location, dataservice, logger, $uibModal, $scope) {
    var vm = this;
    vm.title = 'Menus';
    /* Funcitions public */
    vm.showModalDetails = showModalDetails;
    vm.menus = [];
    $scope.menuDetail = [];
    vm.selectedMenu = "";
    /* Maps variables */
    //Map centered on spain
    vm.map = { center: { latitude: 38.810543, longitude: -0.604137 }, zoom: 14 };
    vm.icon = {
        url: "../../images/findmenuGreen.png",
        scaledSize: new google.maps.Size(50, 50),
    }
    vm.markers = [

    ];
    vm.markersOptions = { animation: window.google.maps.Animation.BOUNCE };


    /*para mostar menus en un radio 1 punto latitud = 111km  */
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
        getMarkers( vm.menus );
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

    function getMarkers( menusData ){
      console.log(vm.markers);
      for (var i=0; i<menusData.length; i++){
          vm.markers.push({
            id: menusData[i].id,
            latitude: menusData[i].latitud,
            longitude: menusData[i].longitud,
            title: menusData[i].nombre,
            icon: vm.icon

          });
          console.log("En getMarkers " + vm.markers[i]);
      }
      $scope.testMarkers = vm.markers;
      return vm.markers;
    }

    function showModalDetails( idMenu ) {
        $scope.menuDetail = vm.menus[idMenu];
        console.log("En showModalDetails" + $scope.menuDetail.nombre);
        var modalInstance = $uibModal.open({
            animation: 'true',
            scope: $scope,
            size: 'lg',
            templateUrl: 'app/menus/menu-details.html',

        });
    }

    function viewOnMap(){
      console.log("View on map");
      $ubiModalInstance.dismiss("cancel");
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
