const express = require("express");

const routerLogin = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const routerDatesNotAvailable = require("./routes/datesNotAvailable.route");
const routerReservation = require("./routes/reservation.route");
const routerStripe = require("./routes/stripe.route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routerUser);
app.use("/login", routerLogin);
app.use("/datesNotAvailable", routerDatesNotAvailable);
app.use("/reservation", routerReservation);
app.use("/getUsers", routerUser); // no definir la ruta por metodo del endpoint  listUsers
app.use("/deleteUser", routerUser); // no definir la ruta por metodo del endpoint  removeUser
app.use("/description", routerUser);
app.use("/stripe", routerStripe);
module.exports = app;
