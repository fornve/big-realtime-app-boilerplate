class ControllerCore {
	constructor(services) {
		this.services = services;
	}

	ping(data) {
		if(!data.reply) {
			throw 'No reply address';
		}
		this.services.io.emit(data.reply, {pong: true});
	}

	bus(data) {
		// This is tough thing which may be explained on:
		// https://www.lucidchart.com/documents/edit/371887fd-30c4-4d34-a03b-82a5427081c4/0
		if(!data.reply) {
			throw 'No reply address';
		}

		// 1. Create reply channel in message broker (if does not exist)
        let reply_hash = data.client_id;
        let reply_channel = `/bus/reply/${reply_hash}`;
        data.reply_channel = reply_channel;
		this.services.mb.createChannel().then(channel => {
		    channel.assertQueue(reply_channel, {durable: false});
            //Zookeeper.registerMBReplyChannel(data.client_id, reply_channel);

            // 3. wait for response on reply channel
            channel.consume(reply_channel, (message) => {
                // 4. Reply to ws
                this.services.io.emit(data.reply, JSON.parse(Buffer.from(message.content)));
            });
		});

		// 2. Emit message to bus
        this.services.mb.createChannel().then(channel => {
            //channel.assertQueue(data.channel, {durable: false});
            channel.sendToQueue(data.channel, new Buffer(JSON.stringify(data)));
        });

	}

}

module.exports = ControllerCore;
