/**
 * Created by yixing on 10/25/15.
 */

"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        $scope.$location = $location;
        $scope.newForm = {};
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;

        $scope.forms = [];

        var userid = $rootScope.currentUser.id;

        FormService.findAllFormsForUser(userid, function(userForms){
            $scope.forms = userForms;
        });

        function addForm() {
            FormService.createFormForUser(userid, angular.extend({}, $scope.newForm), function(form) {
                $scope.forms.push(form);
            });
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.newForm.name = $scope.selectedForm.name;
        }

        function updateForm() {
            if ($scope.selectedForm) {
                FormService.updateFormById($scope.selectedForm.id, $scope.newForm, function(updatedForm) {
                });
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index].id, function(forms){
                $scope.forms.splice(index, 1);
            });
        }

    }
})();