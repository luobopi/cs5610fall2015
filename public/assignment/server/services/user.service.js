/**
 * Created by yixing on 11/15/15.
 */
"use strict";

module.exports = function(app, model) {

    app.post('/api/assignment/user', function(req, res) {
        //var user = req.body;
        //res.json(model.Create(user));
        model.Create(req.body).then(function(user) {
            res.json(user);
        })
    });

    app.get('/api/assignment/user', function(req, res) {
        var username = req.param('username');
        var password = req.param('password');

        if(username == null && password == null) {
            //res.json(model.FindAll());
            model.FindAll().then(function(users) {
                res.json(users)
            })
        } else if (password == null) {
            //res.json(model.FindUserByUsername(username));
            model.FindUserByUsername(username).then(function(user) {
                res.json(user)
            })
        } else {
            //res.json(model.FindUserByCredentials({
            //    username: username,
            //    password: password
            //}));
            model.FindUserByCredentials({
                username: username,
                password: password
            }).then(function(user) {
                res.json(user)
            })
        }
    });

    app.get('/api/assignment/user/:id', function(req, res) {
        //var id = req.params.id;
        //res.json(model.FindById(id));
        model.FindById(req.params.id).then(function(user) {
            res.json(user);
        })
    });


    app.put('/api/assignment/user/:id', function(req, res) {
        model.Update(req.params.id, req.body).then(function(user) {
            res.json(user);
        });
        //var id = req.params.id;
        //var user = req.body;
        //res.json(model.Update(id, user));
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        //var id = req.params.id;
        //res.json(model.Delete(id));
        model.Delete(req.params.id).then(function(user) {
            res.json(user);
        })
    });
};