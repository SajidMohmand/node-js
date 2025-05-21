
const mongoose = require("mongoose")

const userSchemma = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
},{timestamps: true})

const User = mongoose.model("user", userSchemma)
module.exports = User;

