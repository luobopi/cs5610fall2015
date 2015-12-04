/**
 * Created by yixing on 12/3/15.
 */
"use strict";

(function() {
    angular
        .module("MakeupApp")
        .config(function($routeProvider){
            $routeProvider
                .when('/home',
                {
                    templateUrl: './views/home/home.view.html'
                })
                .when('/login',
                {
                    templateUrl: './views/login/login.view.html',
                    controller: 'LoginController'
                })
                .when('/register',
                {
                    templateUrl: './views/register/register.view.html',
                    controller: 'RegisterController'
                })
                .when('/profile',
                {
                    templateUrl: './views/profile/profile.view.html',
                    controller: 'ProfileController'
                })
                .when('/product',
                {
                    templateUrl: './views/product/product.view.html',
                    controller: 'ProductController'
                })
                //.when("/user/:userId/form/:formId/fields",
                //{
                //    templateUrl: './views/field/field.view.html',
                //    controller: 'FieldController',
                //    controllerAs: 'model'
                //})
                .otherwise({
                    redirectTo: '/home'
                })
        })
})();