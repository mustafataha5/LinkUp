

const PostController = require('../controllers/post.controller');

module.exports = function (app) {


    //post get all posts
    app.get('/api/posts', PostController.getAllPosts);
    //get all post of user 
    app.get('/api/posts/:userid', PostController.getAllPostOfUser);
    //post create 
    app.post('/api/posts', PostController.createPost);
    app.patch('/api/posts/:id', PostController.updatePost);
    app.delete('/api/posts/:id', PostController.deletePost);
}