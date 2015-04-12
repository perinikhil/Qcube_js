'use strict';

var Organization = require('./organizations.model.js');

var records = [
    {
        name: 'Dayananda Sagar College of Engineering',
        abbr: 'DSCE'
    }
];

function up() {
    return Organization.sync()
        .then(Organization.bulkCreate(records));
}

function down() {
    return Organization.drop({cascade: true});
}

module.exports = {
    up: up,
    down: down
};
