/**
 * Created by yixing on 12/13/15.
 */
"use strict";

(function(){

    angular
        .module("MakeupApp")
        .controller("AdminReviewController", AdminReviewController);

    function AdminReviewController($scope, $location, $rootScope, ReviewService) {
        $scope.$location = $location;
        $scope.adminDeleteReview = adminDeleteReview;

        function loadAllReviews() {
            console.log("load all reviews");
            ReviewService.getAllReviews()
                .then(function(reviews) {
                    $scope.adminReviews = reviews;
                })
        }
        loadAllReviews();

        function adminDeleteReview(reviewIndex) {
            ReviewService.deleteReviewById($scope.adminReviews[reviewIndex]._id)
                .then(function() {
                    console.log("The review index is", userIndex);
                    console.log("Delete the review");
                    loadAllReviews();
                })
        }

    }

})();