

// like take is a 3rd table: there shoudl NOT be any 

const mongoose = require('mongoose');

// this is the 3rd table as a product of Users-likes and Posts-likes tables 
const LikeSchema = new mongoose.Schema({
    users_id: { type: Integer,
        required: [true, "A user is required to like a post."]
    },
    posts_id: { type: Integer,
        required: [true, "A post is required."]
    },
}, 
    { timestamps: true }
);

module.exports.Like = mongoose.model('Like', LikeSchema);