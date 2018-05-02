/* global it, describe */

const chai = require('chai');
const assert = require('assert');
const amqp = require('amqplib');

let rabbit;
let channel;
let channel_name = 'test-'+ Math.random().toString(36).substring(7);

describe('RabbitMQ basics', function(){
	this.timeout(15000);
	it('Connect', (done) => {
		amqp.connect('amqp://framework-rabbit', function(err, conn) {
			console.log(err);
			if(err) {
				return done(err);
			}
			console.log(conn);

			if(conn) {
				rabbit = conn;
				return done();
			}

			return done('Unknown error');
		}).then(conn => {
			rabbit = conn;
			done();	
		});
	});

	it('Create channel', (done) => {
		rabbit.createChannel(function(err, ch) {
		}).then(ch => {
			channel = ch;
			done();	
		});
	});

	it('Send', (done) => {
		try {
			channel.assertQueue(channel_name, {durable: false});
			channel.sendToQueue(channel_name, new Buffer('Hello World! '+ new Date()));
			done();
		} catch( e ) {
			done(e);
		}
	});
/*
	it('Read', (done) => {
	});

	it('Delete channel', (done) => {
	});

	it('Disconnect', (done) => {
	});

*/
});
