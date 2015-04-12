'use strict';

var Department = require('./departments.model.js');
var $q = require('q');
var messages = require('../common/helpers.js').responseMessages;


module.exports = {
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
        .catch(function(){
            data = {
                message: 'Department' + messages.notFound,
                code: 404
            };
            deferred.reject(data);
        });

    return deferred.promise;

    function updateDepartment(department) {
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

function destroy(id) {
    var data = {};
    var deferred = $q.defer();

    Department.find(id)
        .then(destroyDepartment)
        .catch(function() {
            data = {
                message: 'Department' + messages.notFound,
                code: 404
            };
            deferred.reject(data);
        });

    return deferred.promise;

    function destroyDepartment(department) {
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
