const express = require("express");
const router = express.Router();
const {
  createReservation,
  deleteReservation,
  getReservations,
  getReservationsById,
} = require("../usecases/reservation.usecases");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, async (req, res) => {
  try {
    const reservation = await createReservation(req.body);
    res.status(201);
    res.json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const reservation = await getReservationsById(req.params.id);
    res.status(200);
    res.json({
      success: true,
      data: dates,
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      message: "No se encontró la reservación",
    });
  }
});

module.exports = router;
