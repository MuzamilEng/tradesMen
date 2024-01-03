const asyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModal");
// const User = require("../models/User");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  try {
    // Check if the chat already exists
    const existingChat = await Chat.findOne({
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage.sender", "name image email");

    if (existingChat) {
      res.status(200).json(existingChat);
    } else {
      // If the chat doesn't exist, create a new one
      const chatData = {
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(fullChat);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    const userChats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("latestMessage.sender", "name pic email")
      .sort({ updatedAt: -1 });

    res.status(200).json(userChats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  accessChat,
  fetchChats,
};
