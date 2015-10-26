/**
 * Created by yixing on 10/25/15.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when('/home',
                    {
                        templateUrl: './home/home.view.html'
                    })
                .when('/login',
                    {
                        templateUrl: './login/login.view.html',
                        controller: 'LoginController'
                    })
                .when('/register',
                    {
                        templateUrl: './register/register.view.html',
                        controller: 'RegisterController'
                    })
                .when('/profile',
                    {
                        templateUrl: './profile/profile.view.html',
                        controller: 'profileController'
                    })
                .when('/form',
                    {
                        templateUrl: './form/form.view.html',
                        controller: 'formController'
                    })
                .otherwise({
                    redirectTo: '/home'
                })
        })
})();