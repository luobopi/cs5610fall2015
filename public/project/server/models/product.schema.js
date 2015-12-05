/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(mongoose) {
    var ReviewSchema = require("./review.schema.js");
    return mongoose.Schema({
        brand: String,
        name: String,
        price: Number,
        reviews: [ReviewSchema]
    })
}