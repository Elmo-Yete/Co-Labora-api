const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  author: {
    type: String,
  },
  addressee_id: {
    type: String,
  },
  sender_id: {
    type: String,
  },
  content: {
    type: String,
  },
});
module.exports = mongoose.model(
  "notifications",
  notificationsSchema,
  "Notifications"
);
