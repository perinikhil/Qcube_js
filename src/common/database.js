'use strict';

var Sequelize = require ('sequelize');

var sequelize = new Sequelize('qcube', 'root', 'peri', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        autoPrimaryKey: true,
        timestamps: true
    }
});

module.exports = {
    dataType: Sequelize,
    sequelize: sequelize
};