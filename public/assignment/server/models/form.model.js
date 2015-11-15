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
        FindField: FindField,
        UpdataField: UpdateField

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

    function FindField() {}

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

    function AddField() {}

    function DeleteField() {}

    function UpdateField() {}

}