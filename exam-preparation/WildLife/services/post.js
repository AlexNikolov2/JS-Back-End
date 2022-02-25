
const Post = require('../models/Post');
const { posViewModel } = require('../middlewares/mapErrors');

async function createPost(data) {
    const post = new Post(data);
    await post.save();
    return post;
}

async function getPosts() {
    const posts = await Post.find({});

    return posts.map(posViewModel);
}

async function getUserPosts(author) {
    const posts = await Post.find({ author }).populate('author', 'firstname lastname');

    return posts.map(posViewModel);
}

async function getOnePost(id) {
    const post = await Post.findById(id).populate('author', 'firstname lastname').populate('votes', 'email');

    if (post) {
        return posViewModel(post);
    } else {
        throw new Error('Post doesn\'t exist');
    }
}

async function editPost(id, data) {
    const post = await Post.findByIdAndUpdate(id, data, { runValidators: true });
}

async function deletePost(id) {
    await Post.findByIdAndDelete(id);
}

async function vote(id, userId, value) {
    const post = await Post.findById(id);

    if (post.votes.includes(userId)) {
        throw new Error('User already voted!');
    }

    post.votes.push(userId);
    post.rating += value;
    await post.save();
}

module.exports = {
    createPost,
    getPosts,
    getOnePost,
    editPost,
    deletePost,
    vote,
    getUserPosts
};