


const MessageController = require('../controllers/message.controller');

module.exports = function(app){
     //messages
     app.post("/api/messages/send",MessageController.sendMessage);
     app.get("/api/messages/:user1Id/:user2Id",MessageController.getMessages);
     app.patch("/api/messages/read/:messageId",MessageController.setMessageReaded)
     app.delete("/api/messages/:messageId",MessageController.deleteMessage)
}




