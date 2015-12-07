/**
 * Created by yixing on 12/5/15.
 */
"use strict";

(function() {
    angular
        .module("MakeupApp")
        .factory("ProductService", ProductService);

    function ProductService($http, $q) {
        var service = {
            findProduct: findProduct,
            addProduct: addProduct,
            selectProduct: selectProduct,
        };
        return service;

        function findProduct(key, callback) {
            console.log(key);
            $http.post('/api/project/search', {key:key})
                .then(function(response) {
                    console.log(response);
                    callback(response.data);
                })
            //$http({
            //    method: "POST",
            //    url: '/api/project/search',
            //    data: {key: key}
            //}).success(function(response) {
            //    callback(response)
            //})
        }

        function addProduct(newProduct, callback) {
            $http.post('/api/project/product', newProduct)
                .then(function(response) {
                    console.log(response);
                    callback();
                })
        }

        function selectProduct(productId, callback) {
            $http.get('/api/project/product/'+ productId)
                .then(function(response){
                console.log(response);
                callback(response.data[0]);
            })
        }

    }

})();