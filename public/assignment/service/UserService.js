/**
 * Created by yixing on 10/25/15.
 */

"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var currentUsers = [];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return service;


        function findUserByUsernameAndPassword(username, password, callback) {
            currentUsers.forEach(function (item, index, array) {
                if (item.username === username && item.password === password) {
                    callback(item);
                }
            });
            callback(null);
        }

        function findAllUsers(callback) {
            callback(currentUsers);
        }

        function createUser(newUser, callback) {
            newUser.id = guid();
            currentUsers.push(newUser);
            callback(currentUsers);
        }

        function deleteUserById(userId, callback) {
            currentUsers.forEach(function (item, index, array) {
                if(item.id === userId) {
                    currentUsers.splice(index, 1)
                }
            });
            callback(currentUsers);
        }

        function updateUser(userId, user, callback) {
            currentUsers.forEach(function (item, index, array) {
                if(item.id === userId) {
                    for (var key in user) {
                        item[key] = user[key]
                    }
                    //item.username = user.username;
                    //item.password = user.password;
                    //item.firstname = user.firstname;
                    //item.lastname = user.lastname;
                    //item.email = user.email;
                    callback(item);
                }
            });
            callback(null);
        }


        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();