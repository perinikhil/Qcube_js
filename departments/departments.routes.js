'use strict';

var server = require('../common/server');
var Department = require('./departments.controller');
var { sendResponse } = require('../common/helpers.js');

server.get('peri', function (req, res) {
    Department.sync();
    res.send('welcome peri');
});

server.get('department', function (req, res) {
    Department.list()
        .then(function(departments) {
            res.json(departments);
        })
        .catch(function() {
            res.send(404, 'Not found!');
        });
});

server.get('department/:id', function (req, res) {
    Department.show(req.params.id)
        .then(function (department) {
            res.send(department);
        })
        .catch(function() {
            res.send(404,'Not found!');
        });
});

server.post('department', function(req, res) {
    Department.create(req.params)
        .then(function (department) {
            res.send(department);
        })
        .catch(function() {
            res.send('Could not create department');
        });
});

server.put('department/:id', function(req, res) {
    Department.update(req.params)
        .then(function (department) {
            res.send(department);
        })
        .catch(function(message) {
            res.send(message);
        });
});

server.del('department/:id', function(req, res) {
    Department.destroy(req.params.id)
        .then(function(data) {
            res.send(data.code, data.message);
        });
});

