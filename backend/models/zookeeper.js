/*
class Zookeeper {

}

module.exports = Zookeeper;
*/
module.exports = (orm, db) => {
    return db.define(
        'zookeeper',
        {
            created: String,
            client_id: String,
        }, {
            methods: {
                registerMBReplyChannel(client_id, reply_channel) {
                    this.create({
                        created: new Date(),
                        client_id: client_id,
                        reply_channel: reply_channel,
                    });
                    console.log(`Zookeeper: register MB reply channel ${client_id}: ${reply_channel}`);
                },

                registerWS(client_id) {
                    this.create({
                        created: new Date(),
                        client_id: client_id,
                    });

                    console.log(`Zookeeper: register WS ${client_id}`);
                },

                async unregisterWs(client_id) {
                    let z = this.findAsync({client_id: client_id}, {});
                    z.dropAsync();
                    console.log(`Zookeeper: unregister WS ${client_id}`);
                },
            },
            validations: {
                //email: orm.enforce.email()
            },
        }
    );
};