/**
 * Created by yixing on 11/15/15.
 */
"use strict";

(function() {
    angular
        .module("MakeupApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findAllReviewsByUser: findAllReviewsByUser
        };
        return service;

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();

            $http.get('/api/project/user?username=' + username + '&password=' + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get('/api/project/admin/user')
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            console.log("project register");
            $http.post('/api/project/user', user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(id) {
            var deferred = $q.defer();
            $http.delete('/api/project/user/' + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(id, user) {
            var deferred = $q.defer();
            $http.put('/api/project/user/' + id, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllReviewsByUser(id) {
            var deferred = $q.defer();
            $http.get('/api/project/user/'+ id +'/reviews')
                .success(function(response) {
                    console.log("UserService find all reviews by user id");
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }
}) ();