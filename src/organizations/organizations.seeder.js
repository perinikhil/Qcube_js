'use strict';

var Organization = require('./organizations.model.js');

var records = [
    {
        name: 'Dayananda Sagar College of Engineering',
        abbr: 'DSCE'
    }
];

function up() {
    return Organization.bulkCreate(records);
}

function down() {
    return Organization.sync({force: true})
}

module.exports = {
    up: up,
    down: down
};
