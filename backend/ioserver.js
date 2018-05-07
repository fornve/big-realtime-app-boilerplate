const CoreController = require('./controllers/io/core');
const Zookeeper = require('./models/zookeeper');

socket = (services) => {

	let controllers = {
		'core': new CoreController(services),
	};

	services.io.on('connection', (client) => {
		console.log('client connected');
		// Zookeeper has to be notified about this connection. Session id has to be generated and passed as localstorage
		// or cookie in case of re-connection
        Zookeeper.registerWS(client.id);
		client.on('bus', (data) => {
			//console.log(data);	
			//console.log(data.controller);
			//console.log(data.action);
            data.client_id = client.id; // Identificator for connection (we will later create message broker channel using this id.
			if(data.controller) {
				controllers[data.controller][data.action](data);
			}
		});
	});

	services.io.on('disconnect', (client) => {
	    Zookeeper.unregisterWs(client.id);
    });
	console.log('IO server started');
}

module.exports = socket;
