const mailer = require('nodemailer');
module.exports = (recieverMail, recieverName, acountPassword) => {
	const transporter = mailer.createTransport({
		host: 'smtp.gmail.com',
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
		subject: 'New Registration',
		text: `Hello ${recieverName},\n\nYou have successfully registered as a new member.
    \n\n your mail is : ${recieverMail} \n\n
     your password is :${acountPassword}`,
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("mailer sent to ",recieverMail);
		}
	});
};
