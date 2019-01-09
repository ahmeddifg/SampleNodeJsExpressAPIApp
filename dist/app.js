"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes_1 = require("./routes/todoRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const User_1 = require("./models/User");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const MongoUrl = "mongodb://up0tsrjqrjrspqu:5I2lg7jJN9LM2jH3ZQwQ@b7axifqoutl17dn-mongodb.services.clever-cloud.com:27017/b7axifqoutl17dn";
class app {
    constructor() {
        this.routePrv = new todoRoutes_1.Routes();
        this.userRoutes = new userRoutes_1.UserRoutes();
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
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MongoUrl, { useNewUrlParser: true });
    }
    configJwtStrategy() {
        let ExtractJwt = passportJWT.ExtractJwt;
        let JwtStrategy = passportJWT.Strategy;
        let jwtOptions = { jwtFromRequest: null, secretOrKey: null, authScheme: null };
        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        jwtOptions.secretOrKey = 'mySecrectVal3';
        jwtOptions.authScheme = 'cuser';
        var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            // console.log('payload received', jwt_payload);
            User_1.UserModel.findById(jwt_payload._id, (err, user) => {
                console.log(user);
                if (user) {
                    next(user, null);
                }
                else {
                    next(null, false);
                }
            });
        });
        passport.use('cuser', strategy);
    }
}
exports.default = new app().app;
//# sourceMappingURL=app.js.map