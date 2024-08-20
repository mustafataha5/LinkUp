

const LikeController = require('../controllers/like.controller');

module.exports = function(app){
    app.get('/api/likes', LikeController.getAllLikes);
    app.post('/api/likes', LikeController.createLike);
    app.get('/api/likes/:posId', LikeController.getLike);
    // app.patch('/api/likes/:id', LikeController.updateLike);
    app.delete('/api/likes/:id', LikeController.deleteLike);
}