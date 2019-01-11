const nodemailer = require('nodemailer');

module.exports = app => {	
	
	app.get('/contact', async(req, res) => {
		const { name, sender, recipient, phone, company, message } = req.query;

		let transport = nodemailer.createTransport({
			host: 'EMAIL HOST HERE', // add your own credentials here
			port: 'EMAIL PORT HERE', // add your own credentials here
			auth: {
				user: 'EMAIL USER HERE', // add your own credentials here
			    pass: 'EMAIL PASS HERE' // add your own credentials here
			},
			tls: {
		    	rejectUnauthorized: false
		    }
		});

		let mailOptions = {
        	from: `Website Customer <${sender}>`,
        	to: recipient, 
        	subject: 'Let us do business together!',
        	text: `
				Company: ${company}
				Phone: ${phone}
				Message: ${message}
        	`
    	};

    	await transport.sendMail(mailOptions, (error, info) => {
			if (error) { return console.log(error);	}
			console.log('Message sent: %s', info.messageId);   
		});
	});
};

