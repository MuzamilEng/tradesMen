const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
      { type: mongoose.Schema.Types.ObjectId, ref: "Tradesman" }, // Reference to the Tradesman model
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
