const mongoose = require('mongoose');

const tradesMenSchema = new mongoose.Schema({
    mainTitle: String,
      info: String,
      location: String,
      image: {
           public_id: {type: String,},
         url: {type: String,}
      },
  })

module.exports = mongoose.model('User', tradesMenSchema);
