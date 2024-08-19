


const UserController = require('../controllers/user.controller') ; 
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    //user
    app.post("/api/register",UserController.register) ; 
    app.post("/api/login",UserController.login) ; 
    app.post("/api/logout",UserController.logout) ; 


    // app.post("/api/users",UserController.userCreate);
    app.get("/api/users",authenticate,UserController.userFindAll);
    app.get("/api/users/:id",UserController.userFindOne);
    app.patch("/api/users/:id",UserController.userUpdate);
    app.delete("/api/users/:id",UserController.userDelete);

    //  //dropDB 
    //  app.delete("/api/DBMustafa",DB.dropDatabase)
    
}


