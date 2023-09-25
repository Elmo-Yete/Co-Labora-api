const express = require("express");
const router = express.Router();
const { createReservation, deleteReservation, getReservations, getReservationsById } = require("../usecases/reservation.usecases");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, async (req, res) => {
  try {
    const user = await createReservation(req.body);
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

router.get("/:id", auth,  async (req, res) => {
  try {
    const reservation = await getReservationsById(req.params.id);
    res.status(200);
    res.json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      message: "No se encontró la reservación",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const reservations = await getReservations();
    res.status(200);
    res.json({
      success: true,
      data: reservations,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try{
    const reservation = await deleteReservation(req.params.id);
    let response = {
      status: 200,
      message: "Reservation has been deleted"
    }
    if(!reservation){
      response.status = 404
      response.message = "Reservation not found"
    }
    res.status(response.status);
    res.json({
      success: true,
      message: response.message
    }); 
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    })
  }
})

module.exports = router;