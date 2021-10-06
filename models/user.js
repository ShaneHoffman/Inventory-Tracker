// Model for all Users

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username must be provided']
  },
  profilePicture: {
    type: String,
    default: 'https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg'
  },
  inventory: []
});

module.exports = mongoose.model('User', userSchema);