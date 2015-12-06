/**
 * Created by yixing on 12/4/15.
 */
(function(){
    angular
        .module("MakeupApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        var model = this;
        model.$location = $location;
        $scope.$location = $location;
        console.log($scope.$location.url())
        console.log($scope.$location.url() != '/home')
    }
})();