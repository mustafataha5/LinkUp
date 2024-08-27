

const LikeController = require('../controllers/like.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = function(app){
    app.get('/api/likes', LikeController.getAllLikes);
    app.get('/api/likes/:postId', LikeController.getLike);
    // app.patch('/api/likes/:id', LikeController.updateLike);
    app.post('/api/likes', LikeController.createLike);
    app.delete('/api/likes/:id',LikeController.deleteLike);
    app.delete('/api/likes/:postid/:userid', LikeController.deleteLike2);
}
