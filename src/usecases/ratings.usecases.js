const Reservation = require("../models/raitings.model");

const getRating = async () => {
  const reservation = await Reservation.find();
  return reservation;
};

const deleteRating = async (id) => {
  const rating = await Reservation.findByIdAndDelete(id);
};

module.exports = { getRating, deleteRating };
