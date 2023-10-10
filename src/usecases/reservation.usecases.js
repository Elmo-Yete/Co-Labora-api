const Reservation = require("../models/reservation.model");
const {getPropertiesById } = require("./property.usecases");
const { getUserById } = require("./user.usecase");

const createReservation = async (data) => {
  const property = await getPropertiesById(data.property.propertyId);
  const user = await getUserById(data.tenantId);
  const reservation = await Reservation.create(data);
  property.reservations.push(reservation);
  property.save();
  user.reservations.push(reservation);
  user.save();
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
