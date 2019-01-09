"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../models/Todo");
class TodoController {
    addNewTodo(req, res) {
        let newContact = new Todo_1.TodoModel(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getall(req, res) {
        Todo_1.TodoModel.find({}).then((todos) => {
            res.status(200).send(todos);
        }).catch(err => res.send(err));
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todoController.js.map