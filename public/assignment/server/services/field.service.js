/**
 * Created by yixing on 11/15/15.
 */
"use strict";

module.exports = function(app, model) {
    app.get('/api/assignment/form/:formId/field', function(req, res) {
        //var formId = req.params.formId;
        //var form = model.FindById(formId);
        //if (form != null) {
        //    res.json(form.fields)
        //} else {
        //    res.json(null);
        //}
        model.FindById(req.params.formId).then(function(form) {
            res.json(form.fields);
        })
    });

    app.get('/api/assignment/form/:formId/field/:fieldId',
        function(req, res){
            //var formId = req.params.formId;
            //var fieldId = req.params.fieldId;
            //res.json(model.FindFieldById(formId, fieldId));
            model.FindFieldById(req.params.formId, req.params.fieldId).then(function(field) {
                res.json(field);
            })
        });

    app.delete('/api/assignment/form/:formId/field/:fieldId',
        function(req, res) {
            //var formId = req.params.formId;
            //var fieldId = req.params.fieldId;
            //res.json(model.DeleteField(formId, fieldId));
            model.DeleteField(req.params.formId, req.params.fieldId).then(function(fields) {
                res.json(fields);
            })
        });

    app.post('/api/assignment/form/:formId/field', function(req, res) {
        model.AddField(req.params.formId, req.body).then(function(fields) {
            res.json(fields);
        });
        //var formId = req.params.formId;
        //var field = req.body;
        //res.json(model.AddField(formId, field));
    });

    app.put('/api/assignment/form/:formId/field/:fieldId',
        function(req, res) {
            //res.json(model.UpdateField(
            //    req.params.formId,
            //    req.params.fieldId,
            //    req.body));
            model.UpdateField(
                req.params.formId,
                req.params.fieldId,
                req.body).then(function(fields) {
                    res.json(fields);
                }
            )
        });
}