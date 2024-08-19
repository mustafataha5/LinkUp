
const mongoose = require('mongoose');

// a self join is required: both senders and receivers are USERS in the same table
const MessageSchema = new mongoose.Schema({
    sender: { type: Integer,
        required: [true, "A user sender is required to send an IM."]
    },
    receiver: { type: Integer,
        required: [true, "A user receiver is required to receive an IM."]
    },
    message: { type: String,
            required: [true, "A message is required."]
     }
}, 
    { timestamps: true }
);
module.exports.Message = mongoose.model('Message', MessageSchema);