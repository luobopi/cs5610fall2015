/**
 * Created by yixing on 12/13/15.
 */
"use strict";

(function(){

    angular
        .module("MakeupApp")
        .controller("AdminProductController", AdminProductController);

    function AdminProductController($scope, $location, $rootScope, ProductService) {
        $scope.$location = $location;
        $scope.adminDeleteProduct = adminDeleteProduct;
        $scope.add = add;

        function loadAllProduct() {
            console.log("load all products");
            ProductService.getAllProducts(function(products) {
                $scope.adminProducts = products;
            })
        }
        loadAllProduct();

        function adminDeleteProduct(reviewIndex) {
            ProductService.deleteProduct($scope.adminReviews[reviewIndex]._id, function() {
                loadAllProduct();
            })
        }

        function add() {

            var newProduct = {
                brand: $scope.brand,
                productName: $scope.productName,
                price: $scope.price,
                picture: $scope.picture

            };
            ProductService.addProduct(newProduct, function() {
                //if (user!=null) {
                //    console.log("update");
                //    $rootScope.user = user;
                //    $location.url('/profile');
                //}
                console.log("add new product");
                $scope.brand = null;
                $scope.productName = null;
                $scope.price = null;
                $scope.picture = null;
                //console.log("update");
                //$rootScope.user = user;
            });
            //$location.url('/profile');
        }

    }

})();