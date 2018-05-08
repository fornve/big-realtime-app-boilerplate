module.exports = (db) => {
    let models = {
        User: require('./user')(db),
        Zookeeper: require('./zookeeper')(db),
    }

    return models;
};