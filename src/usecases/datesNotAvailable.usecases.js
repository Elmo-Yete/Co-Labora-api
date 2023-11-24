const Availability = require("../models/datesNotAvailable.model");

const create = async (data) => {
  const dates = Availability.create(data);
  return dates;
};
const getDates = async() => {
  const datesNotAvailable = await Availability.find();
  return datesNotAvailable;
}

module.exports = { create, getDates };
