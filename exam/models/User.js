
const { Schema, model, Types: { ObjectId } } = require('mongoose');

const EMAIL_PATTERN = /^([A-Za-z]+)@([A-Za-z]+)\.([A-Za-z]+)$/;

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Email is required'],
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid and may contain only english letters'
        }
    },
    hashedPassword: { type: String, required: true },
    skills: { type: String, required: true , maxLength: [40, 'Skills must be a maximum of 40 characters long']},
    ads: { type: [ObjectId], ref: 'Ad', default: [] }
    //address: { type: String, maxlength: [20, 'Address should be a maximum of 20 characters long!'] },
    
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