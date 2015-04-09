'use strict';

var Department = require('./departments.model.js');
var $q = require('q');
var messages = require('../common/helpers.js').responseMessages;


module.exports = {
    sync: wipe,
    list: list,
    show: show,
    create: create,
    update: update,
    destroy: destroy
};

function list() {
    return Department.findAll()
        ;
}

function show(id) {
    return Department.find(id);
}

function create(params) {
    return Department.create(params, {fields: Department.fillable});
}

function update(params) {
    var data = {};
    var deferred = $q.defer();

    var id = params.id;
    Department.find(id)
        .then(updateDepartment);

    return deferred.promise;

    function updateDepartment(department) {
        if (department == null) {
            data = {
                message: 'Department' + messages.doesNotExist,
                code: 400
            };
            deferred.reject(data);
        }
        else {
            department.update(params, {fields: Department.fillable})
                .then(function () {
                    data = {
                        message: messages.updateSuccess + 'department',
                        code: 200
                    };
                    deferred.resolve(data);
                })
                .catch(function () {
                    data = {
                        message: messages.updateFail + 'department',
                        code: 500
                    };
                    deferred.reject(data);
                });
        }
    }
}

function destroy(id) {
    var data = {};
    var deferred = $q.defer();

    console.log(id);

    Department.find(id)
        .then(destroyDepartment)

    return deferred.promise;

    function destroyDepartment(department) {
        if(department == null) {
            data = {
                message: 'Department' + messages.doesNotExist,
                code: 400
            };
            deferred.reject(data);
        }
        else {
            department.destroy()
                .then(function () {
                    data = {
                        message: messages.destroySuccess + 'department',
                        code: 200
                    };
                    deferred.resolve(data);
                })
                .catch(function () {
                    data = {
                        message: messages.destroyFail + 'department',
                        code: 400
                    };
                    deferred.reject(data);
                });
        }
    }
}

function wipe() {
    return Department.sync({force: true});
}
