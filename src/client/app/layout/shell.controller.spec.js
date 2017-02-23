/* jshint -W117, -W030 */
describe('shell.controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.layout');
    bard.inject('$controller', '$q', '$rootScope', '$timeout',
      'dataservice');
  });

  //Inicializa el contexto antes de cada test
  beforeEach(function() {
    controller = $controller('ShellController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();
  //describe los test que pertenecen a este banco de test
  describe('Shell controller', function() {

    //test para saber si está defindo el controlador
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    //test para saber si el efecto está ejecutandose
    it('should show splash screen', function() {
      expect($rootScope.showSplash).to.be.true;
    });

    //test para saber si al pasar 1000 ya no se esta ejecutando
    it('should hide splash screen after timeout', function(done) {
      $timeout(function() {
        expect($rootScope.showSplash).to.be.false;
        done();
      }, 1000);
      $timeout.flush();
    });
  });
});
