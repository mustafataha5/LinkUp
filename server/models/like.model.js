const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const likeSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    post:{type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    timestamp: { type: Date, default: Date.now }
    }
);
likeSchema.index({ user: 1, post: 1 }, { unique: true });
const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 