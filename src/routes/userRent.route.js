const express = require("express");
const router = express.Router();
const { create, extract } = require("../usecases/user.usecase");

router.post("/login", async (req, res) => {
  try {
    const user = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/name/:email", async (req, res) => {
  try {
    const user = await extract(req.params.email);
    res.status(200);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      message: "No se encontro el usuario",
    });
  }
});

module.exports = router;
