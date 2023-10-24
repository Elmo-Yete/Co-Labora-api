const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchema = Schema({
  property: {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
    propertyName: {
      type: String,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
    propertyImage: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
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
    type: Schema.Types.ObjectId,
    ref: "reservation",
  },
  tenantId: {
    type: String,
    require: true,
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
      require: true,
    },
  },
  rating: {
    type: Schema.Types.ObjectId,
    ref: "ratings",
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "comments",
  },
});

module.exports = mongoose.model(
  "reservation",
  reservationSchema,
  "Reservation"
);
