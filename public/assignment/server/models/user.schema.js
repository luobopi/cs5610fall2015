/**
 * Created by yixing on 11/29/15.
 */
"use strict";

module.exports = function(mongoose) {
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String
    }, {
        collection: "cs5610.assignment.user"
    });
};