/**
 * Created by yixing on 12/4/15.
 */
"use strict";

(function() {

    angular
        .module("MakeupApp")
        .controller("LoginController", LoginController);

    //function LoginController($rootScope, $scope, $location, UserService) {
    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.location = $location;
        $scope.login = login;

        function login() {

            UserService.findUserByUsernameAndPassword(
                $scope.username,
                $scope.password
            ).then(function(user) {
                    if (user){
                        console.log("The username and password are correct!");
                        $rootScope.user = user;
                        $location.url('/profile');
                    } else {
                        console.log("The username or password dose not exist");
                        $location.url('/login');
                    }
                });
            //$location.url('/profile');
        }
    }
})();