const  Post= require('../models/post.model');

module.exports.updatePost = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    Post.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        // handles & returns successful update:
        .then(updatedPost  => response.json(updatedPost ))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deletePost  = (request, response) => {
    Post.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.getAllPosts = (request, response) => {
    Post.find({})
        .then(posts => response.json({posts:posts}))
        .catch(err => response.json(err))
}

module.exports.getAllPostOfUser  = (request, response) => {
    Post.findOne({_id:request.params.id})
        .then(Post  => response.json(Post))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createPost  = (request, response) => {
    const {user,content} = request.body
    Post.create({user,content})  
        .then(post  => response.json({post:post}))   
        .catch(err => response.status(400).json(err));
}