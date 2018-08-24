const amqp = require('amqplib/callback_api');
const yaml = require('js-yaml');
const fs = require('fs');

// Get the config file
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('../../config/rabbit.yml', 'utf8'));
	mail = yaml.safeLoad(fs.readFileSync('../../config/mail.yml', 'utf8'));
} catch (e) {
	console.log(e);
}

amqp.connect(config.url, function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'orders';

		ch.assertQueue(q, {durable: true});

		ch.consume(q, function(msg) {
			// send mail
			let data = JSON.parse(msg.content);
			let send = require('gmail-send')({
				user: mail.user ,           // Your GMail account used to send emails
				pass: mail.pass,           // Application-specific password
				to: mail.user,           // Send to yourself
				subject: 'Hurry Up!!',
				text:    `New order in place with id: ${data.id}. Needs to be delivered on ${data.address} for total: \$${data.cost}`,  // Plain text
			})({});                             // Send email without any check

		}, {noAck: true});
	});
});