
const FollowController = require('../controllers/follow.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = function(app){
    app.get('/api/follows', FollowController.getAllFollows);
    app.post('/api/follows',authenticate ,FollowController.createFollow);
    app.get('/api/follows/isfollow/:user1/:user2', FollowController.isFollow);
    app.get('/api/follows/follower/:id', FollowController.getFollowingBy);
    app.get('/api/follows/followed/:id', FollowController.getFolloweOther);
    app.get('/api/follows/notfollowed/:id', FollowController.getNotFollowedBy);
    app.get('/api/follows/allfrind/:id', FollowController.getAllFriend);
    
    // app.patch('/api/follows/:id', FollowController.updateFollow);
    app.delete('/api/follows/:id', FollowController.deleteFollow);
}


