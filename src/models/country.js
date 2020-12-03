const mongoose = require("mongoose")

const { Schema } = mongoose

const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ally: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Country = mongoose.model("Country", countrySchema)

module.exports = Country
