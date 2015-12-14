/**
 * Created by yixing on 12/13/15.
 */
"use strict";

(function(){

    angular
        .module("MakeupApp")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.deleteUser = deleteUser;

        function loadAllUsers() {
            console.log("load all users");
            UserService.findAllUsers()
                .then(function(users) {
                    $scope.users = users;
                })
        }
        loadAllUsers();

        function deleteUser(userIndex) {
            UserService.deleteUserById($scope.users[userIndex]._id)
                .then(function() {
                    console.log("The user index is", userIndex);
                    console.log("Delete the user");
                    loadAllUsers();
                })
        }

    }

})();