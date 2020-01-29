var nodemailer = require("nodemailer");
const getEmail = require("../emailCredentials/email");
const getPassword = require("../emailCredentials/password");
sendEmail = message => {
  console.log(getEmail.email);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: getEmail.email,
      pass: getPassword.password
    }
  });

  var mailOptions = {
    from: getEmail.email,
    to: getEmail.email,
    subject: "Floppyer Job!",
    text: JSON.stringify(message)
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendEmail: sendEmail
};
