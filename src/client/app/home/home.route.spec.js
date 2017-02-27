/* jshint -W117, -W030 */
describe('home.routes', function() {
    describe('state', function() {
        var view = 'app/home/home.html';

        beforeEach(function() {
            module('app.home', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope',
                '$state', '$templateCache');
            $templateCache.put(view, '');
            /*para que no de error en translate */
            $httpBackend.whenGET('/i18n/core/en.json').respond({});
            $httpBackend.whenGET('/i18n/core/es.json').respond({});
            $httpBackend.whenGET('/i18n/core/gl.json').respond({});
            $httpBackend.whenGET('/i18n/core/ca.json').respond({});
        });

        //bard.verifyNoOutstandingHttpRequests();

        it('should map state home to url / ', function() {
            expect($state.href('home', {})).to.equal('/');
        });

        it('should map /home route to home View template', function() {
            expect($state.get('home').templateUrl).to.equal(view);
        });

        it('of home should work with $state.go', function() {
            $state.go('home');
            $rootScope.$digest();
            expect($state.current.name).to.equal('home');
        });
    });
});