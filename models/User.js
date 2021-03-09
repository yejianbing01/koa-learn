const mongoose = require('mongoose');


const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('User', userScheme);