/**
 * Created by yixing on 12/5/15.
 */
"use strict";

module.exports = function(app, model) {

    app.post('/api/project/user', function(req, res) {
        model.Create(req.body).then(function(user) {
            res.json(user);
        })
    });

    app.get('/api/project/user', function(req, res) {
        var username = req.param('username');
        var password = req.param('password');

        if(username == null && password == null) {
            model.FindAll().then(function(users) {
                res.json(users)
            })
        } else if (password == null) {
            model.FindUserByUsername(username).then(function(user) {
                res.json(user)
            })
        } else {
            model.FindUserByCredentials({
                username: username,
                password: password
            }).then(function(user) {
                res.json(user)
            })
        }
    });

    app.get('/api/project/user/:id', function(req, res) {
        model.FindById(req.params.id).then(function(user) {
            res.json(user);
        })
    });


    app.put('/api/project/user/:id', function(req, res) {
        model.Update(req.params.id, req.body).then(function(user) {
            res.json(user);
        });
    });

    app.delete('/api/project/user/:id', function(req, res){
        model.Delete(req.params.id).then(function(user) {
            res.json(user);
        })
    });

    app.put('/api/project/user/:userId/reviews/:reviewId', function(req, res) {
        model.UpdateReview(req.params.userId, req.params.reviewId, req.body).then(function(review) {
            res.json(review);
        })
    })

    app.delete('/api/project/user/:userId/reviews/:reviewId', function(req, res) {
        model.DeleteReview(req.params.userId, req.params.reviewId).then(function(status){
            res.json(status);
        })
    });

    app.get('/api/project/user/:userId/reviews', function(req, res) {
        model.FindAllReviewBy(req.params.userId).then(function(reviews) {
            //console.log("find user reviews");
            //console.log(reviews);
            res.json(reviews);
        })
    });

    app.get('/api/project/admin/user', function(req, res) {
        model.FindAll().then(function(users) {
            res.json(users);
        })
    })
};