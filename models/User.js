const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, Unique:true},
    email: {type:String, Unique:true},
    password:String,
    createdAt: {type : Date, default: Date.now},
    updatedAt: {type : Date, default: Date.now}
});

const User = mongoose.model('User',userSchema)
module.exports = User;