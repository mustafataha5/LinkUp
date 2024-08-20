const { Comment } = require('../models/comment.model');

module.exports.updateComment = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    Comment.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        // handles & returns successful update:
        .then(updatedComment  => response.json(updatedComment ))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deleteComment  = (request, response) => {
    Comment.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.getAllComments = (request, response) => {
    Comment.find({})
        .then(Comments => response.json(Comments))
        .catch(err => response.json(err))
}

module.exports.getComment  = (request, response) => {
    Comment.findOne({_id:request.params.id})
        .then(Comment  => response.json(Comment))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createComment  = (request, response) => {
    const { message, user_id, post_id } = request.body;
    Comment.create({ 
        message, user_id, post_id
    })  
        .then(Comment  => response.json(Comment ))   
        .catch(err => response.status(400).json(err));
}