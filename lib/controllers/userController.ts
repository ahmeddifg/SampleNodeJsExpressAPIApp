import {Request, Response} from "express";
import {UserModel} from "../models/User"
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

export class UserController {

    public RegisterUser(req: Request, res: Response) {
        let user = new UserModel(req.body);
        user.save((err, user) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(user);
        });
    }

    public LoginUser(req: Request, res: Response) {
        let body = _.pick(req.body, ['email', 'password']);
        // console.log(body);
        UserModel.find(body).then(user => {
            if (user && user.length > 0) {
                var payload = {_id: _.pick(user[0],['_id'])};
                var token = jwt.sign(payload, 'mySecrectVal3', { expiresIn: '1m' });
                res.json({message: "okay", token: token});
            } else {
                return res.status(200).send({message: "login Error!!"});
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    public getUserProfile(req:Request, res:Response){
        // UserModel.findById(req.body).then((user)=>{
            res.json( _.pick(req,['user']));
        // });
    }
}
