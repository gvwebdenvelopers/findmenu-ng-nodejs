/* jshint -W117, -W030 */
describe('contact.controller', function() {
var controller;

beforeEach(function() {
  bard.appModule('app.contact');
  bard.inject('$controller', '$log', '$q', '$rootScope');
});

beforeEach(function() {
  controller = $controller('ContactController');
  $rootScope.$apply();
});

bard.verifyNoOutstandingHttpRequests();

describe('Contact controller', function() {
  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });
  it('should initially have a user with all fields empty', function() {
    expect(controller.inputName).to.equal('');
    expect(controller.inputEmail).to.equal('');
    expect(controller.inputSubject).to.equal('');
    expect(controller.inputMessage).to.equal('');
  });

  it('should initially functions are defined', function() {
    expect(controller.SubmitContact).to.be.defined;

  });

  /*describe('SubmitContact function', function() {

      it('should be send two emails successfully', function () {

          controller.inputName = 'jorge';
          controller.inputEmail = 'jordimart83@gmail.com';
          controller.inputSubject = 'mocktestemail';
          controller.inputMessage = 'mocktestemail';

      controller.SubmitContact();
      $scope.$apply();
      expect(controller.resultMessageOk).to.equal('Su email ha sido enviado correctamente');

  });*/

});

});
});
