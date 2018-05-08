/* global it, describe */

const chai = require('chai');
const assert = require('assert');
const service = require('../load-service');
const Chance = require('chance');
let chance = new Chance();

let services;

describe('MySQL ORM basics', function(){
	it('Load Services', (done) => {
		service.then(initiated_services => {
			services = initiated_services;
            //console.log(services.db.models)
            done();
		});
	});
});
