/* global it, describe */

const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const server = require('../../index');
chai.use(chaiHttp);

describe('/ Get basics', () => {
	it('/ should get 200', (done) => {
		chai.request(server)
		.get('/')
		.end((err, res) => {
			assert.equal(res.status, 200);
			done();
		});
	});

	it('/not/found should get 404', (done) => {
		chai.request(server)
		.get('/not/found')
		.end((err, res) => {
			assert.equal(res.status, 404);
			done();
		});
	});
});
