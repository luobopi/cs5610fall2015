/**
 * Created by yixing on 12/4/15.
 */
"use strict";

(function() {
    angular
        .module("MakeupApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService, ReviewService) {
        $scope.$location = $location;
        var user = $rootScope.user;
        $scope.update = update;
        $scope.updateReview = updateReview;
        $scope.deleteReview = deleteReview;
        $scope.selectReview = selectReview;



        if (user) {
            if (user.username) {
                $scope.username = user.username
            }
            if (user.password) {
                $scope.password = user.password
            }
            if (user.firstName) {
                $scope.firstName = user.firstName
            }
            if (user.lastName) {
                $scope.lastName = user.lastName
            }
            if (user.email) {
                $scope.email = user.email
            }
        }

        function loadAllReview() {
            console.log("load all reviews");
            console.log(user._id);
            UserService.findAllReviewsByUser(user._id)
                .then(function(reviews) {
                    $scope.reviews = reviews;
                })
        }
        loadAllReview();

        function update() {

            var newUser = {
                username: $scope.username,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email
            };
            UserService.updateUser(user._id, newUser, function(user) {
                if (user!=null) {
                    console.log("update");
                    $rootScope.user = user;
                    $location.url('/profile');
                }
                //console.log("update");
                //$rootScope.user = user;
            });
            //$location.url('/profile');
        }



        function updateReview() {
            //console.log($scope.review);
            var newReview = {};
            for (var key in $scope.review) {
                newReview[key] = $scope.review[key];
            }
            ReviewService.updateReviewFromUser(user._id, $scope.review._id, newReview)
                .then(function(review) {
                    $scope.review = review;
                    loadAllReview();
                });
        }

        function deleteReview(reviewIndex) {
            ReviewService.deleteReviewFromUser(user._id, $scope.reviews[reviewIndex]._id)
                .then(function() {
                    console.log("The review index are", reviewIndex);
                    loadAllReview();
                })
        }

        function selectReview(reviewIndex) {
            $scope.review = {};
            for(var key in $scope.reviews[reviewIndex]) {
                $scope.review[key] = $scope.reviews[reviewIndex][key];
            }
            console.log($scope.review._id)
        }

    }
})();