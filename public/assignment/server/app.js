/**
 * Created by yixing on 11/15/15.
 */
module.exports = function (app, mongoose, db) {
    var UserModel = require("./models/user.model.js")(app, mongoose, db);
    var FormModel = require("./models/form.model.js")(app, mongoose, db);

    require("./services/user.service.js")(app, UserModel);
    require("./services/form.service.js")(app, FormModel);
    require("./services/field.service.js")(app, FormModel);
    require("./services/data.service.js")(app, UserModel, FormModel);
};