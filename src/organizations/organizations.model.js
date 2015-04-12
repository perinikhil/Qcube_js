'use strict';

var Database = require('../common/database.js');

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
//Organization.sync();

module.exports = Organization;