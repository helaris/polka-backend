const mongoose = require("mongoose")

const { Schema } = mongoose

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
})

const Group = mongoose.model("Group", groupSchema)
module.exports = Group
