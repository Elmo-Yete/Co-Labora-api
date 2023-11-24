require("dotenv").config();
const createError = require("http-errors");

const dates = (req, res, next) => {
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const intermediateDates = [];

  if (start === end) {
    intermediateDates.push(start);
  } else {
    while (start <= end) {
      intermediateDates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
  }
  req.body.datesNotAvailable = intermediateDates; // agregar un caso de fallo
  next();
};

module.exports = dates;
