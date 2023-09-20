const User = require("../models/reservation.model");

const create = async (data) => {
  const dates = User.create(data);
  return dates;
};

module.exports = { create };
