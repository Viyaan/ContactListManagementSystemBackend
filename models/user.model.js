const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserSchema = mongoose.Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    roles: []

}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);