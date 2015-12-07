/**
 * Created by yixing on 12/5/15.
 */
"use strict";

module.exports = function(app, model) {
    app.post('/api/project/search', function(req, res) {
        console.log(req.body)
        model.FindByBrand(req.body.key).then(function(products) {
            res.json(products);
        })
    });

    app.get('/api/project/search',function(req, res) {
        model.FindAll().then(function(products) {
            res.json(products);
        })
    });

    app.get('/api/project/product/:productId', function(req, res) {
        model.FindAllReviewsByProductId(req.params.productId).then(function(review) {
            res.json(review);
        })
    });

    app.post('/api/project/user/:userId/product/:productId/', function(req, res) {
        var newReview = req.body;
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
    })

    app.delete('/api/project/user/:userId/product/:productId/review/:reviewId',function(req,res){
        model.DeleteReview(req.params.productId, req.params.userId, reviewId).then(function(review) {
            res.json(review);
        })
    })


}