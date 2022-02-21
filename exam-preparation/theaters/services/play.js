const Play = require('../models/Play');

const create = (data) => {
    const play = new Play(data);
    return play.save();
};

const getAllByDateDesc = async (query) => {
    if(query && query.date){
        return Play.find({isPublic: true}).sort({ createdAt: 'asc'}).lean();
    }
    else if(query && query.likes){
        return Play.find({isPublic: true}).sort({ usersLiked: 'desc'}).lean();
    }
    else{
        return Play.find({isPublic: true}).sort({ createdAt: 'desc'}).lean();
    }
};

const getById = (id) => {
    return Play.findById(id).lean();
};

const getMostLikedThree = async () => {
    return Play.find({isPublic: true}).sort({ usersLiked: 'desc'}).limit(3).lean();
};

const like = async (userId, id) => {
    const play = await Play.findById(id);
    play.usersLiked.push(userId);
    return play.save();
};

const edit = async (id, data) => {
    const play = await Play.findById(id);
    Object.assign(play, data);
    return play.save();
};

const deletePlay = (id) => {
    return Play.deleteOne({ _id: id });
};

module.exports = {
    create,
    getAllByDateDesc,
    getMostLikedThree,
    like,
    getById,
    edit,
    deletePlay
};