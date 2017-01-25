var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var sg = require('./sendgrid.env');
var style = require('./style.email.js');

exports.sendEmail = function (req, res) {

    //template contact recieve
    var emailTo = '';
    var emailFrom = '';
    var body='';

    switch (req.body.type) {
        case 'user':
            emailTo = req.body.from;
            emailFrom = req.body.to;
             body = '<body>' +
                    '<div id="contact-email">' +
                    '<div> <h1>Contacto con Findmenu</h1> <h4>Sugerencia: ' + req.body.subject +
                    '</h4></div>' +
                    '<section>' +
                    '<p>Sr/Sra: ' + req.body.name + ' Su petición ha sido recibida por'+
                    'el equipo de Findmenu, en breve responderán por su interés</p>' +
                    '<p>Puede seguir disfrutando de los servicios de Findmenu pulsando'+
                    '<a href="http://localhost:3000/">aqu&iacute;</a></p>' +
                    '<img src="findmenu_logo.png" alt="Logo">'+
                    '</div>' +                 
                    ' </body>';

            break;
        case 'admin':
            emailTo = req.body.to;
            emailFrom = req.body.from;

             body = '<body>' +
                    '<div id="contact-email">' +
                    '<div> <h1>Contacto con Findmenu</h1> <h4>Sugerencia: ' + req.body.subject +
                    '</h4></div>' +
                    '<section>' +
                    'Nombre:<p>' + req.body.name + '</p>' +
                    'Email: <p>' + req.body.from + '</p>' +
                    'Mensaje:<p>' + req.body.text + '</p></section>' +
                    '<img src="findmenu_logo.png" alt="Logo">'+
                    '</div>' +                
                    ' </body>';

            break;
        case 'modify':

            break;
        case 'signup':

            break;

    }

    var template =
            '<html>' +
            '<head>' +
            '<meta charset="utf-8" />' +
            style +
            '</head>' + body + 
            '</html>';

    var email = {
        from: emailFrom,
        to: emailTo,
        subject: req.body.subject,
        text: req.body.text,
        html: template
    };

    //Input APIKEY Sendgrid
    var options = {
        auth: {
            api_key: sg
        }
    };
    var mailer = nodemailer.createTransport(sgTransport(options));

    mailer.sendMail(email, function (error, info) {
        if (error) {
            res.status('401').json({
                err: info
            });
        } else {
            res.status('200').json({
                success: true
            });
            
            
        }
    });
    
    

};
