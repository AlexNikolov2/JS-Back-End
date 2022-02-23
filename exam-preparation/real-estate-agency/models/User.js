
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
});
userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
    return next();
});

userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('user', userSchema);
module.exports = User;