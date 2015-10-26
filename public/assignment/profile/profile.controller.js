/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {
    angular
        .module("BuilderFormApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        var user = $rootScope.ser;

        function update() {
            var newUser = {
                username: $scope.username,
                password: $scope.password,
                firstname: $scope.fisrtname,
                lastname: $scope.lastname,
                email: $scope.email
            };
            UserService.updateUser(user.userid, newUser, function(user) {
                $scope.user = user;
                $rootScope.user = user;
            });
            $location.url('/profile');
        }

    }
})();