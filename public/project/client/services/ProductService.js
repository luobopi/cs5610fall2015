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
            findProduct: findProduct
        };
        return service;

        function findProduct(key) {
            $http.post('/api/project/search', {key:key})
                .then(function(response) {
                    console.log(response);
                })
        }

    }

})();