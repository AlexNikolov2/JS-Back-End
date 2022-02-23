const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /[A-Z][a-z]+ [A-Z][a-z]+/gm.test(value);
            }, message: "The name should be in the following format: Alexandur Petrov"
        }
    },
    username: {
        type: String,
        required: true,
        minlength: 5,

    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
});

userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
    next();
});

userSchema.method("comparePassword", async function (password) {
    return await bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;