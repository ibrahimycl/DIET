const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userType: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  imagePath: {
    type: String,
    required: false,
    default: 'images.jpg'
  },
  experience: {
    type: String,
    required: false
  },
  education: {
    type: String,
    required: false
  },
  basket:{
    type:Array
  },
  ownedPackages: {
    type: Array
  }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);
module.exports = User


