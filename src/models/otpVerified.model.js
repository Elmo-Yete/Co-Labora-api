const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

module.exports = mongoose.model("otp", otpSchema, "Otp");
