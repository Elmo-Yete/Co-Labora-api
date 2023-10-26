const express = require("express");
const router = express.Router();
const { sendOneMail } = require("../usecases/email.usecases");
router.post("/", async (req, res) => {
  try {
    const favorite = await sendOneMail(req.body);
    res.status(201);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(err || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
