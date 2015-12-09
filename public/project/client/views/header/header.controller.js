/**
 * Created by yixing on 12/3/15.
 */
"use strict";

(function(){

    angular
        .module("MakeupApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $scope.logout = logout;
        //$scope.user = $rootScope.user

        $rootScope.$watch("user", function(newValue, oldValue) {
            $scope.user = $rootScope.user
            console.log($scope.user)
        });

        function logout() {
            $rootScope.user = null;
        }


    }



})();