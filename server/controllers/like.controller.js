

// should there be a like controller? 
// Like table is a 3rd table....


const  Like  = require('../models/like.model');


module.exports.deleteLike = (request, response) => {
    const like_id = request.params.id 
    Like.findByIdAndDelete({ _id:like_id })
        .then(like => response.json({like}))
        .catch(err => response.json(err))
}

module.exports.deleteLike2 = (req, res) => {
    const { userid, postid } = req.params; // Extract userId and postId from request params
  
    // Find and delete the like based on both userId and postId
    Like.findOneAndDelete({ user: userid, post: postid })
      .then(like => {
        if (!like) {
          // If no like is found, send a 404 response
          return res.status(404).json({ message: 'Like not found' });
        }
        // If like is found and deleted, send a success response
        res.status(200).json({ message: 'Like deleted successfully', like });
      })
      .catch(err => {
        // Handle errors and send a 500 response
        console.error('Error deleting like:', err);
        res.status(500).json({ message: 'Server error', error: err });
      });
  };

module.exports.getAllLikes = (request, response) => {
    Like.find({})
        .then(Likes => response.json(Likes))
        .catch(err => response.json(err))
}

module.exports.getLike = (request, response) => {
 // console.log(request.params.postId)
    Like.find({post:request.params.postId})
        .then(Like => response.json({Like}))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createLike = (request, response) => {
    const { users_id, posts_id } = request.body;
 //   console.log(users_id+"  ----  "+posts_id)
    Like.create({ 
        user:users_id, post:posts_id
    })  
        .then(like => response.json({like}))   
        .catch(err => response.status(400).json(err));
}