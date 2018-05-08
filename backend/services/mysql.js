const Sequelize = require('sequelize');
const models = require('../models/index');

module.exports = new Promise((resolve, reject) => {
    console.log('starting mysql');
    let db = new Sequelize('framework', 'framework', 'framework', {
        host: 'framework-mysql',
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    db.authenticate().then(() => {
        console.log('Success connecting mysql');
        db.models = models(db);
        resolve(db)
    })
});