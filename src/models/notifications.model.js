const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  author: {
    type: String,
    require: true
  },
  propertyId: {
    type: String,
  },
  userReceiverId: {
    type: String,
  },
  content: {
    type: String,
    minlength: 4,
    maxlength: 350,
  },
});
module.exports = mongoose.model(
  "notifications",
  notificationsSchema,
  "Notifications"
);
