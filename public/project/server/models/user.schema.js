/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(mongoose) {
    var ReviewSchema = require("./review.schema.js");
    var UserSchema = require("./user.schema.js");
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        birthday: Data,
        reviews: [ReviewSchema._id],
        friends: [UserSchema._id]
    }, {
        collection: "cs5610.project.user"
    });
};