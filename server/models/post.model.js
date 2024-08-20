const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const postSchema = mongoose.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 

