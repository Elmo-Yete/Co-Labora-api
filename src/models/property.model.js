const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  location: {
    ownerLocationDescription: {
      type: String,
      maxlength: 100,
      required: true, //?
    },
    street: {
      type: String,
      maxlength: 100,
      minlength: 5,
      required: true,
    },
    neighbor: {
      type: String,
      maxlength: 100,
      minlength: 5,
      required: true,
    },
    number: {
      type: Number,
      maxlength: 10,
      minlength: 1,
      required: true,
    },
    zip: {
      type: Number,
      maxlength: 6,
      minlength: 6,
      required: true,
    },
    city: {
      type: String,
      maxlength: 20,
      minlength: 3,
      required: true,
    },
    mapCoordinates: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "images",
    },
  ],
  description: {
    type: String,
    minlength: 10,
    maxlength: 450,
    required: true,
  },
  amenities: {
    wifi: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    airConditioner: {
      type: Boolean,
      required: true,
    },
    reception: {
      type: Boolean,
      required: true,
    },
    petFriendly: {
      type: Boolean,
      required: true,
    },
    cleanService: {
      type: Boolean,
      required: true,
    },
  },
  addOns: {
    screwdrivers: {
      type: Boolean,
      required: true,
    },
    powerExtension: {
      type: Boolean,
      required: true,
    },
    flexometer: {
      type: Boolean,
      required: true,
    },
    drill: {
      type: Boolean,
      required: true,
    },
    carpenterBrush: {
      type: Boolean,
      required: true,
    },
    woodJigSaw: {
      type: Boolean,
      required: true,
    },
  },
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  score: {
    type: Number,
  },
  price: {
    type: Number,
    min: 1,
    max: 100000,
    required: true,
  },
  noAvailabilityDays: [String],
  ownerName: {
    type: String,
    minlength: 5,
    maxlength: 150,
    required: true,
  },
  measurements: {
    long: {
      type: Number,
      default: 0,
      min: 1,
      max: 100,
      required: true,
    },
    broad: {
      type: Number,
      default: 0,
      min: 1,
      max: 100,
      required: true,
    },
    area: {
      type: Number,
      default: 0,
      min: 1,
      max: 10000,
    },
  },
  workTime: {
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "reservation",
    },
  ],
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: "images",
    },
  ],
});

module.exports = mongoose.model("property", propertySchema, "Property");
