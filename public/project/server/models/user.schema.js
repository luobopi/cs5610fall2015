/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(mongoose) {
    //var ReviewSchema = require("./review.schema.js");
    //mongoose.model('Review', ReviewSchema);
    //var UserSchema = require("./user.schema.js");
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        birthday: Date,
        photo: String,
        reviews: [{type: mongoose.Schema.ObjectId, ref: "Review"}]
    }, {
        collection: "cs5610.project.user"
    });
};