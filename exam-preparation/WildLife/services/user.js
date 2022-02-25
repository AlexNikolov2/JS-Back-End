
const User = require('../models/User');
const { hash, compare } = require('bcrypt');

async function register(firstname, lastname, email, password) {
    const existing = await getUserByUsername(email);

    
    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({
        firstname,
        lastname,
        email,
        hashedPassword
    });

    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByUsername(email);

    if (!user) {
        throw new Error('Incorrect Username or Password');
    }

    const validPassword = await compare(password, user.hashedPassword);

    if (!validPassword) {
        throw new Error('Incorrect Username or Password');
    }

    return user;
}

async function getUserByUsername(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}

module.exports = {
    register,
    login
};