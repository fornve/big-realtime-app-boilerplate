/* global it, describe, services, io */

const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const socket = require('socket.io-client');
chai.use(chaiHttp);

let io;

function RPCReceive() {
    return new Promise((resolve, reject) => {
        let hash = Math.random().toString(36).substring(7);
        io.on('back-'+hash, (data) => {
            resolve(data);
        });

        io.emit('bus', {
            reply: 'back-'+hash,
            controller: 'core',
            action: 'bus',
            channel: 'bus/core/ping',
            data: hash
        });
    });

}

describe('Websockets +bus', () => {
	before(() => {
        io = new socket('http://localhost:3001');
        io.connect();
	});

    after(() => {
        io.disconnect();
    })

	it('Connecting', (done) => {
		setTimeout(() => {
			assert.equal(io.connected, true);
			done();
		}, 250);
	});

	it('Receiving', (done) => {
        RPCReceive().then((data) => {
            console.log(data);
            done();
        });
	});
/*
	it('Receiving 100', done => {
	    let jobs = [];
	    for(let i = 0; i <= 100; i++) {
	        jobs.push(RPCReceive());
        }
        Promise.all(jobs).then((data) => {
            console.log(data);
            done();
        })
    });
*/
});
