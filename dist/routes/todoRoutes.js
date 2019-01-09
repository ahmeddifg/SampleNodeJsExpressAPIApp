"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = require("../controllers/todoController");
class Routes {
    constructor() {
        this.todoController = new todoController_1.TodoController();
    }
    routes(app) {
        app.route('/todo').post(this.todoController.addNewTodo);
        app.route('/todo').get(this.todoController.getall);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=todoRoutes.js.map