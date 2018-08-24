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

module.exports.shout =  (message) => {

	amqp.connect(config.url, function(err, conn) {

		conn.createChannel(function(err, ch) {
			let ex = 'amq.fanout';
			let msg = message;

			ch.assertExchange(ex, 'fanout', {durable: true});
			ch.publish(ex, '', new Buffer.from(msg, 'utf-8'));

			console.log(" [x] Sent %s", msg);

		});

	});
};