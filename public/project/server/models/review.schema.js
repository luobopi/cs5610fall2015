/**
 * Created by yixing on 12/4/15.
 */
"use strict";

module.exports = function(mongoose) {

    var reviewSchema = mongoose.Schema({
        brand: String,
        name: String,
        userId: mongoose.Schema.ObjectId,
        productId: mongoose.Schema.ObjectId,
        content: String
    },{
        collection: "cs5610.project.reviews"
    });

    return mongoose.model('Review', reviewSchema);
}