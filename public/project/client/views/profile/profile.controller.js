/**
 * Created by yixing on 12/4/15.
 */
"use strict";

(function() {
    angular
        .module("MakeupApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        var user = $rootScope.user;
        if (user) {
            if (user.username) {
                $scope.username = user.username
            }
            if (user.password) {
                $scope.password = user.password
            }
            if (user.firstName) {
                $scope.firstName = user.firstName
            }
            if (user.lastName) {
                $scope.lastName = user.lastName
            }
            if (user.email) {
                $scope.email = user.email
            }
        }

        function update() {

            var newUser = {
                username: $scope.username,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email
            };
            UserService.updateUser(user._id, newUser, function(user) {
                if (user!=null) {
                    console.log("update");
                    $rootScope.user = user;
                    $location.url('/profile');
                }
                //console.log("update");
                //$rootScope.user = user;
            });
            //$location.url('/profile');
        }

    }
})();