/**
 * Created by yixing on 12/2/15.
 */
"use strict";

var model = null;

module.exports = function(mongoose) {
    //var ReviewSchema = require("./review.schema.js");
    //mongoose.model("Review", )
    var ProductSchema = mongoose.Schema({
        brand: String,
        productName: String,
        price: Number,
        picture: String
        //reviews: [{type: mongoose.Schema.ObjectId, ref:"Review"}]
    },{
        collection: "cs5610.project.product"
    });

    if (model == null) {
        model = mongoose.model("Product", ProductSchema);
    }
    //return mongoose.model("Product", ProductSchema);
    return model;
};