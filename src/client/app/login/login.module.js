
(function() {
  'use strict';

  angular.module('app.login', [
    'app.core',
    'app.widgets',
    'cookiesService',
    'headerService'
  ]).config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD/MM/YYYY');
    };
});
})();