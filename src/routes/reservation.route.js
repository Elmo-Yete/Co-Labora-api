const express = require("express");
const router = express.Router();
const { create, extract } = require("../usecases/reservation.usecases");

router.post("/reservation", async (req, res) => {
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

router.get("/reservation/", async (req, res) => {
  try {
    const dates = await extract(req);
    res.status(200);
    res.json({
      success: true,
      data: dates,
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      message: "No se encontro la reservación",
    });
  }
});

module.exports = router;
