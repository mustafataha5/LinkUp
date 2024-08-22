
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const commentSchema = mongoose.Schema({
    content: { type: String, required: true },
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    post:{type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    timestamp: { type: Date, default: Date.now }
    }
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment; 