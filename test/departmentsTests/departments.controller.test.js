var assert = require('chai').assert;
var should = require('chai').should;
var dept = require('../../departments/departments.controller.js');
require('babel/register');


describe('list', function () {
    it('Returns an array of objects', function (done) {
        dept.list()
            .then(function (depts) {
                //console.log(depts);
                assert.equal(typeof(depts), typeof({}));
                done();
            });
    });
});

//describe('show', function () {
//   it('Returns a single object');
//});