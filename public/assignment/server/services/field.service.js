/**
 * Created by yixing on 11/15/15.
 */
"use strict";

module.exports = function(app, model) {
    app.get('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        var form = model.FindById(formId);
        if (form != null) {
            res.jsonp(form.fields)
        } else {
            res.jsonp(null);
        }
        //res.json(model.FindById(formId).fields);
    });

    app.get('/api/assignment/form/:formId/field/:fieldId',
        function(req, res){
            var formId = req.params.formId;
            var fieldId = req.params.fieldId;
            res.json(model.FindFieldById(formId, fieldId));
        });

    app.delete('/api/assignment/form/:formId/field/:fieldId',
        function(req, res) {
            var formId = req.params.formId;
            var fieldId = req.params.fieldId;
            res.json(model.DeleteField(formId, fieldId));
        });

    app.post('/api/assignment/form/:formId/field', function(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(model.AddField(formId, field));
    });

    app.put('/api/assignment/form/:formId/field/:fieldId',
        function(req, res) {
            res.json(model.UpdateField(
                req.params.formId,
                req.params.fieldId,
                req.body));
        });
}