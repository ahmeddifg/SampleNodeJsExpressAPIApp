"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const passport = require("passport");
class UserRoutes {
    userRoutes(app) {
        app.route('/user').post(new userController_1.UserController().RegisterUser);
        app.route('/user/login').post(new userController_1.UserController().LoginUser);
        app.route('/user').get(passport.authenticate('cuser', { session: false }), new userController_1.UserController().getUserProfile);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map