const nodemailer = require('nodemailer');

function sendm(target) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'placeholder',
            pass: 'placeholder'
        }
    });

    let mailDetails = {
        from: 'placeholder',
        to: target,
        subject: 'Password Restoration',
        html: ''
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = sendm();