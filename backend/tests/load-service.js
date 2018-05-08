const ioserver = require('../ioserver');
const iosocket = require('socket.io').listen(3001);
module.exports = new Promise((resolve, reject) => {
    require('../services/init').then(services => {
        services.io = iosocket;
        ioserver(services);

        global.services = services;
        resolve(services);
    }).catch(e => {
        console.log(e)
        reject(e)
    });
});

