/* jshint -W117, -W030 */
describe('contact.routes', function() {
    describe('state', function() {
        var view = 'app/contact/contact.html';

        beforeEach(function() {
            module('app.contact', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope',
                '$state', '$templateCache');
            $templateCache.put(view, '');
            /*para que no de error en translate */
            $httpBackend.whenGET('/i18n/core/en.json').respond({});
            $httpBackend.whenGET('/i18n/core/es.json').respond({});
            $httpBackend.whenGET('/i18n/core/gl.json').respond({});
            $httpBackend.whenGET('/i18n/core/ca.json').respond({});
        });

        it('should map state contact to url /contact ', function() {
            expect($state.href('contact', {})).to.equal('/contact');
        });

        it('should map /contact route to contact View template', function() {
            expect($state.get('contact').templateUrl).to.equal(view);
        });

        it('of contact should work with $state.go', function() {
            $state.go('contact');
            $rootScope.$digest();
            expect($state.current.name).to.equal('contact');
        });
    });
});