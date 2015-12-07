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
            getReview: getReview,
            getReviewsFromProduct: getReviewsFromProduct
            //deleteReviewFromProduct: deleteReviewFromProduct,
            //updateReviewForProduct: updateReviewForProduct
        };
        return service;

        function createReviewForProduct(productId, userId, review) {
            var deferred = $q.defer();
            $http.post('/api/project/user/'+ userId +'/product/'+ productId, {review:review})
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getReview(reviewId) {
            var deferred = $q.defer();
            $http.get('/api/project/review/' + reviewId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getReviewsFromProduct(productId) {
            var deferred = $q.defer();
            $http.get('/api/project/product/' + productId + '/review')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteReviewFromProduct(userId, productId, reviewId) {

        }
    }
})();