/* jshint -W117, -W030 */
describe('login.routes', function() {
  describe('state', function() {
    var signupView = 'app/login/signup.html';
    var profileView = 'app/login/profile.html';

    beforeEach(function() {
      module('app.login', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(signupView,profileView, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state signup to url /signup ', function() {
      expect($state.href('signup', {})).to.equal('/signup');
    });

    it('should map /signup route to signup View template', function() {
      expect($state.get('signup').templateUrl).to.equal(signupView);
    });

    it('of signup should work with $state.go', function() {
      $state.go('signup');
      $rootScope.$apply();
      expect($state.is('signup'));
    });
    
    it('should map state profile to url /profile ', function() {
      expect($state.href('profile', {})).to.equal('/profile');
    });

    it('should map /profile route to profile View template', function() {
      expect($state.get('profile').templateUrl).to.equal(profileView);
    });

    it('of profile should work with $state.go', function() {
      $state.go('profile');
      $rootScope.$apply();
      expect($state.is('profile'));
    });
    
  });
});


