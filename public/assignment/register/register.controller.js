/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {

    angular
        .module("BuilderFormApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.register = register;

        function register() {
            var user = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };
            UserService.createUser(user, function(user) {
                $rootScope.user = user;
                $location.path('/profile')
            })
        }

    }
})();