const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: JSON,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
