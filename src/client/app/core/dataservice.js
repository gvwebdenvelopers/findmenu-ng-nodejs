(function () {
    'use strict';

    angular
            .module('app.core')
            .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', '$window'];
    /* @ngInject */
    function dataservice($http, $q, exception, $window) {
        var service = {
            sendEmail: sendEmail,
            getMenus: getMenus,
            signup: signup,
            localSignin:localSignin ,
            facebook:facebook,
            //getMenu: getMenu,
            //getMenusMarkers: getMenusMarkers,
            getCurrentLocation: getCurrenLocation
        };

        return service;

        function sendEmail(data) {
            return $http.post('/api/sendmail', data)
                    .then(success)
                    .catch(fail);

            function success() {
                return true;
            }

            function fail() {
                return false;
            }
        }

        function getMenus() {
            return $http.get('/api/menus')
                    .then(success)
                    .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getMenus')(e);
            }
        }

        function signup(data) {
            return $http.post('/api/signup', data)
                    .then(success)
                    .catch(fail);
            //si devuelve promesa ejecuta success
            function success(response) {
                return response;
            }
            //si no ejecuta fail
            function fail() {
                return false;
            }
        }
        function localSignin(data) {
            return $http.post('/api/localSignin',data)
                    .then(success)
                    .catch(fail);

            function success(response) {

                return response;
            }

            function fail() {
                return false;
            }
        }

        function facebook() {
            return $http.get('/auth/success')
                    .then(success)
                    .catch(fail);

            function success(response) {
               
                return response;
            }

            function fail() {
        
                return false;
            }
        }
      /*Call /api/menu sending a menu id and get menu from DB
      function getMenu(data) {
          return $http.get('/api/menu', data)
            .then(success)
            .catch(fail);

          function success(response) {
            //console.log("getMenu success " + response.data);

            return response.data;
          }

          function fail(e) {
            console.log("getMenu fail");
            return exception.catcher('XHR Failed for getMenu')(e);
          }
      }*/
      /*Call /api/menuMarkers sending a menu id and get menu from DB*/
      /*
      function getMenusMarkers(data) {
          return $http.get('/api/menusMarkers', data)
            .then(success)
            .catch(fail);

          function success(response) {
            console.log("getMenuMarkers success " + response.data);
            var markers = [];
            console.log("markers" + response.data.length);
            for (var i=0; i<response.data.length; i++){
                console.log(response.data[i]);
                var newLongitude = response.data[i].longitud;
                var newLatitude = response.data[i].latitud;
                var newTitle = response.data[i].nombre;
                var newId = response.data[i].id;
                markers.push({
                  id: newId,
                  latitude: newLatitude,
                  longitude: newLongitude,
                  title: newTitle,
                  icon: "../../images/icon.png"
                });
                console.log("En getMarkers " + vm.markers[i]);
            }
            //console.log("En getMarkers " + vm.markers);
            return markers;
          }

          function fail(e) {
            console.log("getMenu fail");
            return exception.catcher('XHR Failed for getMenu')(e);
          }
      }*/

      function getCurrenLocation(){
          var deferred = $q.defer();
          if(!$window.navigator.geolocation){
            deferred.reject('Geolocation not supported');
          } else{
            $window.navigator.geolocation.getCurrentPosition(
                function(position){
                    deferred.resolve(position);
                },
                function(err){
                  deferred.reject(err);
                });
          }
          return deferred.promise;
      }
  }
})();
