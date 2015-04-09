'use strict';

var server = require('../common/server');
var Department = require('./departments.controller');
var messages = require('../common/helpers.js').responseMessages;

server.get('peri', function (req, res) {
    Department.sync();
    res.send('welcome peri');
});

server.get('departments', function (req, res) {
    Department.list()
        .then(function(departments) {
            res.send(200, departments);
        })
        .catch(function() {
            res.send(404, messages.notFound);
        });
});

server.get('departments/:id', function (req, res) {
    Department.show(req.params.id)
        .then(function (department) {
            res.send(department);
        })
        .catch(function() {
            res.send(404, messages.notFound);
        });
});

server.post('departments', function(req, res) {
    Department.create(req.params)
        .then(function (department) {
            res.send(department);
        })
        .catch(function() {
            res.send(500, messages.createFail);
        });
});

server.put('departments/:id', function(req, res) {
    Department.update(req.params)
       .then(function(data) {
            res.send(data.code, data.message);
        })
        .catch(function(data) {
            res.send(data.code, data.message);
        });
});

server.del('departments/:id', function(req, res) {
    Department.destroy(req.params.id)
        .then(function(data) {
            res.send(data.code, data.message);
        })
        .catch(function(data) {
            res.send(data.code, data.message);
        });
});

