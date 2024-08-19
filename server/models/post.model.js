const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    message: { type: String,
            required: [true, "A message is required."]
     }
}, 
    { timestamps: true }
);
module.exports.Post = mongoose.model('Post', PostSchema);