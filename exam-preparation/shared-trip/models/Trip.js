const { Schema, model, Types: { ObjectId } } = require('mongoose');



const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    carBrand: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    buddies: [{
        type: ObjectId,
        ref: 'User'
    }]
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;