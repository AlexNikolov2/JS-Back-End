const {Schema, model} = require('mongoose');

const accesorySchema = new Schema({
    name: {type: 'string', required: true},
    description: {type: 'string', default: ''},
    imageUrl: {type: 'string', default: 'noimage.jpg'},
    price: {type: 'number', required: true, min: 0},
});

const Accesory = model('Accesory', accesorySchema);
module.exports = Accesory;