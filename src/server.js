const express = require("express");

const routerLogin = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const routerDatesNotAvailable = require("./routes/datesNotAvailable.route");
const routerReservation = require("./routes/reservation.route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routerUser);
app.use("/login", routerLogin);
app.use("/datesNotAvailable", routerDatesNotAvailable);
app.use("/reservation", routerReservation);

module.exports = app;
