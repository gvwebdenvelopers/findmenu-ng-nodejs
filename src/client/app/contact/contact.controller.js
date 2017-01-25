(function () {
    'use strict';

    angular
            .module('app.contact')
            .controller('ContactController', ContactController);

    //inyecto funcionalidad y servicio dataservice
    ContactController.$inject = ['dataservice', '$state', '$timeout'];

    //lo añadimos al controlador
    function ContactController(dataservice, $state, $timeout) {
        var vm = this;
        //variables del formulario
        vm.title = 'Contact';
        vm.inputName = '';
        vm.inputEmail = '';
        vm.inputSubject = '';
        vm.inputMessage = '';
        vm.SubmitContact = SubmitContact;

        function SubmitContact() {
            var data = {
                name: vm.inputName,
                from: vm.inputEmail,
                to: 'gv.web.denvelopers@gmail.com',
                subject: vm.inputSubject,
                text: vm.inputMessage,
                type: 'admin'
            };
            dataservice.sendEmail(data).then(function (response) {

                if (response) {
                    data.type='user';
                    console.log(data);
                    dataservice.sendEmail(data).then(function (response) {

                        if (response) {
                            vm.resultMessageOk = 'Su email ha sido enviado correctamente';
                            $timeout(function () {
                                vm.resultMessageOk = '';
                                $state.go('home');
                            }, 3000);
                        } else {
                            vm.resultMessageFail =
                                    'Ha habido un error al enviar el email, intentelo mas tarde';
                            $timeout(function () {
                                vm.resultMessageFail = '';
                            }, 3000);
                        }
                    });
                } else {
                    vm.resultMessageFail =
                            'Ha habido un error al enviar el email, intentelo mas tarde';
                    $timeout(function () {
                        vm.resultMessageFail = '';
                    }, 3000);
                }
            });

        }

    }
})();
