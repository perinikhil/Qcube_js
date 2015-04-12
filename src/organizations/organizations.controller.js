'use strict';

var Organization = require('./organizations.model.js');
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
    return Organization.findAll();
}

function show(id) {
    return Organization.find(id);
}

function create(params) {
    return Organization.create(params, {fields: Organization.fillable});
}

function update(params) {
    var data = {};
    var deferred = $q.defer();

    var id = params.id;
    Organization.find(id)
        .then(updateOrganization)
        .catch(function(){
            data = {
                message: 'Organization' + messages.notFound,
                code: 404
            };
            deferred.reject(data);
        });

    return deferred.promise;

    function updateOrganization(organization) {
        organization.update(params, {fields: Organization.fillable})
            .then(function () {
                data = {
                    message: messages.updateSuccess + 'organization',
                    code: 200
                };
                deferred.resolve(data);
            })
            .catch(function () {
                data = {
                    message: messages.updateFail + 'organization',
                    code: 500
                };
                deferred.reject(data);
            });
    }
}

function destroy(id) {
    var data = {};
    var deferred = $q.defer();

    Organization.find(id)
        .then(destroyOrganization)
        .catch(function() {
            data = {
                message: 'Organization' + messages.notFound,
                code: 404
            };
            deferred.reject(data);
        });

    return deferred.promise;

    function destroyOrganization(organization) {
        organization.destroy()
            .then(function () {
                data = {
                    message: messages.destroySuccess + 'organization',
                    code: 200
                };
                deferred.resolve(data);
            })
            .catch(function () {
                data = {
                    message: messages.destroyFail + 'organization',
                    code: 400
                };
                deferred.reject(data);
            });
    }
}
