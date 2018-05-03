module.exports = async function(connection) {
	let channel_name = 'bus/core/ping';
	let channel = await connection.createChannel();
	channel.assertQueue(channel_name, {durable: false});
	channel.consume(channel_name, (message) => {
		console.log(message.content);
		console.log(" ["+channel_name+"] Received %s", message.content.toString());
	}, {noAck: true});
};
