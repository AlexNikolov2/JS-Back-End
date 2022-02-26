
const Ad = require('../models/Ad');
const User = require('../models/User');

async function create(data) {
    const result = new Ad(data);
    await result.save();

    //add created id to user 
    const user = await User.findById(result.owner);
    user.ads.push(result._id);
    await user.save();
}

async function getAll() {
    return Ad.find({}).lean();
}

async function getLastThree(){
    return Ad.find({}).sort({ createdAt:-1 }).limit(3).lean();
}

async function getById(id) {
    return Ad.findById(id).populate('applied', 'headline').lean();
}


async function apply(adId, userId) {
    const ad = await Ad.findById(adId);

    if (ad.applied.includes(userId)) {
        throw new Error('User has already applied for this position!');
    }

    ad.applied.push(userId);
    await ad.save();
}

async function update(id, ad) {
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName;
    existing.companyDescription = ad.companyDescription;

    /*existing.title = publ.title;
    existing.technique = publ.technique;
    existing.picture = publ.picture;
    existing.certificate = publ.certificate;*/

    await existing.save();
}

async function deleteById(id) {
    await Ad.findByIdAndDelete(id);
}

async function getUserById(userId) {
    const ad = await Ad.find({ owner: userId });

    return (ad.map(p => p.title)).join(', ');
}

async function findUsersApplied(userId) {
    const applied = await Ad.find({ applied: { _id: userId } });
    return (applied.map(s => s.title)).join(', ');
}

module.exports = {
    create,
    getAll,
    getLastThree,
    getById,
    apply,
    update,
    deleteById,
    getUserById,
    findUsersApplied,
};