const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "property"
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
    require: true
}
});

module.exports = mongoose.model("ratings", ratingsSchema, "Ratings");
