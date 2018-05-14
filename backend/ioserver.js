const CoreController = require('./controllers/io/core');

disconnect = (client, reason, services) => {
    console.log(`WS ${client.id} disconnected on ${reason}`);
    services.db.models.Zookeeper.destroy({ where: {client_id: client.id} });
}

socket = (services) => {
	let controllers = {
		'core': new CoreController(services),
	};

	services.io.on('connection', (client) => {
		console.log('client connected');
		// Zookeeper has to be notified about this connection. Session id has to be generated and passed as localstorage
		// or cookie in case of re-connection
        services.db.models.Zookeeper.create({client_id: client.id});
		client.on('bus', (data) => {
			//console.log(data.controller);
			//console.log(data.action);
            data.client_id = client.id; // Identification for connection (we will later create message broker channel using this id.
			if(data.controller) {
				controllers[data.controller][data.action](data);
			}
		});

        client.on('disconnect', (reason) => {
            disconnect(client, reason, services);
        });
	});

	console.log('IO server started');
}

module.exports = socket;
