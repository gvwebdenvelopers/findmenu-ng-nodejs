/* jshint -W117, -W030 */
describe('shell.controller', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.layout');
        bard.inject('$controller', '$q', '$rootScope', '$timeout',
            'dataservice', '$httpBackend');
        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});

        controller = $controller('ShellController');
        $rootScope.$apply();

    });

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