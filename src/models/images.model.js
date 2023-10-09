const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'property'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'images'
  },
  imagesUrls: [
    String
  ],
  imagesType: {
    type: String,
    require: true,
    enum: ["profile", "property", "documents", "identification"]
  }
})

module.exports = mongoose.model("images",imagesSchema, "Images")