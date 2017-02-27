/* jshint -W117, -W030 */
describe('social.controller', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$q', '$rootScope', '$httpBackend');

        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});

        dsFake = {
            socialLogin: function(data) {
                return $q.when(true);
            }
        };

        cSFake = {
            SetCredentials: function() {

            }
        };

        hSFake = {
            login: function() {

            }
        };

        controller = $controller('socialController', {
            dataservice: dsFake,
            cookiesService: cSFake,
            headerService: hSFake
        });

    });

    describe('Social controller', function() {

        //defino que existe el controlador
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        //defino que existe la función social
        it('should initially functions are defined', function() {
            expect(controller.social).to.be.defined;

        });

        //test de la función social
        describe('social function', function() {

            //test si la función es exitosa
            it('should be social login successfully', function() {
                controller.social;
                $rootScope.$apply();
                expect($log.info.logs).to.match(/Usuario/);

            });
        });

    });
});