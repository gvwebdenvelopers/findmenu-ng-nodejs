(function () {
    'use strict';

    angular
            .module('app.core')
            .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception'];
    /* @ngInject */
    function dataservice($http, $q, exception) {
        var service = {
            sendEmail: sendEmail,
            getMenus: getMenus,
            signup: signup,
            localSignin:localSignin ,
            facebook:facebook
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
            return $http.get('/auth/facebook')
                    .then(success)
                    .catch(fail);
           
            function success(response) {
                console.log(response);
                return response;
            }
           
            function fail() {
                return false;
            }
        }
    }
})();
