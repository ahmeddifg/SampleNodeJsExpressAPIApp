"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// @ts-ignore
const port = process.env.PORT | 8080;
app_1.default.listen(port, () => {
    console.log("Hello server is running here!!! on port" + port);
});
//# sourceMappingURL=server.js.map