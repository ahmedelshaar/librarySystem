const mailer = require("nodemailer");
// Send new admin,emp or member added their credintials and link to complete regestiration
module.exports = (senderMail, senderPass, recieverMail, recieverName) => {
  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: senderMail,
      pass: senderPass,
    },
  });
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "New Member Registration",
    text: `Hello ${recieverName},\n\nYou have successfully registered as a new member.\n\nPlease click on the link below to complete registration.\n\n${process.env.FRONTEND_URL}/setData`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
