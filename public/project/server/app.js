/**
 * Created by yixing on 12/2/15.
 */
"use strict";

module.exports = function(app, mongoose, db) {
    var UserModel = require("./models/user.model.js")(app, mongoose, db);
    var FormModel = require("./models/form.model.js")(app, mongoose, db);
    var ProductModel = require("./models/product.model.js")(app, mongoose, db);


}