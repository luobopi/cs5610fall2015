/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormForUser: findAllFormForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userid = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormForUser(userId, callback) {
            var existForm = [];
            forms.forEach(function (item, index, array) {
                if (item.userid === userId) {
                    existForm.push(item);
                }
            });
            callback(existForm);
        }

        function deleteFormById(formId, callback) {
            forms.forEach(function (item, index, array) {
                if(item.id === formId) {
                    forms.splice(index, 1);
                }
            });
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            forms.forEach(function (item, index, array) {
                if(item.id === formId) {
                    for (var key in newForm) {
                        item[key] = newForm[key];
                    }
                    callback(item);
                }
            });
            callback(null);
        }


        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

    }
})();