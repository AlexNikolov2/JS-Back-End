const {Schema, model, Types: {ObjectId}} = require('mongoose');

const carSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String},
    price: {type: Number, required: true},
    accesories: [{type: [ObjectId], default: [], ref: 'Accesory'}]
})

const Car = model('Car', carSchema);

module.exports = Car;