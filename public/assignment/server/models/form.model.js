/**
 * Created by yixing on 11/15/15.
 */
"use strict";

var q = require("q");

module.exports = function(app, mongoose, db) {
    var FormSchema = require('./form.schema.js')(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var FieldSchema = require('./field.schema.js')(mongoose);
    var FieldModel = mongoose.model('FieldModel', FieldSchema);


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindFormByTitle: FindFormByTitle,
        FindFormByUserId: FindFormByUserId,
        AddField: AddField,
        DeleteField: DeleteField,
        FindFieldById: FindFieldById,
        UpdateField: UpdateField,
        DeleteAll: DeleteAll

    };
    return api;

    function Create(newForm) {
        var deferred = q.defer();
        console.log(newForm);
        FormModel.create(newForm, function(err, savedForm) {
            if (err)
                console.log(err)
            console.log("Created new form!!!");
            deferred.resolve(savedForm);
        });
        return deferred.promise;
    }

    //function Create(form) {
    //    forms.push(form);
    //    return forms;
    //}

    function FindAll() {
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    //function FindAll() {
    //    console.log(forms);
    //    console.log("The server find all forms");
    //    return forms;
    //}

    function FindById(id) {
        var deferred = q.defer();
        FormModel.findOne({_id:id}, function(err, form){
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    //function FindById(id) {
    //    for (var i = 0; i < forms.length; ++i) {
    //        var form = forms[i];
    //        if (form.id == id)
    //            return form;
    //    }
    //    return null;
    //}


    // need to confirm
    function Update(id, newForm) {
        var deferred = q.defer();
        console.log(id);
        console.log(newForm);
        FormModel.findOne({_id: id}, function(err, foundForm) {
            if(err)
                console.log(err);
            console.log(foundForm);
            for(var k in newForm) {

                foundForm[k] = newForm[k];
            }

            foundForm.save(function(err, foundForm) {
                FormModel.find(function(err,forms) {
                    deferred.resolve(forms);
                });
            });
        });
        return deferred.promise;
    }

    //function Update(id, newForm) {
    //    var form = FindById(id);
    //    for(var k in newForm) {
    //        form[k] = newForm[k];
    //    }
    //    return form;
    //}

    function Delete(id) {
        var deferred = q.defer();
        FormModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                FormModel.find(function(err, forms) {
                    deferred.resolve(forms);
                });
            }
        });
        return deferred.promise;
    }

    //function Delete(id) {
    //    for (var i = 0; i < forms.length; ++i) {
    //        var form = forms[i];
    //        if (form.id == id) {
    //            forms.splice(i, 1);
    //            break;
    //        }
    //    }
    //    return forms;
    //}

    function FindFieldById(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function(err, form) {
            var fields = form.fields.find(function(item, index, array) {
                return item._id === fieldId;
            });
            deferred.resolve(fields[0]);
        });
        return deferred.promise;
    }

    //function FindFieldById(formId, fieldId) {
    //    var form = FindById(formId);
    //    var fields = form.fields;
    //    if (!fields)
    //        return null;
    //    for (var i = 0; i < fields.length; ++i) {
    //        var field = fields[i];
    //        if (field.id == fieldId)
    //            return field;
    //    }
    //    return null;
    //}

    function FindFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({"title": title}, function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    //function FindFormByTitle(title) {
    //    for (var i = 0; i < forms.length; ++i) {
    //        var form = forms[i];
    //        if (form.title == title) {
    //            return form;
    //        }
    //    }
    //    return null;
    //}

    function FindFormByUserId(userId) {
        console.log(userId);
        var deferred = q.defer();
        FormModel.find({"userId": userId}, function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    //function FindFormByUserId(userId) {
    //    return forms.filter(function(item, index, array) {
    //        return item.userId.toString() === userId;
    //    });
    //}

    function AddField(formId, newField) {
        // assume newField doesn't have an id
        var deferred = q.defer();
        //newField.id = uuid.v1();
        var newFieldWithId = new FieldModel(newField);
        FormModel.findOne({_id: formId}, function(err, foundForm) {
            if (err)
                console.log(err);
            foundForm.fields.push(newFieldWithId);
            foundForm.save(function(err, saved) {
                deferred.resolve(foundForm.fields);
            });
        });
        return deferred.promise;
    }

    //function AddField(formId, newField) {
    //    var form = FindById(formId);
    //    newField.id = uuid.v1();
    //    console.log("New field id is", newField.id);
    //    form.fields.push(newField);
    //    console.log(form);
    //    return form.fields;
    //}

    function DeleteField(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function(err, foundForm) {
            var fieldIndex = foundForm.fields.findIndex(function(item, index, array) {
                return item._id === fieldId;
            });
            foundForm.fields.splice(fieldIndex, 1);
            foundForm.save(function(err, saved) {
                deferred.resolve(foundForm.fields);
            });
        });
        return deferred.promise;
    }

    //function DeleteField(formId, fieldId) {
    //    var form = FindById(formId);
    //    var fieldIndex = form.fields.findIndex(function(item, index, array) {
    //        console.log("The server delete field id is:", fieldId);
    //        console.log("The server delete field index is:", fieldIndex);
    //        return item.id === fieldId;
    //    });
    //
    //    form.fields.splice(fieldIndex, 1);
    //    return form.fields;
    //}

    function UpdateField(formId, fieldId, newField) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function(err, foundForm) {
            var field = foundForm.fields.find(function(item, index, array) {
                return item._id === fieldId;
            });
            for(var k in newField) {
                field[k] = newField[k];
            }
            foundForm.save(function(err, saved) {
                deferred.resolve(foundForm.fields);
            });
        });
        return deferred.promise;
    }

    //function UpdateField(formId, fieldId, newField) {
    //    var field = FindFieldById(formId, fieldId);
    //    for(var k in newField) {
    //        field[k] = newField[k];
    //    }
    //}

    function DeleteAll() {
        var deferred = q.defer();
        FormModel.find({}).remove(function() {
            deferred.resolve()
        });
        return deferred.promise;
    }

}