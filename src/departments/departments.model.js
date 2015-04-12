'use strict';

var Database = require('../common/database.js');

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
//Department.sync();

module.exports = Department;