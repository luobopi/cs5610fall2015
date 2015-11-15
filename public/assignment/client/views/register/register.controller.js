/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
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
                email: $scope.email
            };
            UserService.createUser(user).then(function(user) {
                if (user) {
                    $rootScope.user = user;
                    $location.url('/profile');
                }
            })
        }

    }
})();
