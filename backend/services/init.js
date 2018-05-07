let mysql = require('./mysql');
let rabbitmq = require('./rabbitmq');
//let filestorage = require('./services/google-storage');

module.exports = new Promise((resolve, reject) => {

    Promise.all([mysql, rabbitmq]).then(data => {
        let db = data[0];
        let mb = data[1];
        resolve({db: db, mb: mb});
    }).catch(error => {
        reject(error);
    })
});
