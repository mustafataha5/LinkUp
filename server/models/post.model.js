const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const postSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: { type: String, required: [true,"Content is required!!"] },
    imageUrl:{type: String, default:""} , 
    timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 

