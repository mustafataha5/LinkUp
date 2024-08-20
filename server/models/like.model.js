const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const likeSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    post:{type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    timestamp: { type: Date, default: Date.now }
    }
);

const Like = mongoose.model('Like', likeSchema);
module.exports = Like; 