const CoreController = require('./controllers/io/core');

socket = (io) => {

	let controllers = {
		'core': new CoreController(io),
	};

	io.on('connection', (client) => {
		console.log('client connected');
		client.on('bus', (data) => {
			//console.log(data);	
			//console.log(data.controller);
			//console.log(data.action);
			if(data.controller) {
				controllers[data.controller][data.action](data);
			}
		});
	});
	console.log('IO server started');
}

module.exports = socket;
