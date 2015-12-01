/**
 * Created by yixing on 11/30/15.
 */
"use strict";

module.exports = function(app, UserModel, FormModel) {

    app.get('/api/assignment/data', function(req, res) {
        var users = require('../models/user.mock.json');
        var forms = require('../models/form.mock.json');


        UserModel.DeleteAll().then(function(){
            FormModel.DeleteAll().then(function() {
                users.forEach(function(element, index, array) {
                    UserModel.Create(element).then(function(user) {
                        console.log("mock user create success");
                        forms.forEach(function(everyForm, index, array) {
                            if(everyForm.userId == element.id) {
                                everyForm.userId = user._id;
                                FormModel.Create(everyForm).then(function(form) {
                                    if(everyForm.fields) {
                                        everyForm.fields.forEach(function(everyField, idx, arr) {
                                            FormModel.AddField(form._id,everyField).then(function() {

                                            })
                                        })
                                    }
                                })
                            }
                        })
                    })
                })
            })
        });
        res.json(null);
    })
}