const express = require("express");

const routerUser = require("./routes/user.route");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routerUser);

module.exports = app;
