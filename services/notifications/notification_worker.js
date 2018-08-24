const amqp = require('amqplib/callback_api');
const yaml = require('js-yaml');
const fs = require('fs');


// Get the config file
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('./config/rabbit.yml', 'utf8'));
} catch (e) {
	console.log(e);
}

amqp.connect(config.url, function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'notifications';

		ch.assertQueue(q, {durable: true});
		console.log('SMS happy and waiting.');
		ch.consume(q, function(msg) {

			// Simulate sms send
				let data = JSON.parse(msg.content);

				console.log('Writing log:' + data.id);

			let content = `Your order is ready. Will arrive in ${data.eta} aprox. to \$${data.address} for total: ${data.cost}`;

			// write to a new file named 2pac.txt
			fs.writeFile('sms.log', content, (err) => {
				if (err) throw err;
			});

		}, {noAck: true});
	});
});
