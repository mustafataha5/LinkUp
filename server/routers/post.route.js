

const PostController = require('../controllers/post.controller');

module.exports = function (app) {


    //post get all posts
    app.get('/api/Posts', PostController.getAllPosts);
    //get all post of user 
    app.get('/api/Posts/:userid', PostController.getAllPostOfUser);
    //post create 
    app.post('/api/Posts', PostController.createPost);
    app.patch('/api/Posts/:id', PostController.updatePost);
    app.delete('/api/Posts/:id', PostController.deletePost);
}