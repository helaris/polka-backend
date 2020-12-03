const mongoose = require("mongoose")

const { Schema } = mongoose

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
  image: {
    type: String,
    required: false,
  },
})

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
