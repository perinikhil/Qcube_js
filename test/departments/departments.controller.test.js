'use strict';

var assert = require('chai').assert;
var client = require('../common/client');
var seeder = require('../../src/departments/departments.seeder');
var messages = require('../../src/common/helpers.js').responseMessages;


describe('department.controller', function() {

    after(function (done) {
        seeder()
            .then(function () {
                done();
        });
    });

    describe('list', function () {
        it('should return departments', function (done) {
            client.get('/departments', function (err, req, res, data) {
                assert.equal(res.statusCode, 200, 'statusCode should be 200');
                assert.isAbove(data.length, 0, 'length should be greater than 0');
                done();
            });
        });
    });

    describe('show', function () {
        it('should return the first department', function (done) {
            client.get('/departments/1', function (err, req, res, data) {
                assert.equal(res.statusCode, 200);
                //console.log(data);
                assert.isNotNull(data.id);
                done();
            });
        });
        it('should return \'Department not found\'', function (done) {
            client.get('/departments/0', function (err, req, res, data) {
                assert.equal(res.statusCode, 404);
                assert.equal(data, 'Department' + messages.notFound);
                done();
            });
        });
    });

    describe('create', function (done) {
        var obj = {
            name: 'Physics',
            abbr: 'PHY'
        };
        it('should return the Physics department', function(done){
            client.post('/departments', obj, function(err, req, res, data) {
                assert.equal(data.name, 'Physics');
                assert.equal(data.abbr, 'PHY');
                done();
            });
        });
    });

    describe('update', function (done) {
        var obj = {
            name: 'Quantum Physics',
            abbr: 'QPHY'
        };
        it('should return the Quantum Physics department', function(done){
            client.put('/departments/3', obj, function(err, req, res, data) {
                assert.equal(res.statusCode, 200);
                assert.equal(data, messages.updateSuccess + 'department');
                done();
            });
        });
        it('should return \'Department not found\'', function(done){
            client.put('/departments/0', obj, function(err, req, res, data) {
                assert.equal(res.statusCode, 404);
                assert.equal(data, 'Department' + messages.notFound);
                done();
            });
        });
    });

    describe('destroy', function (done) {
        it('should delete the Quantum Physics department', function(done){
            client.del('/departments/3', function(err, req, res, data) {
                assert.equal(res.statusCode, 200);
                assert.equal(data, messages.destroySuccess + 'department');
                done();
            });
        });
        it('should return \'Department not found\'', function(done){
            client.del('/departments/0', function(err, req, res, data) {
                assert.equal(res.statusCode, 404);
                assert.equal(data, 'Department' + messages.notFound);
                done();
            });
        });
    });
    
});