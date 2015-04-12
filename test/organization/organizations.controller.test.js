'use strict';

var assert = require('chai').assert;
var client = require('../common/client');
var seeder = require('../../src/common/seeders');
var messages = require('../../src/common/helpers.js').responseMessages;


describe('organization.controller', function() {

    after(function (done) {
        seeder()
            .then(function () {
                done();
            });
    });

    describe('list', function () {
        it('should return organizations', function (done) {
            client.get('/organizations', function (err, req, res, data) {
                assert.equal(res.statusCode, 200, 'statusCode should be 200');
                assert.isAbove(data.length, 0, 'length should be greater than 0');
                done();
            });
        });
    });

    describe('show', function () {
        it('should return the first organization', function (done) {
            client.get('/organizations/1', function (err, req, res, data) {
                assert.equal(res.statusCode, 200);
                //console.log(data);
                assert.isNotNull(data.id);
                done();
            });
        });
        it('should return \'Organization not found\'', function (done) {
            client.get('/organizations/0', function (err, req, res, data) {
                assert.equal(res.statusCode, 404);
                assert.equal(data, 'Organization' + messages.notFound);
                done();
            });
        });
    });

    describe('create', function (done) {
        var obj = {
            name: 'Dayananda Sagar College of Technology and Management',
            abbr: 'DSCTM'
        };
        it('should return the DSCTM organization', function(done){
            client.post('/organizations', obj, function(err, req, res, data) {
                assert.equal(data.name, 'Dayananda Sagar College of Technology and Management');
                assert.equal(data.abbr, 'DSCTM');
                done();
            });
        });
    });

    describe('update', function (done) {
        var obj = {
            name: 'Dayananda Sagar College of Technology and Management',
            abbr: 'DSATM'
        };
        it('should return the DSATM organization', function(done){
            client.put('/organizations/2', obj, function(err, req, res, data) {
                assert.equal(res.statusCode, 200);
                assert.equal(data, messages.updateSuccess + 'organization');
                done();
            });
        });
        it('should return \'Organization not found\'', function(done){
            client.put('/organizations/0', obj, function(err, req, res, data) {
                assert.equal(res.statusCode, 404);
                assert.equal(data, 'Organization' + messages.notFound);
                done();
            });
        });
    });

    describe('destroy', function (done) {
        it('should delete the Quantum Physics organization', function(done){
            client.del('/organizations/2', function(err, req, res, data) {
                assert.equal(res.statusCode, 200);
                assert.equal(data, messages.destroySuccess + 'organization');
                done();
            });
        });
        it('should return \'Organization not found\'', function(done){
            client.del('/organizations/0', function(err, req, res, data) {
                assert.equal(res.statusCode, 404);
                assert.equal(data, 'Organization' + messages.notFound);
                done();
            });
        });
    });

});