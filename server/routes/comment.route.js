

const CommentController = require('../controllers/Comment.controller');

module.exports = function(app){
    app.get('/api/Comments', CommentController.getAllComments);
    app.post('/api/Comments', CommentController.createComment);
    app.get('/api/Comments/:id', CommentController.getComment);
    app.patch('/api/Comments/:id', CommentController.updateComment);
    app.delete('/api/Comments/:id', CommentController.deleteComment);
}


