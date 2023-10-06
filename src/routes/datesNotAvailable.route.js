const express = require("express");
const router = express.Router();
const { create, getDates } = require("../usecases/datesNotAvailable.usecases");
const auth = require("../middlewares/auth.middleware");
const dates = require("../middlewares/datesNotAvailable.middleware");

router.post("/", auth, dates, async (req, res) => {

  try {
    const dates = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: dates,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const dates = await getDates();
    res.status(200);
    res.json({
      success: true,
      data: dates,
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      message: "Dates not found",
    });
  }
});

module.exports = router;
