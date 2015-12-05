/**
 * Created by yixing on 12/4/15.
 */
(function(){
    angular
        .module("MakeupApp")
        .controller("MainController", MainController);

    function MainController($location) {
        var model = this;
        model.$location = $location;
    }
})();