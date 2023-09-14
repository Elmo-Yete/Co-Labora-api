const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  property_id: {
    type: Number,
  },
  initial_date: {
    type: Number,
  },
  final_date: {
    type: Number,
  },
  lessor: {
    type: String,
  },
  tenant: {
    type: String,
  },
  add_ons: {
    type: Array,
  },
  subtotal: {
    type: Number,
  },
  commition: {
    type: Number,
  },
  taxes: {
    type: Number,
  },
  total: {
    type: Number,
  },
  payment_intent: {
    type: String,
  },
});

module.exports = mongoose.model(
  "reservation",
  reservationSchema,
  "Reservation"
);
