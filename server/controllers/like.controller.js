

// should there be a like controller? 
// Like table is a 3rd table....


const  Like  = require('../models/like.model');


module.exports.deleteLike = (request, response) => {
    const like_id = request.params.id 
    Like.findByIdAndDelete({ _id:like_id })
        .then(like => response.json({like}))
        .catch(err => response.json(err))
}

module.exports.getAllLikes = (request, response) => {
    Like.find({})
        .then(Likes => response.json(Likes))
        .catch(err => response.json(err))
}

module.exports.getLike = (request, response) => {
    Like.findOne({_id:request.params.id})
        .then(Like => response.json(Like))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createLike = (request, response) => {
    const { users_id, posts_id } = request.body;
    Like.create({ 
        user:users_id, post:posts_id
    })  
        .then(like => response.json({like}))   
        .catch(err => response.status(400).json(err));
}