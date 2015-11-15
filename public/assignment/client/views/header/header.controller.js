/**
 * Created by yixing on 10/25/15.
 */

"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }



})();