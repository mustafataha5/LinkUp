const  Follow  = require('../models/follow.model');


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
    Follow.findOne({followed:request.params.id})
        .then(follow => response.json({follow}))
        .catch(err => response.json(err));
}

module.exports.getFolloweOther = (request, response) => {
    Follow.findOne({follower:request.params.id})
        .then(follow => response.json({follow}))
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