import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Todo = new Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    savedBy: {
        type: String
    }
    ,
    completedAt: {
        type: Number,
        default: null
    }

});

export const TodoModel = mongoose.model('Todo', Todo);
