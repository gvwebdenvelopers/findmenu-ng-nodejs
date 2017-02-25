/* jshint -W117, -W030 */
describe('contact.controller', function() {
    var controller;
    var emailFake;

    beforeEach(function() {
        bard.appModule('app.contact');
        bard.inject('$controller', '$log', '$q', '$rootScope');

        dsFake = {
            sendEmail: function(data) {
                return $q.when(true);
            }
        };
        controller = $controller('ContactController', {
            dataservice: dsFake
        });

    });

    describe('Contact controller', function() {

        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });
        it('should initially have a user with all fields empty', function() {
            expect(controller.inputName).to.equal('');
            expect(controller.inputEmail).to.equal('');
            expect(controller.inputSubject).to.equal('');
            expect(controller.inputMessage).to.equal('');
        });

        it('should initially functions are defined', function() {
            expect(controller.SubmitContact).to.be.defined;

        });

        describe('SubmitContact function', function() {

            it('should be send two emails successfully', function() {

                controller.SubmitContact();
                $rootScope.$apply();
                expect(controller.resultMessageOk).to.equal('Su email ha sido enviado correctamente');

            });

            it('should be send two emails not successfully', function() {

                dsFake.sendEmail = function() {
                    return $q.when(false);
                };

                var controller2 = $controller('ContactController', {
                    dataservice: dsFake
                });

                controller.SubmitContact();
                $rootScope.$apply();
                expect(controller.resultMessageFail).to.equal('Ha habido un error al enviar ' +
                    'el email, intentelo mas tarde');

            });

            it('should be send user email not successfully', function() {

                dsFake.sendEmail = function(data) {
                    if (data.type === 'admin') {
                        return $q.when(true);
                    } else {
                        return $q.when(false);
                    }
                };

                var controller2 = $controller('ContactController', {
                    dataservice: dsFake
                });

                controller.SubmitContact();
                $rootScope.$apply();
                expect(controller.resultMessageFail).to.equal('Ha habido un error al enviar ' +
                    'el email de usuario, intentelo mas tarde');

            });

        });

    });
});