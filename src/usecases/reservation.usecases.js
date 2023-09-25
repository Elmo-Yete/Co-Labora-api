const Reservation = require("../models/reservation.model");

const createReservation = async (data) => {
  const reservation = Reservation.create(data);
  return reservation;
};

const getReservations = async() => {
  const reservations = await Reservation.find();
  return reservations;
}

const getReservationsById = async(id) => {
  const reservation = await Reservation.findById(id);
  return reservation;
}
const deleteReservation = async(id) => {
  const reservationDeleted = await Reservation.findByIdAndDelete(id)
  return reservationDeleted
}

module.exports = { createReservation, deleteReservation, getReservations, getReservationsById};
