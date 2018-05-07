const amqp = require('amqplib');

amqp.connect('amqp://framework-rabbit').then(connection => {
	console.log('Registering workers');
	require('./core/ping')(connection);
});

module.exports = amqp;
