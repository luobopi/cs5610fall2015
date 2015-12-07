/**
 * Created by yixing on 12/6/15.
 */
"use strict";

(function(){

    angular
        .module("MakeupApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, ProductService) {
        $scope.$location = $location;
        $scope.add = add;
        var admin = $rootScope.user;
        if(!admin || admin.admin == false){
            console.log("can not add project");
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