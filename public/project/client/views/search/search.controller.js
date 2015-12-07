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
        $scope.searchInSearch = searchInSearch;
        $scope.selectProduct = selectProduct;

        if($rootScope.searchContent) {
            console.log($rootScope.searchContent);
            ProductService.findProduct($rootScope.searchContent);

        }
        function searchProduct() {
            $rootScope.searchContent = $scope.searchContent;
            $location.path('/search');
        }

        function searchInSearch() {
            console.log($scope.content);
            ProductService.findProduct($scope.content, function(data){
                console.log(data);
                $scope.products = data;
            })

        }

        function selectProduct(productIndex) {
            $scope.product = {};
            for(var key in $scope.products[productIndex]) {
                $scope.product[key] = $scope.products[productIndex][key]
            }
            console.log($scope.product._id);
            $location.path('/product/'+ $scope.product._id);
        }

    }
})();