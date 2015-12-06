/**
 * Created by yixing on 12/5/15.
 */
"use strict";

(function() {

    angular
        .module("MakeupApp")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $scope, $location, ProductService) {
        $scope.$location = $location;
        $scope.searchProduct = searchProduct;

        if($rootScope.searchContent) {
            console.log($rootScope.searchContent);
            ProductService.findProduct($rootScope.searchContent);

        }
        function searchProduct() {
            $rootScope.searchContent = $scope.searchContent;
            $location.path('/search');
        }

    }
})();