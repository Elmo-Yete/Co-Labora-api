const express = require("express");
const router = express.Router();
const { payment } = require("../usecases/stripe.usecases");

router.post("/", async (req, res) => {
  try {
    const pay = await payment(req.body);
    res.status(201);
    res.json({
      success: true,
      data: pay,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: ("error de back", err.message),
    });
  }
});

module.exports = router;
