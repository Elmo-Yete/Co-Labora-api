const Rating = require("../models/raitings.model");
const { getPropertiesById } = require('./property.usecases.js')

const createRating = async (body) => {
  console.log("body", body)
  if(0  > body.rating > 5){
    const error = new Error("Rating value is not correct")
    error.status = 400;
    throw error;
  }
  const property = await getPropertiesById(body.propertyId);
  const rating = await Rating.create(body);
  property.ratings.push(rating)
  property.save()
  return rating;
};

const getRating = async () => {
  const reservation = await Rating.find();
  return reservation;
};

const deleteRating = async (id) => {
  console.log("id", id)
  const rating = await Rating.findByIdAndDelete(id);
  return rating;
};

module.exports = { getRating, deleteRating, createRating };
