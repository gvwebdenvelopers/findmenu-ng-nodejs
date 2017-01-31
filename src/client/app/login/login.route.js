(function() {
  'use strict';

  angular
    .module('app.login')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'signup',
      config: {
        url: '/signup',
        templateUrl: 'app/login/signup.view.html',
        controller: 'SignupController',
        controllerAs: 'vm',
        title: 'Signup'
        
      }
    }];
  }
  
})();

