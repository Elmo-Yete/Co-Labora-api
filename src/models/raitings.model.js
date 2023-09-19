const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
  },
  propertyId: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("clientGrade", ratingsSchema, "ClientGrade");
