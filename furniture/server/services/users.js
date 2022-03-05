const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'asoiducan93284c9rew';
const blacklist = [];

async function register(email, password){
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (user) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, hashedPassword });
    await newUser.save();

    return createSession(user);
}

async function login(email, password){
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
        throw new Error('User does not exist');
    }
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) {
        throw new Error('Invalid password');
    }
    return createSession(user);
}

function logout(token){
    blacklist.push(token);
}

function createSession(user){
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({ email: user.email,_id: user._id }, JWT_SECRET)
    };
}

function verifySession(token){
    if (blacklist.includes(token)) {
        throw new Error('Invalid access token');
    }
    const payload = jwt.verify(token, JWT_SECRET);
    return {
        email: payload.email,
        _id: payload._id,
        token
    };
}

module.exports =   {
    register,
    login,
    logout,
    verifySession
};