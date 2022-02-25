
const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const houseSchema = new Schema({
    name: { type: String, required: [true, 'Name is required!'], minlength: [6, 'Name should be at least 6 characters!'] },
    type: {
        type: String, enum: {
            values: ['Apartment', 'Villa', 'House'],
            message: 'Type should be - Apartment, Villa or House.'
        },
        required: [true, 'Type should be - Apartment, Villa or House.']
    },
    year: {
        type: Number, required: [true, 'Year is required!'],
        min: [1850, 'Year should be between 1850 and 2021'],
        max: [2021, 'Year should be between 1850 and 2021']
    },
    city: { type: String, required: [true, 'City is required!'], minlength: [4, 'City should be at least 4 characters long'] },
    homeImg: {
        type: String, required: [true, 'Image is required!'], validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Home image should be starts with http:// or https://'
        }
    },
    description: { type: String, required: [true, 'Description is required!'], maxlength: [60, 'Property description should be a maximum of 60 characters long.'] },
    pieces: {
        type: Number, required: [true, 'Available Pieces are required'],
        min: [0, 'Available Pieces should be positive number from 0 to 10'],
        max: [10, 'Available Pieces should be positive number from 0 to 10']
    },
    owner: { type: ObjectId, ref: 'User', required: true },
    renters: { type: [ObjectId], ref: 'User', default: [] },
},
    { timestamps: true });

const Housing = model('Housing', houseSchema);

module.exports = Housing;