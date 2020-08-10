const nodemailer = require('nodemailer')

const mailServiceType = process.env.MAILSERVICETYPE;
const mailUser = process.env.MAILUSER
const mailPassword = process.env.MAILPASSWORD;
const mailHost = process.env.MAILHOST;
const mailPort = process.env.MAILPORT;
const mailSecure = process.env.MAILSECURE;
const mailFrom = process.env.MAILFROM;


const mailerService = {

	sendEmail: async function(emailTo, asunto, texto){
		var transporter = nodemailer.createTransport({
			host: mailHost,
			port: parseInt(mailPort),
			secure: ('true' == mailSecure),
			auth: {
			  user: mailUser,
			  pass: mailPassword
			}
		  });
		  
		  var mailOptions = {
			from: mailFrom,
			to: emailTo,
			subject: asunto,
			text: texto
		  };

		  await transporter.sendMail(mailOptions);
	},


	sendResetPasswordEmail: async function(emailTo, token){
		await this.sendEmail(emailTo, "TEAyudo Restablecer Contraseña", `Para restablecer su contraseña ingrese aqui: ${process.env.URLRESETPASSWORD}${token}`);
	}

}


module.exports = mailerService;