const  Comment  = require('../models/comment.model');

module.exports.updateComment = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    const {userId,postId} = request.body ;
    Comment.findOneAndUpdate({_id: request.params.id,user:userId,post:postId}, request.body, {new:true})
        // handles & returns successful update:
        .then(updatedComment  => response.json(updatedComment ))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deleteComment  = (request, response) => {
    Comment.findByIdAndDelete({ _id: request.params.id })
        .then(comment => response.json({comment}))
        .catch(err => response.json(err)) ;
}

module.exports.getAllComments = (request, response) => {
    Comment.find({})
        .then(Comments => response.json(Comments))
        .catch(err => response.json(err))
}

module.exports.getAllCommentsOfPost = async (request, response) => {
    // Comment.findOne({_id:request.params.id})
    //     .then(Comment  => response.json(Comment))
    //     .catch(err => response.json(err))

            try {
        
                const {postId} = request.body;                 
                const comments =await  Comment.find({post:postId}).sort({timestamp: 1});
                //console.log(messages)
                response.status(200).json({ comments });
            }
            catch(err){
                response.status(500).json({ message: 'An error occurred while retrieving comments.', err });
            }

}

// The method below is new
module.exports.createComment  = (request, response) => {
    const { content,postId,userId } = request.body;
    Comment.create({ 
        content, user:userId, post:postId
    })  
        .then(Comment  => response.json(Comment ))   
        .catch(err => response.status(400).json(err));
}