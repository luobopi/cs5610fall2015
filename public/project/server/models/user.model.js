/**
 * Created by yixing on 12/4/15.
 */
"use strict";

var q = require("q");

module.exports = function(app, mongoose, db) {
    //var uuid = require("node-uuid");
    var ReviewModel = require("./review.schema.js")(mongoose);
    var UserModel = require("./user.schema.js")(mongoose);
    var ProductModel = require('./product.schema.js')(mongoose);
    //var ReviewModel = require



    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials,
        DeleteAll: DeleteAll,
        //AddReview: AddReview,
        UpdateReview: UpdateReview,
        DeleteReview: DeleteReview,
        FindAllReviewBy: FindAllReview
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

    function FindAll() {
        var deferred = q.defer();

        UserModel.find({}, function(err, users) {
            deferred.resolve(users);
        });
        return deferred.promise;
    }


    function FindById(id) {
        var deferred = q.defer();
        UserModel.findOne({_id: id}, function(err, user) {
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


    function Delete(id) {
        var deferred = q.defer();
        UserModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status)
            }
        });
        return deferred.promise;
    }


    function FindUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({"username": username}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }


    function FindUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
            "username": credentials.username,
            "password": credentials.password
        }, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function DeleteAll() {
        var deferred = q.defer();
        UserModel.find({}).remove(function() {
            deferred.resolve()
        });
        return deferred.promise;
    }

    function UpdateReview(userId, reviewId, newReview) {
        var deferred = q.defer();
        ReviewModel.findOne({_id: reviewId, userId: userId}, function(err, foundReview) {
            for(var k in newReview) {
                foundReview[k] = newReview[k];
            }
            foundReview.save(function(err, foundReview) {
                console.log("saved review");
                console.log(foundReview);
                deferred.resolve(foundReview);
            });
        });
        return deferred.promise;
    }

    function DeleteReview(userId, reviewId) {
        var deferred = q.defer();
        ReviewModel.findOne({_id: reviewId}, function(err, review) {
            var reviewUserId = review.userId;
            if(reviewUserId == userId) {
                ReviewModel.remove({_id: reviewId}, function(err, status) {
                    if(err)
                        console.log(err);
                    deferred.resolve(status);
                });
            }
        });
        return deferred.promise;
    }

    function FindAllReview(id) {
        var deferred = q.defer();
        ReviewModel.find({userId: id})
            .populate('productId')
            .exec(function(err, reviews) {
            if(err)
                console.log(err);
            deferred.resolve(reviews);
        });

        //ReviewModel.find({userId:id}, function(err, reviews) {
        //    if(err)
        //        console.log(err);
        //    deferred.resolve(reviews)
        //});
        return deferred.promise;
    }

}