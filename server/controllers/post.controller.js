const  Post= require('../models/post.model');
const User = require('../models/user.model');

module.exports.updatePost = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    const {user,content,imageUrl} = request.body ;
    console.log(request.body)
    Post.findOneAndUpdate({_id: request.params.id}, {content:content, imageUrl:imageUrl},{new:true})
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

// module.exports.getAllPostOfUserByUserID  = (request, response) => {
//     Post.find({user:request.params.id})
//         .then(posts  => response.json({posts}))
//         .catch(err => response.json(err))
// }

module.exports.getAllPostOfUserByUserID = (request, response) => {
    const userId = request.params.id;
    
    // Add logging to check if the correct user ID is received
    console.log("User ID:", userId);

    Post.find({ user: userId })
    .populate('user', 'firstName lastName imageUrl') // Populate user with specific fields
        .then(posts => {
            if (posts.length === 0) {
                return response.status(404).json({ message: 'No posts found for this user' });
            }
            
            response.json({ posts });
        })
        .catch(err => {
            console.error('Error retrieving posts:', err);
            response.status(500).json({ message: 'Server error', error: err });
        });
};

// The method below is new
module.exports.createPost = async (req, res) => {
    const { user: userId, content, imageUrl } = req.body;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is active
        if (user.status !== 'active') {
            return res.status(403).json({ message: 'User is deactivated and cannot create posts' });
        }

        // Create the post
        const post = await Post.create({ user: userId, content, imageUrl });

        return res.status(201).json({ post });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};