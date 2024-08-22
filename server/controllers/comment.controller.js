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

module.exports.getAllCommentsOfPost = async (req, res) => {
    const { postId } = req.params; // Assuming postId is provided in the URL
  
    try {
      // Find all comments for the given postId
      const comments = await Comment.find({ post: postId })
        .populate('user', 'firstName lastName imageUrl') // Populate user info (adjust fields as needed)
        .sort({ timestamp: -1 }); // Sort by timestamp, newest first
  
      if (!comments) {
        return res.status(404).json({ message: 'No comments found for this post' });
      }
  
      // Return the comments in the response
      res.status(200).json({ comments });
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Server error while fetching comments' });
    }
  };

// The method below is new
module.exports.createComment  = (request, response) => {
    const { content,postId,userId } = request.body;
    Comment.create({ 
        content, user:userId, post:postId
    })  
        .then(Comment  => response.json(Comment ))   
        .catch(err => response.status(400).json(err));
}