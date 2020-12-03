const mongoose = require("mongoose")

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  disability: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  genderInterest: {
    type: String,
    required: false,
  },
  hobbies: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  objectId: {
    type: String,
    required: false,
  },
  governmentId: {
    type: Number,
    required: false,
  },
  interests: {
    type: String
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  birthdate: {
    type: String,
    required: false,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "Group",
    },
  ],
  avatar: {
    type: Buffer
  },
  images: {
    type: Array,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "Event",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  chats: [
    {
      type: Schema.Types.ObjectId, 
      default: [],
      ref: "Chat",
    },
  ],
})

const user = mongoose.model("User", userSchema)
module.exports = user
