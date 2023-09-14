const express = require("express");

const routerAuth = require("./routes/userRent.route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/login", routerAuth);

module.exports = app;
