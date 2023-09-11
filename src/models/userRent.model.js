const mongoose = require("mongoose");

const userRentSchema = new mongoose.Schema({
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
  saved_cards: {
    type: Array,
  },
  notifications: {
    type: Array,
  },
  documents: {
    type: Array,
  },
  customer_id: {
    type: Number,
  },
  client_grade: {
    type: Number,
  },
});

module.exports = mongoose.model("userRent", userRentSchema, "userRent");
