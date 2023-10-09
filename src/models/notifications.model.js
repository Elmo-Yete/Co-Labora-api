const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  author: {
    type: String,
    require: true
  },
  userReceiverId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    minlength: 4,
    maxlength: 350,
  },
});
module.exports = mongoose.model(
  "notification",
  notificationSchema,
  "Notification"
);
