var assert = require('chai').assert;
var dept = require('../../departments/departments.controller.js');
var client = require('restify').createJSONClient({
    url: 'http://localhost:7007',
    version: '*'
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
    it('should return \'Not found\'', function (done) {
        client.get('/departments/0', function (err, req, res, data) {
            assert.equal(res.statusCode, 404);
            assert.equal(data, 'Not found');
            done();
        });
    });
});

describe('create', function (done) {

});