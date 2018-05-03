const amqp = require('amqplib');

amqp.connect('amqp://framework-rabbit').then(connection => {
	require('./core/ping')(connection);
});

module.exports = amqp;
