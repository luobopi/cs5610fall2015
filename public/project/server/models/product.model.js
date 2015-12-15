/**
 * Created by yixing on 12/4/15.
 */
"use strict";

var q = require("q");

module.exports = function(app, mongoose, db) {
    var ProductModel = require('./product.schema.js')(mongoose);
    var ReviewModel = require('./review.schema.js')(mongoose);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        FindByBrand: FindByBrand,
        FindByName: FindByName,
        Update: Update,
        Delete: Delete,
        AddReview: AddReview,
        //DeleteReview: DeleteReview,
        UpdateReview: UpdateReview,
        FindReviewById: FindReviewById,
        FindAllReviewsByProductId: FindAllReviewsByProductId,
        FindAllReviews: FindAllReviews,
        DeleteReviewByReviewId: DeleteReviewByReviewId

    };
    return api;

    function Create(newProduct) {
        var deferred = q.defer();
        console.log("create a new product in models");
        ProductModel.create(newProduct, function(err, saveProduct) {
            if (err)
                console.log(err);
            console.log("Create new product!");
            deferred.resolve(saveProduct);
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        ProductModel.find({}, function(err, products) {
            if(err){
                console.log(err);
            } else{
                console.log("Find all products");
                deferred.resolve(products);
            }
        });
        return deferred.promise;
    }

    function DeleteReviewByReviewId(reviewId) {
        var deferred = q.defer();
        ReviewModel.remove({_id: reviewId}, function(err, status) {
            if(err)
                console.log(err);
            deferred.resolve(status);
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
        console.log(brand);
        var deferred = q.defer();
        ProductModel.find({$or:[{brand: {'$regex': brand}}, {productName: {'$regex': brand}}]}, function(err, products) {
            if (err)
                console.log(err);
            console.log("Find the product by brand");
            deferred.resolve(products);
        });
        return deferred.promise;
    }

    function FindByName(name) {
        var deferred = q.defer();
        ProductModel.find({productName: name}, function(err, product) {
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
        ProductModel.remove({_id:id}, function(err, status) {
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

    function AddReview(newReview) {
        console.log(newReview);
        var deferred = q.defer();
        var newReviewWithId = new ReviewModel(newReview);
        //newReviewWithId.userId = userId;
        //console.log(productId);
        //ProductModel.findOne({_id:productId}, function(err, product) {
        //    if(err)
        //        console.log(err);
        //    product.reviews.push(newReviewWithId._id);
        //    product.save(function(err, saved) {
        //        deferred.resolve(product.reviews);
        //    });
        //});
        ReviewModel.create(newReviewWithId,function(err, review) {
            if(err)
                console.log(err);
            deferred.resolve(review);
        });
        return deferred.promise;
    }

    //function DeleteReview(productId, userId, reviewId) {
    //    var deferred = q.defer();
    //    ReviewModel.remove({_id: reviewId},)
    //    ProductModel.findOne({_id: productId}, function(err, foundProduct) {
    //        var reviewIndex = foundProduct.reviews.findIndex(function(item, index, array) {
    //            return item === reviewId;
    //        });
    //        if(foundProduct.reviews[reviewIndex].userId === userId) {
    //            foundProduct.reviews.slice(reviewIndex,1);
    //            foundProduct.save(function(err, status) {
    //                deferred.resolve(foundProduct.reviews);
    //            });
    //        }
    //    });
    //    return deferred.promise;
    //}

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

    function FindAllReviewsByProductId(productId) {
        var deferred = q.defer();
        //ProductModel.findOne({_id: productId}, function(err, product) {
        //    if(err)
        //        console.log(err);
        //    product.find({}, function(err, reviews) {
        //        if(err)
        //            console.log(err);
        //        deferred.resolve(reviews);
        //    });
        //});
        ReviewModel.find({productId: productId})
            .populate('userId')
            .exec(function(err, reviews) {
            if(err)
                console.log(err);
            console.log("find all reviews from" + productId);
            deferred.resolve(reviews);
        });
        return deferred.promise;
    }

    function FindAllReviews() {
        var deferred = q.defer();
        ReviewModel.find({})
            .populate('userId')
            .populate('productId')
            .exec(function(err, reviews) {
                if(err)
                    console.log(err);
                console.log("find all reviews from");
                deferred.resolve(reviews);
            });
        return deferred.promise;
    }

}