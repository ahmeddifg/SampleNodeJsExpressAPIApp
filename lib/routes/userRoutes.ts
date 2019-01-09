import {UserController} from "../controllers/userController"
import * as passport from "passport";

export class UserRoutes {

    public userRoutes(app) {
        app.route('/user').post(new UserController().RegisterUser);
        app.route('/user/login').post(new UserController().LoginUser);
        app.route('/user').get(passport.authenticate('cuser', { session: false }),new UserController().getUserProfile);
    }

}
