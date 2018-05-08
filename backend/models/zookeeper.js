const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Zookeeper = sequelize.define('zookeeper', {
        client_id: {
            type: Sequelize.STRING
        },
    });

    // force: true will drop the table if it already exists
    Zookeeper.sync({force: false}).then(() => {
        // Table created
    });

    Zookeeper.registerMBReplyChannel = (client_id, reply_channel) => {
         this.create({
            created: new Date(),
            client_id: client_id,
            reply_channel: reply_channel,
        });
        console.log(`Zookeeper: register MB reply channel ${client_id}: ${reply_channel}`);
    }

    Zookeeper.registerWS = (client_id) => {
       this.create({
           created: new Date(),
           client_id: client_id,
       });

       console.log(`Zookeeper: register WS ${client_id}`);
    }

    Zookeeper.unregisterWs = (client_id) => {
        let z = this.findAsync({client_id: client_id}, {});
        z.dropAsync();
        console.log(`Zookeeper: unregister WS ${client_id}`);
    }

    return Zookeeper;
};
