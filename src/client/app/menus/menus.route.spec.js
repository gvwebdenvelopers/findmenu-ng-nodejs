/* jshint -W117, -W030 */
describe('menus routes', function() {
  describe('state menus', function() {
    var view = 'app/menus/menus.html';

    beforeEach(function() {
      module('app.menus', bard.fakeToastr);
      bard.inject('$httpBackend', '$rootScope', '$state', '$templateCache');
      $templateCache.put(view, '');
      /*para que no de error en translate */
      $httpBackend.whenGET("/i18n/core/en.json").respond({});
      $httpBackend.whenGET("/i18n/core/es.json").respond({});
      $httpBackend.whenGET("/i18n/core/gl.json").respond({});
      $httpBackend.whenGET("/i18n/core/ca.json").respond({});
    });

    beforeEach(function() {

    });

    //bard.verifyNoOutstandingHttpRequests();

    it('should map state menus to url /menus ', function() {
      expect($state.href('menus', {})).to.equal('/menus');
    });

    it('should map /menus route to menus View template', function() {
      expect($state.get('menus').templateUrl).to.equal(view);
    });

    it('of contact should work with $state.go', function() {
      $state.go('menus');
      $rootScope.$apply();
      expect($state.is('menus'));
    });
  });
});
