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
      /* Menus funcionality */
      /*
      vm.filteredMenus = [];
      vm.pagination = {
          menusPerPage: 4,
          maxSize: 5,
          currentPage: 1,
          totalItems: 5,
      };
      $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
      };
      $scope.$watch('currentPage + numPerPage', update);
      */

      $scope.$watch('searchRadius + menuPrice', advancedSearch);

      vm.radiusDistance = ('1 2 5 20 50 100').split(' ').map(function (distance) { return { km: distance }; });
      /* Funcitions modal */
      vm.modalInstance = "";
      vm.showModalDetails = showModalDetails;
      vm.menus = [];//Todos los menús cargados de DB
      vm.searchedMenus =[];//Menús que pasan los criterios de búsqueda
      $scope.menuDetail = [];
      $scope.viewOnMap = viewOnMap;
      vm.selectedMenu = "";
      /* Maps variables */

      //Map centered on IES l'estació
      vm.map = {
        center: {
          latitude: 38.810543,
          longitude: -0.604137
        },
        zoom: 14,
        windows: {
            model: {},
            show: false,
            options:{
              pixelOffset: {width:-1,height:-20}
            }
        },
        markersEvents: {
            click: function(marker, eventName, model, args) {
              vm.map.windows.model = model;
              vm.map.windows.show = true;
              vm.infoWindow = getMenu( model.id );
            },
        }
      };
      vm.icon = {
        url: "../../images/findmenuGreen.png",
        scaledSize: new google.maps.Size(50, 50),
      }
      vm.markers = [];
      vm.markersOptions = { animation: window.google.maps.Animation.BOUNCE };

      activate();

      function activate() {
          var promises = [getMenus(), getCurrentLocation()];
          return $q.all(promises).then(function() {
                //logger.info('Activated Menus View');
            });
      }

      /* menus functions */
      /* Obtiene los menus a través del servicio dataservice.getMenus()
      copia los menús en la variable utilizada para visualización vm.searchedMenus
      */
      function getMenus(){
          return dataservice.getMenus().then(function(data) {
            vm.menus = data;
            vm.searchedMenus = vm.menus;
            //update();
            //console.log("Total menus: " + vm.pagination.totalItems);
            getMarkers( vm.menus );
            return vm.menus;
          });
      }

      function getMenu(idMenu){
          for( var i=0; i< vm.menus.length; i++){
            if( vm.menus[i].id == idMenu ){
              return vm.menus[i];
            }
          }
          return "Menu not found";
      }

      /* Muestra el menú seleccionado en un modal que utiliza la variable $scope.menuDetail */
      function showModalDetails( idMenu ) {
          $scope.menuDetail = getMenu(idMenu);
          //console.log("En showModalDetails" + $scope.menuDetail.nombre);
          vm.modalInstance = $uibModal.open({
              animation: 'true',
              scope: $scope,
              size: 'lg',
              templateUrl: 'app/menus/menu-details.html',
          });
      }

      /* maps functions */
      function getCurrentLocation(){
          return dataservice.getCurrentLocation().then( function( data ){
            //console.log(JSON.stringify(data));
            vm.map.center.latitude= data.coords.latitude;
            vm.map.center.longitude= data.coords.longitude;
            return vm.map;
          });
      };
      /* Centra el mapa en el menú que se esta visualizando en details modal */
      function viewOnMap(){
          vm.map = {
              id: $scope.menuDetail.id,
              center:{
                latitude: $scope.menuDetail.latitud,
                longitude: $scope.menuDetail.longitud
              },
              zoom: 18
          };
          //console.log(JSON.stringify(vm.map) );
          vm.modalInstance.dismiss("cancel");
          return vm.map;
      }

      function getMarkers( menusData ){
          //console.log(vm.markers);
          for (var i=0; i<menusData.length; i++){
              vm.markers.push({
                id: menusData[i].id,
                latitude: menusData[i].latitud,
                longitude: menusData[i].longitud,
                title: menusData[i].nombre,
                icon: vm.icon
              });
          }
          return vm.markers;
      }

      /*function update() {
          //var begin = ((vm.pagination.currentPage - 1) * vm.pagination.menusPerPage);
          //var end = begin + (vm.pagination.menusPerPage-1);
          vm.pagination.totalItems = vm.searchedMenus.length;
          //console.log("Total Items " + vm.pagination.totalItems + " END " + end + " BEGIN " + begin );
          vm.filteredMenus = vm.searchedMenus.slice(0, vm.pagination.totalItems);
          console.log("EN UPDATE " + JSON.stringify(vm.filteredMenus))
          return vm.filteredMenus;
      };*/

      function advancedSearch(){
          /*para mostar menus en un radio
          1 punto latitud = 111km
          0,1 punto latitud = 11,1km
          0,01  punto latitud = 1,11km*/
          vm.searchedMenus=[];
          if( $scope.searchRadius){
            console.log("En busqueda avanzada / searchRadius :" + $scope.searchRadius);
            
          }
          else if( $scope.menuPrice ){
            console.log("En busqueda avanzada / menuPrice :" + $scope.searchRadius);
            for( var i=0; i< vm.menus.length; i++){
              if( vm.menus[i].precio_menu <= $scope.menuPrice ){
                vm.searchedMenus.push(vm.menus[i]);
                console.log("advancedSearch " + JSON.stringify(vm.menus[i]));
              }
            }
          }
          else if( $scope.searchRadius && $scope.menuPrice){
            console.log("En busqueda avanzada / searchRadius && menuPrice:" + $scope.searchRadius);
          }else{
            console.log("En busqueda avanzada / else :" + $scope.searchRadius);
            vm.searchedMenus=vm.menus;
          }
          //update();
      }
  }
})();
