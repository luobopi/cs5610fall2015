/**
 * Created by yixing on 11/15/15.
 */
"use strict";

var uuid = require('node-uuid');

module.exports = function(app, model) {

    app.get('/api/assignment/user/:userId/form', function(req, res) {
        var userId = req.params.userId
        res.json(model.FindFormByUserId(userId));
    });


    app.get('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId
        res.json(model.FindById(formId));
    });

    app.get('/api/assignment/form', function (req, res) {
        res.json(model.FindAll());
    });


    app.delete('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        res.json(model.Delete(formId));
    });


    app.post('/api/assignment/user/:userId/form', function(req, res) {
        var newForm = req.body;
        newForm.id = uuid.v1();
        newForm.userId = Number(req.params.userId);

        res.json(model.Create(newForm));
    });


    app.put('/api/assignment/form/:formId', function(req, res) {
        var formId = req.params.formId;
        var user = req.body;
        res.json(model.Update(formId, user));
    });


};