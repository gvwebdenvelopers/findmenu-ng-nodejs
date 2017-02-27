(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', 'dataservice', 'cookiesService'];

  function ProfileController(logger, dataservice, cookiesService) {
    var vm = this;
    vm.title = 'Home';
    vm.name = 'jorge';
    vm.lastname = 'martinez';
    vm.birthday = new Date(1983, 5, 26);
    vm.email = 'jordimart83@gmail.com';
    vm.country = 'España';
    vm.province = 'Valencia';
    vm.city = 'Ontinyent';

    activate();

    function activate() {
      logger.info('Activated Profile View');
      getProfile();
    }

    function getProfile() {

      var user = cookiesService.GetCredentials();
      dataservice.getProfile(user).then(function(response) {

        console.log(response);
        vm.name = response.data.name;
        vm.lastname = response.data.lastname;
        vm.birthday = response.data.birthdate;
        vm.email = response.data.email;
        vm.country = response.data.country;
        vm.province = response.data.province;
        vm.city = response.data.city;
      });
    }
  }
})();
