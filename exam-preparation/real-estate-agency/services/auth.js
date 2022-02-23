
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET_TOKEN} = require('../config');

exports.login = async ({username, password}) =>{
    let user = await User.findOne({username});
    if(!user){
        throw new Error ('Invalid user name or password!');
    }

    let isValid = await user.validatePassword(password);
    if(!isValid){
        throw new Error ('Invalid username or password!');
    }

    let payload = {
        _id:user._id, 
        name: user.name, 
        username: user.username
    };

    let token = await jwt.sign(payload, SECRET_TOKEN);
    return token;
    
};

exports.register = (userData) => User.create(userData);