/**
 * Created by yixing on 12/4/15.
 */
"use strict";

var model = null;

module.exports = function(mongoose) {

    var reviewSchema = mongoose.Schema({
        brand: String,
        name: String,
        userId: {type: mongoose.Schema.ObjectId, ref: "User"},
        productId: {type:mongoose.Schema.ObjectId, ref: "Product"},
        content: String
    },{
        collection: "cs5610.project.reviews"
    });

    if(model == null) {
        model = mongoose.model('Review', reviewSchema);
    }
    return model;
}