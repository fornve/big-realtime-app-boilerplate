let channel_name = 'bus/core/ping';

module.exports = async function(connection) {
    console.log(`Registering worker: ${channel_name}`);
	let channel = await connection.createChannel();
	channel.assertQueue(channel_name, {durable: false});
	channel.consume(channel_name, (message) => {
		console.log(" ["+channel_name+"] Received %s", message.content.toString());
		let data = JSON.parse(Buffer.from(message.content));

		/* ---- Actual work ----- */

		let response = { pong: true, original_data: data.data };

		/* ---- Work ends here ---- */

		channel.sendToQueue(data.reply_channel, new Buffer(JSON.stringify(response)));
	}, {noAck: true});
};
