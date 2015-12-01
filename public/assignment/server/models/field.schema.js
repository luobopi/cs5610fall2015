/**
 * Created by yixing on 11/29/15.
 */
"use strict";

module.exports = function (mongoose) {

    var fieldSchema = mongoose.Schema({
        "label": String,
        "type": {
            type: String,
            enum: [
                'TEXT', 'TEXTAREA', 'RADIOS', 'CHECKBOXES', 'SELECT', 'DATE', 'EMAIL'
            ]
        },
        "options": [{
            "label": String,
            "value": String
        }],
        "placeholder": String,
    });

    return fieldSchema;
};