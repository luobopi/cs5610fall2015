/**
 * Created by yixing on 12/4/15.
 */
"use strict";

var q = require("q");

module.exports = function(app, mongoose, db) {
    var ProductSchema = require('./product.schema.js');
    var ProductModel = mongoose.model('ProductModel', ProductSchema);
    var ReviewSchema = require('./review.schema.js');
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        FindByBrand: FindByBrand,
        FindByName: FindByName,
        Update: Update,
        Delete: Delete,
        AddReview: AddReview,
        DeleteReview: DeleteReview,
        UpdateReview: UpdateReview,
        FindReviewById: FindReviewById

    };
    return api;

    function Create(newProduct) {
        var deferred = q.defer();
        console.log("create a new product in models");
        ProductModel.create(newProduct, function(err, saveProduct) {
            if (err)
                concole.log(err);
            console.log("Create new product!");
            deferred.resolve(saveProduct);
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        ProductModel.find(function(err, products) {
            if(err){
                console.log(err);
            } else{
                console.log("Find all products");
                deferred.resolve(products);
            }
        });
        return deferred.promise;
    }

    function FindById(id) {
        var deferred = q.defer();
        ProductModel.find({_id:id}, function(err, product) {
            if (err) {
                console.log(err);
            } else{
                console.log("Find the product by Id");
                deferred.resolve(product);
            }
        });
        return deferred.promise;
    }

    function FindByBrand(brand) {
        var deferred = q.defer();
        ProductModel.find({brand: brand}, function(err, products) {
            if (err)
                console.log(err);
            console.log("Find the product by brand");
            deferred.resolve(products);
        });
        return deferred.promise;
    }

    function FindByName(name) {
        var deferred = q.defer();
        ProductModel.find({name: name}, function(err, product) {
            if(err)
                console.log(err);
            console.log("Find the product by name");
            deferred.resolve(product);
        });
        return deferred.promise;
    }

    function Update(id, newProduct) {
        var deferred = q.defer();
        console.log("Update the product");
        console.log(id);
        concole.log(newProduct);
        ProductModel.findOne({_id:id}, function(err, foundProduct) {
            if(err)
                console.log(err);
            console.log(foundProduct);
            for (var k in newProduct) {
                foundProduct[k] = newProduct[k];
            }
            foundProduct.save(function(err, product) {
                if(err)
                    console.log(err);
                deferred.resolve(product);
            });
        });
        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();
        ProductModel.delete({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                ProductModel.find(function(err, products) {
                    deferred.resolve(products);
                });
            }
        });
        return deferred.promise;
    }

    function AddReview(productId, userId, newReview) {
        var deferred = q.defer();
        var newReviewWithId = new ReviewModel(newReview);
        newReviewWithId.userId = userId;
        ProductModel.findOne({_id:productId}, function(err, product) {
            if(err)
                console.log(err);
            product.reviews.push(newReviewWithId._id);
            product.save(function(err, saved) {
                deferred.resolve(product.reviews);
            });
        });
        return deferred.promise;
    }

    function DeleteReview(productId, userId, reviewId) {
        var deferred = q.defer();
        ProductModel.findOne({_id: productId}, function(err, foundProduct) {
            var reviewIndex = foundProduct.reviews.findIndex(function(item, index, array) {
                return item === reviewId;
            });
            if(foundProduct.reviews[reviewIndex].userId === userId) {
                foundProduct.reviews.slice(reviewIndex,1);
                foundProduct.save(function(err, status) {
                    deferred.resolve(foundProduct.reviews);
                });
            }
        });
        return deferred.promise;
    }

    function UpdateReview(productId, userId, reviewId, newReview) {
        var deferred = q.defer();
        ProductModel.findOne({_id: productId}, function(err, foundProduct) {
            var reviewIndex = foundProduct.reviews.findIndex(function(item, index, array) {
                return item === reviewId;
            });
            if(foundProduct.reviews[reviewIndex].userId === userId) {
                ReviewModel.findOne({_id: reviewId}, function(err, foundReview) {
                    for(var k in newReview) {
                        foundReview[k] = newReview[k];
                    }
                    foundReview.save(function(err, saved) {
                        deferred.resovle(foundReview);
                    });
                });
            }
        });
        return deferred.promise;
    }

    function FindReviewById(reviewId) {
        var deferred = q.defer();
        ReviewModel.findOne({_id: reviewId}, function(err, review){
            if(err)
                console.log(err)
            deferred.resolve(review);
        });
        return deferred.promise;
    }

}