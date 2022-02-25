
const { Schema, model, Types: { ObjectId } } = require('mongoose');
const NAME_PATTERN = /^[A-Za-z-]+$/;
const EMAIL_PATTERN = /^([A-Za-z]+)@([A-Za-z]+)\.([A-Za-z]+)$/;

const userSchema = new Schema({
    firstname: {
        type: String, minlength: [3, 'First name must be at least 3 characters long'],
        validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'First name may contain only english letters'
        }
    },
    lastname: {
        type: String, minlength: [5, 'Last name must be at least 5 characters long'],
        validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'Last name may contain only english letters'
        }
    },
    email: {
        type: String, required: [true, 'Email is required'],
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid and may contain only english letters'
        }
    },
    hashedPassword: { type: String, minlength: [4, 'Password must be at least 4 characters long'] },
    myposts: { type: [ObjectId], ref: 'Post' }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;