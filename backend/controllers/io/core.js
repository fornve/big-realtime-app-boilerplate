const Zookeeper = require('../../models/zookeeper');
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
		console.log('WS Listener for bus')
		console.log(data);
		// 1. Create reply channel in message broker (if does not exist)
		//let reply_hash = Math.random().toString(36).substring(7);
        let reply_hash = data.client_id;
        let reply_channel = `/bus/reply/${reply_hash}`;
		this.services.mb.createChannel(reply_channel).then(channel => {
			console.log('channel to be finished');
            Zookeeper.registerMBReplyChannel(data.client_id, reply_channel);
		})

		// 2. Emit message to bus
		// 3. wait for response on reply channel
		this.services.io.emit(data.reply, {pong: true});
	}

}

module.exports = ControllerCore;
