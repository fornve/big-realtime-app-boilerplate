const mysql = require('promise-mysql');
module.exports = new Promise((resolve, reject) => {
    console.log('starting mysql');
    connection = mysql.createConnection({
        host: 'framework-mysql',
        user: 'framework',
        password: 'framework',
        database: 'framework',
    }).then(connection => {
        console.log('Success connecting mysql');
        resolve({mysql: connection})
    })
    .catch(e => {
        console.log('Error connecting mysql');
        reject(e);
    });
});