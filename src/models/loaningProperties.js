const mongoose = require("mongoose");

const loaningSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  space_photos_id: {
    type: Array,
  },
  proof_address: {
    type: String,
  },
  address: {
    type: String,
  },
  bussines_name: {
    type: String,
  },
  cost_per_day: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  space_measurements: {
    type: Number,
  },
  description: {
    type: String,
  },
  card: {
    type: Number,
  },
});

module.exports = mongoose.model(
  "loaningSchema",
  loaningSchema,
  "LoaningSchema"
);
