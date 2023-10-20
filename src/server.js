const express = require("express");

const routerLogin = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const routerDatesNotAvailable = require("./routes/datesNotAvailable.route");
const routerReservation = require("./routes/reservation.route");
const routerProperty = require("./routes/property.route");
const routerStripe = require("./routes/stripe.route");
const routerNotification = require("./routes/notifications.route");
const routerRatings = require("./routes/raitings.route");
const routerVerify = require("./routes/otp.route");
const routerComments = require("./routes/comments.route");
const routerImages = require("./routes/images.route");
const routerFavorites = require("./routes/favorites.route");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/otp", routerVerify);
app.use("/login", routerLogin); // * Endpoint funcionando
app.use("/datesNotAvailable", routerDatesNotAvailable);
app.use("/reservation", routerReservation);
app.use("/description", routerUser);
app.use("/notification", routerNotification);
app.use("/property", routerProperty);
app.use("/users", routerUser); // * post.Users funcionando / delete.Users funcionando / patch.Users funcionando
app.use("/stripe", routerStripe);
app.use("/rating", routerRatings);
app.use("/comments", routerComments);
app.use("/images", routerImages);
app.use("/favorites", routerFavorites);
module.exports = app;
