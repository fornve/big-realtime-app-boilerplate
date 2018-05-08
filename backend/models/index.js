module.exports = (orm, connection) => {
    let models = {
        User: require('./user')(orm, connection),
        Zookeeper: require('./zookeeper')(orm, connection),
    }

    models.User.syncPromise();
    models.Zookeeper.syncPromise();

    return models;
};