/**
 * Created by yixing on 11/15/15.
 */
"use strict";

var uuid = require('node-uuid');

module.exports = function(app, model) {

    app.get('/api/assignment/user/:userId/form', function(req, res) {
        //var userId = req.params.userId;
        //res.json(model.FindFormByUserId(userId));
        model.FindFormByUserId(req.params.userId, req.body).then(function(forms){
            res.json(forms);
        })
    });


    app.get('/api/assignment/form/:formId', function(req, res) {
        //var formId = req.params.formId;
        //res.json(model.FindById(formId));
        model.FindById(req.params.formId, req.body).then(function(form) {
            res.json(form);
        })
    });

    app.get('/api/assignment/form', function (req, res) {
        //res.json(model.FindAll());
        model.FindAll().then(function(forms) {
            res.json(forms);
        })
    });


    app.delete('/api/assignment/form/:formId', function(req, res){
        //var formId = req.params.formId;
        //res.json(model.Delete(formId));
        model.Delete(req.params.formId).then(function(form) {
            res.json(form);
        })
    });


    app.post('/api/assignment/user/:userId/form', function(req, res) {
        var newForm = req.body;
        //newForm.id = uuid.v1();
        newForm.userId = req.params.userId;
        //
        //res.json(model.Create(newForm));
        model.Create(newForm).then(function(form) {
            res.json(form);
        })
    });


    app.put('/api/assignment/form/:formId', function(req, res) {
        //var formId = req.params.formId;
        //var user = req.body;
        //res.json(model.Update(formId, user));
        model.Update(req.params.formId, req.body).then(function(form){
            res.json(form);
        })
    });


};