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
        required: [true, " firstName is required ."],
        minlength: [2, "firstName must be at least 2 charcters ."]
    },
}, {
    timetamps: true,
})

userSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

userSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
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
