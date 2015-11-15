/**
 * Created by yixing on 11/15/15.
 */
"use strict";

module.exports = function(app) {
    var forms = require('./form.mock.json');
    var uuid = require("node-uuid");

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
        UpdateField: UpdateField

    };
    return api;

    function Create(form) {
        forms.push(form);
        return forms;
    }

    function FindAll() {
        return forms;
    }

    function FindById(id) {
        for (var i = 0; i < forms.length; ++i) {
            var form = forms[i];
            if (form.id == id)
                return form;
        }
        //return null;
    }

    function Update(id, newForm) {
        var form = FindById(id);
        for(var k in newForm) {
            form[k] = newForm[k];
        }
        return form;
    }

    function Delete(id) {
        for (var i = 0; i < forms.length; ++i) {
            var form = forms[i];
            if (form.id == id) {
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    function FindFieldById(formId, fieldId) {
        var form = findByFormId(formId);
        var fields = form.fields;
        if (!fields)
            return null;
        for (var i = 0; i < fields.length; ++i) {
            var field = fields[i];
            if (field.id == fieldId)
                return field;
        }
        return null;
    }

    function FindFormByTitle(title) {
        for (var i = 0; i < forms.length; ++i) {
            var form = forms[i];
            if (form.title == title) {
                return form;
            }
        }
        return null;
    }

    function FindFormByUserId(userid) {}

    function AddField(formId, newField) {
        var form = FindById(formId);
        newField.id = uuid.v1();
        form.fields.push(newField);
        return form.fields;
    }

    function DeleteField(formId, fieldId) {
        var form = FindById(formId);
        var fieldIndex = form.fields.findIndex(function(item, index, array) {
            return item.id === fieldId;
        });

        form.fields.splice(fieldIndex, 1);
        return form.fields;
    }

    function UpdateField(formId, fieldId, newField) {
        var field = FindFieldById(formId, fieldId);
        for(var k in newField) {
            field[k] = newField[k];
        }
    }

}