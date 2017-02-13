(function() {
  'use strict';

  angular
    .module('app.menus')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'menus',
        config: {
          url: '/menus',
          templateUrl: 'app/menus/menus.html',
          controller: 'MenusController',
          controllerAs: 'vm',
          title: 'Menus',
          settings: {
            nav: 3,
            content: 'Menus'
          }
        }
      }
    ];
  }
})();
