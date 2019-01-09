"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = require("../controllers/todoController");
class Routes {
    constructor() {
        this.contactController = new todoController_1.ContactController();
    }
    routes(app) {
        app.route('/').get((req, res) => {
            res.status(200).send({ message: 'this is get request' });
        });
        // Contact
        app.route('/contact')
            // GET endpoint
            .get((req, res) => {
            // Get all contacts
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        })
            // POST endpoint
            .post(this.contactController.addNewContact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map