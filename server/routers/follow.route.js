
const FollowController = require('../controllers/follow.controller');

module.exports = function(app){
    app.get('/api/follows', FollowController.getAllFollows);
    app.post('/api/follows', FollowController.createFollow);
    app.get('/api/followes/follower/:id', FollowController.getFollowingBy);
    app.get('/api/followes/followed/:id', FollowController.getFolloweOther);
    // app.patch('/api/follows/:id', FollowController.updateFollow);
    app.delete('/api/follows/:id', FollowController.deleteFollow);
}


