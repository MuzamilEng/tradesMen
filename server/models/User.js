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
  phoneNumber:{
    type: Number
  }
});

module.exports = mongoose.model('User', userSchema);
