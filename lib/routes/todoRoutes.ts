import {Request, Response} from "express";
import {TodoController} from "../controllers/todoController";

export class Routes {
    public todoController: TodoController = new TodoController();

    public routes(app): void {
        app.route('/todo').post(this.todoController.addNewTodo);
        app.route('/todo').get(this.todoController.getall);

    }
}
