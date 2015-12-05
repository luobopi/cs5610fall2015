/**
 * Created by yixing on 12/4/15.
 */
(function(){
    angular
        .module("MakeupApp")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var model = this;
        model.$location = $location;
    }
})();