// user data model
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: false
    },
    admin : {
        type: Boolean,
        default: false
    },
    owner: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)