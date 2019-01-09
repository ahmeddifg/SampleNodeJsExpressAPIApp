"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
class UserController {
    RegisterUser(req, res) {
        let user = new User_1.UserModel(req.body);
        user.save((err, user) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(user);
        });
    }
    LoginUser(req, res) {
        let body = _.pick(req.body, ['email', 'password']);
        // console.log(body);
        User_1.UserModel.find(body).then(user => {
            if (user && user.length > 0) {
                var payload = { _id: _.pick(user[0], ['_id']) };
                var token = jwt.sign(payload, 'mySecrectVal3', { expiresIn: '1m' });
                res.json({ message: "okay", token: token });
            }
            else {
                return res.status(200).send({ message: "login Error!!" });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    }
    getUserProfile(req, res) {
        // UserModel.findById(req.body).then((user)=>{
        res.json(_.pick(req, ['user']));
        // });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map