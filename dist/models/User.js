"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
    email: {
        type: String,
        required: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
        // validate: passwordValidator
    }
});
exports.UserModel = mongoose.model("User", User);
//# sourceMappingURL=User.js.map