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
}

module.exports = ControllerCore;
