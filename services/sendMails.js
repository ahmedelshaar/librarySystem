const mailer = require("nodemailer");
// Send new admin,emp or member added their credintials and link to complete regestiration
module.exports = (recieverMail, recieverName, acountPassword) => {
  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: recieverMail,
    subject: "New Member Registration",
    text: `Hello ${recieverName},\n\nYou have successfully registered as a new member.
    \n\n your mail is : ${recieverMail} \n\n
     your password is :${acountPassword}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
