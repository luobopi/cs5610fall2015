/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;

    }

})();