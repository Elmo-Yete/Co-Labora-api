const mongoose = require("mongoose");

const clientGradeSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  score: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model(
  "clientGrade",
  clientGradeSchema,
  "ClientGrade"
);
