
const mongoose = require('mongoose');

// a self join is required: a follower and a followed are USERS in the same User table
const FollowSchema = new mongoose.Schema({
    follower: { type: Integer,
        required: [true, "A follower user is required."]
    },
    followed: { type: Integer,
        required: [true, "A followed user is required."]
    }
}, 
    { timestamps: true }
);
module.exports.Follow = mongoose.model('Follow', FollowSchema);