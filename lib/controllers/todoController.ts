import * as mongoose from 'mongoose';
import {TodoModel} from '../models/Todo';
import {Request, Response} from 'express';

export class TodoController {

    public addNewTodo(req: Request, res: Response) {
        let newContact = new TodoModel(req.body);

        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getall(req: Request , res : Response){
        TodoModel.find({}).then((todos)=>{
             res.status(200).send(todos);
        }).catch(err=>res.send(err))
    }
}
