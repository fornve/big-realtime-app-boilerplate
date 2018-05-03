class ControllerCore {
	constructor(io) {
		this.io = io;
	}

	ping(data) {
		if(!data.reply) {
			throw 'No reply address';
		}
		this.io.emit(data.reply, {pong: true});
	}

	bus(data) {
		if(!data.reply) {
			throw 'No reply address';
		}
		// 1. Connect to channel
		// 2. Emit message to bus
		// 3. wait for response on reply channel
		this.io.emit(data.reply, {pong: true});
	}

}

module.exports = ControllerCore;
