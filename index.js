var nodemailer = require('nodemailer');
var fs = require('fs');

var smptCfg = require('./package').config.smtp;

var mailBodyPath = './index.html',
    mailOptions = {
      from: '"no-reply 測試信" <xxxx@gmail.com>',
      to: null,
      bcc: 'ooo@gmail.com;xxx@gmail.com',
      subject: '[測試信件]'
      // text: 'That was easy!',
      // html: mailBody // after readfile
    };

var transporter = nodemailer.createTransport({
  host: smptCfg.host,
  port: smptCfg.port,
  secure: smptCfg.secure, // true for 465, false for other ports
  auth: {
    user: smptCfg.auth.user,
    pass: smptCfg.auth.pass
  }
});

// console.log(fs);


fs.readFile(mailBodyPath, 'utf8', function (err, mailBody) {
  if (err) {
    return console.log(err);
  }
  // console.log(mailBody);
  mailOptions.html = mailBody;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
