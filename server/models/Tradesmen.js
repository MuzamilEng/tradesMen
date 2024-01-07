const mongoose = require('mongoose');

const tradesMenSchema = new mongoose.Schema({
  userinfo: Object,
    occupation: String,
    username: String,
    email: String,
    ratings: Number,
    hourlyRate: Number,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    phoneNumber: Number,
    availability: String,
    image: {
      type: String,
      },
  })

module.exports = mongoose.model('Trademan', tradesMenSchema);
