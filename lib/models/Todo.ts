import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

 const Todo =  Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }

});

export const TodoModel = mongoose.model('Todo', Todo);
