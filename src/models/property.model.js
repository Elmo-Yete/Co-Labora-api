const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  space_photos: {
    type: Array,
  },
  proof_addres: {
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
    type: String,
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
  amenities: {
    type: Array,
  },
  add_ons: {
    type: Array,
  },
});

module.exports = mongoose.model("property", propertySchema, "Property");
