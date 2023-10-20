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
    },
    street: {
      type: String,
      required: true,
    },
    neighbor: {
      type: String,
      maxlength: 100,
      minlength: 1,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    city: {
      type: String,
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
  propertyImages: [String],
  documentsImages: [String],
  dniImage: [String],
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
    type: String,
    min: 1,
    max: 100000,
    required: true,
  },
  noAvailabilityDays: [String],
  ownerName: {
    type: String,
    minlength: 5,
    maxlength: 150,
  },
  measurements: {
    long: {
      type: String,
      default: 0,
      min: 1,
      max: 100,
      required: true,
    },
    broad: {
      type: String,
      default: 0,
      min: 1,
      max: 100,
      required: true,
    },
    area: {
      type: String,
      default: 0,
      min: 1,
      max: 10000,
      required: true,
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
});

module.exports = mongoose.model("property", propertySchema, "Property");
