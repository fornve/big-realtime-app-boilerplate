const express = require('express')
const socket = require('socket.io');
const ioserver = require('./ioserver');
const app = express()
const port = 8080;

app.get('/', (req, res) => res.send('Hello World!'))

let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
let io = socket(server);
ioserver(io);

console.log('Server & WS started' );

module.exports = server;
