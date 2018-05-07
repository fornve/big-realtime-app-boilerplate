module.exports = async function(connection) {
	let channel_name = 'bus/core/ping';
    console.log(`Registering worker: ${channel_name}`);
	let channel = await connection.createChannel();
	channel.assertQueue(channel_name, {durable: false});
	channel.consume(channel_name, (message) => {
		console.log(" ["+channel_name+"] Received %s", message.content.toString());
		let data = JSON.parse(Buffer.from(message.content));
		channel.sendToQueue(data.reply_channel, new Buffer(JSON.stringify({
			pong: true,
			original_data: data.data
		})));
	}, {noAck: true});
};
