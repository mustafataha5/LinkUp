const  Post= require('../models/post.model');

module.exports.updatePost = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    const {user,content,imageUrl} = request.body ;
    console.log(request.body)
    Post.findOneAndUpdate({_id: request.params.id,user:user}, {content:content},{new:true})
        // handles & returns successful update:
        .then(updatedPost  => response.json({post:updatedPost} ))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Post.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports.getAllPosts = (request, response) => {
    Post.find({})
        .populate('user', 'firstName lastName imageUrl') // Populate user with specific fields
        .sort({ timestamp: -1 }) // Sort posts by timestamp in descending order
        .then(posts => response.json({ posts: posts }))
        .catch(err => response.json(err));
}

module.exports.getAllPostOfUser  = (request, response) => {
    Post.findOne({_id:request.params.id})
        .then(Post  => response.json(Post))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createPost  = (request, response) => {
    const {user,content, imageUrl} = request.body
    Post.create({user,content,imageUrl})  
        .then(post  => response.json({post:post}))   
        .catch(err => response.status(400).json(err));
}