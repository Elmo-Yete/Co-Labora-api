const Comments = require("../models/comments.model");
const { getPropertiesById } = require("./property.usecases");
const { getReservation } = require("./ratings.usecases");

const getComments = async () => {
  const comment = await Comments.find();
  return comment;
};
const createComment = async (body) => {
  const commentContent = body.comment
  if( commentContent.length < 5 && commentContent.length > 350){
    const error = new Error("Comment content has no a correct length");
    error.status = 400; 
    throw error;
  }
  const property = await getPropertiesById(body.propertyId);
  const comment = await Comments.create(body);
  property.comments.push(comment);
  property.save();
  return comment;
}

const deleteComment = async (id) => {
  const comment = await Comments.findByIdAndDelete(id);
  return comment;
};

module.exports = { createComment, getComments, deleteComment };
