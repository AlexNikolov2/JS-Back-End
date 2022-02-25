
const Housing = require('../models/Housing');
const User = require('../models/User');

async function createHousing(trip) {
    const result = new Housing(trip);
    await result.save();
}

async function getLastThree() {
    return Housing.find().sort({ createdAt: -1 }).limit(3).lean();
}

async function getAll() {
    return Housing.find({}).lean();
}

async function getHouseById(id) {
    return Housing.findById(id).populate('renters', 'name').lean();
}

async function joinRent(houseId, userId) {
    const house = await Housing.findById(houseId);

    if (house.renters.includes(userId)) {
        throw new Error('User is already part of the rent!');
    }

    house.renters.push(userId);
    await house.save();
}

async function updateHouse(id, house) {
    const existing = await Housing.findById(id);

    existing.name = house.name;
    existing.type = house.type;
    existing.year = house.year;
    existing.city = house.city;
    existing.homeImg = house.homeImg;
    existing.description = house.description;
    existing.pieces = house.pieces;

    await existing.save();
}

async function deleteById(id) {
    await Housing.findByIdAndDelete(id);
}

async function getByType(find) {
    return Housing.find({ type: { $regex: find, $options: 'i' } }).lean();
}

module.exports = {
    createHousing,
    getLastThree,
    getAll,
    getHouseById,
    joinRent,
    updateHouse,
    deleteById,
    getByType
};