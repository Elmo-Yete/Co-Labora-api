const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    _id: {
        type: String,
      },
      propertyId: {
        type: String,
      },
      commentUserId: {
        type: String
      },
      comment: {
        type: String
      }
})

module.exports = mongoose.model("comments", commentsSchema, "Comments")