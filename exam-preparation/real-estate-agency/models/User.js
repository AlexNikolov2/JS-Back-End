
const { Schema, model, Types: { ObjectId } } = require('mongoose');

const NAME_PATTERN = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

const userSchema = new Schema({
    name: {
        type: String, required: [true, 'Full name is required!'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'Valid full name is required!'
        }
    },
    username: { type: String, required: [true, 'Username is required!'], minlength: [5, 'The username should be at least 5 characters long!'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;