const { Follow } = require('../models/follow.model');


module.exports.updateFollow = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    Follow.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        // handles & returns successful update:
        .then(updatedFollow => response.json(updatedFollow))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deleteFollow = (request, response) => {
    Follow.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.getAllFollows = (request, response) => {
    Follow.find({})
        .then(Follows => response.json(Follows))
        .catch(err => response.json(err))
}

module.exports.getFollow = (request, response) => {
    Follow.findOne({_id:request.params.id})
        .then(Follow => response.json(Follow))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createFollow = (request, response) => {
    const { follower, followed } = request.body;
    Follow.create({ 
        follower, followed
    })  
        .then(Follow => response.json(Follow))   
        .catch(err => response.status(400).json(err));
}