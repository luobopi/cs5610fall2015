/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(mongoose) {
    var ProductSchema = require("./product.schema.js");
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        reviews: [ProductSchema],
        loves: [String]
    }, {
        collection: "cs5610.project.user"
    });
};