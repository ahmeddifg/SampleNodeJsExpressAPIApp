import * as mongoose from 'mongoose';
import {TodoModel} from '../models/Todo';
import {Request, Response} from 'express';
// import * as passport from "passport";

export class TodoController {

    public addNewTodo(req:Request, res:Response) {
        console.log("Htllooooo");
        console.log(req.body);
        // let newTodo = new TodoModel(req.body);
        // newTodo.save((err, todo) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(todo);
        // });
    }

    public getall(req: Request, res: Response) {
        TodoModel.find({}).then((todos) => {
            res.status(200).send(todos);
        }).catch(err => res.send(err))
    }
}
