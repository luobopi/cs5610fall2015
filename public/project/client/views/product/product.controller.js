/**
 * Created by yixing on 12/4/15.
 */
(function(){
    angular
        .module("MakeupApp")
        .controller("ProductController", ProductController);

    //function LoginController($rootScope, $scope, $location, UserService) {
    function ProductController($rootScope, $scope, $location, $routeParams, ReviewService, ProductService) {
        $scope.location = $location;
        //$scope.selectReview = selectReview;
        var productId = $routeParams.id;
        $scope.addReview = addReview;
        loadProduct();
        loadAllReviews();

        function loadProduct() {
            ProductService.selectProduct(productId, function (product) {
                console.log(product);
                $scope.product = product;
            })
        };

        function addReview() {
            if($rootScope.user == null) {
                alert("Please log in");
            } else {
                ReviewService.createReviewForProduct(productId, $rootScope.user._id, $scope.newReview)
                    .then(function() {
                        loadAllReviews();
                    })
            }
        }

        function loadAllReviews() {
            console.log("load all reviews");
            //var productId = $rootScope.product._id;
            console.log(productId);
            ReviewService.getReviewsFromProduct(productId).then(function(reviews) {
                console.log(reviews);
                $scope.reviews = reviews;
            })
        }
    }
})();