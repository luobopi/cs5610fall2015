/**
 * Created by yixing on 12/4/15.
 */
"use strict";

module.exports = function(mongoose) {
    return mongoose.Schema({
        brand: String,
        name: String,
        userId: mongoose.Schema.ObjectId,
        productId: mongoose.Schema.ObjectId,
        content: String
    })
}