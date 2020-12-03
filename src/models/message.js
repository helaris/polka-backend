const mongoose = require("mongoose")
const User = require("./user")

const { Schema } = mongoose

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
