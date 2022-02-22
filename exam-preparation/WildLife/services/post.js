
const Post = require("../models/Post");

async function create(post) {
    await Post.create(post);
}

async function getAll() {
    return await Post.find().lean();
}

async function getById(id) {
    return await Post.findById(id).populate("votes").populate("author");
}

async function deletePost(id) {
    return await Post.findByIdAndDelete(id);
}

async function editPost(id, post) {
    return await Post.findByIdAndUpdate(id, post);
}

async function upVote(postId, user) {
    const post = await getPostById(postId);
    post.votes.push(user);
    post.rating += 1;
    post.save();

}

async function downVote(postId, user) {
    const post = await getPostById(postId);
    post.votes.push(user);
    post.rating -= 1;
    post.save();

}

function isVoted(post, user) {
    return post.votes.map(v => v._id).some(x => x == user._id);
}

function votedUsers(post) {
    return post.votes.map(x => x.email).join(", ");

}

async function myPosts(userId) {
    return await Post.find({ author: userId }).lean().populate("author");
}

module.exports = {
    create,
    getAll,
    getById,
    deletePost,
    editPost,
    upVote,
    downVote,
    isVoted,
    votedUsers,
    myPosts
};