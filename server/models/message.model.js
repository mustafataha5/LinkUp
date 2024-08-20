
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const messageSchema = mongoose.Schema({
   
      sender:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
      reciver:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      isRead: { type: Boolean, default: false }
   }
)

const Message = mongoose.model('Message', messageSchema);
module.exports = Message; 

