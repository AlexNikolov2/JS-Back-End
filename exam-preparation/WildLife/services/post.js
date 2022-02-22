const Post = require('../models/Post');

const create = (data) => {
    const post = new Post(data);
    return post.save();
};

const getAll = () => {
    return Post.find({}).lean();
};

const getById = (id) => {
    return Post.findById(id).populate('author', 'firstName lastName').lean();
};

const edit = async (id, data) => {
    const post = await Post.findById(id);
    Object.assign(post, data);
    return post.save();
};

const deletePost = (id) => {
    return Post.findByIdAndDelete(id);
};
const vote = async (postId, userId, value) => {
    const post = await Post.findById(postId);

    if(post.votes.includes(userId)){
        throw new Error('You already voted!');
    }

    post.votes.push(userId);
    post.rating += value;
    return post.save();
};


module.exports = {
    create,
    getAll,
    getById,
    edit,
    deletePost,
    vote
};