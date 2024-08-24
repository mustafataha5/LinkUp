const UserController = require('../controllers/user.controller') ; 
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    //user
    app.post("/api/register",UserController.register) ; 
    app.post("/api/login",UserController.login) ; 
    app.post("/api/logout",UserController.logout) ; 
    app.get("/api/check-auth",UserController.checkauth) ;

    // app.post("/api/users",UserController.userCreate);
    // app.get("/api/users",UserController.userFindAll);
    app.get("/api/users",UserController.userFindAll);
    app.get("/api/users/:id",UserController.userFindOne);
    app.patch("/api/users/:id",UserController.userUpdate);
    app.patch("/api/users/deactive/:id",UserController.userDeactive);
    app.patch("/api/users/active/:id",UserController.userActive);
    app.delete("/api/users/:id",UserController.userDelete);

    app.get('/api/search',UserController.searchUsers)
    //  dropDB 
    //  app.delete("/api/DBMustafa",DB.dropDatabase)
    
}


