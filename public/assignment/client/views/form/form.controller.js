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
            console.log("load all form user");
            var userId = null;
            if ($rootScope.user) {
                userId = $rootScope.user.id;
            }
            console.log(userId);
            FormService.findAllFormsForUser(userId).then(function(forms) {
                //console.log("There is no forms");
                console.log(forms);
                $scope.forms = forms
            })
        }
        loadAllFormsForUser();

        function addForm() {
            console.log("success add form");
            var userId = null;
            if ($rootScope.user) {
                userId = $rootScope.user.id
            }
            var newForm = $scope.form;
            FormService.createFormForUser(userId, newForm).then(function(form){
                loadAllFormsForUser()
            })
        }


        function updateForm() {
            var newForm = {};
            for (var key in $scope.form) {
                newForm[key] = $scope.form[key]
            }
            FormService.updateFormById($scope.form.id, newForm).then(function(form) {
                $scope.form = form;
                loadAllFormsForUser()
            })
        }


        function deleteForm(formIndex) {
            FormService.deleteFormById($scope.forms[formIndex].id).then(function() {
                console.log("The form index are",formIndex);
                console.log("The form id is:", $scope.forms[formIndex].id);
                loadAllFormsForUser()
            })
        }


        function selectForm(formIndex) {
            $scope.form = {};
            for (var key in $scope.forms[formIndex]) {
                $scope.form[key] = $scope.forms[formIndex][key]
            }
            console.log($scope.form.id);
        }

    }
})();
