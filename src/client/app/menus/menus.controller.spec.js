/* jshint -W117, -W030 */
describe('MenusController', function() {
    var controller;
    var menus = mockData.getMockMenus();
    var location = mockData.getMockLocation();

    var dsFake;
    var scope;

    beforeEach(function() {
        module('app.menus');
        bard.inject('$controller', '$rootScope',
            '$q', '$log', '$httpBackend');

        scope = $rootScope.$new();

        dsFake = {
            getMenus: function() {
                return $q.when(menus);
            },

            getCurrentLocation: function() {
                return $q.when(location);
            }
        };

        controller = $controller('MenusController', {
            dataservice: dsFake,
            $scope: scope
        });
        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});
    });

    describe('Menus controller', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        describe('After activate menus', function() {
            beforeEach(function() {
                bard.inject('$state');
                $state.current = {};
                $rootScope.$apply();
            });

            it('should have title of Menus', function() {
                expect(controller.title).to.equal('Menus');
            });

            it('We expect menus $state', function() {
                $rootScope.$apply();
                expect($state.is('menus'));
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });


        });
    });
});