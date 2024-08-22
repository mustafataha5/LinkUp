const User= require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


//auth
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
      if (err) { 
        res.status(401).json({verified: false});
      } else {
        next();
      }
    });
  }

module.exports.checkauth =  (req, res) => {
    const token = req.cookies.usertoken; // Assuming you're using cookies to store the token

    if (!token) {
        return res.status(401).json({ authenticated: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ authenticated: false, message: 'Invalid token' });
        }
        const user = await User.findById({_id:decoded.id}); 
        res.status(200).json({ authenticated: true, user: user });
    });
} 

//create 
module.exports.register=async (req,res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if(user != null) {
            console.log(">>>>>>>>>>>>>>>>")
            // email  found in users collection
            return res.status(400).json({ errors:{email:{ message:"Email already exists" }}});
        }
    }
    catch(err){
        return res.status(400).json({email:"Email already exits"});
    }
        
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.cookie('usertoken', userToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Uncomment for production
        });
        res.json({ msg: 'success!', user });
    })
    .catch(err => res.status(400).json(err));
} 

//login 
module.exports.login = async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

//logout
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
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

// Search for users by names
module.exports.searchUsers = async (req, res) => {
    const query = req.query.q; // Query from the request
    try {
        // Search for users by firstName or lastName (case-insensitive)
        const users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } }
            ]
        }).select('firstName lastName _id'); // Select necessary fields

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users); // Send the search results as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};