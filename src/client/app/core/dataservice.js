(function () {
    'use strict';

    angular
            .module('app.core')
            .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            sendEmail: sendEmail,
            getMenus: getMenus,
            signup: signup
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

            function success() {
                return true;
            }

            function fail() {
                return false;
            }
        }
    }
})();
