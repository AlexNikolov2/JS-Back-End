const { Schema, model} = require('mongoose');
const { comparePassword, hashPassword } = require('../services/util');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    hashedPassword: { type: String, required: true }
});

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
};

userSchema.pre('save', async function (next){
    if(this.isModified('hashedPassword')){
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }
    next();
})

const User = model('User', userSchema);

module.exports = User;
