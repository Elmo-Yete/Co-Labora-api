const Reservation = require("../models/reservation.model");
const { getPropertiesById } = require("./property.usecases");
const { getUserById } = require("./user.usecase");
const { sendMails } = require("./email.usecases");
const createReservation = async (data) => {
  const property = await getPropertiesById(data.property.propertyId);
  const user = await getUserById(data.tenantId);
  const reservation = await Reservation.create(data);
  property.reservations.push(reservation);
  property.save();
  user.reservations.push(reservation);
  user.save();
  const email = await sendMails(data);
  return reservation;
};

const getReservations = async () => {
  const reservations = await Reservation.find();
  return reservations;
};

const getReservationsById = async (id) => {
  const reservation = await Reservation.findById(id);
  return reservation;
};
const deleteReservation = async (id) => {
  const reservationDeleted = await Reservation.findByIdAndDelete(id);
  return reservationDeleted;
};

const findReservationsByPropertyId = async (propertyId) => {
  try {
    const reservations = await Reservation.find({
      "property.propertyId": propertyId,
    }).populate("tenantId", { description: 1, email: 1, name: 1 });
    return reservations;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  getReservations,
  getReservationsById,
  findReservationsByPropertyId,
};
