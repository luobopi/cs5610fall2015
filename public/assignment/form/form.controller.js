/**
 * Created by yixing on 10/25/15.
 */
(function() {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        $scope.$location = $location;
        $scope.form = {};
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;

        function loadAllFormsForUser() {
            var userId = null
            if ($rootScope.user) {
                userId = $rootScope.user
            }
            FormService.findAllFormsForUser(userId, function(forms) {
                $scope.forms = forms
            })
        }
        loadAllFormsForUser();

        function addForm() {
            var userId = null;
            if ($rootScope.user) {
                userId = $rootScope.user
            }
            var newForm = $scope.form;
            FormService.createFormForUser(userId, newForm, function(form) {
                loadAllFormsForUser()
            })
        }


        function updateForm() {
            var newForm = {};
            for (var key in $scope.form) {
                newForm[key] = $scope.form[key]
            }
            FormService.updateFormById($scope.form.formId, newForm, function(form) {
                $scope.form = form;
                loadAllFormsForUser()
            })
        }


        function deleteForm(formIndex) {
            FormService.deleteFormById($scope.forms[formIndex].formId, function (forms) {
                loadAllFormsForUser()
            })
        }


        function selectForm(formIndex) {
            $scope.form = {};
            for (var key in $scope.forms[formIndex]) {
                $scope.form[key] = $scope.forms[formIndex][key]
            }
        }

    }
})();
