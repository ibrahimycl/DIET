const mongoose = require('mongoose');
const messageSchema = mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      message: {
        type: String,
        trim: true,
      },
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    },
    {
      timestamps: true,
    }
  );
  const messageModel = mongoose.model("Message", messageSchema);
  module.exports = messageModel