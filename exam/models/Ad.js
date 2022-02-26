const { Schema, model, Types: { ObjectId }} = require("mongoose");

const adSchema = new Schema({
  headline: {
    type: String,
    required: [true, "Headline is required!"],
    minlength: [6, "Headline should be a minimum of 4 characters long!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    minlength: [
      8,
      "Location must be atleast 8 characters long!",
    ],
  },
  companyName: {
    type: String,
    required: [true, "Company name is required!"],
    minlength: [3, "Company name should be at least 3 characters long!"],
  },
  companyDescription: {
    type: String,
    required: true,
    maxlength: [40, "Description must be 40 characters or less!"],
  },
  owner: { type: ObjectId, ref: "User", required: true },
  applied: { type: [ObjectId], ref: "User", default: [] },
});

const Ad = model("Ad", adSchema);

module.exports = Ad;
