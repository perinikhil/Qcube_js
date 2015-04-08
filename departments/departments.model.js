'use strict';

var Database = require('../common/database.js');

var Department = Database.sequelize.define('departments', {
    name: Database.dataType.STRING,
    code: Database.dataType.STRING
});

Department.fillable = ['name', 'code'];
//Department.sync();

module.exports = Department;