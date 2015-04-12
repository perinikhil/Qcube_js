'use strict';

var Organization = require('./organizations.model.js');

function seed() {

    var records = [
        {
            name: 'Dayananda Sagar College of Engineering',
            abbr: 'DSCE'
        }
    ];

    return Organization.sync({force: true})
        .then(function () {
            return Organization.bulkCreate(records);
        });

}

module.exports = seed;
