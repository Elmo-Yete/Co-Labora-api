const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  property: {
    propertyId: {
      type: String,
      require: true,
    },
    propertyName: {
      type: String,
      require: true
    },
    score: {
      type: Number,
      require: true
    },
    propertyImage: {
      type: String,
      require: true
    }
  },
  startDate: {
    type: String,
    require: true,
  },
  endDate: {
    type: String,
    require: true,
  },
  lessorId: {
    type: String,
    require: true,
  },
  tenantId: {
    type: String,
    require: true,
  },
  addOns: {
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
  subtotal: {
    type: Number,
    require: true,
  },
  commission: {
    type: Number,
    require: true,
  },
  taxes: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  paymentIntent: {
    cardNumber: {
      type: Number,
      require: true,
    },
    cardExpirationDate: {
      type: String,
      require: true
    }
  }
});

module.exports = mongoose.model(
  "reservation",
  reservationSchema,
  "Reservation"
);
