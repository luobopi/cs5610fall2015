/**
 * Created by yixing on 12/5/15.
 */
"use strict";

(function() {
    angular
        .module("MakeupApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {
        var service = {
            createReviewForProduct: createReviewForProduct,
            getReviewFromProduct: getReviewFromProduct,
            getReviewsFromProduct: getReviewsFromProduct,
            deleteReviewFromProduct: deleteReviewFromProduct,
            updateReviewForProduct: updateReviewForProduct
        };
        return service;

        //function createReviewForProduct(productId, review)
    }
})();