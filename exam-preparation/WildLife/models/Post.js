const {Schema,model,Types: { ObjectId }} = require("mongoose");
const User = require("./User");
const IMAGE_PATTERN = /^https?:\/\/(.+)/;

const postSchema = new Schema({
  title: {
    type: String,
    minlength: [6, "Title must be at least 6 characters long"],
  },
  keyword: {
    type: String,
    minlength: [6, "Keyword must be at least 6 characters long"],
  },
  location: {
    type: String,
    required: true,
    maxlength: [15, "Location can be maximum 15 characters"],
  },
  date: {
    type: String,
    minlength: [10, "Date shoud be exactly 10 characters"],
    maxlength: [10, "Date shoud be exactly 10 characters"],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return IMAGE_PATTERN.test(value);
      },
      message: "Image must be a valid URL",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: [8, "Description must be at least 8 characters long"],
  },
  author: { type: ObjectId, ref: "User" },
  votes: { type: [ObjectId], ref: "User", default: [] },
  rating: { type: Number, default: 0 },
});

const Post = model("Post", postSchema);
module.exports = Post;
