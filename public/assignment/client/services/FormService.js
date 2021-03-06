/**
 * Created by yixing on 11/15/15.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {
        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };
        return service;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post('/api/assignment/user/' + userId + '/form', form)
                .success(function(response) {
                    console.log("create form for user");
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get('/api/assignment/user/' + userId + '/form')
                .success(function(response) {
                    console.log("find all forms");
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete('/api/assignment/form/' + formId)
                .success(function(response) {
                    console.log("The form id is:", formId);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put('/api/assignment/form/' + formId, newForm)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
}) ();