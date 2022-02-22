
const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : [6, 'Title must be at least 6 characters long']
    },
    keyword : {
        type : String,
        minlength : [6, 'Keyword must be at least 6 characters long']
    },
    location : {
        type : String,
        required : [true, 'Location is required'],
        maxlength : [15, 'Location must be maximum 15 characters long']
    },
    date : {
        type : String,
        required : [true, 'Date is required'],
        validate : {
            validator : (value) => {
                return value.length == 10;
            },
            message : 'Date must be 10 characters long'
        }
    },
    image : {
        type : String,
        required : [true, 'Image is required'],
        validate : {
            validator : (value) => {
                return URL_PATTERN.test(value);
            },
            message : 'Please enter a valid URL'
        }
    },
    descrpition : {
        type : String,
        required : [true, 'Description is required'],
        minlength : [8, 'Description must be at least 8 characters long']
    },
    author : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    votes : {
        type : [ mongoose.Types.ObjectId ],
        ref : 'User',
        default : []
    },
    rating : {
        type : Number,
        default : 0
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;