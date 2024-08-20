const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is required ."],
        minlength: [2, "FirstName must be at least 2 charcters ."]
    },
    lastName: {
        type: String,
        required: [true, " LastName is required ."],
        minlength: [2, "LastName must be at least 2 charcters ."]
    },
    email: {
        type: String,
        required: [true, "Email is required ."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }

    },
    password: {
        type: String,
        required: [true, "Password is required ."],
        minlength: [8, "Password must be at least 8 charcters ."]
    },
    imageUrl:{
        type:String , 
        default: "https://i.pinimg.com/originals/61/f7/5e/61f75ea9a680def2ed1c6929fe75aeee.jpg" 
    }, 
    birthday: {
        type: Date,
        required: true,
        validate: {
            validator:function(value) {
                const now = new Date();
                const thirteenYearsAgo = new Date(
                    now.getFullYear() - 13,
                    now.getMonth(),
                    now.getDate()
                );

                // Check if the birthday is not in the future and the user is at least 13 years old
                return value < now && value <= thirteenYearsAgo;
            },
            message: `user must be above 13`
        }
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    role:{
        type:String,
        default: "user"  
    },
}, 
{
    timetamps: true,
})

userSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

userSchema.pre('validate', function (next) {
    if(this.confirmPassword.length<8){
        this.invalidate('confirmPassword', 'confirmPassword must be at least 8 characters');
    }
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'confirmPassword must match confirm password');
    }
    next();
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const User = mongoose.model('User', userSchema);
module.exports = User; 
