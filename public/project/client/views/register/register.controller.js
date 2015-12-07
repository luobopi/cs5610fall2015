/**
 * Created by yixing on 12/4/15.
 */
"use strict";

(function() {

    angular
        .module("MakeupApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.register = register;
        $scope.login = register;

        function register() {
            console.log("register");
            var user = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                admin: $scope.admin
            };
            UserService.createUser(user).then(function(user) {
                if (user) {
                    console.log("register");
                    console.log(user.admin);
                    $rootScope.user = user;
                    $location.url('/profile');
                }
            })
        }

    }
})();