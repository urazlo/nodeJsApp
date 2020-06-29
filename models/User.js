const mongoose = require('mongoose');

const Schema =  mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  login: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
