const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
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
  userImage: [
    {
      type: Schema.Types.ObjectId,
      ref: "propertyImages",
    },
  ],
  description: {
    type: String,
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
  ],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "notification",
    },
  ],
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "propertyImages",
    },
  ],
  userType: {
    type: String,
  },
  userRatings: [
    {
      _id: {
        type: String,
      },
      userId: {
        type: String,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  userScore: {
    type: Number,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "favorites",
    },
  ],
  stripe_id: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  otp: {
    type: String,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "reservation",
    },
  ],
});

module.exports = mongoose.model("user", userSchema, "User");
