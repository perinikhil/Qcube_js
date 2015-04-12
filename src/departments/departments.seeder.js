'use strict';

var Department = require('./departments.model.js');

var records = [
    {
        //organization_id: 1,
        name: 'Computer Science and Engineering',
        abbr: 'CSE'
    },
    {
        //organization_id: 1,
        name: 'Information Science and Engineering',
        abbr: 'ISE'
    }
];

function up() {
    return Department.bulkCreate(records);
}

function down() {
    return Department.sync({force: true});
}

module.exports = {
    up: up,
    down: down
};
