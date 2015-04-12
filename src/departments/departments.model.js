'use strict';

var Database = require('../common/database.js');
//var Organization = require('../common/models').Organization;


var Department = Database.sequelize.define('departments',
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

Department.fillable = ['name', 'abbr'];

//Department.belongsTo(Organization, {
//    foreignKey: 'organization_id'
//});

//Department.sync();

module.exports = Department;