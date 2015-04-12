'use strict';

var Department = require('./departments.model.js');

function seed() {

    var records = [
        {
            name: 'Computer Science and Engineering',
            abbr: 'CSE'
        },
        {
            name: 'Information Science and Engineering',
            abbr: 'ISE'
        }
    ];

    return Department.sync({force: true})
        .then(function () {
            return Department.bulkCreate(records);
        });

}

module.exports = seed;
