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
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
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
                .when('/search',
                {
                    templateUrl:'./views/search/search.view.html',
                    controller: 'SearchController'
                })
                .when('/admin',
                {
                    templateUrl: './views/admin/admin.view.html',
                    controller: 'AdminController'
                })
                .otherwise({
                    redirectTo: '/home'
                })
        })
})();