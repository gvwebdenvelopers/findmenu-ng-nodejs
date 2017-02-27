/* jshint -W117, -W030 */
describe('login.controller', function() {

    var controller;
    var modalInstance;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$q', '$rootScope', '$state', '$httpBackend');

        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});

        //función que simula la respuesta al servidor
        dsFake.localSignin = function(data) {
            var response = { data: 'errorcredentials' };
            return $q.when(response);

        };

        modalInstance = { close: function() {}, dismiss: function() {} };

        //inyectamos en el controlador la función falsa
        controller = $controller('LoginController', {
            dataservice: dsFake,
            $uibModalInstance: modalInstance,
        });

    });


    describe('Login controller', function() {

        //defino que existe el controlador
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        //defino que las variables están inicializadas a ''
        it('should initially have a user with all fields empty', function() {
            expect(controller.inputUser).to.equal('');
            expect(controller.inputPass).to.equal('');
        });

        //defino que existen las funciones
        it('should initially functions be defined', function() {
            expect(controller.SubmitLogin).to.be.defined;
            expect(controller.RedirectSignup).to.be.defined;
        });

        //test de la función SubmitLogin
        /* describe('SubmitLogin function', function() {

             //test de error de credenciales al loguearse
             it('should be login not successfully error credentials', function() {

                 controller.SubmitLogin();
                 $rootScope.$apply();
                 expect($log.error.logs).to.match(/credenciales/);

             });

             //test de error de server
             it('should be login not successfully error server', function() {

                 //función que simula la respuesta al servidor
                 dsFake.localSignin = function(datas) {
                     var response = { data: 'error' };
                     return $q.when(response);

                 };

                 controller = $controller('LoginController', {
                     dataservice: dsFake,
                     $uibModalInstance: modalInstance
                 });

                 controller.SubmitLogin();
                 $rootScope.$apply();
                 expect($log.error.logs).to.match(/server/);

             });

             //test de usuario autentificado con éxito
             it('should be login successfully', function() {

                 //función que simula la respuesta al servidor
                 dsFake.localSignin = function(datas) {
                     var response = { data: { user: 'user' } };
                     return $q.when(response);
                 };

                 //fake para servicio externo cookies
                 cSFake = {
                     SetCredentials: function() {

                     }
                 };

                 //fake para servicio externo headerService
                 hSFake = {
                     login: function() {

                     }
                 };

                 controller = $controller('LoginController', {
                     dataservice: dsFake,
                     $uibModalInstance: modalInstance,
                     cookiesService: cSFake,
                     headerService: hSFake
                 });

                 controller.inputUser = 'user';
                 controller.SubmitLogin();
                 $rootScope.$apply();
                 expect($log.info.logs).to.match(/Usuario/);

             });
         });

         //test de la función RedirectSignup
          describe('RedirectSignup function', function() {

              //test de redirección a signup
              it('of current view should work with $state.go signup', function() {

                  controller.RedirectSignup();
                  $rootScope.$digest();
                  expect($state.current.name).to.equal('signup');

              });

          });*/

    });

});