
const FollowController = require('../controllers/follow.controller');

module.exports = function(app){
    app.get('/api/follows', FollowController.getAllFollows);
    app.post('/api/follows', FollowController.createFollow);
    app.get('/api/follows/follower/:id', FollowController.getFollowingBy);
    app.get('/api/follows/followed/:id', FollowController.getFolloweOther);
    app.get('/api/follows/notfollowed/:id', FollowController.getNotFollowedBy);
    // app.patch('/api/follows/:id', FollowController.updateFollow);
    app.delete('/api/follows/:id', FollowController.deleteFollow);
}


