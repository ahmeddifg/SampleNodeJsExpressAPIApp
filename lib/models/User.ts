import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


const User = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1
    },
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


export const UserModel = mongoose.model("User", User);
