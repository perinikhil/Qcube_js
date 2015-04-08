'use strict';

var restify = require('restify');

var server = restify.createServer({name: 'Qcube'});

server.listen(7007, function() {
    console.log('%s on %s', server.name, server.url);
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser({mapParams: true}));

module.exports = server;