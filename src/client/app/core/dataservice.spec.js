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
  describe('When call POST /api/signup:userSingData, it returns 2xx and the user do not previously exits:', function () {
    var userSingData;

    beforeEach(function() {
      userSingData = mockData.getMockUserData();
      $httpBackend.when('POST', '/api/signup', userSingData)
                    .respond(200, true);
    });

    it('-> Should return true', function () {
      dataservice.signup(userSingData)
        .then(function(response) {
          expect(response.data).to.equal(true);
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/signup:userSingData, it returns 2xx and the user name allready exits:', function () {
    var userSignData;

    beforeEach(function() {
      userSignData = mockData.getMockUserData();
      $httpBackend.when('POST', '/api/signup', userSignData)
                    .respond(200,  'name');
    });

    it('-> Should return the user name', function () {
      dataservice.signup(userSignData)
        .then(function(response) {
          expect(response.data).to.equal('name');
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/signup:userSingData and server fails', function () {
    var userSignData;

    beforeEach(function() {
      userSignData = mockData.getMockUserData();
      $httpBackend.when('POST', '/api/signup', userSignData)
                    .respond(500,  {description:'ERROR 500 - Service Unavailable'});
    });

    it('-> Should return false', function () {
      dataservice.signup(userSignData)
        .then(function(response) {
          expect(response.data).to.equal(false);
        });
      $httpFlush();
    });
  });
  /*Testing  localSignin(data)*/
  describe('When call POST /api/localSignin:userCredentials, user credentials are OK and it returns 2xx:', function () {
    var userCredentials;
    var userData;

    beforeEach(function() {
      userCredentials = mockData.getMockUserCredentials();
      userData = mockData.getMockUserData();
      $httpBackend.when('POST', '/api/localSignin', userCredentials)
                    .respond(200, userData);
    });

    it('-> Should return the user info', function () {
      dataservice.localSignin(userCredentials)
        .then(function(response) {
          expect(response.data.user).to.equal(userCredentials.user);
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/localSignin:userCredentials, it returns 2xx and user credentials are NOT OK', function () {
    var userCredentials;

    beforeEach(function() {
      userCredentials = {
        user: '',
        password: ''
      };
      $httpBackend.when('POST', '/api/localSignin', userCredentials)
                    .respond(200, 'errorcredentials');
    });

    it('-> Should return an error', function () {
      dataservice.localSignin()
        .then(function(response) {
          expect(response.data).to.equal('errorcredentials');
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/localSignin:userCredentials and server fails', function () {
    var userCredentials;

    beforeEach(function() {
      userCredentials =  mockData.getMockUserCredentials();
      $httpBackend.when('POST', '/api/localSignin', userCredentials)
                    .respond(500, {description:'ERROR 500 - Service Unavailable'});
    });

    it('-> Should return data false', function () {
      dataservice.localSignin(userCredentials)
        .then(function(response) {
          expect(response.data).to.equal(false);
        });
      $httpFlush();
    });
  });

  describe('When call GET /auth/success and it returns 2xx:', function () {
    var userSignData;

    beforeEach(function() {
      userSignData = mockData.getMockUserData();
      $httpBackend.when('GET', '/auth/success')
                  .respond(200,  userSignData);
    });

    it('-> User should contain the field user like "user"', function () {
      dataservice.socialLogin()
        .then(function(response) {
          expect(response.data.user).to.equal('user');
        });
      $httpFlush();
    });

    it('-> User should contain the field email like "user@email.com"', function () {
      dataservice.socialLogin()
        .then(function(response) {
          expect(response.data.email).to.equal('user@email.com');
        });
      $httpFlush();
    });

    it('-> User should contain the field avatar like "avatar.jpg"', function () {
      dataservice.socialLogin()
        .then(function(response) {
          expect(response.data.avatar).to.equal('avatar.jpg');
        });
      $httpFlush();
    });
  });

  describe('When call GET /auth/success and it returns petition fails', function () {
    beforeEach(function() {
      userSignData = mockData.getMockUserData();
      $httpBackend.when('GET', '/auth/success')
                  .respond(500,  {description:'ERROR 500 - Service Unavailable'});
    });

    it('-> Should return data false', function () {
      dataservice.socialLogin()
        .then(function(response) {
          expect(response.data).to.equal(false);
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/getprofile:userName and it returns 2xx:', function () {
    var userName;
    var userData;

    beforeEach(function() {
      userData = mockData.getMockUserData();
      userName = userData.user;
      $httpBackend.when('POST', '/api/getprofile', userName)
                  .respond(200,  userData);
    });

    it('-> User field must be the same as the input user name ', function () {
      dataservice.getProfile(userName)
        .then(function(response) {
          expect(response.data.user).to.equal(userName);
        });
      $httpFlush();
    });

    it('-> User should contain the field user like "user"', function () {
      dataservice.getProfile(userName)
        .then(function(response) {
          expect(response.data.user).to.equal('user');
        });
      $httpFlush();
    });
  });

  describe('When call POST /api/getprofile:userName and it fails:', function () {
    var userName;

    beforeEach(function() {
      userName = 'user';
      $httpBackend.when('POST', '/api/getprofile', userName)
                  .respond(500,  {description:'ERROR 500 - Service Unavailable'});
    });

    it('-> Should return data false', function () {
      dataservice.getProfile(userName)
        .then(function(response) {
          expect(response.data).to.equal(false);
        });
      $httpFlush();
    });
  });
});
