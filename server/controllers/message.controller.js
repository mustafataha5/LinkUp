const { Message } = require('../models/message.model');

module.exports.updateMessage = (request, response) => {
    // {new: true}: returns the NEWLY updated document, not original one
    Message.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        // handles & returns successful update:
        .then(updatedMessage  => response.json(updatedMessage ))
        // handles & returns any error during the process as JSON response
        .catch(err => response.json(err))
}

module.exports.deleteMessage  = (request, response) => {
    Message.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.getAllMessages = (request, response) => {
    Message.find({})
        .then(Messages => response.json(Messages))
        .catch(err => response.json(err))
}

module.exports.getMessage  = (request, response) => {
    Message.findOne({_id:request.params.id})
        .then(Message  => response.json(Message))
        .catch(err => response.json(err))
}

// The method below is new
module.exports.createMessage  = (request, response) => {
    const { message, sender, receiver } = request.body;
    Message.create({ 
        message, sender, receiver
    })  
        .then(Message  => response.json(Message ))   
        .catch(err => response.status(400).json(err));
}