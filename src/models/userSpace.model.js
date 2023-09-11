const mongoose = require("mongoose");

const userSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_image: {
    type: String,
  },
  description: {
    type: String,
  },
  ine_id: {
    type: String,
  },
  saved_cards: {
    type: Array,
  },
  loaning_properties_id: {
    type: Array,
  },
  customer_id: {
    type: Number,
  },
  rating_id: {
    type: Number,
  },
  notifications: {
    type: Array,
  },
});

module.exports = mongoose.model("userSpace", userSpaceSchema, "userSpace");
