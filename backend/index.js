const express = require('express')
const socket = require('socket.io');
const ioserver = require('./ioserver');
const workers = require('./workers/index');
const app = express()
const port = 8080;
console.log('Starting server');
app.get('/', (req, res) => res.send('Hello World!'))

let server;

require('./services/init').then(services => {
    server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    services.io = socket(server);
    ioserver(services);
    console.log('Server & WS started' );
}).catch(e => console.log);

module.exports = server;
