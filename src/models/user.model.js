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
      ref: 'images'
    },
  ],
  description: {
    type: String,
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'property'
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
      type: Schema.Types.ObjectId,
      ref: "images"
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
  stripe_id: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

module.exports = mongoose.model("user", userSchema, "User");
