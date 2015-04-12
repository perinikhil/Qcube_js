'use strict';

var Database = require('../common/database.js');
var Department = require('../common/models').Department;


var Organization = Database.sequelize.define('organizations',
    {
        name: {
            type: Database.dataType.STRING,
            field: 'name'
        },
        abbr: {
            type: Database.dataType.STRING,
            field: 'abbr'
        }
    },
    {
        freezeTableName: true
    }
);

Organization.fillable = ['name', 'abbr'];

Organization.hasMany(Department, {
    foreignKey: 'organization_id'
});

//Organization.sync();

module.exports = Organization;