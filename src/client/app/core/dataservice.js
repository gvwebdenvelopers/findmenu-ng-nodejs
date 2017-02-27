(function() {
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
      localSignin: localSignin,
      socialLogin: socialLogin,
      getProfile: getProfile,
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
      function fail(e) {
        return exception.catcher('XHR Failed for signup')(e);
      }
    }

    function localSignin(data) {
      return $http.post('/api/localSignin', data)
        .then(success)
        .catch(fail);

      function success(response) {

        return response;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for localSignin')(e);
      }
    }

    function socialLogin() {
      return $http.get('/auth/success')
        .then(success)
        .catch(fail);

      function success(response) {

        return response;
      }

      function fail(e) {

        return exception.catcher('XHR Failed for socialSignin')(e);
      }
    }

    function getProfile(user) {
      return $http.post('/api/getprofile', user)
        .then(success)
        .catch(fail);

      function success(response) {

        return response;
      }

      function fail(e) {

        return exception.catcher('XHR Failed for get profile')(e);
      }
    }

    function getCurrenLocation() {
      var deferred = $q.defer();
      if (!$window.navigator.geolocation) {
        deferred.reject('Geolocation not supported');
      } else {
        $window.navigator.geolocation.getCurrentPosition(
          function(position) {
            deferred.resolve(position);
          },
          function(err) {
            deferred.reject(err);
          });
      }
      return deferred.promise;
    }
  }
})();
