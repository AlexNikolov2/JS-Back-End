const Accesory = require('../models/Accessory');
const accesoryViewModel = require('./util');

async function getAll(){
    const accesories = await Accesory.find();
    return accesories.map(accesoryViewModel);
}

async function createAccesory(accesory){
    await Accesory.create(accesory);
}

module.exports = () => (req, res, next) => {
    req.accesory = {
        getAll,
        createAccesory
    };
    next();
}