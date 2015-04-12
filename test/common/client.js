var client = require('restify').createJSONClient({
    url: 'http://localhost:7007',
    version: '*'
});

module.exports = client;