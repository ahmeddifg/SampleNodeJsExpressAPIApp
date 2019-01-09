import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/todoRoutes";
import {UserRoutes} from "./routes/userRoutes";
import {UserModel} from './models/User';
import * as mongoose from "mongoose";
import * as passport from "passport";
import * as passportJWT from "passport-jwt";


const MongoUrl = "mongodb://up0tsrjqrjrspqu:5I2lg7jJN9LM2jH3ZQwQ@b7axifqoutl17dn-mongodb.services.clever-cloud.com:27017/b7axifqoutl17dn";

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
        mongoose.Promise = global.Promise;
        mongoose.connect(MongoUrl, {useNewUrlParser: true});
    }


    private configJwtStrategy() {
        let ExtractJwt = passportJWT.ExtractJwt;
        let JwtStrategy = passportJWT.Strategy;
        let jwtOptions = {jwtFromRequest: null, secretOrKey: null, authScheme: null};
        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        jwtOptions.secretOrKey = 'mySecrectVal3';
        jwtOptions.authScheme = 'cuser';
        var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            // console.log('payload received', jwt_payload);
            UserModel.findById(jwt_payload._id, (err, user) => {
                console.log(user);
                if (user) {
                    next(user,null);
                } else {
                    next(null, false);
                }
            });
        });
        passport.use('cuser', strategy);

    }

}

export default new app().app;
