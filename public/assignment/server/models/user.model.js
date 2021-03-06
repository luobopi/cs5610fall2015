/**
 * Created by yixing on 11/15/15.
 */
"use strict";

var q = require("q");

module.exports = function(app, mongoose, db) {
    var users = require("./user.mock.json");
    var uuid = require("node-uuid");
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);



    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials,
        DeleteAll: DeleteAll

    };
    return api;

    function Create(user) {
        var deferred = q.defer();
        //user.id = uuid.v1();
        UserModel.find({"username": user.username}, function(err, users) {
            if (users.length > 0) {
                console.alert("This user alread exists, please create a new username");
            } else {
                UserModel.create(user, function(err, saveUser) {
                    if (err)
                        console.log(err);
                    deferred.resolve(saveUser);
                });
            }
        });
        return deferred.promise;
    }

    //function Create(user) {
    //    user.id = uuid.v1();
    //    users.push(user);
    //    return users
    //}

    //function FindAll() {
    //    return users;
    //}

    function FindAll() {
        var deferred = q.defer();

        UserModel.find(function(err, users) {
            deferred.resolve(users);
        })
    }

    //function FindById(id) {
    //    for (var i = 0; i < users.length; ++i) {
    //        var user = users[i];
    //        if (user.id == id)
    //            return user;
    //    }
    //    return null;
    //}

    function FindById(id) {
        var deferred = q.defer();
        UserModel.findOne({id: id}, function(err, user) {
            deferred.resolve(user);
        })

    }

    function Update(id, newUser) {
        var deferred = q.defer();
        //console.log(newUser);
        console.log(id);
        UserModel.findOne({_id:id}, function(err, foundUser){
            if(err)
                console.log(err);
            console.log(foundUser);
            for(var k in newUser) {
                foundUser[k] = newUser[k];
            }
            console.log(foundUser);
            foundUser.save(function(err, foundUser) {
                //console.log(foundUser);
                deferred.resolve(foundUser);
            })
        });
        return deferred.promise;
    }

    //function Update(id, newUser) {
    //    var user = FindById(id);
    //    for(var k in newUser) {
    //        user[k] = newUser[k];
    //    }
    //    return user;
    //}

    function Delete(id) {
        var deferred = q.defer();
        UserModel.findOne({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status)
            }
        });
        return deferred.promise;
    }

    //function Delete(id) {
    //    for (var i = 0; i < users.length; ++i) {
    //        var user = users[i];
    //        if (user.id == id) {
    //            users.splice(i, 1);
    //            break;
    //        }
    //    }
    //    return users;
    //}

    function FindUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({"username": username}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    //function FindUserByUsername(username) {
    //    for (var i = 0; i < users.length; ++i) {
    //        var user = users[i];
    //        if (user.username == username) {
    //            return user;
    //        }
    //    }
    //    return null;
    //}

    function FindUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
            "username": credentials.username,
            "password": credentials.password
        }, function(err, user) {
            deferred.resolve(user);
        })
        return deferred.promise;
    }

    //function FindUserByCredentials(credentials) {
    //    var username = credentials.username;
    //    var password = credentials.password;
    //    for (var i = 0; i < users.length; ++i) {
    //        var user = users[i];
    //        if (user.username == username && user.password == password){
    //            console.log("The user id is", user.id);
    //            return user;
    //        }
    //    }
    //    return null;
    //}

    function DeleteAll() {
        var deferred = q.defer();
        UserModel.find({}).remove(function() {
            deferred.resolve()
        });
        return deferred.promise;
    }
}