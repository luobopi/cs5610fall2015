/**
 * Created by yixing on 12/3/15.
 */
"use strict";

(function(){

    angular
        .module("MakeupApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }



})();