/* jshint -W117, -W030 */
describe('home.controller', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.home');
        bard.inject('$controller', '$log', '$rootScope', '$httpBackend');

        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});

        controller = $controller('HomeController');
        $rootScope.$apply();
    });

    beforeEach(function() {

    });

    //bard.verifyNoOutstandingHttpRequests();
    describe('Home controller', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Home', function() {
                expect(controller.title).to.equal('Home');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});