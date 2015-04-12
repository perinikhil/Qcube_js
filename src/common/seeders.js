'use strict';

var orgSeeder = require('../organizations/organizations.seeder');
var deptSeeder = require('../departments/departments.seeder');

module.exports = function () {

    return deptSeeder.down()
        .then(orgSeeder.down)

        .then(orgSeeder.up)
        .then(deptSeeder.up)

        .then(function () {
            console.log('done seeding');
        })
        .catch(function (err) {
            console.log('seed error', err);
        });

};
