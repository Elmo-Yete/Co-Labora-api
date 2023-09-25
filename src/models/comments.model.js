const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({
      propertyId: {
        type: Schema.Types.ObjectId,
        ref: "property"
      },
      commentUserId: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      comment: {
        type: String
      }
})

module.exports = mongoose.model("comments", commentsSchema, "Comments")