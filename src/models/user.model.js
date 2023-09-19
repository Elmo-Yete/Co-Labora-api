const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
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
      userId: {
        type: String,
      },
      typeImage: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
  },
  properties: [
    {
      _id: {
        type: String,
      },
      propertyId: {
        type: String,
      },
    },
  ],
  notifications: [
    {
      _id: {
        type: String,
      },
      userId: {
        type: String,
      },
      notification: {
        type: String,
      },
    },
  ],
  documents: [
    {
      _id: {
        type: String,
      },
      typeImage: {
        type: String,
      },
      url: {
        type: String,
      },
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
      _id: {
        type: String,
      },
      propertyId: {
        type: String,
      },
      userId: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("userRent", userSchema, "userRent");
