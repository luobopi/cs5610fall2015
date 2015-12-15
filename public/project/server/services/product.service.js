/**
 * Created by yixing on 12/5/15.
 */
"use strict";

module.exports = function(app, model) {
    app.post('/api/project/search', function(req, res) {
        console.log(req.body);
        model.FindByBrand(req.body.key).then(function(products) {
            res.json(products);
        })
    });

    app.get('/api/project/search',function(req, res) {
        model.FindAll().then(function(products) {
            res.json(products);
        })
    });

    app.get('/api/project/product/:productId/review', function(req, res) {
        model.FindAllReviewsByProductId(req.params.productId).then(function(review) {
            res.json(review);
        })
    });

    app.post('/api/project/user/:userId/product/:productId', function(req, res) {
        var newReview = {};
        newReview.content = req.body.review;
        newReview.userId = req.params.userId;
        newReview.productId = req.params.productId;
        model.AddReview(newReview).then(function(review) {
            res.json(review);
        })
    });

    app.post('/api/project/product', function(req, res) {
        model.Create(req.body).then(function(product){
            res.json(product);
        })
    });

    app.get('/api/project/review/:reviewId', function(req, res) {
        model.FindReviewById(req.params.reviewId).then(function(review) {
            res.json(review);
        })
    });

    app.delete('/api/project/user/:userId/product/:productId/review/:reviewId',function(req,res){
        model.DeleteReview(req.params.productId, req.params.userId, reviewId).then(function(review) {
            res.json(review);
        })
    });

    app.get('/api/project/product/:productId', function(req, res) {
        console.log(req.params.productId);
        model.FindById(req.params.productId).then(function(product) {
            res.json(product);
        })
    });

    app.get('/api/project/admin/reviews', function(req, res) {
        console.log("find all reviews");
        model.FindAllReviews().then(function(reviews) {
            res.json(reviews);
        })
    });

    app.delete('/api/project/admin/review/:reviewId', function(req, res) {
        model.DeleteReviewByReviewId(req.params.reviewId).then(function(review) {
            res.json(review);
        })
    });

    app.delete('/api/project/admin/product/:productId', function(req, res) {
        model.Delete(req.params.productId).then(function(product) {
            res.json(product);
        })
    });

    app.get('/api/project/admin/product', function(req, res) {
        model.FindAll().then(function(products) {
            res.json(products);
        })
    })

}