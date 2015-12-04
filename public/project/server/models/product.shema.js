/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(mongoose) {
    return mongoose.Schema({
        brand: String,
        name: String,
        price: Number,
    })
}