const mongoose = require('mongoose');

const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:'text'
    },
    author:{
        type:String,
        required:true,
        index:'text'
    },
    genre:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

BookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', BookSchema);