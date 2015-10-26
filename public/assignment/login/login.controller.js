/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.location = $location;
        $scope.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(
                $scope.username,
                $scope.password,
                function(user) {
                    $rootScope.currentUser = user;
                    $location.url('/profile');
                }
            );
        }
    }
})();