/**
 * Created by yixing on 11/15/15.
 */
module.exports = function (app) {
    var UserModel = require("./models/user.model.js")(app);
    var FormModel = require("./models/form.model.js")(app);

    require("./services/user.service.js")(app, UserModel);
    require("./services/form.service.js")(app, FormModel);
    require("./services/field.service.js")(app, FormModel);
};