import {UserController} from "../controllers/userController"
import * as passport from "passport";

export class UserRoutes {

    public userRoutes(app) {
        app.route('/register').post(new UserController().RegisterUser);
        app.route('/user/login').post(new UserController().LoginUser);
        app.route('/profile').get(passport.authenticate('cuser', { session: false }),new UserController().getUserProfile);
    }

}
