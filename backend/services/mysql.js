const orm = require('orm');
const models = require('../models/index');

module.exports = new Promise((resolve, reject) => {
    console.log('starting mysql');
    orm.connectAsync('mysql://framework:framework@framework-mysql/framework')
        .then(connection => {
            console.log('Success connecting mysql');
            connection.models = models(orm, connection);
            //console.log(models);
            resolve(connection)
        })
        .catch(e => {
            console.log('Error connecting mysql');
            reject(e);
        });
});