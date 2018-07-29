const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	_id:String,
    username: {type:String,required:true,unique:true},
    password: String,
	roles: []
	
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);