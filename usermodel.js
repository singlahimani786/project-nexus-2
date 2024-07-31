const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required and should be unique"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6
    },
    timeStamp: true
})
const userModel = new mongoose.model("user", userschema);
module.exports = userModel;