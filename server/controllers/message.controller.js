
const Message = require("../models/message.model");
const User =require("../models/user.model") ; 


module.exports.sendMessage =  (req,res) => {
        const {sender,reciver,content} = req.body ; 
        Message.create(req.body)
        .then(message => {
            res.json({ message:message })
        })
        .catch(err => res.status(500).json({ message: 'An error occurred while sending the message.', err }));
} 


module.exports.getMessages = async (req,res) => {
    try {

        const {user1Id,user2Id} = req.params ; 
        
        const messages =await Message.find({$or:[
            {sender:user1Id,reciver:user2Id},
            {sender:user2Id,reciver:user1Id}
        ]}).sort({timestamp: 1});
        //console.log(messages)
        res.status(200).json({ data: messages });
    }
    catch(err){
        res.status(500).json({ message: 'An error occurred while retrieving messages.', err });
    }
}

module.exports.getAllMessages = async (req,res) => {
    try {
        const messages =await Message.find().sort({timestamp: 1});
        //console.log(messages)
        res.status(200).json({ data: messages });
    }
    catch(err){
        res.status(500).json({ message: 'An error occurred while retrieving messages.', err });
    }
}

module.exports.setMessageReaded = (req,res) => {
    const messageId = req.params.messageId
    Message.findByIdAndUpdate({_id:messageId},
         { isRead: true },
        {new:true})
    .then(message => res.json({data:message}))
    .catch(err => res.json(err)) ; 
}

module.exports.deleteMessage = (req,res) => {
    const messageId = req.params.messageId
    Message.findByIdAndDelete({_id:messageId})
    .then(message => res.json({data:message}))
    .catch(err => res.json(err)) ; 
}


