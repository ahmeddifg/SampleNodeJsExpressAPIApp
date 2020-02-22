import {Request, Response} from "express";
import {UserModel} from "../models/User"
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";
import to from 'await-to-ts'

export class UserController {

    public async RegisterUser(req: Request, res: Response) {
        let salt, password, error;
        [error, salt] = await to(bcrypt.genSalt(10));
        [error, password] = await to(bcrypt.hash(req.body.password, salt));
        req.body.password = password;
        let user = new UserModel(req.body);
        user.save((err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
            res.status(200).send(user);
        });
    }

    public  LoginUser(req: Request, res: Response) {

        let body = _.pick(req.body, ['email', 'password']);
        UserModel.find({email: body.email}).then(async (user) => {
            if (user && user.length > 0) {
              let result,err;
                [err,result] = await to( bcrypt.compare(body.password, _.pick(user[0], ['password'])));
                if(result) {
                    console.log(body.password+" "+err+"  "+ _.pick(user[0], ['password']));
                    return res.status(403).send({message: "login Error!!"});
                }

                var payload = user[0]._id;
                var token = jwt.sign({token: payload}, 'mySecrectVal');
                res.json({message: "okay", token: token});
            } else {
                return res.status(403 ).send({message: "login Error!!"});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    public getUserProfile(req: Request, res: Response) {
        console.log("in profile");
        // UserModel.findById(req.body).then((user)=>{
        res.json(_.pick(req, ['user']));
        // });
    }
}
