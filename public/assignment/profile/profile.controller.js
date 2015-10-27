/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
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
            if (user.firstname) {
                $scope.firstname = user.firstname
            }
            if (user.lastname) {
                $scope.lastname = user.lastname
            }
            if (user.email) {
                $scope.email = user.email
            }
        }

        function update() {

            var newUser = {
                username: $scope.username,
                password: $scope.password,
                firstname: $scope.fisrtname,
                lastname: $scope.lastname,
                email: $scope.email
            };
            UserService.updateUser(user.id, newUser, function(user) {
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