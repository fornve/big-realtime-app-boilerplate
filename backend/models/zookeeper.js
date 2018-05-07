class Zookeeper {
    static registerMBReplyChannel(client_id, reply_channel) {
        console.log(`Zookeeper: register MB reply channel ${client_id}: ${reply_channel}`);
    }

    static registerWS(client_id) {
        console.log(`Zookeeper: register WS ${client_id}`);
    }

    static unregisterWs(client_id) {
        console.log(`Zookeeper: unregister WS ${client_id}`);
    }
}

module.exports = Zookeeper;