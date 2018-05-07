/* global it, describe */

const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
//const ioserver = require('../../ioserver');
const socket = require('socket.io-client');
//const iosocket = require('socket.io').listen(3002);
chai.use(chaiHttp);

let io;

describe('Websockets +bus', () => {
	before(() => {
	//	ioserver(iosocket);

		io = new socket('http://localhost:3001');
		io.connect();
	});

	it('Connecting', (done) => {
		setTimeout(() => {
			assert.equal(io.connected, true);
			done();
		}, 250);
	});

	it('Receiving', (done) => {
		let hash = Math.random().toString(36).substring(7);
		io.on('back-'+hash, (data) => {
		    console.log(data)
			done();
		});
		
		io.emit('bus', { 
			reply: 'back-'+hash, 
			controller: 'core', 
			action: 'bus',
			channel: 'bus/core/ping',
			message: hash
		});
	});

});
