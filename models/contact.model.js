const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    _id: String,
    name: String,
    add: String,
    tel: String,
    email: String,
    faceId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);