'use strict';

var Department = require('./departments.model.js');
var $q = require('q');

module.exports = {
    sync: wipe,
    list: list,
    show: show,
    create: create,
    update: update,
    destroy: destroy
};

function list() {
    return Department.findAll();
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
        .then(updateDepartment)
        .catch(function() {
            data = {
                message: 'Department does not exist',
                code: 400
            };
            deferred.reject(data);
        });

    return deferred.promise;

    function updateDepartment(department) {

        department.update(params, {fields: Department.fillable})
            .then(function() {
                data = {
                    message: 'Updated department',
                    code: 200
                };
                deferred.resolve(data);
            })
            .catch(function() {
                data = {
                    message: 'Could not update department',
                    code: 400
                };
                deferred.reject(data);
            });
    }
}

function destroy(id) {
    var data = {};
    var deferred = $q.defer();

    Department.find(id)
        .then(destroyDepartment)
        .catch(function() {
            data.message = 'Department does not exist';
            data.code = 400;
            deferred.reject(data);
        });

    return deferred.promise;

    function destroyDepartment(department) {
        department.destroy()
            .then(function() {
                data = {
                    message: 'Deleted department',
                    code: 200
                };
                deferred.resolve(data);
            })
            .catch(function() {
                data = {
                    message: 'Failed to delete department',
                    code: 400
                };
                deferred.reject(data);
            });
    }
}

function wipe() {
    return Department.sync({force: true});
}
