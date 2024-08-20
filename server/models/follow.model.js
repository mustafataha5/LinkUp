
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const followSchema = mongoose.Schema({
    followed:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    follower:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    timestamp: { type: Date, default: Date.now }
    }
)
const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow; 

