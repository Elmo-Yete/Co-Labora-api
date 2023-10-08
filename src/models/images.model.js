const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  propertyID: {
    type: Schema.Types.ObjectId,
    ref: 'property'
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'images'
  },
  imagesUrls: [
    String
  ],
  imagesType: {
    type: String,
    require: true,
    enum: ["profile", "property", "document"]
  }
})