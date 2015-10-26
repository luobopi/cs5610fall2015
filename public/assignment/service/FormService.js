/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {
    angular
        .module('FormBuilderApp')
        .factory('FormService', FormService);

    function FormService() {
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findAllFormsForUser: findAllFormsForUser
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {};
            form.formId = guid();
            for (var key in form) {
                newForm[key] = form[key]
            }
            newForm.userId = userId;
            forms.push(newForm);
            return callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var formsForUser = [];
            forms.forEach(function (form, index, array) {
                if (form.userId === userId) {
                    formsForUser.push(form)
                }
            });
            return callback(formsForUser)
        }

        function deleteFormById(formId, callback) {
            var index = -1
            forms.forEach(function (form, i, arr) {
                if (form.formId === formId) {
                    index = i
                }
            });
            forms.splice(index, 1);
            callback(forms)
        }

        function updateFormById(formId, newForm, callback) {
            var updatedForm = null;
            forms.forEach(function (form, i, arr) {
                if (form.formId === formId) {
                    for (var key in newForm) {
                        form[key] = newForm[key];
                    }
                    updatedForm = form;
                }
            });
            callback(updatedForm)
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