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
    return Department.sync()
        .then(Department.bulkCreate(records));
}

function down() {
    return Department.drop({cascade: true});
}

module.exports = {
    up: up,
    down: down
};
