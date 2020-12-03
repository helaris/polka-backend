const mongoose = require("mongoose")
const User = require("./user")
const Message = require("./message")

const { Schema } = mongoose

const chatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: []
  },
  messages: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    default: []
  }
})

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat
