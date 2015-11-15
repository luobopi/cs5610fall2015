/**
 * Created by yixing on 11/15/15.
 */
"use strict";

module.exports = function(app, model) {

    app.post('/api/assignment/user', function(req, res) {
        var user = req.body;
        res.json(model.Create(user));
    });

    app.get('/api/assignment/user', function(req, res) {
        var username = req.param('username');
        var password = req.param('password');

        if(username == null && password == null) {
            res.json(model.FindAll());
        } else if (password == null) {
            res.json(model.FindUserByUsername(username));
        } else {
            res.json(model.FindUserByCredentials({
                username: username,
                password: password
            }));
        }
    });

    app.get('/api/assignment/user/:id', function(req, res) {
        var id = req.params.id;
        res.json(model.FindById(id));
    });


    app.put('/api/assignment/user/:id', function(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.Update(id, user));
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        var id = req.params.id;
        res.json(model.Delete(id));
    });
};