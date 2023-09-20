const bcrypt = require("bcrypt");
const User = require("../models/datesNotAvailable.model");

const create = async (data) => {
  const dates = User.create(data);
  return dates;
};

module.exports = { create };
