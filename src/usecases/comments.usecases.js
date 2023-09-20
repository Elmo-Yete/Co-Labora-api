const Comments = require("../models/comments.model");
const { getReservation } = require("./ratings.usecases");

const getComments = async () => {
  const comment = await Comments.find();
  return comment;
};

const deleteComment = async (id) => {
  const comment = await Comments.findByIdAndDelete(id);
  return comment;
};

module.exports = { getComments, deleteComment };
