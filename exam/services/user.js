
const User = require('../models/User');
const { hash, compare } = require('bcrypt');

// TODO add validation
async function register(email, password, skills ) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('email is taken!');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        skills,
        hashedPassword,
        
    });
    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorrect email or password!');
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect email or password!');
    }

    return user;
}

async function getUserByEmail(email) {
    const user = User.findOne({ email: new RegExp(`^${email}$`, 'i'), });
    return user;
}

module.exports = {
    login,
    register,
    getUserByEmail
};