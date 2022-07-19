var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "60ea8af517dc38",
        pass: "8212a43f8c0e46"
    }
});

var mailOptions = {
    from: 'diennd.vnu@gmail.com',
    to: 'duydien.nguyen@studenti.unisalento.it',
    subject: 'Patient checking notification',
    text: 'Patient  JenniferR01 is doing the check!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});