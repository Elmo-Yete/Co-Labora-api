const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  _id: {
    type: String,
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
      maxlength: 150,
      require: true,
    },
    street: {
      type: String,
      maxlength: 200,
      minlength: 30,
      require: true,
    },
    neighbor: {
      type: String,
      maxlength: 200,
      minlength: 30,
      require: true,
    },
    number: {
      type: Number,
      maxlength: 200,
      minlength: 30,
      require: true,
    },
    zip: {
      type: Number,
      maxlength: 6,
      minlength: 6,
      require: true,
    },
    city: {
      type: String,
      maxlength: 20,
      minlength: 3,
      require: true,
    },
    mapCoordinates: {
      type: String,
      maxlength: 200,
      minlength: 30,
      require: true,
    },
  },
  images: [
    {
      id: {
        type: String,
      },
      imageType: {
        type: String
      },
      propertyId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  description: {
    tyoe: String,
    minlength: 20,
    maxlengh: 450,
    required: true,
  },
  amenities: {
    wifi: {
      type: Boolean,
      require: true,
    },
    parking: {
      type: Boolean,
      require: true,
    },
    airConditioner: {
      type: Boolean,
      require: true,
    },
    reception: {
      type: Boolean,
      require: true,
    },
    petFriendly: {
      type: Boolean,
      require: true,
    },
    cleanService: {
      type: Boolean,
      require: true,
    },
  },
  addsOns: {
    screwdrivers: {
      type: Boolean,
      require: true,
    },
    powerExtension: {
      type: Boolean,
      require: true,
    },
    flexometer: {
      type: Boolean,
      require: true,
    },
    drill: {
      type: Boolean,
      require: true,
    },
    carpenterBrush: {
      type: Boolean,
      require: true,
    },
    woodJigSaw: {
      type: Boolean,
      require: true,
    },
  },
  ratings: [
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
      rating: {
        type: Number,
        max: 5,
        min: 1,
      },
    },
  ],
  score: {
    type: Number,
  },
  price: {
    type: Number,
    min: 1,
    max: 100000,
    require: true,
  },
  noAvailabilityDays: [
    {
      propertyId: {
        type: String,
      },
      noAbleDays: [String],
    },
  ],
  owner: {
    type: String,
    minlength: 3,
    maxlengh: 100,
    require: true,
  },
  measurements: {
    long: {
      type: Number,
      min: 1,
      max: 100,
      require: true,
    },
    with: {
      type: Number,
      min: 1,
      max: 100,
      require: true,
    },
    area: {
      type: Number,
      min: 1,
      max: 10000,
      require: true,
    },
  },
  workTime: {
    open: {
      type: String,
      require: true,
    },
    close: {
      type: String,
      require: true,
    },
  },
  comments: [
    {
      _id: {
        type: String,
      },
      propertyId: {
        type: String,
      },
      commentUserId: {
        type: String
      },
      comment: {
        type: String
      }
    },
  ],
});

module.exports = mongoose.model("property", propertySchema, "Property");
