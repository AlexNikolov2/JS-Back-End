const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const secret = 'djami e najdobriot';
const salt = 10;

const login = async (email, password) => {
    const user = await User.findOne({ email: {$regex: new RegExp(`^${email}$`, 'i')}}).lean();

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({
        email: user.email,
        _userId: user._id
    }, secret, { expiresIn: '1h' });
    return token;
};

const register = async (email, password, gender) => {
    let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).lean();

    if (user != null) {
        throw new Error('Username already exists!');
    }

    const hashedPass = await bcrypt.hash(password, salt_rounds);
    user = new User({ email, password: hashedPass, gender, trips: [] });

    return user.save();
}

const getProfile = (id) => {
    return User.findById(id).lean();
};


module.exports = {
    login,
    register,
    getProfile
};
