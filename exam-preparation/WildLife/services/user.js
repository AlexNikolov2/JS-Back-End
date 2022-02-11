const User = require('../models/User');
const {compare, hash} = require('bcrypt');

async function register(username, password) {

    const existing = await getUserByUsername(username);

    if(existing){
        throw new Error('Username already exists');
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ username, hashedPassword: password });
    await user.save();

    return user;
}

async function login(username, password) {
    const user = await getUserByUsername(username);

    if(!user){
        throw new Error('Invalid username or password');
    }

    const isValid = await compare(password, user.hashedPassword);

    if(!isValid){
        throw new Error('Invalid username or password');
    }

    return user;
}

async function getUserByUsername(username) {
    const user = User.find({ username });

    return user;
}
