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
    }

}