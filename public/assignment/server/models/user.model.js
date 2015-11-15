/**
 * Created by yixing on 11/15/15.
 */
"use strict";

module.exports = function(app) {
    var users = require("./user.mock.json");
    var uuid = require("node-uuid");

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials

    };
    return api;

    function Create(user) {
        user.id = uuid.v1();
        users.push(user);
        return users
    }

    function FindAll() {
        return users;
    }

    function FindById(id) {
        for (var i = 0; i < users.length; ++i) {
            var user = users[i];
            if (user.id == id)
                return user;
        }
        return null;
    }

    function Update(id, newUser) {
        var user = FindById(id);
        for(var k in newUser) {
            user[k] = newUser[k];
        }
        return user;
    }

    function Delete(id) {
        for (var i = 0; i < users.length; ++i) {
            var user = users[i];
            if (user.id == id) {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }

    function FindUserByUsername(username) {
        for (var i = 0; i < users.length; ++i) {
            var user = users[i];
            if (user.username == username) {
                return user;
            }
        }
        return null;
    }

    function FindUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;
        for (var i = 0; i < users.length; ++i) {
            var user = users[i];
            if (user.username == username && user.password == password)
                return user;
        }
        return null;
    }
}