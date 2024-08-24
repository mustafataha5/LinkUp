const  Follow  = require('../models/follow.model');
const User = require('../models/user.model');

module.exports.updateFollow = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    Follow.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        // handles & returns successful update:
        .then(updatedFollow => response.json(updatedFollow))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deleteFollow = (request, response) => {
    Follow.findByIdAndDelete({ _id: request.params.id })
        .then(follow => response.json({follow}))
        .catch(err => response.json(err))
}

module.exports.getAllFollows = (request, response) => {
    Follow.find({})
        .then(follows => response.json({follows}))
        .catch(err => response.json(err))
}

module.exports.getFollowingBy = (request, response) => {
    Follow.find({ followed: request.params.id })
        .populate('follower', '_id firstName lastName imageUrl') 
        // Populate follower details
        .then(follows => {
            const followers = follows.map(follow => ({
                relationId :follow._id ,
                _id : follow.follower._id , 
                firstName: follow.follower.firstName,
                lastName: follow.follower.lastName,
                imageUrl: follow.follower.imageUrl
            }));
            response.json({followers});
        })
        .catch(err => response.status(500).json(err));
}

module.exports.getFolloweOther = (request, response) => {
    Follow.find({ follower: request.params.id })
        .populate('followed', '_id firstName lastName imageUrl') 
        // Populate the followed user's details
        .then(following => {
            const followings = following.map(follow => ({
                relationId :follow._id ,
                _id: follow.followed._id, 
                firstName: follow.followed.firstName,
                lastName: follow.followed.lastName,
                imageUrl: follow.followed.imageUrl
            }));
            response.json({ followings });
        })
        .catch(err => response.json(err));
}

// The method below is new
module.exports.createFollow = (request, response) => {
    const { follower, followed } = request.body;
    Follow.create({ 
        follower, followed
    })  
        .then(follow => response.json({follow}))   
        .catch(err => response.status(400).json(err));
}

module.exports.getNotFollowedBy = async (req, res) => {
    try {
        const id = req.params.id;

        // Step 1: Find all users that the specified user is following
        const followedUsers = await Follow.find({ follower: id }).select('followed');
        
        // Extract the user IDs from the followedUsers array
        const followedUserIds = followedUsers.map(follow => follow.followed);
        
        // Step 2: Find all users who are not followed by the specified user, excluding the user themselves
        const notFollowedUsers = await User.find({ _id: { $nin: [...followedUserIds, id] } });
        
        // Step 3: Return the users who are not followed, excluding the requesting user
        res.json({ notFollowedUsers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.getAllFriend = (req, res) => {
    const { id } = req.params;

    Follow.find({
        $or: [
            { followed: id },
            { follower: id }
        ]
    })
    .populate('followed', 'firstName lastName imageUrl _id')  // Populate followed user details
    .populate('follower', 'firstName lastName imageUrl _id')  // Populate follower user details
    .then(friends => {
        const formattedFriends = friends.map(friend => {
            if (friend.followed._id.toString() === id) {
                // If the user is the followed one, return the follower's details
                return {
                    _id: friend.follower._id,
                    firstName: friend.follower.firstName,
                    lastName: friend.follower.lastName,
                    imageUrl: friend.follower.imageUrl
                };
            } else if (friend.follower._id.toString() === id) {
                // If the user is the follower, return the followed one's details
                return {
                    _id: friend.followed._id,
                    firstName: friend.followed.firstName,
                    lastName: friend.followed.lastName,
                    imageUrl: friend.followed.imageUrl
                };
            }
        });

        // Remove duplicates using a Map to track unique _id values
        const uniqueFriends = Array.from(
            new Map(formattedFriends.map(friend => [friend._id.toString(), friend])).values()
        );

        res.json({ friends: uniqueFriends });
    })
    .catch(err => res.status(400).json(err));
};


