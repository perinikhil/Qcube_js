'use strict';

var server = require('../common/server');
var Organization = require('./organizations.controller.js');
var messages = require('../common/helpers.js').responseMessages;

server.get('organizations', function (req, res) {
    Organization.list()
        .then(function(organizations) {
            res.send(200, organizations);
        })
        .catch(function() {
            res.send(404, messages.notFound);
        });
});

server.get('organizations/:id', function (req, res) {
    Organization.show(req.params.id)
        .then(function (organization) {
            res.send(organization);
        })
        .catch(function() {
            res.send(404, 'Organization' + messages.notFound);
        });
});

server.post('organizations', function(req, res) {
    Organization.create(req.params)
        .then(function (organization) {
            res.send(organization);
        })
        .catch(function() {
            res.send(500, messages.createFail);
        });
});

server.put('organizations/:id', function(req, res) {
    Organization.update(req.params)
        .then(function(data) {
            res.send(data.code, data.message);
        })
        .catch(function(data) {
            res.send(data.code, data.message);
        });
});

server.del('organizations/:id', function(req, res) {
    Organization.destroy(req.params.id)
        .then(function(data) {
            res.send(data.code, data.message);
        })
        .catch(function(data) {
            res.send(data.code, data.message);
        });
});


