const { Schema, model, Types: { ObjectId } } = require('mongoose');


const carSchema = new Schema({
    name: { type: String, required: true, minlength: [3, 'Car Name must be at least 3 symbols long'] },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'noImage.jpg' , match: [/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/, 'Image URL must be valid']},
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    isDeleted: { type: Boolean, default: false },
    owner: {type: ObjectId, ref: 'User'}
});

const Car = model('Car', carSchema);

module.exports = Car;