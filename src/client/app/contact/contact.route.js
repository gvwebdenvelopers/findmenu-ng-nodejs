(function() {
  'use strict';

  angular
    .module('app.contact')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'contact',
      config: {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        title: 'CONTACT',
        settings: {
          nav: 2,
          //content: '<i class="fa fa-envelope-open-o"></i> Contact'
        }
      }
    }];
  }
})();
