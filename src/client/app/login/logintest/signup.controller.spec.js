/* jshint -W117, -W030 */
describe('signup.controller', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.login');
        bard.inject('$controller', '$log', '$q', '$rootScope', '$httpBackend');

        /*para que no de error en translate */
        $httpBackend.whenGET('/i18n/core/en.json').respond({});
        $httpBackend.whenGET('/i18n/core/es.json').respond({});
        $httpBackend.whenGET('/i18n/core/gl.json').respond({});
        $httpBackend.whenGET('/i18n/core/ca.json').respond({});

        //función que simula la respuesta al servidor
        dsFake.signup = function(data) {
            var response = { data: true };
            return $q.when(response);

        };

        //inyectamos en el controlador la función falsa
        controller = $controller('SignupController', {
            dataservice: dsFake
        });

    });

    describe('Signup controller', function() {

        //defino que existe el controlador
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        //defino que las variables están inicializadas a ''
        it('should initially have a user with all fields empty', function() {
            expect(controller.inputUser).to.equal('');
            expect(controller.inputEmail).to.equal('');
            expect(controller.inputPass).to.equal('');
            expect(controller.inputPass2).to.equal('');
        });

        //defino que existe la función SubmitSignup
        it('should initially functions are defined', function() {
            expect(controller.SubmitSignup).to.be.defined;

        });

        //test de la función SubmitSignup
        describe('SubmitSignup function', function() {

            //test si el password es igual y se ha introducido al usuario
            it('should be signup successfully ', function() {

                controller.SubmitSignup();
                $rootScope.$apply();
                expect($log.info.logs).to.match(/Usuario/);

            });

            //test si ha habido un error por credenciales existe un usuario igual
            it('should be signup not successfully, error credentials ', function() {

                //función que simula la respuesta al servidor
                dsFake.signup = function(datas) {
                    var response = { data: 'name' };
                    return $q.when(response);

                };

                controller = $controller('SignupController', {
                    dataservice: dsFake
                });
                controller.SubmitSignup();
                $rootScope.$apply();
                expect($log.warn.logs).to.match(/existe/);

            });

            //test si hay un error en el server
            it('should be signup not successfully, error server ', function() {

                //función que simula la respuesta al servidor
                dsFake.signup = function(datas) {
                    var response = { data: 'err' };
                    return $q.when(response);

                };

                controller = $controller('SignupController', {
                    dataservice: dsFake
                });
                controller.SubmitSignup();
                $rootScope.$apply();
                expect($log.error.logs).to.match(/server/);

            });

            //test si la función es da fallo porque los passwords no son iguales
            it('should be signup no successfully because two input password not equals', function() {

                controller.inputPass = '1234567';
                controller.inputPass2 = '123456';
                controller.SubmitSignup();
                expect($log.warn.logs).to.match(/passwords/);

            });
        });
    });
});