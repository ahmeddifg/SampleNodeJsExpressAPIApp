import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/todoRoutes";
import {UserRoutes} from "./routes/userRoutes";
import {UserModel} from './models/User';
import * as mongoose from "mongoose";
import * as passport from "passport";
import * as passportJWT from "passport-jwt";


const MongoUrl = "mongodb://localhost:27017/tododb";

class app {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public userRoutes: UserRoutes = new UserRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.userRoutes.userRoutes(this.app);
        this.mongoSetup();
        this.configJwtStrategy();
        this.app.use(passport.initialize());
        // this.app.use(express.json());


    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private mongoSetup(): void {
        mongoose.connect(MongoUrl, {useNewUrlParser: true});
    }


    private configJwtStrategy() {
        let ExtractJwt = passportJWT.ExtractJwt;
        let JwtStrategy = passportJWT.Strategy;
        let jwtOptions = {jwtFromRequest: null, secretOrKey: null, authScheme: null};
        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        jwtOptions.secretOrKey = 'mySecrectVal';
        jwtOptions.authScheme = 'cuser';
        var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            UserModel.findById(jwt_payload.token, (err, user) => {
                console.log(jwt_payload.token);
                if (err)
                    console.log(err);
                if (user) {
                    next( null, user);
                } else {
                    next(null, false);
                }
            });
        });
        passport.use('cuser', strategy);

    }

}

export default new app().app;
