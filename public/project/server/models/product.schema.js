/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(mongoose) {
    //var ReviewSchema = require("./review.schema.js");
    //mongoose.model("Review", )
    return mongoose.Schema({
        brand: String,
        name: String,
        price: Number,
        reviews: [{type: mongoose.Schema.ObjectId, ref:"Review"}]
    },{
        collection: "cs5610.project.product"
    })
};