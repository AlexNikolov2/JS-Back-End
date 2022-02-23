const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config");

async function register(user) {
    await User.create(user);
}

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {

        throw new Error("Username or password is invalid!");
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        throw new Error("Username or password is invalid!");

    }

    const payload = {
        _id: user._id,
        name: user.name,
        username: user.username
    };

    const token = jwt.sign(payload, SECRET_TOKEN);
    return token;
}

module.exports = {
    register,
    login
};