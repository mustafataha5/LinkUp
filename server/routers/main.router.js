


const UserController = require('../controllers/user.controller') ;
const MessageController = require("../controllers/message.controller"); 
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    //user
    app.post("/api/register",UserController.register) ; 
    app.post("/api/login",UserController.login) ; 
    app.post("/api/logout",UserController.logout) ; 
    app.get("/api/check-auth",UserController.checkauth) ;

    // app.post("/api/users",UserController.userCreate);
    app.get("/api/users",UserController.userFindAll);
   // app.get("/api/users",authenticate,UserController.userFindAll);
    app.get("/api/users/:id",UserController.userFindOne);
    app.patch("/api/users/:id",UserController.userUpdate);
    app.delete("/api/users/:id",UserController.userDelete);


    app.post("/api/messages/send",MessageController.sendMessage);
    app.get("/api/messages/:user1Id/:user2Id",MessageController.getMessages);
    app.patch("/api/messages/read/:messageId",MessageController.setMessageReaded)
    app.delete("/api/messages/:messageId",MessageController.deleteMessage)
    //  //dropDB 
    //  app.delete("/api/DBMustafa",DB.dropDatabase)
    
}


