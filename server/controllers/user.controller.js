const User= require('../models/user.model')



//create 
module.exports.register= (req,res) => {
    User.create(req.body)
    .then(user => {
        res.json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
} 
module.exports.userCreate = (req,res) =>{
    User.create(req.body)
        .then(user => {
            // Fetch all existing games
            return Game.find({})
                .then(games => {
                    // Create "inactive" UserGame entries for each game
                    const userGameEntries = games.map(game => ({
                        user: user._id,
                        game: game._id,
                        status: [false,false,true]
                    }));
                    // Insert UserGame entries
                    return UserGame.insertMany(userGameEntries)
                        .then(() => res.json({ user: user }))
                        .catch(err => res.status(400).json(err));
                });
        })
        .catch(err => res.status(400).json(err)); 
}

//get 
module.exports.userFindAll = (req,res) =>{
    User.find({})
    .then(users => res.json({users:users}))
    .catch(err => res.json(err)) ; 
}

module.exports.userFindOne = (req,res) =>{
    User.findById({_id:req.params.id})
    .then(user => res.json({user:user}))
    .catch(err => res.json(err)) ; 
}

//update 
module.exports.userUpdate = (req,res) =>{
    User.findByIdAndUpdate({_id:req.params.id}
        ,req.body 
        ,{new:true,runValidtor:true}
    )
    .then(user => res.json({user:user}))
    .catch(err => res.status(400).json(err)); 
}

//delete 
module.exports.userDelete = (req,res) =>{
    User.findByIdAndDelete({_id:req.params.id})
    .then(user => res.json({user:user}))
    .catch(err => res.json(err)) ; 
}







