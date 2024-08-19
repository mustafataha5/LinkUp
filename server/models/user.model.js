const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    firstName:{
        type: String , 
        required:[true," firstName is required ."], 
        minlength:[2,"firstName must be at least 2 charcters ."]
    },

},{
    timetamps:true , 
}
)
const User = mongoose.model('User',userSchema) ; 
module.exports=User; 
