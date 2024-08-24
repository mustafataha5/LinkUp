

const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = function (app) {


    //post get all posts
    app.get('/api/posts', PostController.getAllPosts);
    //get all post of user 
    app.get('/api/posts/:userid', PostController.getAllPostOfUser);
    app.get('/api/posts/user/:id', PostController.getAllPostOfUserByUserID);
    //post create 
    app.post('/api/posts',authenticate ,PostController.createPost);
    app.patch('/api/posts/:id',authenticate ,PostController.updatePost);
    app.delete('/api/posts/:id',authenticate ,PostController.deletePost);
}