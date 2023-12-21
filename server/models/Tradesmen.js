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
      phoneNumber: Number,
      image: {
        type: String,
      }
      // image: {
      //      public_id: {type: String,},
      //    url: {type: String,}
      // },   
  })

module.exports = mongoose.model('Trademan', tradesMenSchema);
