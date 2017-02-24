/* jshint -W117, -W030 */
describe('Dataservice (CORE)', function () {

  var $httpFlush;

  beforeEach(function () {
    module('app.core', bard.fakeToastr);
    bard.inject(this, '$httpBackend', '$rootScope', 'dataservice');
    $httpFlush = $httpBackend.flush;
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be registered', function() {
    expect(dataservice).not.to.equal(null);
  });
  /*Testing sendEmail(mailData)*/
  describe('When call POST /api/sendmail:data and it returns 2xx:', function () {
    var mailData;
    beforeEach(function() {
      mailData = mockData.getMockMailData();
      $httpBackend.when('POST', '/api/sendmail', mailData)
                    .respond(200);
    });

    it('-> Should return true', function () {
      dataservice.sendEmail(mailData)
        .then(function(data) {
          expect(data).to.equal(true);
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/sendmail:data and server fails', function () {
    var mailData;
    beforeEach(function() {
      mailData = mockData.getMockMailData();
      $httpBackend.when('POST', '/api/sendmail', mailData)
                    .respond(500, {description:'ERROR 500 - Service Unavailable'});
    });

    it('-> Should return false', function () {
      dataservice.sendEmail(mailData)
        .then(function(data) {
          expect(data).to.equal(false);
        });
      $httpFlush();
    });
  });
  /*Testing getMenus()*/
  describe('When call GET /api/menus and it returns 2xx:', function () {
    var menus;
    beforeEach(function() {
      menus = mockData.getMockMenus();
      $httpBackend.when('GET', '/api/menus')
                    .respond(200, menus);
    });

    it('-> Should return menus', function () {
      dataservice.getMenus()
        .then(function(data) {
          expect(data.length).to.equal(menus.length);
        });
      $httpFlush();
    });

    it('-> A menu should contain nombre like Elbar2', function () {
      dataservice.getMenus()
        .then(function(data) {
          var hasElbar2 = data.some(function (c) {
            return c.nombre === 'Elbar2';
          });
          expect(hasElbar2).to.be.true;
        });
      $httpFlush();
    });

    it('-> A menu contain precio_menu like 10', function () {
      dataservice.getMenus()
        .then(function(data) {
          var hasPrice = data.some(function (c) {
            return c.precio_menu === 10;
          });
          expect(hasPrice).to.be.true;
        });
      $httpFlush();
    });
  });

  describe('When call GET /api/menus and server fails', function () {
    beforeEach(function() {
      $httpBackend.when('GET', '/api/menus')
                    .respond(500, {description:'ERROR 500 - Service Unavailable'});
    });

    it('getMenus() reports error 500 if server fails', function () {
      dataservice.getMenus()
        .catch(function(error) {
          expect(error).to.exist;
        });
      $httpFlush();
    });
  });
  /*Testing  signup(data)*/
  describe('When call POST /api/signup:userCredentials and it returns 2xx:', function () {
    var userCredentials;
    var userData;

    beforeEach(function() {
      userCredentials = mockData.getMockUserCredentials();
      userData = mockData.getMockUserData();
      $httpBackend.when('POST', '/api/signup', userCredentials)
                    .respond(200, userData);
    });

    it('-> Should return the user info', function () {
      dataservice.signup(userCredentials)
        .then(function(response) {
          expect(response.data.user).to.equal(userCredentials.user);
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/signup:userCredentials, it returns 2xx and user credentials are NOT OK', function () {
    var userCredentials;

    beforeEach(function() {
      userCredentials = {
        user: '',
        password: ''
      };
      $httpBackend.when('POST', '/api/signup', userCredentials)
                    .respond(200, 'errorcredentials');
    });

    it('-> Should return an error', function () {
      dataservice.signup(userCredentials)
        .then(function(response) {
          expect(response.data).to.equal('errorcredentials');
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/signup:userCredentials and server fails', function () {
    var userCredentials;

    beforeEach(function() {
      userCredentials =  mockData.getMockUserCredentials();
      $httpBackend.when('POST', '/api/signup', userCredentials)
                    .respond(500, {description:'ERROR 500 - Service Unavailable'});
    });

    it('-> Should return data false', function () {
      dataservice.signup(userCredentials)
        .then(function(data) {
          expect(data).to.equal(false);
        });
      $httpFlush();
    });
  });
});
