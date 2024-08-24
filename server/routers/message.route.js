


const MessageController = require('../controllers/message.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = function(app){
     //messages
     app.get("/api/messages",MessageController.getAllMessages)
     app.get("/api/messages/:user1Id/:user2Id",MessageController.getMessages);
     app.post("/api/messages/send",authenticate,MessageController.sendMessage);
     app.patch("/api/messages/read/:messageId",authenticate,MessageController.setMessageReaded)
     app.delete("/api/messages/:messageId",authenticate,MessageController.deleteMessage)
}