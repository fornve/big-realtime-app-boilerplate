/* global it, describe */

const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const server = require('../../index');
const ioserver = require('../../ioserver');
const socket = require('socket.io-client');
//const iosocket = require('socket.io').listen(3001);
chai.use(chaiHttp);

let io;

describe('Websockets basics', () => {
	before(() => {
		//ioserver(iosocket);	

		io = new socket('http://localhost:3001');
		io.connect();
	});

	it('Connecting', (done) => {
		console.log(io.connected);
		assert.equal(io.connected, true);
		done();
	});

	it('Emiting', (done) => {
		let result = io.emit('bus', { test: true }, (data) => console.log);
		done();
	});

	it('Receiving', (done) => {
		let hash = Math.random().toString(36).substring(7);
		io.on('back-'+hash, (data) => {
			done();
		});
		
		io.emit('bus', { 
			reply: 'back-'+hash, 
			controller: 'core', 
			action: 'ping' }
		);
	});

});
