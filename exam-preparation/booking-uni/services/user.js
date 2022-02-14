const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {secret, salt_rounds} = require('../config');

async function login(username, password) {
    try {
        const user = await User.findOne({username});
        if (!user) {
            throw new Error('User Does Not Exist!');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials!');
        }
        const token = jwt.sign({id: user._id}, secret);
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function register(email, username, password){
    try {
        const user = await User.findOne({username});
        if (user) {
            throw new Error('User Already Exists!');
        }
        const hashedPassword = await bcrypt.hash(password, salt_rounds);
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });
        const result = await newUser.save();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getUserById(id){
        return await User.findById(id).populate('bookedHotels').lean();
}

module.exports = {
    login,
    register,
    getUserById
};