const express = require("express");

const routerLogin = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routerUser);
app.use("/getUsers", routerUser);
app.use("/deleteUser", routerUser);
app.use("/description", routerUser);
app.use("/login", routerLogin);

module.exports = app;
