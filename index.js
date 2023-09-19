require("dotenv").config();
const { mongoose } = require("mongoose");
const express = require("express");
const app = require("./src/server");
const { DB_USERNAME, DB_PASSWORD, DB_URL, DB_NAME } = process.env;
const dataBaseUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`;
const port = process.env.PORT || 8080;

mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log("Conexion a la base de datos exitosa");
    app.listen(port, () => {
      console.log("Servidor levantado");
    });
  })
  .catch((err) => {
    console.log("no se logro conectar con la base de datos", err);
  });

