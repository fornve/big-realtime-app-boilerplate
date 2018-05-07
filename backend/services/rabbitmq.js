const amqp = require('amqplib');

module.exports = new Promise((resolve, reject) => {
    console.log('Starting RabbitMQ');
    amqp.connect('amqp://framework-rabbit').then(connection => {
        console.log('Success Starting RabbitMQ');
        resolve(connection);
    }).catch(error => {
        console.log('Error Starting RabbitMQ');
        reject(error);
    });
});