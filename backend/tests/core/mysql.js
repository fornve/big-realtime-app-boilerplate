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
/*
	it('Create', (done) => {
	    let user = services.db.models.User.create({
            name: chance.name(),
            email: chance.email(),
        });
		done();
	});

	it('Get one', (done) => {
	    services.db.models.User.get(1, (error, person) => {
            console.log(person);
            console.log(person.email);
            console.log(JSON.parse(JSON.stringify(person)))
        });
        done();

    });
    */
});
